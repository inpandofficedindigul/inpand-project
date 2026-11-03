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
console.log(' INPAND TECHNOLOGIES — 14 PORTFOLIO PROJECTS AUDIT    ');
console.log('======================================================\n');

// 1. Projects Data Structure & Mapping Verification
console.log('=== 1. VERIFYING 14 PORTFOLIO PROJECTS ===');
const projectsFile = fs.readFileSync('src/data/projects.ts', 'utf-8');

const expectedProjects = [
  { name: 'Mei Alai', slug: 'mei-alai', file: 'mei-alai.png', domain: 'https://www.meialai.com/' },
  { name: 'Namma Jilla', slug: 'namma-jilla', file: 'namma-jilla.png', domain: 'https://www.nammajilla.com/' },
  { name: 'Innomedex Conferences', slug: 'innomedex', file: 'innomedex.png', domain: 'https://www.innomedexconferences.com/' },
  { name: 'Mei Alai Sports', slug: 'mei-alai-sports', file: 'mei-alai-sports.png', domain: 'https://meialaisports.com/' },
  { name: 'Nizhal Visuals', slug: 'nizhal-visuals', file: 'nizhal-visuals.png', domain: 'https://www.nizhalvisuals.com/' },
  { name: 'Moonlight Enterprises', slug: 'moonlight-enterprises', file: 'moonlight-enterprises.png', domain: 'https://moonlightenterprises.co.in/' },
  { name: 'Eesan TV', slug: 'eesan-tv', file: 'eesan-tv.png', domain: 'https://www.eesantv.com/' },
  { name: 'Image Scraper Studio', slug: 'image-scraper', file: 'image-scraper.png', domain: 'https://www.imagescrapper.com/' },
  { name: 'Focus Tourism Eventz', slug: 'focus-tourism', file: 'focus-tourism.png', domain: 'https://www.focustourismeventz.com/' },
  { name: 'Inpand Academy', slug: 'inpand-academy', file: 'inpand-academy.png', domain: 'https://inpandacademy.com/' },
  { name: 'MED Jewel Manufacturing', slug: 'med-jewel', file: 'med-jewel.png', domain: 'https://medjewelmanufacturing.com/' },
  { name: 'Dove Education Consultancy', slug: 'dove-education', file: 'dove-education.png', domain: 'https://doveeducationconsultancy.com/' },
  { name: 'Land Plot Real Estates', slug: 'land-plot', file: 'land-plot.png', domain: 'https://landplotrealestates.com/' },
  { name: "Kumar's Real Estate", slug: 'kumars-real-estate', file: 'kumars-real-estate.png', domain: 'https://kumarsrealestate.com/' },
];

assert(expectedProjects.length === 14, 'Target contains exactly 14 projects');

expectedProjects.forEach((proj) => {
  // Check project in data file
  assert(projectsFile.includes(`slug: '${proj.slug}'`), `Project data contains slug: ${proj.slug}`);
  assert(projectsFile.includes(proj.domain), `Project contains verified domain: ${proj.domain}`);

  // Check screenshot file exists in public/images/projects
  const pngPath = path.join('public/images/projects', proj.file);
  assert(fs.existsSync(pngPath), `Actual screenshot exists on disk: ${proj.file}`);
  const stats = fs.statSync(pngPath);
  assert(stats.size > 0, `Screenshot ${proj.file} is non-empty (${stats.size} bytes)`);

  // Check optimized thumb exists
  const baseName = proj.file.replace('.png', '');
  const thumbPath = path.join('public/images/projects', `${baseName}-thumb.webp`);
  assert(fs.existsSync(thumbPath), `High-speed thumbnail exists: ${baseName}-thumb.webp`);
});

// 2. Category Filters Verification
console.log('\n=== 2. VERIFYING 10 FUNCTIONAL CATEGORY FILTERS ===');
const categoriesFile = fs.readFileSync('src/data/categories.ts', 'utf-8');
const expectedFilterCategories = [
  'All Projects',
  'Dynamic Websites',
  'Static Websites',
  'Hybrid Websites',
  'E-commerce',
  'SaaS & Technology',
  'Media & Entertainment',
  'Education',
  'Real Estate',
  'Business & Services',
];

expectedFilterCategories.forEach((cat) => {
  assert(categoriesFile.includes(`'${cat}'`), `Category filter defined: ${cat}`);
});

// 3. UI Requirements Verification
console.log('\n=== 3. VERIFYING PROJECTS PAGE UI REQUIREMENTS ===');
const projectsPage = fs.readFileSync('src/pages/ProjectsPage.tsx', 'utf-8');
assert(projectsPage.includes('OUR PORTFOLIO'), 'Projects page contains "OUR PORTFOLIO" label');
assert(projectsPage.includes('Building Digital Experiences That Matter.'), 'Projects page contains required heading');
assert(projectsPage.includes('Explore a collection of digital platforms'), 'Projects page contains required description');

