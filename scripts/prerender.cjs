const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const masterHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(masterHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Run "vite build" first.');
  process.exit(1);
}

const masterHtml = fs.readFileSync(masterHtmlPath, 'utf8');

// Parse projects from src/data/projects.ts
const projectsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'projects.ts'), 'utf8');
const projectBlocks = projectsCode.split(/id:\s*['"]proj-/).slice(1);

const projects = projectBlocks.map(block => {
  const getVal = (regex) => {
    const match = block.match(regex);
    return match ? match[1] : '';
  };
  return {
    slug: getVal(/slug:\s*['"]([^'"]+)['"]/),
    title: getVal(/title:\s*['"]([^'"]+)['"]/),
    category: getVal(/category:\s*['"]([^'"]+)['"]/),
    websiteType: getVal(/websiteType:\s*['"]([^'"]+)['"]/),
    shortDescription: getVal(/shortDescription:\s*['"]([^'"]+)['"]/),
    thumbnail: getVal(/thumbnail:\s*['"]([^'"]+)['"]/),
    fullScreenshot: getVal(/fullScreenshot:\s*['"]([^'"]+)['"]/),
    domain: getVal(/domain:\s*['"]([^'"]+)['"]/),
  };
}).filter(p => Boolean(p.slug && p.title));

console.log(`Parsed ${projects.length} verified projects from projects.ts for prerendering.`);

const domain = 'https://portfolio.inpand.com';

// Verified Company info
const COMPANY = {
  name: 'INPAND Technologies',
  officialWebsite: 'https://www.inpand.com/',
  portfolioDomain: 'https://portfolio.inpand.com/',
  phoneDisplay: '+91 90803 94828',
  phoneTel: '+91-9080394828',
  email: 'info@inpand.com',
  headOffice: 'MRC Complex, Guziliamparai, Dindigul – 624703, Tamil Nadu, India',
  branchOffice: "8/A, S.S Towers, 5th Cross Spencer's Compound, Near Kurinji Lodge, Dindigul – 624001, Tamil Nadu, India",
  logo: 'https://portfolio.inpand.com/images/inpand-logo.png',
};

const orgSchema = {
  '@type': 'Organization',
  '@id': 'https://portfolio.inpand.com/#organization',
  name: COMPANY.name,
  url: COMPANY.portfolioDomain,
  logo: {
    '@type': 'ImageObject',
    url: COMPANY.logo,
    caption: COMPANY.name,
  },
  sameAs: [
    COMPANY.officialWebsite,
    'https://www.linkedin.com/company/inpand-technologies',
    'https://www.facebook.com/inpandtechnologies',
    'https://www.instagram.com/inpand_technologies',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: COMPANY.phoneTel,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'ta'],
    },
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'MRC Complex, Guziliamparai',
      addressLocality: 'Dindigul',
      postalCode: '624703',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: "8/A, S.S Towers, 5th Cross Spencer's Compound, Near Kurinji Lodge",
      addressLocality: 'Dindigul',
      postalCode: '624001',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
  ],
};

const websiteSchema = {
  '@type': 'WebSite',
  '@id': 'https://portfolio.inpand.com/#website',
  url: COMPANY.portfolioDomain,
  name: 'INPAND Technologies Portfolio',
  description: "Explore INPAND Technologies' portfolio of websites, software applications, digital solutions and innovative projects built for businesses.",
  publisher: {
    '@id': 'https://portfolio.inpand.com/#organization',
  },
  inLanguage: 'en-US',
};

