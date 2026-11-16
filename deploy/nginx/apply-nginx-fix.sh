#!/usr/bin/env bash
# One-time nginx fix for codigixinfotech.com. Run on the VPS:
#   sudo bash /var/www/Codigix_IT/deploy/nginx/apply-nginx-fix.sh
#
# 1. Serves each page's own pre-rendered file (dist/<page>/index.html) instead
#    of the homepage for every URL:
#      try_files ... /index.html;  ->  try_files $uri $uri/index.html /app-shell.html;
# 2. Adds the security headers (HSTS, CSP report-only, X-Frame-Options, ...)
#    from deploy/nginx/security-headers.conf to the codigixinfotech.com server blocks.
#
# Backs up every file it edits, runs `nginx -t`, and restores the backups if the
# test fails, so the live site is never left with a broken config.
# Safe to run more than once.
set -euo pipefail

APP=/var/www/Codigix_IT
HEADERS="$APP/deploy/nginx/security-headers.conf"
SITE_RE='server_name[^;]*[[:space:]](www\.)?codigixinfotech\.com[[:space:];]'

[ "$(id -u)" = 0 ] || { echo "Run with sudo: sudo bash $0"; exit 1; }
[ -f "$HEADERS" ] || { echo "Missing $HEADERS - run 'git pull' in $APP first."; exit 1; }
[ -f "$APP/dist/app-shell.html" ] || { echo "Missing $APP/dist/app-shell.html - run 'npm run build' in $APP first."; exit 1; }

mapfile -t FILES < <(grep -lE "$SITE_RE" /etc/nginx/sites-enabled/* 2>/dev/null || true)
[ "${#FILES[@]}" -gt 0 ] || { echo "No nginx site with server_name codigixinfotech.com in /etc/nginx/sites-enabled."; exit 1; }

# Backups go outside sites-enabled, so nginx never loads them as extra sites
BACKUP_DIR=/etc/nginx/codigix-backup-$(date +%Y%m%d-%H%M%S)
mkdir -p "$BACKUP_DIR"
CONFS=()
for i in "${!FILES[@]}"; do
  conf=$(readlink -f "${FILES[$i]}")   # edit the real file (usually in sites-available)
  backup="$BACKUP_DIR/$i-$(basename "$conf")"
  cp "$conf" "$backup"
  CONFS+=("$conf")
  echo "Editing $conf (backup: $backup)"

  # Only server { } blocks for codigixinfotech.com / www. are changed; other
  # sites in the same file (e.g. hrmsystem.codigixinfotech.com) stay as they are.
  #   1. SPA fallback -> page's own file first, then the plain shell
  #   2. security headers right after server_name (skipped if already included)
  addhdr=1; grep -q 'security-headers.conf' "$conf" && addhdr=0
  awk -v hdr="$HEADERS" -v addhdr="$addhdr" '
    function count(s, c,   t) { t = s; return gsub(c, "", t) }
    function flush(   i, l, site) {
      site = (blk ~ /server_name[^;]*[ \t](www\.)?codigixinfotech\.com[ \t;]/)
      for (i = 1; i <= n; i++) {
        l = lines[i]
        if (site) sub(/try_files[^;]*\/index\.html[^;]*;/, "try_files $uri $uri/index.html /app-shell.html;", l)
        print l
        if (site && addhdr == 1 && l ~ /^[ \t]*server_name[^;]*[ \t](www\.)?codigixinfotech\.com[ \t;]/) print "    include " hdr ";"
      }
      n = 0; blk = ""
    }
    {
      code = $0; sub(/#.*/, "", code)
      if (depth == 0 && code !~ /^[ \t]*server[ \t]*\{/) { print; next }
      lines[++n] = $0; blk = blk "\n" code
      depth += count(code, "{") - count(code, "}")
      if (depth == 0) flush()
    }
    END { if (n) flush() }
  ' "$backup" > "$conf"
  grep -q 'app-shell.html' "$conf" || echo "  ! no 'try_files ... /index.html' line found in $conf - add it by hand in location / { }"
done

restore() {
  for i in "${!CONFS[@]}"; do cp "$BACKUP_DIR/$i-$(basename "${CONFS[$i]}")" "${CONFS[$i]}"; done
  echo "nginx config test FAILED - all files restored, the live site is unchanged."
  exit 1
}

nginx -t || restore
systemctl reload nginx
echo "nginx reloaded. To undo: copy the files back from $BACKUP_DIR and reload nginx."

sleep 1
echo
echo "Checks:"
title=$(curl -s https://codigixinfotech.com/ai-solutions | grep -o '<title>[^<]*' | head -1 || true)
echo "  /ai-solutions title: ${title#<title>}"
if curl -sI https://codigixinfotech.com/ai-solutions | grep -qi '^strict-transport-security'; then
  echo "  security headers: OK"
else
  echo "  ! security headers missing on /ai-solutions: a location { } block with its own add_header"
  echo "    drops them. Add this line inside that block, then: sudo nginx -t && sudo systemctl reload nginx"
  echo "      include $HEADERS;"
fi
