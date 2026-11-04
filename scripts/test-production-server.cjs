const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const port = 4173;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(distDir, urlPath === '/' ? 'index.html' : urlPath);

  if (!fs.existsSync(filePath)) {
    // SPA fallback
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(port, async () => {
  console.log(`======================================================`);
  console.log(` INPAND PORTFOLIO — PRODUCTION HTTP SERVER TEST     `);
  console.log(`======================================================`);
  
  let passes = 0;
  let failures = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✓ PASS: ${message}`);
      passes++;
    } else {
      console.error(`✗ FAIL: ${message}`);
      failures++;
    }
  }

  async function fetchUrl(subpath) {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:${port}${subpath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      }).on('error', reject);
    });
  }

  try {
    // 1. Test Homepage
    const home = await fetchUrl('/');
    assert(home.status === 200, 'Homepage responds with HTTP 200 OK');
    assert(home.body.includes('<title>INPAND Technologies Portfolio | Our Projects & Digital Solutions</title>'), 'Homepage returns exact target <title>');
    assert(home.body.includes("Explore INPAND Technologies' portfolio of websites, software applications, digital solutions and innovative projects built for businesses."), 'Homepage returns exact target description');
    assert(home.body.includes('rel="canonical" href="https://portfolio.inpand.com/"'), 'Homepage serves canonical URL https://portfolio.inpand.com/');
    assert(home.body.includes('name="robots" content="index, follow'), 'Homepage robots meta allows index and follow');
    assert(home.body.includes('name="theme-color" content="#315EFB"'), 'Homepage sets brand theme-color #315EFB');
    assert(home.body.includes('property="og:url" content="https://portfolio.inpand.com/"'), 'Homepage OG URL matches canonical domain');
    assert(home.body.includes('name="twitter:card" content="summary_large_image"'), 'Homepage sets Twitter summary_large_image');
    assert(home.body.includes('name="viewport" content="width=device-width, initial-scale=1.0"'), 'Mobile viewport correctly defined');

    // 2. Test Favicons
    const ico = await fetchUrl('/favicon.ico');
    assert(ico.status === 200, 'favicon.ico is accessible (HTTP 200)');
    assert(ico.body.length > 500, 'favicon.ico has valid non-zero content');

    const svg = await fetchUrl('/favicon.svg');
    assert(svg.status === 200, 'favicon.svg is accessible (HTTP 200)');
    assert(svg.headers['content-type'].includes('svg'), 'favicon.svg serves correct image/svg+xml MIME type');

    const appleTouch = await fetchUrl('/apple-touch-icon.png');
    assert(appleTouch.status === 200, 'apple-touch-icon.png is accessible (HTTP 200)');

    const manifest = await fetchUrl('/site.webmanifest');
    assert(manifest.status === 200, 'site.webmanifest is accessible (HTTP 200)');
    const manifestJson = JSON.parse(manifest.body);
    assert(manifestJson.name === 'INPAND Technologies Portfolio', 'site.webmanifest contains correct application name');

    // 3. Test Robots.txt
    const robots = await fetchUrl('/robots.txt');
    assert(robots.status === 200, 'robots.txt is accessible (HTTP 200)');
    assert(robots.body.includes('Allow: /'), 'robots.txt specifies Allow: /');
    assert(robots.body.includes('Sitemap: https://portfolio.inpand.com/sitemap.xml'), 'robots.txt references production sitemap URL');

    // 4. Test Sitemap.xml
    const sitemap = await fetchUrl('/sitemap.xml');
    assert(sitemap.status === 200, 'sitemap.xml is accessible (HTTP 200)');
    assert(sitemap.body.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'sitemap.xml declares valid sitemap schema');
    assert(sitemap.body.includes('<loc>https://portfolio.inpand.com/</loc>'), 'sitemap includes canonical homepage');
    assert(sitemap.body.includes('<loc>https://portfolio.inpand.com/projects</loc>'), 'sitemap includes /projects');
    assert(sitemap.body.includes('<loc>https://portfolio.inpand.com/software</loc>'), 'sitemap includes /software');
    assert(sitemap.body.includes('<loc>https://portfolio.inpand.com/about</loc>'), 'sitemap includes /about');
    assert(sitemap.body.includes('<loc>https://portfolio.inpand.com/contact</loc>'), 'sitemap includes /contact');

    const locCount = (sitemap.body.match(/<loc>/g) || []).length;
    assert(locCount === 19, `sitemap contains exactly 19 verified production routes (found: ${locCount})`);

    // 5. Structured Data Check
    const sdMatch = home.body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert(Boolean(sdMatch), 'Structured data script is rendered in HTTP response');
    const sd = JSON.parse(sdMatch[1]);
    assert(sd['@graph'].some(e => e['@type'] === 'Organization'), 'Structured data includes Organization');
    assert(sd['@graph'].some(e => e['@type'] === 'WebSite'), 'Structured data includes WebSite');

    console.log(`======================================================`);
    console.log(`TOTAL SERVER INTEGRITY CHECKS: ${passes + failures}`);
    console.log(`PASSED: ${passes}`);
    console.log(`FAILED: ${failures}`);
    console.log(`======================================================`);

    server.close();
    process.exit(failures > 0 ? 1 : 0);
  } catch (err) {
    console.error('Test server error:', err);
    server.close();
    process.exit(1);
  }
});
