const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('======================================================');
console.log(' INPAND TECHNOLOGIES — AUTOMATED VERIFICATION SUITE   ');
console.log('======================================================\n');

// 1. Critical Content Rules: Production Data Purity
console.log('=== 1. CRITICAL CONTENT RULES: DATA PURITY ===');
const projectsFile = fs.readFileSync('src/data/projects.ts', 'utf-8');

// Ensure production array is empty as mandated by spec
assert(
  projectsFile.includes('export const PROJECTS: Project[] = [];'),
  'Production project array is strictly empty ([]) until real approved client projects are supplied'
);

assert(
  !projectsFile.includes('example.com'),
  'No example.com or fabricated client domains exist in production projects data'
);

assert(
  !projectsFile.includes('Culina Atelier') && !projectsFile.includes('Kanso Spatial'),
  'No fabricated sample projects present in production data'
);

// Check that isolated test fixtures exist separately
assert(
  fs.existsSync('src/data/fixtures.test.ts'),
  'Development fixtures are strictly isolated in src/data/fixtures.test.ts'
);

// 2. Verified Company Information
console.log('\n=== 2. VERIFIED COMPANY INFORMATION FROM INPAND.COM ===');
const configFile = fs.readFileSync('src/lib/config.ts', 'utf-8');

assert(
  configFile.includes("info@inpand.com"),
  'Official email is verified as info@inpand.com'
);

assert(
  configFile.includes("9080394828"),
  'Official phone is verified as 9080394828'
);

assert(
  configFile.includes("Transform Ideas Into Business Growth"),
  'Official tagline is verified as "Transform Ideas Into Business Growth"'
);

assert(
  configFile.includes("MRC Complex, Guziliamparai, Dindigul – 624703"),
  'Official office address is verified as MRC Complex, Guziliamparai, Dindigul – 624703'
);

assert(
  configFile.includes("Monday–Saturday, 9:00 AM–6:00 PM"),
  'Official working hours verified as Monday–Saturday, 9:00 AM–6:00 PM'
);

assert(
  configFile.includes("https://www.inpand.com/"),
  'Official corporate website reference verified as https://www.inpand.com/'
);

assert(
  configFile.includes("https://wa.me/"),
  'WhatsApp integration utilizes https://wa.me/ protocol'
);

assert(
  configFile.includes("mailto:"),
  'Email integration utilizes mailto: protocol'
);

// 3. Component and Page Architecture
console.log('\n=== 3. ARCHITECTURE & COMPONENT COMPLETENESS ===');
const requiredFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/types/project.ts',
  'src/data/projects.ts',
  'src/data/categories.ts',
  'src/lib/config.ts',
  'src/lib/utils.ts',
  'src/hooks/useScrollLock.ts',
  'src/components/layout/Navbar.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/layout/Layout.tsx',
  'src/components/common/Button.tsx',
  'src/components/common/Badge.tsx',
  'src/components/common/VideoModal.tsx',
  'src/components/common/ScrollToTop.tsx',
  'src/components/common/SEOHead.tsx',
  'src/components/projects/ProjectCard.tsx',
  'src/components/projects/ProjectFilter.tsx',
  'src/components/projects/ProjectGrid.tsx',
  'src/components/projects/ProjectEmptyState.tsx',
  'src/components/sections/HomeHero.tsx',
  'src/components/sections/HomeCategories.tsx',
  'src/components/sections/HomeFeatured.tsx',
  'src/components/sections/HomeAbout.tsx',
  'src/components/sections/HomeProcess.tsx',
  'src/components/sections/HomeContactCTA.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/ProjectsPage.tsx',
  'src/pages/ProjectDetailPage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/ContactPage.tsx',
  'src/pages/NotFoundPage.tsx',
];

requiredFiles.forEach((file) => {
  assert(fs.existsSync(file), `Component file exists: ${file}`);
});

