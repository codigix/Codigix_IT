// Single source of truth for page SEO (titles, descriptions, H1s, clean URLs).
// The same JSON is read by backend/utils/seoMeta.js for server-side meta tags,
// redirects and by scripts/generate-sitemap.mjs.
import seoData from '../data/seoPages.json';

export const SITE_URL = seoData.siteUrl;

const normalizePath = (pathname) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

export const toCanonical = (path) => `${SITE_URL}${path === '/' ? '/' : path}`;

const withCanonical = (entry) => entry && { ...entry, canonical: toCanonical(entry.path) };

/** SEO for a standalone page: home, services, about, career, caseStudies. */
export const getPageSeo = (key) => withCanonical(seoData.pages[key]);

const getSection = (section) => seoData.sections[section];

export const getSectionName = (section) => getSection(section).name;

/** All routable paths of a tabbed section (overview + one per tab). */
export const getSectionPaths = (section) => getSection(section).entries.map((e) => e.path);

export const getSectionHubPath = (section) =>
  getSection(section).entries.find((e) => e.overview).path;

/** The SEO entry for the current URL, falling back to the section overview. */
export const getSectionSeo = (section, pathname) => {
  const { entries } = getSection(section);
  const path = normalizePath(pathname);
  return withCanonical(entries.find((e) => e.path === path) || entries.find((e) => e.overview));
};

/** Clean URL for a tab. Prefers the tab's own page over the overview that shares its content. */
export const getTabPath = (section, tab) => {
  const { entries } = getSection(section);
  const match =
    entries.find((e) => e.tab === tab && !e.overview) || entries.find((e) => e.tab === tab);
  return (match || entries.find((e) => e.overview)).path;
};

/** Which tabbed section (ai, iot, erp, crm, industries) a path belongs to, if any. */
export const getSectionForPath = (pathname) => {
  const path = normalizePath(pathname);
  return Object.keys(seoData.sections).find((key) => {
    const s = seoData.sections[key];
    return s.entries.some((e) => e.path === path) || s.legacyPaths.includes(path);
  });
};

/**
 * Where an old URL now lives, or null if it is already canonical. Handles
 * `?tab=` query URLs, renamed section hubs and duplicate alias routes.
 * Mirrors resolveRedirect() in backend/utils/seoMeta.js.
 */
export const resolveRedirect = (pathname, search = '') => {
  const path = normalizePath(pathname);
  const params = new URLSearchParams(search);

  if (seoData.redirects[path]) return seoData.redirects[path] + search;
  if (path.startsWith('/blogs/')) return path.replace(/^\/blogs\//, '/blog/') + search;

  for (const key of Object.keys(seoData.sections)) {
    const section = seoData.sections[key];
    const hub = getSectionHubPath(key);
    const tab = params.get('tab');
    if (path === hub && tab) return getTabPath(key, tab);
    if (section.legacyPaths.includes(path)) return tab ? getTabPath(key, tab) : hub;
  }

  return path !== pathname ? path + search : null;
};
