import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images/projects');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function createBrowserMockup({ title, tag, accent, bgDark = false, contentSvg }) {
  const bg = bgDark ? '#121212' : '#FFFFFF';
  const textColor = bgDark ? '#FFFFFF' : '#171717';
  const subColor = bgDark ? '#8E8E93' : '#737373';
  const borderCol = bgDark ? '#2C2C2E' : '#E5E5E5';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750" fill="none">
    <defs>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg}"/>
        <stop offset="100%" stop-color="${bgDark ? '#1C1C1E' : '#F9F9F8'}"/>
      </linearGradient>
    </defs>
    
    <!-- Outer Container -->
    <rect width="1200" height="750" fill="${borderCol}" rx="12"/>
    <rect x="1" y="1" width="1198" height="748" fill="${bg}" rx="11"/>

    <!-- Browser Bar -->
    <rect width="1200" height="48" fill="${bgDark ? '#1C1C1E' : '#F3F3F1'}" rx="11"/>
    <path d="M0 36H1200V48H0z" fill="${bgDark ? '#1C1C1E' : '#F3F3F1'}"/>
    <line x1="0" y1="48" x2="1200" y2="48" stroke="${borderCol}" stroke-width="1"/>
    
    <!-- Window Controls -->
    <circle cx="28" cy="24" r="6" fill="#FF5F56"/>
    <circle cx="48" cy="24" r="6" fill="#FFBD2E"/>
    <circle cx="68" cy="24" r="6" fill="#27C93F"/>

    <!-- URL Bar -->
    <rect x="120" y="12" width="480" height="24" rx="6" fill="${bgDark ? '#2C2C2E' : '#FFFFFF'}" stroke="${borderCol}" stroke-width="1"/>
    <circle cx="136" cy="24" r="3" fill="#315EFB"/>
    <text x="148" y="28" font-family="'Inter', sans-serif" font-size="11" fill="${subColor}" font-weight="500">https://${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.com</text>

    <!-- Tag Indicator -->
    <rect x="1050" y="12" width="120" height="24" rx="4" fill="${accent}15"/>
    <text x="1110" y="28" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="${accent}" text-anchor="middle">${tag}</text>

    <!-- Main Content Area -->
    <g transform="translate(0, 48)">
      ${contentSvg}
    </g>
  </svg>`;
}

const projects = [
  {
    file: 'restaurant-website.svg',
    title: 'culina-atelier',
    tag: 'Dynamic Website',
    accent: '#B8860B',
    bgDark: true,
    contentSvg: `
      <rect width="1200" height="702" fill="#0E0D0C"/>
      <!-- Header -->
      <text x="80" y="60" font-family="'Manrope', sans-serif" font-weight="800" font-size="22" fill="#FFFFFF" letter-spacing="0.1em">CULINA ATELIER</text>
      <text x="800" y="58" font-family="'Inter', sans-serif" font-size="13" fill="#A89F91">DINING &bull; TASTING &bull; PRIVATE CELLAR &bull; RESERVE</text>
      <line x1="80" y1="84" x2="1120" y2="84" stroke="#2D2823" stroke-width="1"/>
      
      <!-- Hero Section -->
      <text x="80" y="170" font-family="'Inter', sans-serif" font-weight="600" font-size="13" fill="#B8860B" letter-spacing="0.15em">SUMMER TASTING COLLECTION</text>
      <text x="80" y="240" font-family="'Manrope', sans-serif" font-weight="700" font-size="52" fill="#F4EFEA" letter-spacing="-0.02em">Sensory Gastronomy</text>
      <text x="80" y="300" font-family="'Manrope', sans-serif" font-weight="700" font-size="52" fill="#B8860B" font-style="italic">Rooted in Heritage.</text>
      
      <text x="80" y="360" font-family="'Inter', sans-serif" font-size="16" fill="#A89F91" width="460">
        Twelve curated courses inspired by coastal foraging and seasonal harvest. Reserve your evening table.
      </text>

      <!-- Action Button -->
      <rect x="80" y="400" width="180" height="46" rx="4" fill="#B8860B"/>
      <text x="170" y="428" font-family="'Inter', sans-serif" font-weight="600" font-size="13" fill="#0E0D0C" text-anchor="middle" letter-spacing="0.05em">REQUEST TABLE</text>

      <!-- Visual Card -->
      <rect x="680" y="130" width="440" height="490" rx="8" fill="#1C1A17" stroke="#332F2A"/>
      <circle cx="900" cy="340" r="140" fill="#24211D" stroke="#B8860B" stroke-dasharray="4 4" stroke-width="1.5"/>
      <circle cx="900" cy="340" r="90" fill="#312B24"/>
      <text x="900" y="346" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#F4EFEA" text-anchor="middle">SEASON 08</text>
      <text x="900" y="375" font-family="'Inter', sans-serif" font-size="12" fill="#B8860B" text-anchor="middle" letter-spacing="0.1em">NOW SERVING</text>
      
      <!-- Bottom Highlights -->
      <rect x="80" y="520" width="260" height="100" rx="6" fill="#181614" stroke="#2A2520"/>
      <text x="100" y="555" font-family="'Inter', sans-serif" font-size="12" fill="#887E72">MICHELIN GUIDE</text>
      <text x="100" y="585" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#FFFFFF">Two Stars 2024</text>
      
      <rect x="360" y="520" width="260" height="100" rx="6" fill="#181614" stroke="#2A2520"/>
      <text x="380" y="555" font-family="'Inter', sans-serif" font-size="12" fill="#887E72">WINE SPECTATOR</text>
      <text x="380" y="585" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#FFFFFF">Grand Award</text>
    `
  },
  {
    file: 'architecture-studio.svg',
    title: 'kanso-spatial',
    tag: 'Static Website',
    accent: '#315EFB',
    bgDark: false,
    contentSvg: `
      <rect width="1200" height="702" fill="#F7F7F5"/>
      <!-- Header -->
      <text x="80" y="60" font-family="'Manrope', sans-serif" font-weight="800" font-size="20" fill="#171717" letter-spacing="0.05em">KANSO ARCHITECTS</text>
      <text x="840" y="58" font-family="'Inter', sans-serif" font-size="13" fill="#737373">WORKS &bull; PHILOSOPHY &bull; ARCHIVE &bull; CONTACT</text>
      <line x1="80" y1="84" x2="1120" y2="84" stroke="#E5E5E5" stroke-width="1"/>

      <!-- Editorial Grid Layout -->
      <text x="80" y="150" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#737373" letter-spacing="0.1em">PROJECT 024 / KYOTO RESIDENCE</text>
      <text x="80" y="210" font-family="'Manrope', sans-serif" font-weight="800" font-size="48" fill="#171717" letter-spacing="-0.03em">Reduction to Essence.</text>

      <rect x="80" y="260" width="600" height="380" fill="#EBEBEA" rx="4"/>
      <line x1="120" y1="320" x2="620" y2="580" stroke="#D1D1D0" stroke-width="2"/>
      <line x1="120" y1="580" x2="620" y2="320" stroke="#D1D1D0" stroke-width="2"/>
      <rect x="200" y="340" width="360" height="220" fill="#DCDCDA" stroke="#B8B8B6"/>
      <text x="380" y="455" font-family="'Manrope', sans-serif" font-size="16" font-weight="600" fill="#555" text-anchor="middle">CANTILEVER STRUCTURE &bull; REINFORCED CONCRETE</text>

      <!-- Right column details -->
      <rect x="720" y="260" width="400" height="180" fill="#FFFFFF" rx="4" stroke="#E5E5E5"/>
      <text x="750" y="300" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#315EFB">MATERIALITY</text>
      <text x="750" y="335" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#171717">Hand-cast White Ash &amp; Basalt</text>
      <text x="750" y="375" font-family="'Inter', sans-serif" font-size="14" fill="#737373">Harmonizing internal courtyard shadows with seasonal zenith illumination.</text>

      <rect x="720" y="460" width="400" height="180" fill="#FFFFFF" rx="4" stroke="#E5E5E5"/>
      <text x="750" y="500" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#171717">SPECIFICATION</text>
      <text x="750" y="535" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#171717">620 m&sup2; Gross Floor Area</text>
      <text x="750" y="575" font-family="'Inter', sans-serif" font-size="14" fill="#737373">Completed Spring 2024 &bull; Global Architecture Award Winner</text>
    `
  },
  {
    file: 'roasters-ecommerce.svg',
    title: 'lumina-roasters',
    tag: 'E-Commerce',
    accent: '#EA580C',
    bgDark: false,
    contentSvg: `
      <rect width="1200" height="702" fill="#FFFFFF"/>
      <!-- Header -->
      <text x="80" y="60" font-family="'Manrope', sans-serif" font-weight="800" font-size="22" fill="#171717" letter-spacing="0.05em">LUMINA ROASTERS</text>
      <text x="740" y="58" font-family="'Inter', sans-serif" font-size="13" fill="#737373">COFFEES &bull; SUBSCRIPTIONS &bull; BREW GEAR &bull; ROAST LAB</text>
      <rect x="1040" y="38" width="80" height="32" rx="16" fill="#171717"/>
      <text x="1080" y="58" font-family="'Inter', sans-serif" font-size="12" fill="#FFFFFF" text-anchor="middle">CART (3)</text>
      <line x1="80" y1="84" x2="1120" y2="84" stroke="#F0F0EE" stroke-width="1"/>

      <!-- Promo Banner -->
      <rect x="80" y="104" width="1040" height="40" rx="4" fill="#FFF7ED"/>
      <text x="600" y="128" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#EA580C" text-anchor="middle">
        AUTUMN HARVEST: ETHIOPIAN YIRGACHEFFE GRADE 1 NOW ROASTING &bull; COMPLIMENTARY SHIPPING
      </text>

      <!-- Product Showcase Cards -->
      <g transform="translate(80, 160)">
        <!-- Card 1 -->
        <rect width="320" height="480" rx="6" fill="#FBFBFA" stroke="#EAEAEA"/>
        <rect x="20" y="20" width="280" height="260" rx="4" fill="#F4EFE6"/>
        <circle cx="160" cy="150" r="70" fill="#D4A373"/>
        <text x="160" y="156" font-family="'Manrope', sans-serif" font-weight="800" font-size="18" fill="#FFF" text-anchor="middle">GUJI HIGHLAND</text>
        <text x="24" y="320" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#EA580C">LIGHT ROAST</text>
        <text x="24" y="348" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#171717">Ethiopia Bensa Washed</text>
        <text x="24" y="375" font-family="'Inter', sans-serif" font-size="13" fill="#737373">Bergamot, Jasmine, White Peach</text>
        <text x="24" y="440" font-family="'Manrope', sans-serif" font-weight="800" font-size="20" fill="#171717">$24.00</text>
        <rect x="180" y="415" width="120" height="38" rx="4" fill="#171717"/>
        <text x="240" y="438" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#FFF" text-anchor="middle">ADD TO CART</text>

        <!-- Card 2 -->
        <g transform="translate(360, 0)">
          <rect width="320" height="480" rx="6" fill="#FBFBFA" stroke="#EAEAEA"/>
          <rect x="20" y="20" width="280" height="260" rx="4" fill="#E8EDEA"/>
          <circle cx="160" cy="150" r="70" fill="#588157"/>
          <text x="160" y="156" font-family="'Manrope', sans-serif" font-weight="800" font-size="18" fill="#FFF" text-anchor="middle">HUILA SPECIALTY</text>
          <text x="24" y="320" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#588157">MEDIUM ROAST</text>
          <text x="24" y="348" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#171717">Colombia Pink Bourbon</text>
          <text x="24" y="375" font-family="'Inter', sans-serif" font-size="13" fill="#737373">Papaya, Cane Sugar, Cacao</text>
          <text x="24" y="440" font-family="'Manrope', sans-serif" font-weight="800" font-size="20" fill="#171717">$26.50</text>
          <rect x="180" y="415" width="120" height="38" rx="4" fill="#171717"/>
          <text x="240" y="438" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#FFF" text-anchor="middle">ADD TO CART</text>
        </g>

        <!-- Card 3 -->
        <g transform="translate(720, 0)">
          <rect width="320" height="480" rx="6" fill="#FBFBFA" stroke="#EAEAEA"/>
          <rect x="20" y="20" width="280" height="260" rx="4" fill="#ECEAF0"/>
          <circle cx="160" cy="150" r="70" fill="#6A4C93"/>
          <text x="160" y="156" font-family="'Manrope', sans-serif" font-weight="800" font-size="18" fill="#FFF" text-anchor="middle">EL PARAISO</text>
          <text x="24" y="320" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#6A4C93">ANAEROBIC</text>
          <text x="24" y="348" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#171717">Diego Bermudez Lychee</text>
          <text x="24" y="375" font-family="'Inter', sans-serif" font-size="13" fill="#737373">Red Fruit, Lychee, Sparkling Rose</text>
          <text x="24" y="440" font-family="'Manrope', sans-serif" font-weight="800" font-size="20" fill="#171717">$32.00</text>
          <rect x="180" y="415" width="120" height="38" rx="4" fill="#171717"/>
          <text x="240" y="438" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#FFF" text-anchor="middle">ADD TO CART</text>
        </g>
      </g>
    `
  },
  {
    file: 'logistics-webapp.svg',
    title: 'strata-fleet',
    tag: 'Web Application',
    accent: '#059669',
    bgDark: true,
    contentSvg: `
      <rect width="1200" height="702" fill="#0F172A"/>
      <!-- Header -->
      <rect width="1200" height="60" fill="#1E293B"/>
      <text x="40" y="36" font-family="'Manrope', sans-serif" font-weight="800" font-size="18" fill="#38BDF8">STRATA FLEET &bull; TELEMETRICS</text>
      <rect x="940" y="16" width="100" height="28" rx="14" fill="#059669" fill-opacity="0.2"/>
      <circle cx="956" cy="30" r="4" fill="#10B981"/>
      <text x="968" y="34" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#34D399">ONLINE: 412</text>
      <circle cx="1140" cy="30" r="16" fill="#334155"/>
      <text x="1140" y="35" font-family="'Inter', sans-serif" font-size="12" fill="#FFF" text-anchor="middle">OP</text>

      <!-- Sidebar -->
      <rect y="60" width="220" height="642" fill="#111827"/>
      <text x="30" y="100" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#64748B">ACTIVE CHANNELS</text>
      <rect x="20" y="120" width="180" height="36" rx="4" fill="#1E293B"/>
      <text x="40" y="142" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#38BDF8">&bull; Live Telemetry</text>
      <text x="40" y="186" font-family="'Inter', sans-serif" font-size="13" fill="#94A3B8">Route Optimization</text>
      <text x="40" y="226" font-family="'Inter', sans-serif" font-size="13" fill="#94A3B8">Digital Manifests</text>
      <text x="40" y="266" font-family="'Inter', sans-serif" font-size="13" fill="#94A3B8">Asset Telematics</text>
      <text x="40" y="306" font-family="'Inter', sans-serif" font-size="13" fill="#94A3B8">Compliance Logs</text>

      <!-- Main Dash -->
      <g transform="translate(240, 80)">
        <!-- Stat Cards -->
        <rect width="220" height="100" rx="6" fill="#1E293B" stroke="#334155"/>
        <text x="20" y="34" font-family="'Inter', sans-serif" font-size="12" fill="#94A3B8">TRANSIT COMPLETION</text>
        <text x="20" y="70" font-family="'Manrope', sans-serif" font-weight="800" font-size="28" fill="#F8FAFC">99.4%</text>

        <rect x="240" width="220" height="100" rx="6" fill="#1E293B" stroke="#334155"/>
        <text x="260" y="34" font-family="'Inter', sans-serif" font-size="12" fill="#94A3B8">ACTIVE SHIPMENTS</text>
        <text x="260" y="70" font-family="'Manrope', sans-serif" font-weight="800" font-size="28" fill="#38BDF8">1,842</text>

        <rect x="480" width="220" height="100" rx="6" fill="#1E293B" stroke="#334155"/>
        <text x="500" y="34" font-family="'Inter', sans-serif" font-size="12" fill="#94A3B8">SYSTEM LATENCY</text>
        <text x="500" y="70" font-family="'Manrope', sans-serif" font-weight="800" font-size="28" fill="#34D399">18ms</text>

        <rect x="720" width="200" height="100" rx="6" fill="#1E293B" stroke="#334155"/>
        <text x="740" y="34" font-family="'Inter', sans-serif" font-size="12" fill="#94A3B8">FLEET EFFICIENCY</text>
        <text x="740" y="70" font-family="'Manrope', sans-serif" font-weight="800" font-size="28" fill="#A855F7">+14.2%</text>

        <!-- Simulated Map / Graph Interface -->
        <rect y="120" width="920" height="460" rx="6" fill="#1E293B" stroke="#334155"/>
        <path d="M40 380 Q 200 240, 400 320 T 800 180" fill="none" stroke="#38BDF8" stroke-width="4"/>
        <path d="M40 420 Q 240 380, 500 400 T 860 260" fill="none" stroke="#34D399" stroke-width="3" stroke-dasharray="6 6"/>
        <circle cx="400" cy="320" r="8" fill="#38BDF8"/>
        <rect x="340" y="270" width="120" height="32" rx="4" fill="#0F172A" stroke="#38BDF8"/>
        <text x="400" y="290" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="#FFF" text-anchor="middle">TRUCK-729 &bull; EN ROUTE</text>

        <circle cx="800" cy="180" r="8" fill="#34D399"/>
        <rect x="740" y="130" width="120" height="32" rx="4" fill="#0F172A" stroke="#34D399"/>
        <text x="800" y="150" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="#FFF" text-anchor="middle">HUB-BERLIN &bull; CLEAR</text>
      </g>
    `
  },
  {
    file: 'fintech-portal.svg',
    title: 'verve-capital',
    tag: 'Dynamic Website',
    accent: '#315EFB',
    bgDark: false,
    contentSvg: `
      <rect width="1200" height="702" fill="#FAFAFA"/>
      <text x="80" y="60" font-family="'Manrope', sans-serif" font-weight="800" font-size="20" fill="#171717">VERVE CAPITAL MANAGEMENT</text>
      <text x="780" y="58" font-family="'Inter', sans-serif" font-size="13" fill="#737373">INSIGHTS &bull; MANDATES &bull; LEADERSHIP &bull; VAULT</text>
      <line x1="80" y1="84" x2="1120" y2="84" stroke="#E5E5E5" stroke-width="1"/>

      <text x="80" y="170" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#315EFB" letter-spacing="0.1em">INSTITUTIONAL ASSET MANAGEMENT</text>
      <text x="80" y="240" font-family="'Manrope', sans-serif" font-weight="800" font-size="44" fill="#171717">Fiduciary Stewardship for Generational Wealth.</text>
      <text x="80" y="290" font-family="'Inter', sans-serif" font-size="16" fill="#737373" width="700">Advising endowments, family offices, and institutions across cross-border private equity and liquid credit.</text>

      <rect x="80" y="340" width="480" height="280" rx="8" fill="#FFFFFF" stroke="#E5E5E5"/>
      <text x="110" y="380" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#315EFB">Q3 2024 MACRO PERSPECTIVE</text>
      <text x="110" y="420" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#171717">Liquidity Shifts in Sovereign Debt Markets</text>
      <text x="110" y="460" font-family="'Inter', sans-serif" font-size="14" fill="#737373">An analysis of central bank trajectory and yield curve normalization across G10 economies.</text>
      <rect x="110" y="520" width="140" height="38" rx="4" fill="#171717"/>
      <text x="180" y="544" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#FFF" text-anchor="middle">READ BRIEF</text>

      <rect x="600" y="340" width="480" height="280" rx="8" fill="#FFFFFF" stroke="#E5E5E5"/>
      <text x="630" y="380" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#10B981">GLOBAL MANDATES</text>
      <text x="630" y="420" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#171717">$4.2B Assets Under Advisory</text>
      <line x1="630" y1="480" x2="1020" y2="480" stroke="#F0F0F0"/>
      <text x="630" y="530" font-family="'Inter', sans-serif" font-size="13" fill="#737373">Regulated by FINMA &amp; SEC &bull; Zurich &bull; London &bull; Singapore</text>
    `
  },
  {
    file: 'fitness-app.svg',
    title: 'apex-performance',
    tag: 'Web Application',
    accent: '#8B5CF6',
    bgDark: true,
    contentSvg: `
      <rect width="1200" height="702" fill="#13111C"/>
      <rect width="1200" height="60" fill="#1C182B"/>
      <text x="40" y="36" font-family="'Manrope', sans-serif" font-weight="800" font-size="18" fill="#A78BFA">APEX PERFORMANCE LAB</text>
      <text x="880" y="36" font-family="'Inter', sans-serif" font-size="12" fill="#DDD6FE">WELCOME BACK, ELENA &bull; ATHLETE ID #892</text>

      <g transform="translate(60, 90)">
        <rect width="1080" height="120" rx="8" fill="#201B33" stroke="#362E54"/>
        <text x="40" y="44" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#A78BFA">CURRENT CYCLE</text>
        <text x="40" y="80" font-family="'Manrope', sans-serif" font-weight="800" font-size="26" fill="#FFF">Hypertrophy &amp; Neuromuscular Efficiency &bull; Week 4 of 12</text>
        <rect x="880" y="40" width="160" height="42" rx="4" fill="#8B5CF6"/>
        <text x="960" y="66" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#FFF" text-anchor="middle">BOOK SESSION</text>

        <!-- Weekly Grid -->
        <rect y="150" width="680" height="420" rx="8" fill="#1C182B" stroke="#2C2644"/>
        <text x="30" y="190" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#FFF">Biometric Output &bull; VO2 Max &amp; Power</text>
        <path d="M40 480 Q 200 340, 360 400 T 640 280" fill="none" stroke="#A78BFA" stroke-width="4"/>
        <circle cx="640" cy="280" r="6" fill="#DDD6FE"/>
        <text x="640" y="260" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#FFF" text-anchor="middle">PEAK 54.2 ml/kg</text>

        <!-- Trainer Notes -->
        <rect x="710" y="150" width="370" height="420" rx="8" fill="#1C182B" stroke="#2C2644"/>
        <text x="740" y="190" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#FFF">Trainer Direct Dispatch</text>
        <rect x="740" y="220" width="310" height="120" rx="6" fill="#26213B"/>
        <text x="760" y="250" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#A78BFA">COACH MARCUS &bull; 08:30 AM</text>
        <text x="760" y="280" font-family="'Inter', sans-serif" font-size="13" fill="#DDD6FE">Rest interval maintained below 75s. Eccentric tempo was flawless today.</text>
      </g>
    `
  },
  {
    file: 'furniture-ecommerce.svg',
    title: 'nordic-atelier',
    tag: 'E-Commerce',
    accent: '#0D9488',
    bgDark: false,
    contentSvg: `
      <rect width="1200" height="702" fill="#F8F8F7"/>
      <text x="80" y="60" font-family="'Manrope', sans-serif" font-weight="800" font-size="20" fill="#171717">NORDIC LIVING ATELIER</text>
      <text x="800" y="58" font-family="'Inter', sans-serif" font-size="13" fill="#737373">FURNITURE &bull; LIGHTING &bull; OBJECTS &bull; ARCHITECTS</text>
      <line x1="80" y1="84" x2="1120" y2="84" stroke="#E5E5E5" stroke-width="1"/>

      <g transform="translate(80, 120)">
        <rect width="640" height="500" rx="8" fill="#FFFFFF" stroke="#EAEAE8"/>
        <rect x="40" y="40" width="560" height="340" rx="6" fill="#ECECE9"/>
        <ellipse cx="320" cy="220" rx="180" ry="80" fill="#D3D3CE"/>
        <rect x="220" y="130" width="200" height="90" rx="12" fill="#BA9E82"/>
        <text x="320" y="180" font-family="'Manrope', sans-serif" font-weight="700" font-size="16" fill="#FFF" text-anchor="middle">SOREN LOUNGE CHAIR</text>
        <text x="40" y="420" font-family="'Manrope', sans-serif" font-weight="800" font-size="22" fill="#171717">The Soren Lounge Chair in Natural Ash</text>
        <text x="40" y="450" font-family="'Inter', sans-serif" font-size="14" fill="#737373">Handwoven paper cord seat &bull; FSC-certified solid Scandinavian oak &bull; &euro;1,420</text>

        <rect x="680" width="360" height="500" rx="8" fill="#FFFFFF" stroke="#EAEAE8"/>
        <text x="710" y="50" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#171717">Material Customization</text>
        <text x="710" y="80" font-family="'Inter', sans-serif" font-size="12" fill="#737373">Select Wood Finish</text>
        <circle cx="730" cy="115" r="15" fill="#D8C4B6" stroke="#171717" stroke-width="2"/>
        <circle cx="775" cy="115" r="15" fill="#8D7B68"/>
        <circle cx="820" cy="115" r="15" fill="#2E282A"/>

        <text x="710" y="180" font-family="'Inter', sans-serif" font-size="12" fill="#737373">Select Textile Upholstery</text>
        <rect x="710" y="200" width="300" height="44" rx="4" fill="#F4F4F2" stroke="#0D9488"/>
        <text x="730" y="228" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#171717">Kvadrat Fiord Wool 0251</text>

        <rect x="710" y="420" width="300" height="46" rx="4" fill="#171717"/>
        <text x="860" y="448" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#FFF" text-anchor="middle">ADD TO QUOTE / BUY</text>
      </g>
    `
  },
  {
    file: 'concrete-static.svg',
    title: 'monolith-precast',
    tag: 'Static Website',
    accent: '#52525B',
    bgDark: true,
    contentSvg: `
      <rect width="1200" height="702" fill="#18181B"/>
      <text x="80" y="60" font-family="'Manrope', sans-serif" font-weight="800" font-size="20" fill="#F4F4F5" letter-spacing="0.1em">MONOLITH PRECAST &bull; FACADES</text>
      <text x="820" y="58" font-family="'Inter', sans-serif" font-size="13" fill="#A1A1AA">SYSTEMS &bull; CATALOG &bull; TESTING &bull; CONTACT</text>
      <line x1="80" y1="84" x2="1120" y2="84" stroke="#27272A" stroke-width="1"/>

      <g transform="translate(80, 130)">
        <text x="0" y="40" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#71717A" letter-spacing="0.2em">ARCHITECTURAL CONCRETE ENGINEERING</text>
        <text x="0" y="110" font-family="'Manrope', sans-serif" font-weight="800" font-size="48" fill="#FAFAFA">Ultra-High Performance Concrete</text>
        <text x="0" y="160" font-family="'Inter', sans-serif" font-size="16" fill="#A1A1AA">Precast structural envelopes achieving 180 MPa compressive tolerance with micro-silica matrix.</text>

        <rect y="210" width="340" height="300" rx="4" fill="#27272A"/>
        <text x="24" y="250" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#FFF">Aggregates &amp; Finishes</text>
        <text x="24" y="280" font-family="'Inter', sans-serif" font-size="13" fill="#A1A1AA">Acid-etched, basalt-aggregate matrix with water-repellent silane seal.</text>

        <rect x="360" y="210" width="340" height="300" rx="4" fill="#27272A"/>
        <text x="384" y="250" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#FFF">Thermal Performance</text>
        <text x="384" y="280" font-family="'Inter', sans-serif" font-size="13" fill="#A1A1AA">Integrated PIR insulation core with non-conductive GFRP connecting ties.</text>

        <rect x="720" y="210" width="320" height="300" rx="4" fill="#27272A"/>
        <text x="744" y="250" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#FFF">Technical CAD Download</text>
        <text x="744" y="280" font-family="'Inter', sans-serif" font-size="13" fill="#A1A1AA">Revit family files and BIM compliant specifications.</text>
        <rect x="744" y="440" width="160" height="38" rx="4" fill="#FAFAFA"/>
        <text x="824" y="464" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#18181B" text-anchor="middle">DOWNLOAD BIM</text>
      </g>
    `
  },
  // Gallery items
  {
    file: 'restaurant-gallery-1.svg',
    title: 'culina-menu-preview',
    tag: 'Dynamic Website',
    accent: '#B8860B',
    bgDark: true,
    contentSvg: `
      <rect width="1200" height="702" fill="#141312"/>
      <text x="80" y="80" font-family="'Manrope', sans-serif" font-weight="700" font-size="28" fill="#F4EFEA">Degustation Menu &bull; Summer Solstice</text>
      <rect x="80" y="120" width="1040" height="500" rx="8" fill="#1F1D1A" stroke="#332E27"/>
      <text x="120" y="180" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#B8860B">COURSE 01 &bull; AMUSE-BOUCHE</text>
      <text x="120" y="210" font-family="'Inter', sans-serif" font-size="15" fill="#D5CEC5">Smoked Sturgeon Caviar, Buckwheat Crisp, Cultured Yuzu Cream</text>
      <line x1="120" y1="240" x2="1080" y2="240" stroke="#2D2822"/>
      
      <text x="120" y="290" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#B8860B">COURSE 02 &bull; COLD ENTR&Eacute;E</text>
      <text x="120" y="320" font-family="'Inter', sans-serif" font-size="15" fill="#D5CEC5">Kobe Beef Tartare, Pickled Chanterelles, Fermented Mustard Seed</text>
      <line x1="120" y1="350" x2="1080" y2="350" stroke="#2D2822"/>

      <text x="120" y="400" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#B8860B">COURSE 03 &bull; POISSON</text>
      <text x="120" y="430" font-family="'Inter', sans-serif" font-size="15" fill="#D5CEC5">Glacier 51 Toothfish, Brown Butter Dashi, Charred Sea Leek</text>
      <line x1="120" y1="460" x2="1080" y2="460" stroke="#2D2822"/>

      <text x="120" y="510" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#B8860B">COURSE 04 &bull; VIANDE</text>
      <text x="120" y="540" font-family="'Inter', sans-serif" font-size="15" fill="#D5CEC5">Dry-Aged Duck Breast, Lavender Honey Glaze, Salsify Puree</text>
    `
  },
  {
    file: 'restaurant-gallery-2.svg',
    title: 'culina-wine-cellar',
    tag: 'Dynamic Website',
    accent: '#B8860B',
    bgDark: true,
    contentSvg: `
      <rect width="1200" height="702" fill="#141312"/>
      <text x="80" y="80" font-family="'Manrope', sans-serif" font-weight="700" font-size="28" fill="#F4EFEA">Private Cellar &bull; 1,400 Reference Reserve</text>
      <rect x="80" y="120" width="1040" height="500" rx="8" fill="#1F1D1A" stroke="#332E27"/>
      <text x="120" y="180" font-family="'Inter', sans-serif" font-size="14" fill="#B8860B">SOMMELIER CURATION</text>
      <text x="120" y="220" font-family="'Manrope', sans-serif" font-weight="700" font-size="22" fill="#FFF">Domaine de la Roman&eacute;e-Conti &bull; 2015 Vertical Collection</text>
      <text x="120" y="260" font-family="'Inter', sans-serif" font-size="14" fill="#A89F91">Temperature-controlled underground vault cellaring rare Burgundy, Bordeaux, and Piedmont vintages.</text>
    `
  },
  {
    file: 'arch-gallery-1.svg',
    title: 'kanso-plans',
    tag: 'Static Website',
    accent: '#315EFB',
    bgDark: false,
    contentSvg: `
      <rect width="1200" height="702" fill="#FFFFFF"/>
      <text x="80" y="80" font-family="'Manrope', sans-serif" font-weight="700" font-size="28" fill="#171717">Technical Blueprint &bull; Level 2 Elevation</text>
      <rect x="80" y="120" width="1040" height="500" rx="8" fill="#F7F7F5" stroke="#E5E5E5"/>
      <line x1="120" y1="200" x2="1000" y2="200" stroke="#315EFB" stroke-dasharray="8 8"/>
      <line x1="120" y1="360" x2="1000" y2="360" stroke="#315EFB" stroke-dasharray="8 8"/>
      <text x="120" y="230" font-family="'Inter', sans-serif" font-size="12" fill="#315EFB">+12.400 ROOF LEVEL</text>
      <text x="120" y="390" font-family="'Inter', sans-serif" font-size="12" fill="#315EFB">+04.200 HABITABLE FLOOR</text>
    `
  },
  {
    file: 'ecommerce-gallery-1.svg',
    title: 'lumina-subscription-funnel',
    tag: 'E-Commerce',
    accent: '#EA580C',
    bgDark: false,
    contentSvg: `
      <rect width="1200" height="702" fill="#FFFFFF"/>
      <text x="80" y="80" font-family="'Manrope', sans-serif" font-weight="700" font-size="28" fill="#171717">Interactive Subscription Customizer</text>
      <rect x="80" y="120" width="1040" height="500" rx="8" fill="#FAFAFA" stroke="#E5E5E5"/>
      <text x="140" y="180" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#EA580C">STEP 1: SELECT FREQUENCY</text>
      <rect x="140" y="210" width="240" height="80" rx="6" fill="#FFF" stroke="#EA580C" stroke-width="2"/>
      <text x="260" y="255" font-family="'Inter', sans-serif" font-weight="700" font-size="14" fill="#171717" text-anchor="middle">Every 2 Weeks (Save 15%)</text>
    `
  },
  {
    file: 'webapp-gallery-1.svg',
    title: 'strata-manifest-editor',
    tag: 'Web Application',
    accent: '#059669',
    bgDark: true,
    contentSvg: `
      <rect width="1200" height="702" fill="#0F172A"/>
      <text x="80" y="80" font-family="'Manrope', sans-serif" font-weight="700" font-size="28" fill="#38BDF8">Automated Freight Manifest Dispatcher</text>
      <rect x="80" y="120" width="1040" height="500" rx="8" fill="#1E293B" stroke="#334155"/>
      <text x="120" y="180" font-family="'Inter', sans-serif" font-size="14" fill="#34D399">ACTIVE WAYBILL #WB-90824 &bull; CLEARED</text>
      <text x="120" y="220" font-family="'Manrope', sans-serif" font-weight="700" font-size="20" fill="#FFF">Consignment: High-Precision Optical Sensors (14 Crates)</text>
    `
  }
];

projects.forEach(p => {
  const svg = createBrowserMockup(p);
  fs.writeFileSync(path.join(outDir, p.file), svg, 'utf-8');
  console.log(`Generated: ${p.file}`);
});
