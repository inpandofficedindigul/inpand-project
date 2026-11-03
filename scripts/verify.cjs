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

console.log('=== 1. VERIFYING SOURCE FILES AND STRUCTURE ===');
const requiredSourceFiles = [
  'src/main.tsx',
  'src/App.tsx',
  'src/data/projects.ts',
  'src/data/categories.ts',
  'src/lib/config.ts',
  'src/lib/utils.ts',
  'src/types/project.ts',
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

requiredSourceFiles.forEach((file) => {
  assert(fs.existsSync(file), `Source file exists: ${file}`);
});

console.log('\n=== 2. VERIFYING PROJECTS DATA & ASSET INTEGRITY ===');
const projectsFile = fs.readFileSync('src/data/projects.ts', 'utf-8');

// Check required categories
const categories = ['Static Websites', 'Dynamic Websites', 'E-Commerce', 'Web Applications'];
categories.forEach((cat) => {
  assert(projectsFile.includes(`'${cat}'`), `Data includes category: ${cat}`);
});

// Check mandatory slugs
assert(projectsFile.includes("'restaurant-website'"), "Data includes required spec slug: 'restaurant-website'");

// Check asset references in projects.ts
const imageRegex = /['"](\/images\/projects\/[^'"]+)['"]/g;
let match;
const foundImages = new Set();
while ((match = imageRegex.exec(projectsFile)) !== null) {
  foundImages.add(match[1]);
}

assert(foundImages.size > 0, `Discovered ${foundImages.size} image references in projects.ts`);
foundImages.forEach((img) => {
  const localPath = path.join('public', img.replace(/^\//, ''));
  assert(fs.existsSync(localPath), `Referenced image exists on disk: ${img}`);
});

// Check video references in projects.ts
const videoRegex = /['"](\/videos\/projects\/[^'"]+)['"]/g;
const foundVideos = new Set();
while ((match = videoRegex.exec(projectsFile)) !== null) {
  foundVideos.add(match[1]);
}

assert(foundVideos.size > 0, `Discovered ${foundVideos.size} video references in projects.ts`);
foundVideos.forEach((vid) => {
  const localPath = path.join('public', vid.replace(/^\//, ''));
  assert(fs.existsSync(localPath), `Referenced video exists on disk: ${vid}`);
  const stats = fs.statSync(localPath);
  assert(stats.size > 0, `Video file ${vid} is non-empty (${stats.size} bytes)`);
});

console.log('\n=== 3. VERIFYING CONFIG, WHATSAPP & EMAIL INTEGRATIONS ===');
const configFile = fs.readFileSync('src/lib/config.ts', 'utf-8');
assert(configFile.includes('generateProjectWhatsAppLink'), 'Config contains generateProjectWhatsAppLink');
assert(configFile.includes('generateProjectEmailLink'), 'Config contains generateProjectEmailLink');
assert(configFile.includes('wa.me'), 'WhatsApp links formatted for wa.me');
assert(configFile.includes('mailto:'), 'Email links formatted with mailto');
assert(configFile.includes('Hi INPAND Technologies'), 'WhatsApp message contains required spec opening');
assert(configFile.includes('Enquiry About'), 'Email subject contains required spec format');

console.log('\n=== 4. VERIFYING COMPILED PRODUCTION DISTRIBUTION ===');
assert(fs.existsSync('dist/index.html'), 'dist/index.html compiled');
const distHtml = fs.readFileSync('dist/index.html', 'utf-8');
assert(distHtml.includes('INPAND'), 'dist/index.html contains INPAND branding');
assert(distHtml.includes('Manrope') && distHtml.includes('Inter'), 'dist/index.html imports Manrope and Inter typography');

const distAssets = fs.readdirSync('dist/assets');
const cssAsset = distAssets.find((f) => f.endsWith('.css'));
const jsAsset = distAssets.find((f) => f.endsWith('.js'));
assert(Boolean(cssAsset), `Compiled CSS bundle exists: ${cssAsset}`);
assert(Boolean(jsAsset), `Compiled JS bundle exists: ${jsAsset}`);

console.log('\n=== 5. VERIFYING DOCUMENTATION ===');
const docFiles = [
  'README.md',
  'PROJECT_GUIDE.md',
  'CONTENT_GUIDE.md',
  'DEPLOYMENT.md',
  'documentation/PROJECT_GUIDE.md',
  'documentation/CONTENT_GUIDE.md',
  'documentation/DEPLOYMENT.md',
];

docFiles.forEach((doc) => {
  assert(fs.existsSync(doc), `Documentation file exists: ${doc}`);
  const content = fs.readFileSync(doc, 'utf-8');
  assert(content.length > 500, `Documentation file ${doc} is comprehensive (${content.length} bytes)`);
});

console.log(`\n========================================`);
console.log(`TOTAL CHECKS: ${passed + failed}`);
console.log(`TOTAL PASSED: ${passed}`);
console.log(`TOTAL FAILED: ${failed}`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
}
