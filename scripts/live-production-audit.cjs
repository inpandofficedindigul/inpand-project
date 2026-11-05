const https = require('https');
const http = require('http');
const { URL } = require('url');

const BASE_URL = 'https://portfolio.inpand.com';

function fetchUrl(targetUrl, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(targetUrl, { headers: { 'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)', ...headers } }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          url: targetUrl,
          statusCode: res.statusCode,
          headers: res.headers,
          body,
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.abort();
      reject(new Error(`Timeout fetching ${targetUrl}`));
    });
  });
}

async function runAudit() {
  console.log('===============================================================');
  console.log('   INPAND TECHNOLOGIES — LIVE PRODUCTION TECHNICAL SEO AUDIT   ');
  console.log('   Target: ' + BASE_URL);
  console.log('===============================================================\n');

  const results = {
    prerender: [],
    crawler: [],
    structuredData: [],
    vercel: [],
    performance: [],
  };

  // 1. Robots.txt
  console.log('--- 1. AUDITING ROBOTS.TXT & SITEMAP.XML ---');
  const robots = await fetchUrl(`${BASE_URL}/robots.txt`);
  console.log(`GET /robots.txt -> Status: ${robots.statusCode}`);
  const robotsAllowed = robots.body.includes('Allow: /');
  const robotsSitemap = robots.body.includes('Sitemap: https://portfolio.inpand.com/sitemap.xml');
  console.log(`  Robots Allow: / -> ${robotsAllowed}`);
  console.log(`  Robots Sitemap declaration -> ${robotsSitemap}`);

  // 2. Sitemap.xml
  const sitemap = await fetchUrl(`${BASE_URL}/sitemap.xml`);
  console.log(`GET /sitemap.xml -> Status: ${sitemap.statusCode}`);
  const sitemapUrls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log(`  Found ${sitemapUrls.length} URLs in live sitemap.xml:`);
  sitemapUrls.forEach(u => console.log(`    - ${u}`));

  // 3. Test every sitemap URL
  console.log('\n--- 2. VERIFYING SITEMAP URL STATUS & CRAWLER ACCESSIBILITY ---');
  for (const url of sitemapUrls) {
    const res = await fetchUrl(url);
    const hasNoIndex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(res.body);
    const titleMatch = res.body.match(/<title>([^<]+)<\/title>/i);
    const canonicalMatch = res.body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    const title = titleMatch ? titleMatch[1] : '(NONE)';
    const canonical = canonicalMatch ? canonicalMatch[1] : '(NONE)';
    console.log(`[HTTP ${res.statusCode}] ${url}`);
    console.log(`   Title: ${title}`);
    console.log(`   Canonical: ${canonical}`);
    console.log(`   NoIndex: ${hasNoIndex}`);
    
    results.crawler.push({
      url,
      statusCode: res.statusCode,
      title,
      canonical,
      hasNoIndex,
      isCanonicalMatch: canonical.replace(/\/$/, '') === url.replace(/\/$/, ''),
    });
  }

  // 4. Test 404 Non-existent Route
  console.log('\n--- 3. VERIFYING 404 BEHAVIOR & NON-EXISTENT ROUTE ---');
  const notFound = await fetchUrl(`${BASE_URL}/non-existent-route-verification-test-404`);
  console.log(`GET /non-existent-route-verification-test-404 -> Status: ${notFound.statusCode}`);
  const notFoundTitleMatch = notFound.body.match(/<title>([^<]+)<\/title>/i);
  console.log(`   Title returned: ${notFoundTitleMatch ? notFoundTitleMatch[1] : '(NONE)'}`);

  // 5. Test Trailing Slash Behavior
  console.log('\n--- 4. VERCEL DEPLOYMENT & ROUTING INTEGRITY ---');
  const trailingSlash = await fetchUrl(`${BASE_URL}/projects/`);
  console.log(`GET /projects/ -> Status: ${trailingSlash.statusCode}`);
  const withoutTrailingSlash = await fetchUrl(`${BASE_URL}/projects`);
  console.log(`GET /projects -> Status: ${withoutTrailingSlash.statusCode}`);

  // HTTP to HTTPS redirect
  try {
    const httpRes = await fetchUrl(`http://portfolio.inpand.com/`, { 'User-Agent': 'curl/7.68.0' });
    console.log(`GET http://portfolio.inpand.com/ -> Status: ${httpRes.statusCode} (Redirect to HTTPS: ${httpRes.statusCode === 301 || httpRes.statusCode === 308})`);
  } catch (e) {
    console.log(`HTTP redirect check: ${e.message}`);
  }

  // 6. Test Structured Data JSON-LD
  console.log('\n--- 5. VALIDATING STRUCTURED DATA (JSON-LD) ---');
  const pagesToTestSD = [
    `${BASE_URL}/`,
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/projects`,
    `${BASE_URL}/software`,
    `${BASE_URL}/projects/mei-alai`,
  ];

  for (const pageUrl of pagesToTestSD) {
    const res = await fetchUrl(pageUrl);
    const jsonLdMatches = [...res.body.matchAll(/<script[^>]*type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
    console.log(`\nURL: ${pageUrl}`);
    console.log(`   Found ${jsonLdMatches.length} JSON-LD script blocks`);
    
    jsonLdMatches.forEach((m, idx) => {
      try {
        const parsed = JSON.parse(m[1]);
        const graph = parsed['@graph'] || (Array.isArray(parsed) ? parsed : [parsed]);
        const types = graph.map(item => item['@type'] || item['@id'] || 'Unknown');
        console.log(`   Block #${idx + 1} types: ${JSON.stringify(types)}`);
        
        // Check organization
        const org = graph.find(i => i['@type'] === 'Organization');
        if (org) {
          console.log(`     Organization: ${org.name} | Phone: ${org.contactPoint?.[0]?.telephone} | Addresses: ${org.address?.length || 0}`);
        }
        // Check breadcrumbs
        const bc = graph.find(i => i['@type'] === 'BreadcrumbList');
        if (bc) {
          console.log(`     Breadcrumbs: ${bc.itemListElement?.map(e => `${e.position}:${e.name}`).join(' > ')}`);
        }
        // Check CreativeWork
        const cw = graph.find(i => i['@type'] === 'CreativeWork');
        if (cw) {
          console.log(`     CreativeWork: ${cw.name} | Genre: ${cw.genre} | URL: ${cw.url}`);
        }
      } catch (err) {
        console.error(`   Invalid JSON in block #${idx + 1}: ${err.message}`);
      }
    });
  }

  // 7. Performance headers and Asset Checks
  console.log('\n--- 6. PERFORMANCE & ASSET OPTIMIZATION AUDIT ---');
  const homeRes = await fetchUrl(`${BASE_URL}/`);
  console.log('Response Headers for /:');
  console.log(`  Content-Type: ${homeRes.headers['content-type']}`);
  console.log(`  Content-Encoding: ${homeRes.headers['content-encoding'] || '(none / uncompressed)'}`);
  console.log(`  Cache-Control: ${homeRes.headers['cache-control']}`);
  console.log(`  Strict-Transport-Security: ${homeRes.headers['strict-transport-security']}`);
  console.log(`  X-Vercel-Cache: ${homeRes.headers['x-vercel-cache']}`);
  console.log(`  HTML Payload Size: ${(homeRes.body.length / 1024).toFixed(2)} KB`);

  // Check critical assets
  const logo = await fetchUrl(`${BASE_URL}/images/inpand-logo.png`);
  console.log(`  Logo (/images/inpand-logo.png): HTTP ${logo.statusCode} (${(logo.body.length / 1024).toFixed(2)} KB)`);

  const faviconIco = await fetchUrl(`${BASE_URL}/favicon.ico`);
  console.log(`  Favicon (/favicon.ico): HTTP ${faviconIco.statusCode} (${(faviconIco.body.length / 1024).toFixed(2)} KB)`);

  const faviconSvg = await fetchUrl(`${BASE_URL}/favicon.svg`);
  console.log(`  Favicon (/favicon.svg): HTTP ${faviconSvg.statusCode} (${(faviconSvg.body.length / 1024).toFixed(2)} KB)`);

  const manifest = await fetchUrl(`${BASE_URL}/site.webmanifest`);
  console.log(`  WebManifest (/site.webmanifest): HTTP ${manifest.statusCode} (${(manifest.body.length / 1024).toFixed(2)} KB)`);

  const gscFile = await fetchUrl(`${BASE_URL}/googleb136c2358023a065.html`);
  console.log(`  Google Verification File (/googleb136c2358023a065.html): HTTP ${gscFile.statusCode}`);

  console.log('\n===============================================================');
  console.log('   PRODUCTION AUDIT EXECUTION COMPLETE                         ');
  console.log('===============================================================');
}

runAudit().catch(err => {
  console.error('Audit execution error:', err);
  process.exit(1);
});