// Route definitions
const routes = [
  {
    path: '/',
    outPath: path.join(distDir, 'index.html'),
    title: 'INPAND Technologies Portfolio | Our Projects & Digital Solutions',
    description: "Explore INPAND Technologies' portfolio of websites, software applications, digital solutions and innovative projects built for businesses.",
    image: '/images/inpand-logo.png',
    type: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }],
    heading: 'Transform Ideas Into Business Growth',
    subtitle: 'Explore 13 verified client websites, 6 mobile applications & Electron desktop software solutions built by INPAND Technologies for businesses.',
  },
  {
    path: '/projects',
    outPath: path.join(distDir, 'projects', 'index.html'),
    title: 'Client Projects & Websites Portfolio | INPAND Technologies',
    description: 'Browse 13 verified client websites delivered by INPAND Technologies across dynamic, static, hybrid, and e-commerce platforms with live demos.',
    image: '/images/inpand-logo.png',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Projects', url: '/projects' },
    ],
    heading: 'Client Projects & Websites Portfolio',
    subtitle: 'Explore 13 production websites delivered by INPAND Technologies across dynamic, static, hybrid and e-commerce architectures.',
  },
  {
    path: '/software',
    outPath: path.join(distDir, 'software', 'index.html'),
    title: 'Mobile Applications & Electron Desktop Software Showcase | INPAND Technologies',
    description: 'Explore video showcases of mobile apps and Electron desktop software developed by INPAND Technologies, including retail ERP and media streaming.',
    image: '/images/inpand-logo.png',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Software', url: '/software' },
    ],
    heading: 'Mobile Applications & Electron Desktop Software Showcase',
    subtitle: 'Watch video walkthroughs of multi-counter jewellery retail ERPs, live TV broadcasting apps, and business management software.',
  },
  {
    path: '/apps',
    outPath: path.join(distDir, 'apps', 'index.html'),
    title: 'Mobile Applications & Electron Desktop Software Showcase | INPAND Technologies',
    description: 'Explore video showcases of mobile apps and Electron desktop software developed by INPAND Technologies, including retail ERP and media streaming.',
    image: '/images/inpand-logo.png',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Software', url: '/software' },
    ],
    heading: 'Mobile Applications & Electron Desktop Software Showcase',
    subtitle: 'Watch video walkthroughs of multi-counter jewellery retail ERPs, live TV broadcasting apps, and business management software.',
  },
  {
    path: '/about',
    outPath: path.join(distDir, 'about', 'index.html'),
    title: 'About INPAND Technologies | Custom Software & Web Development Studio',
    description: 'Learn about INPAND Technologies, a digital agency and software engineering firm in Dindigul, Tamil Nadu. Transforming ideas into business growth.',
    image: '/images/inpand-logo.png',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ],
    heading: 'About INPAND Technologies',
    subtitle: 'Transform Ideas Into Business Growth. A digital studio and software engineering firm delivering production websites and business software.',
  },
  {
    path: '/contact',
    outPath: path.join(distDir, 'contact', 'index.html'),
    title: 'Contact INPAND Technologies | Digital Project Enquiries & Offices',
    description: 'Connect with INPAND Technologies for custom software development, websites, and business automation. Visit our Dindigul offices or reach us via WhatsApp & phone.',
    image: '/images/inpand-logo.png',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ],
    heading: 'Contact & Office Locations',
    subtitle: 'Connect with our engineering and design teams via WhatsApp (+91 90803 94828), email (info@inpand.com), or at our Dindigul offices.',
  },
  {
    path: '/404',
    outPath: path.join(distDir, '404.html'),
    title: '404 - Page Not Found | INPAND Technologies',
    description: 'The requested page could not be found on INPAND Technologies Portfolio.',
    image: '/images/inpand-logo.png',
    type: 'website',
    noindex: true,
    breadcrumbs: [{ name: 'Home', url: '/' }],
    heading: '404 - Page Not Found',
    subtitle: 'The page you are looking for does not exist or has been moved.',
  },
];

