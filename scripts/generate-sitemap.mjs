// Builds public/sitemap.xml from src/data/seoPages.json plus the pages that
// live outside it (contact, blog, and the case studies and blog posts from the database).
// `npm run seo:generate` updates public/sitemap.xml; `npm run build` updates dist/.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { findApiOrigin } from './api-origin.mjs';

const root = new URL('..', import.meta.url);
const seoData = JSON.parse(readFileSync(new URL('src/data/seoPages.json', root), 'utf8'));
const lastmod = new Date().toISOString().slice(0, 10);

// Case studies and blog posts live in the database (see scripts/api-origin.mjs
// for which backend is asked)
async function fromApi(entity) {
  const origin = await findApiOrigin(seoData.siteUrl);
  if (!origin) return null;
  try {
    const res = await fetch(`${origin}/api/${entity}`, { signal: AbortSignal.timeout(8000) });
    const rows = res.ok ? await res.json() : null;
    if (!Array.isArray(rows)) return null;
    console.log(`sitemap.xml: ${rows.length} ${entity} from ${origin}/api`);
    return rows;
  } catch {
    return null;
  }
}

// If the API is unreachable, fall back to the studies with hand-written meta in seoPages.json
async function caseStudySlugs() {
  const studies = await fromApi('projects');
  if (studies) return studies.map((study) => study.slug || study.id);
  const slugs = Object.keys(seoData.caseStudyDetails || {});
  console.warn(`sitemap.xml: case study API unreachable, using the ${slugs.length} in seoPages.json`);
  return slugs;
}

// Published posts only (same rule as src/utils/blogs.js)
async function blogPostSlugs() {
  const posts = await fromApi('blogs');
  if (!posts) {
    console.warn('sitemap.xml: blog API unreachable, blog posts left out');
    return [];
  }
  return posts
    .filter((post) => !post.status || /^published$/i.test(String(post.status).trim()))
    .map((post) => post.slug || post.id);
}

const urls = [];
const add = (path, changefreq, priority) => urls.push({ path, changefreq, priority });

const { pages, sections } = seoData;
add(pages.home.path, 'daily', '1.0');
for (const section of Object.values(sections)) {
  for (const entry of section.entries) {
    add(entry.path, 'weekly', entry.overview ? '0.9' : '0.8');
  }
}
add(pages.services.path, 'weekly', '0.85');
add(pages.caseStudies.path, 'weekly', '0.85');
add(pages.about.path, 'weekly', '0.85');
add(pages.career.path, 'weekly', '0.9');
add('/contact', 'weekly', '0.85');
add('/blog', 'daily', '0.8');
for (const slug of await caseStudySlugs()) add(`/case-studies/${slug}`, 'monthly', '0.75');
for (const slug of await blogPostSlugs()) add(`/blog/${slug}`, 'monthly', '0.7');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${seoData.siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

// Default: the committed public/sitemap.xml (`npm run seo:generate`).
// `--out dist/sitemap.xml` (used by `npm run build`) writes only the published
// copy, so a build on the server never changes a tracked file and never blocks
// the next `git pull`.
const outArg = process.argv.indexOf('--out');
const out = outArg > -1 ? fileURLToPath(new URL(process.argv[outArg + 1], root)) : fileURLToPath(new URL('public/sitemap.xml', root));
writeFileSync(out, xml);
console.log(`sitemap.xml: ${urls.length} URLs → ${out}`);
