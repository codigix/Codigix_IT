// Pre-renders the public pages after `vite build`: loads every sitemap URL of
// the built site in a headless browser and saves the rendered HTML as
// dist/<route>/index.html, so crawlers that don't run JavaScript (many search
// and AI bots) get the real text plus a unique title, description and canonical.
// Ends by checking that every sitemap URL has its own title and description.
//
// Needs a Chromium browser: `npx playwright install chromium` (on Linux servers
// add --with-deps), or an installed Chrome / Edge. Without one it warns and
// leaves the plain SPA build in place; set PRERENDER_STRICT=1 to fail instead.
// Run with the backend up (npm run server) so data-driven sections are included.
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const strict = process.env.PRERENDER_STRICT === '1';
const CONCURRENCY = 4;

// Every URL the sitemap advertises, plus pages linked from the footer only
const sitemapPaths = [...readFileSync(join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map(
  (match) => match[1] || '/'
);
const routes = [...new Set([...sitemapPaths, '/privacy-policy', '/terms-conditions'])];

const routeFile = (route) => (route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html'));

// vite-plugin-compression ships .gz copies for nginx gzip_static; keep them in step
const writeHtml = (file, html) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  writeFileSync(`${file}.gz`, gzipSync(html, { level: 9 }));
};

const launchBrowser = async () => {
  for (const options of [{}, { channel: 'chrome' }, { channel: 'msedge' }]) {
    try {
      return await chromium.launch(options);
    } catch {
      // try the next browser
    }
  }
  return null;
};

// Runs in the page: tags added to <head> after load are either Helmet's SEO
// tags (kept, marked so main.jsx swaps them for live ones) or third-party
// scripts (dropped, they reload on their own). With headOnly the page body is
// left empty, for pages whose data could not be loaded.
const snapshot = ({ shellHead, headOnly }) => {
  const shell = new Set(
    [...new DOMParser().parseFromString(`<head>${shellHead}</head>`, 'text/html').head.children].map((el) => el.outerHTML)
  );
  let seenTitle = false;
  for (const el of [...document.head.children]) {
    const tag = el.tagName.toLowerCase();
    if (tag === 'title') {
      // React inserts the page title before the template's fallback one
      if (seenTitle) el.remove();
      seenTitle = true;
      continue;
    }
    if (shell.has(el.outerHTML)) continue;
    const isSeoTag =
      tag === 'meta' ||
      (tag === 'link' && el.rel === 'canonical') ||
      (tag === 'script' && el.type === 'application/ld+json');
    if (isSeoTag) el.setAttribute('data-seo-prerender', '');
    else if (tag === 'script' || tag === 'iframe') el.remove();
  }
  document.querySelectorAll('body > script:not([type="module"]), body > iframe').forEach((el) => el.remove());
  if (headOnly) document.getElementById('root').innerHTML = '';
  return `<!doctype html>\n${document.documentElement.outerHTML}`;
};

class ApiUnavailableError extends Error {}

const renderRoute = async (browser, baseUrl, shellHead, route) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route(/googletagmanager\.com|google-analytics\.com|youtube\.com/, (request) => request.abort());
  const apiFailures = new Set();
  page.on('response', (response) => {
    if (response.url().includes('/api/') && response.status() >= 400) apiFailures.add(new URL(response.url()).pathname);
  });
  page.on('requestfailed', (request) => {
    if (request.url().includes('/api/')) apiFailures.add(new URL(request.url()).pathname);
  });
  const apiNote = () => `API unavailable (${[...apiFailures].join(', ')})`;
  try {
    await page.goto(baseUrl + route, { waitUntil: 'load', timeout: 60000 });
    try {
      await page.waitForFunction(() => document.querySelector('h1') && document.querySelector('link[rel="canonical"]'), null, {
        polling: 200,
        timeout: 30000,
      });
    } catch (error) {
      // e.g. a case study that only exists in the database shows "not found"
      if (apiFailures.size) throw new ApiUnavailableError(`${apiNote()}, page did not render`);
      throw error;
    }
    // Scroll through so scroll-triggered sections render, then let animations settle
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1200);

    const finalPath = new URL(page.url()).pathname;
    if (finalPath !== route) throw new Error(`redirected to ${finalPath}`);
    // Without its data a page would be saved with empty states ("No articles
    // published yet"): keep only its head tags (title, description, canonical)
    const headOnly = apiFailures.size > 0;
    return { html: await page.evaluate(snapshot, { shellHead, headOnly }), note: headOnly ? apiNote() : null };
  } finally {
    await page.close();
  }
};

