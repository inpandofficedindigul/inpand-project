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

// 4b. Restored Original 3-Column Project Grid & Clean Laptop Removal
console.log('\n=== 4B. VERIFYING ORIGINAL PROJECT GRID RESTORATION ===');
assert(projectsPage.includes('ProjectGrid'), 'Projects page integrates restored ProjectGrid component');
assert(fs.existsSync('src/components/projects/ProjectGrid.tsx'), 'ProjectGrid.tsx exists');
assert(!fs.existsSync('src/components/projects/LaptopShowcase.tsx'), 'LaptopShowcase.tsx cleanly removed');
assert(!fs.existsSync('src/components/projects/LaptopDevice.tsx'), 'LaptopDevice.tsx cleanly removed');
assert(!fs.existsSync('src/components/projects/ProjectThumbnails.tsx'), 'ProjectThumbnails.tsx cleanly removed');
assert(!fs.existsSync('src/styles/laptop-showcase.css'), 'laptop-showcase.css cleanly removed');

const gridFile = fs.readFileSync('src/components/projects/ProjectGrid.tsx', 'utf-8');
assert(gridFile.includes('grid-cols-1 md:grid-cols-2 lg:grid-cols-3'), 'Project grid enforces responsive 3-column layout');
assert(gridFile.includes('ProjectCard'), 'Project grid mounts ProjectCard components');
assert(projectsPage.includes('software-showcase'), 'Projects page includes separate software showcase section below');

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

// 7. App & Electron Video Showcase Requirements
console.log('\n=== 7. VERIFYING APP & ELECTRON VIDEO SHOWCASE ===');
const gitignore = fs.readFileSync('.gitignore', 'utf-8');
assert(gitignore.includes('Apps & Softwares Videos Rec/'), '.gitignore strictly excludes 415MB original source videos');

assert(fs.existsSync('src/types/software.ts'), 'types/software.ts exists');
assert(fs.existsSync('src/data/software.ts'), 'data/software.ts exists');
assert(fs.existsSync('src/components/software/SoftwareCard.tsx'), 'SoftwareCard.tsx exists');
assert(fs.existsSync('src/components/software/SoftwareFilter.tsx'), 'SoftwareFilter.tsx exists');
assert(fs.existsSync('src/components/software/VideoPlaybackModal.tsx'), 'VideoPlaybackModal.tsx exists');
assert(fs.existsSync('src/pages/SoftwareShowcasePage.tsx'), 'SoftwareShowcasePage.tsx exists');
assert(fs.existsSync('src/styles/software-showcase.css'), 'software-showcase.css exists');

const softwareData = fs.readFileSync('src/data/software.ts', 'utf-8');
const expectedSoftwareSlugs = [
  'eesan-tv-app',
  'krishna-jewellers-app',
  'krishna-software-erp',
  'mei-alai-app',
  'mrc-builders-erp',
  'namma-jilla-app',
];

expectedSoftwareSlugs.forEach(slug => {
  assert(softwareData.includes(`slug: '${slug}'`), `Software project data includes: ${slug}`);
});

assert(softwareData.includes("'Applications'"), "Category 'Applications' defined");
assert(softwareData.includes("'Electron Desktop Applications'"), "Category 'Electron Desktop Applications' defined");
assert(softwareData.includes("'All Software Projects'"), "Filter 'All Software Projects' defined");

// Check optimized video files & posters on disk
const softwareVideoFiles = [
  'eesan-tv.mp4',
  'krishna-jewellers.mp4',
  'krishna-software.mp4',
  'mei-alai.mp4',
  'mrc-builders.mp4',
  'namma-jilla.mp4',
];

let totalOptVideoBytes = 0;
softwareVideoFiles.forEach(vf => {
  const vp = path.join('public/videos/software', vf);
  assert(fs.existsSync(vp), `Optimized video file exists: ${vf}`);
  const st = fs.statSync(vp);
  assert(st.size > 100000, `Video file ${vf} is non-empty (${st.size} bytes)`);
  totalOptVideoBytes += st.size;
});