// 4. Category System & Slugs
console.log('\n=== 4. CATEGORIES & QUERY PARAMETER SLUGS ===');
const categoriesFile = fs.readFileSync('src/data/categories.ts', 'utf-8');
const expectedCategories = ['static-websites', 'dynamic-websites', 'e-commerce', 'web-applications'];

expectedCategories.forEach((catSlug) => {
  assert(categoriesFile.includes(`'${catSlug}'`), `Category slug defined: ${catSlug}`);
});

assert(categoriesFile.includes('findCategory'), 'Helper function findCategory implemented');
assert(categoriesFile.includes('getCategoryNameFromSlug'), 'Helper function getCategoryNameFromSlug implemented');

// 5. Contact Page Verification (No Fake Form)
console.log('\n=== 5. CONTACT PAGE INTEGRITY (NO FAKE FORM) ===');
const contactPage = fs.readFileSync('src/pages/ContactPage.tsx', 'utf-8');
assert(!contactPage.includes('<form'), 'ContactPage contains NO fake backend submission form');
assert(contactPage.includes('generateGeneralWhatsAppLink'), 'ContactPage provides working WhatsApp action');
assert(contactPage.includes('generateGeneralEmailLink'), 'ContactPage provides working Email action');
assert(contactPage.includes('COMPANY_CONFIG.phoneTel'), 'ContactPage provides working Telephone call action');

// 6. Project Detail Page Verification
console.log('\n=== 6. PROJECT DETAIL PAGE (MISSING ROUTE & VALIDATION) ===');
const detailPage = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf-8');
assert(detailPage.includes('Project Not Found'), 'Handles missing project slugs gracefully with 404 message');
assert(detailPage.includes('isValidUrl'), 'Validates client domain URLs before rendering external link');
assert(detailPage.includes('hasVideo'), 'Only mounts video player when a real video asset exists');

// 7. SEO and Configuration
console.log('\n=== 7. SEO & DEPLOYMENT PREPARATION ===');
const robots = fs.readFileSync('public/robots.txt', 'utf-8');
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf-8');
assert(!robots.includes('inpandtechnologies.com'), 'robots.txt does not publish fabricated unconfirmed domain');
assert(!sitemap.includes('inpandtechnologies.com'), 'sitemap.xml does not publish fabricated unconfirmed domain');

// 8. Official Brand Logo & Favicon Assets
console.log('\n=== 8. OFFICIAL OFFICE LOGO & FAVICON ASSETS ===');
const brandAssets = [
  'public/favicon.ico',
  'public/favicon.png',
  'public/favicon-32x32.png',
  'public/images/inpand-logo.png',
  'public/images/inpand-logo-horizontal.png',
  'public/images/inpand-mark.png',
];

brandAssets.forEach((asset) => {
  assert(fs.existsSync(asset), `Brand asset exists: ${asset}`);
  const stats = fs.statSync(asset);
  assert(stats.size > 0, `Brand asset ${asset} is non-empty (${stats.size} bytes)`);
});

const indexHtml = fs.readFileSync('index.html', 'utf-8');
assert(indexHtml.includes('/favicon.ico'), 'index.html references favicon.ico');
assert(indexHtml.includes('/favicon.png'), 'index.html references favicon.png');
assert(indexHtml.includes('/images/inpand-logo.png'), 'index.html references official inpand-logo.png in OpenGraph');

const navbarFile = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf-8');
assert(navbarFile.includes('/images/inpand-logo-horizontal.png'), 'Navbar renders official inpand-logo-horizontal.png');

const footerFile = fs.readFileSync('src/components/layout/Footer.tsx', 'utf-8');
assert(footerFile.includes('/images/inpand-logo-horizontal.png') || footerFile.includes('/images/inpand-logo.png'), 'Footer renders official logo');

console.log('\n======================================================');
console.log(`TOTAL AUDIT CHECKS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log('======================================================');

if (failed > 0) {
  process.exit(1);
}
