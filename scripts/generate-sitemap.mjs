// Builds public/sitemap.xml from src/data/seoPages.json plus the pages that
// live outside it (contact, blog, case study details). Runs before `vite build`.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('..', import.meta.url);
const seoData = JSON.parse(readFileSync(new URL('src/data/seoPages.json', root), 'utf8'));
const lastmod = new Date().toISOString().slice(0, 10);

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
for (const id of [1, 2, 3, 4, 5, 6, 40]) add(`/case-studies/${id}`, 'monthly', '0.75');

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