// Add 13 project routes
for (const p of projects) {
  routes.push({
    path: `/projects/${p.slug}`,
    outPath: path.join(distDir, 'projects', p.slug, 'index.html'),
    title: `${p.title} - ${p.category} Portfolio | INPAND Technologies`,
    description: `${p.shortDescription} Delivered by INPAND Technologies.`,
    image: p.thumbnail,
    type: 'article',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Projects', url: '/projects' },
      { name: p.title, url: `/projects/${p.slug}` },
    ],
    project: p,
    heading: `${p.title} - ${p.category}`,
    subtitle: p.shortDescription,
  });
}

function buildHtmlForRoute(route) {
  const is404 = Boolean(route.noindex);
  const canonicalUrl = is404
    ? `${domain}/`
    : `${domain}${route.path === '/' ? '/' : route.path}`;

  const fullImage = route.image.startsWith('http')
    ? route.image
    : `${domain}${route.image.startsWith('/') ? route.image : `/${route.image}`}`;

  // Structured data graph
  const graph = [orgSchema, websiteSchema];

  // WebPage schema
  graph.push({
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: route.title,
    description: route.description,
    isPartOf: { '@id': 'https://portfolio.inpand.com/#website' },
    breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
  });

  // Breadcrumbs schema
  if (route.breadcrumbs && route.breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: route.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${domain}${crumb.url === '/' ? '/' : crumb.url}`,
      })),
    });
  }

  // If project, add CreativeWork schema
  if (route.project) {
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${canonicalUrl}#creativework`,
      name: route.project.title,
      description: route.project.shortDescription,
      url: canonicalUrl,
      image: fullImage,
      genre: route.project.category,
      creator: {
        '@type': 'Organization',
        '@id': 'https://portfolio.inpand.com/#organization',
      },
    });
  }

  // Generate accessible semantic HTML body
  let semanticBody = `
    <header class="border-b border-gray-200 bg-white">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3 text-lg font-bold text-gray-900">
          <img src="/images/inpand-logo.png" alt="INPAND Technologies Logo" width="36" height="36" class="h-9 w-auto" />
          <span>INPAND <span class="text-blue-600 font-semibold text-xs tracking-wider uppercase block">Technologies</span></span>
        </a>
        <nav class="flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
          <a href="/projects" class="hover:text-blue-600 transition-colors">Projects</a>
          <a href="/software" class="hover:text-blue-600 transition-colors">Software</a>
          <a href="/about" class="hover:text-blue-600 transition-colors">About</a>
          <a href="/contact" class="hover:text-blue-600 transition-colors">Contact</a>
        </nav>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-4 py-12">
      <div class="max-w-4xl">
        <h1 class="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">${route.heading}</h1>
        <p class="text-lg text-gray-600 mb-8 leading-relaxed">${route.subtitle}</p>
      </div>
  `;

  if (route.project) {
    const p = route.project;
    semanticBody += `
      <article class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">${p.category}</span>
          <span class="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded uppercase">${p.websiteType}</span>
        </div>
        <p class="text-gray-700 text-base mb-6">${p.shortDescription}</p>
        <div class="aspect-[16/10] bg-gray-100 rounded overflow-hidden mb-6 border border-gray-200">
          <img src="${p.thumbnail}" alt="Website screenshot of ${p.title}" width="1440" height="900" class="w-full h-auto object-cover object-top" />
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <a href="${p.domain}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
            Visit Live Website (${p.title})
          </a>
          <a href="/projects" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-800 rounded font-medium hover:bg-gray-200">
            &larr; Back to All Projects
          </a>
        </div>
      </article>
    `;
  } else if (route.path === '/projects') {
    semanticBody += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;
    for (const p of projects) {
      semanticBody += `
        <article class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col">
          <div class="aspect-[16/10] bg-gray-100 border-b border-gray-200">
            <img src="${p.thumbnail}" alt="Website screenshot of ${p.title}" width="640" height="400" class="w-full h-full object-cover object-top" loading="lazy" />
          </div>
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-xs font-semibold text-blue-600">${p.category}</span>
                <span class="text-[10px] font-bold text-gray-700 uppercase bg-gray-100 px-2 py-0.5 rounded">${p.websiteType}</span>
              </div>
              <h2 class="text-xl font-bold text-gray-900 mb-2">
                <a href="/projects/${p.slug}" class="hover:text-blue-600">${p.title}</a>
              </h2>
              <p class="text-sm text-gray-600 line-clamp-3 mb-4">${p.shortDescription}</p>
            </div>
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <a href="/projects/${p.slug}" class="text-xs font-semibold text-blue-600 hover:underline">View Case Study &rarr;</a>
              <a href="${p.domain}" target="_blank" rel="noopener noreferrer" class="text-xs text-gray-500 hover:text-gray-900">Visit Live &nearr;</a>
            </div>
          </div>
        </article>
      `;
    }
    semanticBody += `</div>`;
  } else if (route.path === '/contact') {
    semanticBody += `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 class="text-xl font-bold text-gray-900 mb-2">Head Office</h2>
          <p class="text-gray-600 mb-4">${COMPANY.headOffice}</p>
          <a href="tel:${COMPANY.phoneTel}" class="text-blue-600 font-semibold block mb-2">${COMPANY.phoneDisplay}</a>
          <a href="mailto:${COMPANY.email}" class="text-blue-600 font-semibold block">${COMPANY.email}</a>
        </div>
        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 class="text-xl font-bold text-gray-900 mb-2">Branch Office</h2>
          <p class="text-gray-600 mb-4">${COMPANY.branchOffice}</p>
          <a href="https://wa.me/919080394828" class="text-emerald-600 font-semibold block mb-2">WhatsApp: +91 90803 94828</a>
          <a href="mailto:${COMPANY.email}" class="text-blue-600 font-semibold block">${COMPANY.email}</a>
        </div>
      </div>
    `;
  }

  semanticBody += `
    </main>
    <footer class="border-t border-gray-200 bg-gray-50 mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
        <p class="mb-2"><strong>INPAND Technologies</strong> &mdash; Dindigul, Tamil Nadu, India.</p>
        <p class="mb-4">Official Contact: <a href="tel:${COMPANY.phoneTel}" class="text-blue-600">${COMPANY.phoneDisplay}</a> | <a href="mailto:${COMPANY.email}" class="text-blue-600">${COMPANY.email}</a></p>
        <p>&copy; ${new Date().getFullYear()} INPAND Technologies. All rights reserved.</p>
      </div>
    </footer>
  `;

  // Start with master HTML
  let html = masterHtml;

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Meta Description
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="description" content="${route.description}" />`);

  // Replace Canonical Link
  html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Replace Robots tag
  const robotsDirective = is404
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  html = html.replace(/<meta\s+name=["']robots["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="robots" content="${robotsDirective}" />`);

  // Replace Open Graph Tags
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:image" content="${fullImage}" />`);
  html = html.replace(/<meta\s+property=["']og:type["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:type" content="${route.type || 'website'}" />`);

  // Replace Twitter Card Tags
  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);
  html = html.replace(/<meta\s+name=["']twitter:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="twitter:image" content="${fullImage}" />`);

  // Replace Structured Data Script
  const jsonLdString = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }, null, 2);

  html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${jsonLdString}\n</script>`);

  // Inject semantic crawlable HTML into #root
  html = html.replace(/<div id=["']root["']><\/div>/i, `<div id="root">${semanticBody}</div>`);

  return html;
}

// Generate static HTML for each route
let generatedCount = 0;

for (const route of routes) {
  const rendered = buildHtmlForRoute(route);
  const targetDir = path.dirname(route.outPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(route.outPath, rendered, 'utf8');
  generatedCount++;
  console.log(`✓ Prerendered [${route.path}] -> ${path.relative(distDir, route.outPath)}`);
}

console.log(`======================================================`);
console.log(`✓ PRERENDER COMPLETE: ${generatedCount} static routes generated in dist/`);
console.log(`======================================================`);

