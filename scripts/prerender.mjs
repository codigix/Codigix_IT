// Pre-renders the public pages after `vite build`: loads each route of the
// built site in a headless browser and saves the rendered HTML as
// dist/<route>/index.html, so crawlers that don't run JavaScript (many search
// and AI bots) get the real text, title, description and canonical.
//
// Needs a Chromium browser: `npx playwright install chromium` (on Linux servers
// add --with-deps), or an installed Chrome / Edge. Without one it warns and
// leaves the plain SPA build in place; set PRERENDER_STRICT=1 to fail instead.
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const seoData = JSON.parse(readFileSync(join(root, 'src/data/seoPages.json'), 'utf8'));

const routes = [
  ...Object.values(seoData.pages).map((page) => page.path),
  ...Object.values(seoData.sections).flatMap((section) => section.entries.map((entry) => entry.path)),
  '/contact',
  '/blog',
  '/privacy-policy',
  '/terms-conditions',
];
const CONCURRENCY = 4;

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
// scripts (dropped, they reload on their own).
const snapshot = (shellHead) => {
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
  return `<!doctype html>\n${document.documentElement.outerHTML}`;
};

class ApiUnavailableError extends Error {}

const renderRoute = async (browser, baseUrl, shellHead, route) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route(/googletagmanager\.com|google-analytics\.com|youtube\.com/, (request) => request.abort());
  // A page whose API calls fail would be saved with empty states ("No articles
  // published yet"), so it is skipped instead
  const apiFailures = new Set();
  page.on('response', (response) => {
    if (response.url().includes('/api/') && response.status() >= 400) apiFailures.add(new URL(response.url()).pathname);
  });
  page.on('requestfailed', (request) => {
    if (request.url().includes('/api/')) apiFailures.add(new URL(request.url()).pathname);
  });
  try {
    await page.goto(baseUrl + route, { waitUntil: 'load', timeout: 60000 });
    await page.waitForFunction(() => document.querySelector('h1') && document.querySelector('link[rel="canonical"]'), null, {
      polling: 200,
      timeout: 30000,
    });
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
    if (apiFailures.size) throw new ApiUnavailableError(`API unavailable (${[...apiFailures].join(', ')})`);
    return await page.evaluate(snapshot, shellHead);
  } finally {
    await page.close();
  }
};

const main = async () => {
  const browser = await launchBrowser();
  if (!browser) {
    const message = 'prerender: no Chromium/Chrome/Edge found, run `npx playwright install chromium`. Pages were NOT pre-rendered.';
    if (process.env.PRERENDER_STRICT === '1') throw new Error(message);
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
  const failures = [];
  const skipped = [];
  // Written only after every route is done: the preview server falls back to
  // dist/index.html, which the homepage snapshot replaces
  const rendered = new Map();
  try {
    const queue = [...routes];
    await Promise.all(
      Array.from({ length: CONCURRENCY }, async () => {
        while (queue.length) {
          const route = queue.shift();
          try {
            rendered.set(route, await renderRoute(browser, baseUrl, shellHead, route));
          } catch (error) {
            const entry = { route, reason: error.message.split('\n')[0] };
            (error instanceof ApiUnavailableError ? skipped : failures).push(entry);
          }
        }
      })
    );
  } finally {
    await browser.close();
    await server.close();
  }

  const routeFile = (route) => (route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html'));
  for (const [route, html] of rendered) writeHtml(routeFile(route), html);
  // Pages not rendered this run must not keep an older snapshot
  for (const { route } of [...skipped, ...failures]) {
    if (route === '/') writeHtml(routeFile(route), shellHtml);
    else rmSync(dirname(routeFile(route)), { recursive: true, force: true });
  }

  console.log(`prerender: ${rendered.size}/${routes.length} pages written to dist/`);
  if (skipped.length) {
    console.warn(
      `⚠ prerender: ${skipped.length} pages left as the plain SPA shell because their API calls failed.\n` +
        '  Start the backend with its database (npm run server) before building to pre-render them:\n' +
        skipped.map(({ route, reason }) => `  - ${route}: ${reason}`).join('\n')
    );
    if (process.env.PRERENDER_STRICT === '1') process.exitCode = 1;
  }
  if (failures.length) {
    console.error(failures.map(({ route, reason }) => `  ✗ ${route}: ${reason}`).join('\n'));
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
