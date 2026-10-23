import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const siteUrl = process.env.PUBLIC_SITE_URL || process.env.APP_URL || 'https://yourdomain.com';
const outputPath = path.join(rootDir, 'public', 'sitemap.xml');

const routes = ['/', '/demo', '/id=1', '/id=2'];
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => {
    const loc = `${siteUrl}${route.startsWith('/') ? route : `/${route}`}`;
    const priority = route === '/' ? '1.0' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n')}
</urlset>
`;

fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`Sitemap written to ${outputPath}`);
