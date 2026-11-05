const fs = require('fs');
const path = require('path');

const domain = 'https://portfolio.inpand.com';
const today = new Date().toISOString().split('T')[0];

// 1. Read project slugs from src/data/projects.ts
const projectsPath = path.join(__dirname, '..', 'src', 'data', 'projects.ts');
const projectsText = fs.readFileSync(projectsPath, 'utf8');
const projectSlugs = [...projectsText.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);

// Distinct public routes
const mainRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/software', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
];

const projectRoutes = projectSlugs.map(slug => ({
  path: `/projects/${slug}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const allRoutes = [...mainRoutes, ...projectRoutes];

console.log(`Building sitemap.xml for ${allRoutes.length} public production routes...`);

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const route of allRoutes) {
  xml += `  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
}

xml += `</urlset>
`;

const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log(`✓ Generated public/sitemap.xml with ${allRoutes.length} URLs`);

// Production-ready robots.txt
const robotsTxt = `# INPAND Technologies Portfolio — Production Robots Configuration
User-agent: *
Allow: /

# Private, administrative and API route exclusions
Disallow: /api/
Disallow: /admin/
Disallow: /private/

# Canonical Sitemap Declaration
Sitemap: ${domain}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
console.log('✓ Generated public/robots.txt');
