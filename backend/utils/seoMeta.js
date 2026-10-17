// Server-side SEO for the SPA: 301s for legacy URLs and per-page meta tags in
// index.html so crawlers that don't run JavaScript still see the right
// title, description and canonical. Data lives in src/data/seoPages.json,
// shared with the React app (src/utils/seo.js).
const seoData = require('../../src/data/seoPages.json');

const normalizePath = (pathname) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

const toCanonical = (path) => `${seoData.siteUrl}${path === '/' ? '/' : path}`;

const sectionKeys = Object.keys(seoData.sections);

const getHubPath = (key) => seoData.sections[key].entries.find((e) => e.overview).path;

const getTabPath = (key, tab) => {
  const { entries } = seoData.sections[key];
  const match =
    entries.find((e) => e.tab === tab && !e.overview) || entries.find((e) => e.tab === tab);
  return (match || entries.find((e) => e.overview)).path;
};

const entriesByPath = new Map();
for (const entry of Object.values(seoData.pages)) entriesByPath.set(entry.path, entry);
for (const key of sectionKeys) {
  for (const entry of seoData.sections[key].entries) entriesByPath.set(entry.path, entry);
}

/** Mirrors resolveRedirect() in src/utils/seo.js. Returns null when no redirect applies. */
const resolveRedirect = (pathname, search = '') => {
  const path = normalizePath(pathname);
  const params = new URLSearchParams(search);

  if (seoData.redirects[path]) return seoData.redirects[path] + search;
  if (path.startsWith('/blogs/')) return path.replace(/^\/blogs\//, '/blog/') + search;

  for (const key of sectionKeys) {
    const tab = params.get('tab');
    if (path === getHubPath(key) && tab) return getTabPath(key, tab);
    if (seoData.sections[key].legacyPaths.includes(path)) return tab ? getTabPath(key, tab) : getHubPath(key);
  }

  return path !== pathname ? path + search : null;
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** index.html with the page's title and meta tags, or unchanged for unknown paths. */
const renderIndexHtml = (html, pathname) => {
  const entry = entriesByPath.get(normalizePath(pathname));
  if (!entry) return html;

  const title = escapeHtml(entry.title);
  const description = escapeHtml(entry.description);
  const canonical = escapeHtml(toCanonical(entry.path));
  const tags = [
    `<meta name="description" content="${description}" data-seo-prerender>`,
    `<link rel="canonical" href="${canonical}" data-seo-prerender>`,
    `<meta property="og:title" content="${title}" data-seo-prerender>`,
    `<meta property="og:description" content="${description}" data-seo-prerender>`,
    `<meta property="og:url" content="${canonical}" data-seo-prerender>`,
    `<meta name="twitter:title" content="${title}" data-seo-prerender>`,
    `<meta name="twitter:description" content="${description}" data-seo-prerender>`,
  ].join('\n  ');

  return html
    .replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`)
    .replace('</head>', () => `  ${tags}\n</head>`);
};

module.exports = { resolveRedirect, renderIndexHtml };