// Every sitemap URL must have a title and description no other URL uses
const checkUniqueness = (shellHtml) => {
  const seen = new Map();
  const problems = [];
  for (const route of sitemapPaths) {
    const file = routeFile(route);
    const html = existsSync(file) ? readFileSync(file, 'utf8') : shellHtml;
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
    const description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    if (!title) problems.push(`${route}: no title`);
    if (!description) problems.push(`${route}: no meta description`);
    for (const [kind, value] of [['title', title], ['description', description]]) {
      if (!value) continue;
      const key = `${kind}:${value}`;
      if (seen.has(key)) problems.push(`${route}: same ${kind} as ${seen.get(key)}`);
      else seen.set(key, route);
    }
  }
  return problems;
};

const main = async () => {
  const browser = await launchBrowser();
  if (!browser) {
    const message = 'prerender: no Chromium/Chrome/Edge found, run `npx playwright install chromium`. Pages were NOT pre-rendered.';
    if (strict) throw new Error(message);
    console.warn(`\n⚠ ${message}\n`);
    return;
  }

  // On a re-run dist/index.html is already the homepage snapshot; the shell is app-shell.html
  const shellFile = existsSync(join(dist, 'app-shell.html')) ? 'app-shell.html' : 'index.html';
  const shellHtml = readFileSync(join(dist, shellFile), 'utf8');
  const shellHead = shellHtml.slice(shellHtml.indexOf('<head>') + 6, shellHtml.indexOf('</head>'));
  // Untouched SPA shell for URLs that aren't pre-rendered (blog posts, 404s)
  writeHtml(join(dist, 'app-shell.html'), shellHtml);

  const server = await preview({ root, logLevel: 'silent', preview: { port: 4179, strictPort: false, open: false } });
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
  // Written only after every route is done: the preview server falls back to
  // dist/index.html, which the homepage snapshot replaces
  const rendered = new Map();
  const headOnly = [];
  const skipped = [];
  const failures = [];
  try {
    const queue = [...routes];
    await Promise.all(
      Array.from({ length: CONCURRENCY }, async () => {
        while (queue.length) {
          const route = queue.shift();
          try {
            const { html, note } = await renderRoute(browser, baseUrl, shellHead, route);
            rendered.set(route, html);
            if (note) headOnly.push(`${route}: ${note}`);
          } catch (error) {
            const entry = `${route}: ${error.message.split('\n')[0]}`;
            (error instanceof ApiUnavailableError ? skipped : failures).push(entry);
          }
        }
      })
    );
  } finally {
    await browser.close();
    await server.close();
  }

  for (const [route, html] of rendered) writeHtml(routeFile(route), html);
  // Pages not rendered this run must not keep an older snapshot
  for (const entry of [...skipped, ...failures]) {
    const route = entry.slice(0, entry.indexOf(': '));
    if (route === '/') writeHtml(routeFile(route), shellHtml);
    else rmSync(dirname(routeFile(route)), { recursive: true, force: true });
  }

  console.log(`prerender: ${rendered.size - headOnly.length}/${routes.length} pages fully pre-rendered`);
  const list = (items) => items.map((item) => `  - ${item}`).join('\n');
  if (headOnly.length || skipped.length) {
    console.warn(
      `⚠ prerender: the backend API was not reachable. Start it with its database (npm run server) and rebuild:\n` +
        (headOnly.length ? `  ${headOnly.length} pages have their title/description but no body text:\n${list(headOnly)}\n` : '') +
        (skipped.length ? `  ${skipped.length} pages could not be rendered at all:\n${list(skipped)}` : '')
    );
  }
  if (failures.length) console.error(`✗ prerender failed for:\n${list(failures)}`);

  const problems = checkUniqueness(shellHtml);
  if (problems.length) console.warn(`⚠ SEO check: ${problems.length} problems across sitemap URLs:\n${list(problems)}`);
  else console.log(`SEO check: all ${sitemapPaths.length} sitemap URLs have a unique title and description`);

  if (failures.length || (strict && (headOnly.length || skipped.length || problems.length))) process.exitCode = 1;
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
