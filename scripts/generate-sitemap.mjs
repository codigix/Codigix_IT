// Builds public/sitemap.xml from src/data/seoPages.json plus the pages that
// live outside it (contact, blog, and the case studies and blog posts from the database). Runs
// before `vite build`.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('..', import.meta.url);
const seoData = JSON.parse(readFileSync(new URL('src/data/seoPages.json', root), 'utf8'));
const lastmod = new Date().toISOString().slice(0, 10);

// Case studies and blog posts live in the database: ask the backend on this
// machine (running during a VPS deploy), then the live site.
async function fromApi(entity) {
  const sources = [`http://127.0.0.1:${process.env.PORT || 5000}/api/${entity}`, `${seoData.siteUrl}/api/${entity}`];
  for (const url of sources) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const rows = await res.json();
      if (!Array.isArray(rows)) continue;
      console.log(`sitemap.xml: ${rows.length} ${entity} from ${url}`);
      return rows;
    } catch {
      /* try the next source */
    }
  }
  return null;
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

const out = fileURLToPath(new URL('public/sitemap.xml', root));
writeFileSync(out, xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
