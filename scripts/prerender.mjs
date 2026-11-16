// Pre-renders the public pages after `vite build`: loads every sitemap URL of
// the built site in a headless browser and saves the rendered HTML as
// dist/<route>/index.html, so crawlers that don't run JavaScript (many search
// and AI bots) get the real text plus a unique title, description and canonical.
// Ends by checking that every sitemap URL has its own title and description.
//
// Needs a Chromium browser: `npx playwright install chromium` (on Linux servers
// add --with-deps), or an installed Chrome / Edge. Without one it warns and
// writes head-only pages instead (the SPA shell with each page's own title,
// description and canonical, but no body text); set PRERENDER_STRICT=1 to fail.
// Run with the backend up (npm run server) so data-driven sections (blog posts,
// jobs, projects) are included; without it those sections are left out and
// empty states marked data-prerender-omit are dropped.
// PRERENDER_CONCURRENCY sets how many pages render at once (default 2).
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { preview } from 'vite';
import { chromium } from 'playwright';
import { findApiOrigin } from './api-origin.mjs';

// Same per-page tags the backend injects (data from src/data/seoPages.json)
const { renderIndexHtml } = createRequire(import.meta.url)('../backend/utils/seoMeta.js');

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const strict = process.env.PRERENDER_STRICT === '1';
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY) || 2;

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

const launchErrors = [];
const launchBrowser = async () => {
  for (const options of [{}, { channel: 'chrome' }, { channel: 'msedge' }]) {
    try {
      return await chromium.launch(options);
    } catch (error) {
      launchErrors.push(`${options.channel || 'playwright chromium'}: ${error.message.split('\n')[0]}`);
    }
  }
  return null;
};

// Runs in the page: tags added to <head> after load are either Helmet's SEO
// tags (kept, marked so main.jsx swaps them for live ones) or third-party
// scripts (dropped, they reload on their own). Empty states that only make
// sense when data failed to load ("No articles published yet") are dropped.
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
  document.querySelectorAll('[data-prerender-omit]').forEach((el) => el.remove());
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
    // Error and not-found states (marked data-prerender-skip, or noindex) must
    // never be published as the page: search engines would drop the URL
    const blocked = await page.evaluate(() => {
      const robots = document.querySelector('meta[name="robots"]')?.content || '';
      return document.querySelector('[data-prerender-skip]') ? 'error / not-found state' : /noindex/i.test(robots) ? 'noindex' : null;
    });
    if (blocked) {
      const reason = `rendered as ${blocked}`;
      throw apiFailures.size ? new ApiUnavailableError(`${apiNote()}, ${reason}`) : new Error(reason);
    }
    return { html: await page.evaluate(snapshot, shellHead), note: apiFailures.size ? apiNote() : null };
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

// The shell with the page's own head tags (no body text), written for every page
// before rendering and kept when rendering fails; no file (and any stale one
// removed) when seoPages.json doesn't know the URL
const writeHeadOnly = (shellHtml, route) => {
  const html = renderIndexHtml(shellHtml, route);
  if (html !== shellHtml || route === '/') writeHtml(routeFile(route), html);
  else rmSync(dirname(routeFile(route)), { recursive: true, force: true });
  return html !== shellHtml;
};

const main = async () => {
  // On a re-run dist/index.html is already the homepage snapshot; the shell is app-shell.html
  const shellFile = existsSync(join(dist, 'app-shell.html')) ? 'app-shell.html' : 'index.html';
  const shellHtml = readFileSync(join(dist, shellFile), 'utf8');
  const shellHead = shellHtml.slice(shellHtml.indexOf('<head>') + 6, shellHtml.indexOf('</head>'));
  // Untouched SPA shell for URLs that aren't pre-rendered (blog posts, 404s)
  writeHtml(join(dist, 'app-shell.html'), shellHtml);

  // Every page gets its own title, description and canonical straight away, so a
  // live site deploying from this dist/ never serves the bare shell for a page
  // while the slow browser rendering below is still running
  const headOnlyCount = routes.filter((route) => writeHeadOnly(shellHtml, route)).length;

  const browser = await launchBrowser();
  if (!browser) {
    const message =
      'prerender: could not start a browser, so pages get their own title and description but NO body text\n' +
      '  for crawlers that skip JavaScript. Fix once on this machine: npx playwright install --with-deps chromium\n' +
      launchErrors.map((error) => `  - ${error}`).join('\n');
    if (strict) throw new Error(message);
    console.warn(`\n⚠ ${message}\nprerender: ${headOnlyCount}/${routes.length} head-only pages written\n`);
    const problems = checkUniqueness(shellHtml);
    if (problems.length) console.warn(`⚠ SEO check: ${problems.length} problems:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    return;
  }

  // Pages that show database content (blog, case studies, jobs) need a backend
  // that answers: the one on this machine, else the live site (api-origin.mjs)
  const apiOrigin = await findApiOrigin(JSON.parse(readFileSync(join(root, 'src/data/seoPages.json'), 'utf8')).siteUrl);
  if (apiOrigin) console.log(`prerender: database content from ${apiOrigin}/api`);
  else console.warn('⚠ prerender: no backend answered /api; database pages keep only their title and description');
  const proxy = apiOrigin
    ? { '/api': { target: apiOrigin, changeOrigin: true }, '/uploads': { target: apiOrigin, changeOrigin: true } }
    : undefined;
  const server = await preview({ root, logLevel: 'silent', preview: { port: 4179, strictPort: false, open: false, ...(proxy && { proxy }) } });
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
  // Each page is saved as soon as it is rendered. The homepage waits until the
  // end: the preview server falls back to dist/index.html for URLs without a
  // file of their own, and a homepage snapshot there would leak into them
  const rendered = new Map();
  const withoutData = [];
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
            if (route !== '/') writeHtml(routeFile(route), html);
            if (note) withoutData.push(`${route}: ${note}`);
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

  if (rendered.has('/')) writeHtml(routeFile('/'), rendered.get('/'));
  // Pages that failed keep the head-only version written at the start

  console.log(`prerender: ${rendered.size}/${routes.length} pages pre-rendered`);
  const list = (items) => items.map((item) => `  - ${item}`).join('\n');
  if (withoutData.length || skipped.length) {
    console.warn(
      `⚠ prerender: the backend API was not reachable. Start it with its database (npm run server) and rebuild:\n` +
        (withoutData.length ? `  ${withoutData.length} pages were saved without their live data (blog posts, jobs, projects):\n${list(withoutData)}\n` : '') +
        (skipped.length ? `  ${skipped.length} pages could not be rendered at all:\n${list(skipped)}` : '')
    );
  }
  if (failures.length) console.error(`✗ prerender failed for:\n${list(failures)}`);

  const problems = checkUniqueness(shellHtml);
  if (problems.length) console.warn(`⚠ SEO check: ${problems.length} problems across sitemap URLs:\n${list(problems)}`);
  else console.log(`SEO check: all ${sitemapPaths.length} sitemap URLs have a unique title and description`);

  if (failures.length || (strict && (withoutData.length || skipped.length || problems.length))) process.exitCode = 1;
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