const totalOptMb = (totalOptVideoBytes / (1024 * 1024)).toFixed(1);
assert(totalOptVideoBytes < 35 * 1024 * 1024, `Combined optimized video delivery size is lightweight (${totalOptMb} MB < 35 MB)`);

const softwarePosters = [
  'eesan-tv-poster.webp',
  'krishna-jewellers-poster.webp',
  'krishna-software-poster.webp',
  'mei-alai-poster.webp',
  'mrc-builders-poster.webp',
  'namma-jilla-poster.webp',
];

softwarePosters.forEach(pf => {
  const pp = path.join('public/images/software', pf);
  assert(fs.existsSync(pp), `Video poster exists: ${pf}`);
  const st = fs.statSync(pp);
  assert(st.size > 5000, `Poster ${pf} is valid (${st.size} bytes)`);
});

const modalCode = fs.readFileSync('src/components/software/VideoPlaybackModal.tsx', 'utf-8');
assert(modalCode.includes('preload="metadata"'), 'Video modal uses lazy metadata preloading');
assert(modalCode.includes('togglePlayPause'), 'Video modal provides play/pause toggle');
assert(modalCode.includes('toggleFullscreen'), 'Video modal provides fullscreen toggle');
assert(modalCode.includes('toggleMute'), 'Video modal provides volume/mute toggle');
assert(modalCode.includes('videoRef.current.pause()'), 'Video modal pauses playback when closing or switching');

const navbarCode = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf-8');
assert(navbarCode.includes('/software'), 'Navbar includes link to Software showcase');

console.log('\n=== 8. VERIFYING SCROLL INTEGRITY & PAGE SCROLLING RESTORATION ===');
const indexCss = fs.readFileSync('src/styles/index.css', 'utf-8');
assert(indexCss.includes('overflow-y: auto') && indexCss.includes('scroll-behavior: smooth'), 'Global html enables overflow-y: auto and scroll-behavior: smooth');
assert(indexCss.includes('min-height: 100%') && indexCss.includes('overflow-x: hidden') && indexCss.includes('overflow-y: auto'), 'Global body enforces min-height: 100%, overflow-x: hidden, overflow-y: auto');
assert(indexCss.includes('#root') && indexCss.includes('min-height: 100vh') && indexCss.includes('overflow: visible'), 'Root container maintains min-height: 100vh and overflow: visible');
assert(modalCode.includes('useScrollLock(Boolean(project))'), 'VideoPlaybackModal uses guarded useScrollLock(Boolean(project))');
assert(!modalCode.includes("document.body.style.overflow = 'hidden'"), 'VideoPlaybackModal avoids unconditional raw body overflow lock');
assert(modalCode.includes('if (!project) return;'), 'VideoPlaybackModal guards keyboard listener against unmounted execution');

const projectsPageCode = fs.readFileSync('src/pages/ProjectsPage.tsx', 'utf-8');
assert(projectsPageCode.includes('{selectedVideoProject && ('), 'ProjectsPage conditionally renders VideoPlaybackModal only when video is active');

const homeFeaturedCode = fs.readFileSync('src/components/sections/HomeSoftwareFeatured.tsx', 'utf-8');
assert(homeFeaturedCode.includes('{selectedVideo && ('), 'HomeSoftwareFeatured conditionally renders VideoPlaybackModal only when video is active');

const softwarePageCode = fs.readFileSync('src/pages/SoftwareShowcasePage.tsx', 'utf-8');
assert(softwarePageCode.includes('{activeVideoProject && ('), 'SoftwareShowcasePage conditionally renders VideoPlaybackModal only when video is active');

const scrollToTopCode = fs.readFileSync('src/components/common/ScrollToTop.tsx', 'utf-8');
assert(!scrollToTopCode.includes('[pathname, search]') && scrollToTopCode.includes('[pathname]'), 'ScrollToTop triggers only on route transitions, not in-page query changes');


console.log('\n======================================================');
console.log(`TOTAL AUDIT CHECKS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log('======================================================');

if (failed > 0) {
  process.exit(1);
}