// 4. Project Card Requirements
console.log('\n=== 4. VERIFYING PROJECT CARD REQUIREMENTS ===');
const cardFile = fs.readFileSync('src/components/projects/ProjectCard.tsx', 'utf-8');
assert(cardFile.includes('project.thumbnail'), 'Card displays actual website screenshot');
assert(cardFile.includes('project.title'), 'Card displays project name');
assert(cardFile.includes('project.category'), 'Card displays business category');
assert(cardFile.includes('project.shortDescription'), 'Card displays short description');
assert(cardFile.includes('project.websiteType'), 'Card displays website type badge');
assert(cardFile.includes('target="_blank"'), 'Card opens live website in new browser tab');
assert(cardFile.includes('rel="noopener noreferrer"'), 'Card uses secure rel attributes');
assert(cardFile.includes('ImageOff'), 'Card contains clean placeholder fallback for missing images');

// 4b. Interactive Laptop Showcase Requirements
console.log('\n=== 4B. VERIFYING LAPTOP SHOWCASE REDESIGN REQUIREMENTS ===');
assert(projectsPage.includes('LaptopShowcase'), 'Projects page integrates LaptopShowcase component');
assert(fs.existsSync('src/components/projects/LaptopShowcase.tsx'), 'LaptopShowcase.tsx exists');
assert(fs.existsSync('src/components/projects/LaptopDevice.tsx'), 'LaptopDevice.tsx exists');
assert(fs.existsSync('src/components/projects/ProjectThumbnails.tsx'), 'ProjectThumbnails.tsx exists');
assert(fs.existsSync('src/styles/laptop-showcase.css'), 'laptop-showcase.css exists');

const showcaseFile = fs.readFileSync('src/components/projects/LaptopShowcase.tsx', 'utf-8');
assert(showcaseFile.includes('LaptopDevice'), 'Showcase mounts realistic LaptopDevice');
assert(showcaseFile.includes('ProjectThumbnails'), 'Showcase mounts ProjectThumbnails navigation');
assert(showcaseFile.includes('PROJECT'), 'Showcase displays PROJECT counter (e.g. PROJECT 01 / 14)');
assert(showcaseFile.includes('Visit Live Website'), 'Showcase has Visit Live Website button');
assert(showcaseFile.includes('target="_blank"'), 'Showcase external link opens in new tab');
assert(showcaseFile.includes('Previous') && showcaseFile.includes('Next'), 'Showcase contains Previous and Next navigation controls');
assert(showcaseFile.includes('activeProject.shortDescription'), 'Showcase displays project description');
assert(showcaseFile.includes('activeProject.category'), 'Showcase displays project category');
assert(showcaseFile.includes('activeProject.websiteType'), 'Showcase displays website type badge');

const deviceFile = fs.readFileSync('src/components/projects/LaptopDevice.tsx', 'utf-8');
assert(deviceFile.includes('requestAnimationFrame'), 'Device uses requestAnimationFrame for controlled auto-scroll');
assert(deviceFile.includes('onMouseEnter') && deviceFile.includes('onMouseLeave'), 'Device pauses auto-scroll on hover and resumes on leave');
assert(deviceFile.includes('laptop-screen-viewport'), 'Device uses strictly clipped viewport');
assert(deviceFile.includes('translate3d'), 'Device translates screenshot vertically while laptop frame stays stationary');
assert(deviceFile.includes('project.domain'), 'Device provides direct live preview access');

const thumbsFile = fs.readFileSync('src/components/projects/ProjectThumbnails.tsx', 'utf-8');
assert(thumbsFile.includes('onSelectProject'), 'Thumbnails selector triggers project selection');
assert(thumbsFile.includes('scrollIntoView'), 'Thumbnails selector auto-scrolls active project into view');
assert(thumbsFile.includes('overflow-x-auto'), 'Thumbnails strip enables horizontal scrolling');

// 5. Project Detail Interaction Requirements
console.log('\n=== 5. VERIFYING PROJECT DETAIL REQUIREMENTS ===');
const detailFile = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf-8');
assert(detailFile.includes('project.title'), 'Detail page displays project name');
assert(detailFile.includes('project.shortDescription'), 'Detail page displays full description');
assert(detailFile.includes('project.category'), 'Detail page displays business category');
assert(detailFile.includes('project.websiteType'), 'Detail page displays website classification');
assert(detailFile.includes('project.domain'), 'Detail page displays website URL');
assert(detailFile.includes('Visit Live Website'), 'Detail page displays Visit Live Website CTA');
assert(detailFile.includes('target="_blank"'), 'Detail page opens external link in new tab');

// 6. Verified Company Information
console.log('\n=== 6. VERIFYING INPAND TECHNOLOGIES COMPANY COORDINATES ===');
const configFile = fs.readFileSync('src/lib/config.ts', 'utf-8');
assert(configFile.includes('info@inpand.com'), 'Email verified as info@inpand.com');
assert(configFile.includes('9080394828'), 'Phone verified as 9080394828');
assert(configFile.includes('Transform Ideas Into Business Growth'), 'Tagline verified');
assert(configFile.includes('MRC Complex, Guziliamparai, Dindigul – 624703'), 'Address verified');

console.log('\n======================================================');
console.log(`TOTAL AUDIT CHECKS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log('======================================================');

if (failed > 0) {
  process.exit(1);
}
