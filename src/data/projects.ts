import { Project, ProjectCategory } from '../types/project';

/**
 * INPAND TECHNOLOGIES — CENTRALIZED PROJECT DATA REPOSITORY
 * 
 * To add a new project:
 * 1. Add your project object adhering to the Project interface below.
 * 2. Place thumbnails in /public/images/projects/
 * 3. Place preview videos in /public/videos/projects/
 * 4. Verify domain URLs and video assets before publishing.
 */
export const PROJECTS: Project[] = [
  {
    id: 'proj-01',
    title: 'Culina Atelier — Modern Culinary & Restaurant Experience',
    slug: 'restaurant-website',
    category: 'Dynamic Websites',
    description: 'An immersive digital reservation and dining showcase built for an artisanal contemporary restaurant, featuring live table inquiries, seasonal menu updates, and fluid storytelling.',
    thumbnail: '/images/projects/restaurant-website.svg',
    previewVideo: '/videos/projects/restaurant-preview.mp4',
    domain: 'https://culina-atelier.example.com',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Headless CMS'],
    featured: true,
    clientIndustry: 'Hospitality & Fine Dining',
    overview: 'Culina Atelier partnered with INPAND Technologies to engineer an online presence that mirrors their Michelin-caliber dining experience. We designed and built a bespoke website focusing on sensory visual hierarchy, smooth transitions, and a direct reservation enquiry funnel that converted high-intent diners into booked guests.',
    features: [
      'Dynamic seasonal menu synchronization with cellar pairings',
      'Integrated table reservation enquiry flow connected to WhatsApp & concierge',
      'Sub-second editorial transitions and responsive typography',
      'High-resolution imagery optimization with progressive loading'
    ],
    gallery: [
      '/images/projects/restaurant-website.svg',
      '/images/projects/restaurant-gallery-1.svg',
      '/images/projects/restaurant-gallery-2.svg',
    ],
    completionYear: '2024',
  },
  {
    id: 'proj-02',
    title: 'Kanso Spatial Design — Architecture Studio Showcase',
    slug: 'kanso-architectural-studio',
    category: 'Static Websites',
    description: 'A minimalist, editorial digital presence crafted for an award-winning architectural firm, emphasizing full-bleed photography, subtle typography, and zero-latency page transitions.',
    thumbnail: '/images/projects/architecture-studio.svg',
    previewVideo: '/videos/projects/architecture-preview.mp4',
    domain: 'https://kanso-spaces.example.com',
    technologies: ['Astro', 'Tailwind CSS', 'TypeScript', 'Vite'],
    featured: true,
    clientIndustry: 'Architecture & Spatial Design',
    overview: 'Engineered to deliver unmatched visual clarity and lightning-fast loading speeds across global devices. Our static architecture minimizes server overhead while maximizing editorial impact, presenting structural case studies with architectural precision.',
    features: [
      'Zero-layout-shift image presentation for high-res blueprint photography',
      'Structural project filter by material, topography, and typology',
      'Minimalist monochrome aesthetic aligned with client architectural ethos',
      'Perfect 100/100 Core Web Vitals score on mobile and desktop'
    ],
    gallery: [
      '/images/projects/architecture-studio.svg',
      '/images/projects/arch-gallery-1.svg',
    ],
    completionYear: '2024',
  },
  {
    id: 'proj-03',
    title: 'Lumina Specialty Roasters — Direct-to-Consumer Flagship',
    slug: 'lumina-specialty-roasters',
    category: 'E-Commerce',
    description: 'A bespoke direct-to-consumer e-commerce storefront for single-origin coffee roasters, featuring custom bean subscriptions, roast-level filtering, and an ultra-lean checkout funnel.',
    thumbnail: '/images/projects/roasters-ecommerce.svg',
    previewVideo: '/videos/projects/ecommerce-preview.mp4',
    domain: 'https://lumina-roasters.example.com',
    technologies: ['React', 'Shopify Storefront API', 'Tailwind CSS', 'Stripe'],
    featured: true,
    clientIndustry: 'Retail & Specialty Coffee',
    overview: 'Built to transition a boutique roastery into a nationwide direct-to-consumer brand. We developed an intuitive coffee selector quiz, recurring subscription options, and seamless mobile purchasing that increased checkout conversion by 42%.',
    features: [
      'Interactive roast-level & tasting note profile selector',
      'Flexible recurring subscription schedule (weekly, bi-weekly, monthly)',
      'Optimized one-page slide cart with instant shipping estimation',
      'Mobile-first checkout experience with Apple Pay & Google Pay'
    ],
    gallery: [
      '/images/projects/roasters-ecommerce.svg',
      '/images/projects/ecommerce-gallery-1.svg',
    ],
    completionYear: '2024',
  },
  {
    id: 'proj-04',
    title: 'Strata Global Fleet — Enterprise Logistics Web Application',
    slug: 'strata-logistics-platform',
    category: 'Web Applications',
    description: 'A high-performance enterprise web application for real-time freight tracking, route optimization, driver allocation, and automated manifest generation.',
    thumbnail: '/images/projects/logistics-webapp.svg',
    previewVideo: '/videos/projects/webapp-preview.mp4',
    domain: 'https://strata-fleet.example.com',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Chart.js'],
    featured: true,
    clientIndustry: 'Logistics & Supply Chain',
    overview: 'A cloud-based web application tailored for cross-border logistics operators. Replaced legacy spreadsheet tracking with a unified real-time dashboard delivering instant route analytics and telematics monitoring across 400+ active transit vehicles.',
    features: [
      'Live GPS fleet telemetry dashboard with interactive route maps',
      'Automated digital freight manifest generation and PDF dispatch',
      'Sub-second WebSocket status feeds for vehicle temperature and fuel metrics',
      'Role-based access controls for dispatchers, fleet captains, and clients'
    ],
    gallery: [
      '/images/projects/logistics-webapp.svg',
      '/images/projects/webapp-gallery-1.svg',
    ],
    completionYear: '2024',
  },
  {
    id: 'proj-05',
    title: 'Verve Private Wealth — Corporate Advisory Portal',
    slug: 'verve-fintech-advisory',
    category: 'Dynamic Websites',
    description: 'A secure, dynamic corporate advisory website for an institutional asset management firm, featuring market commentary feeds, compliance disclosures, and an encrypted appointment scheduler.',
    thumbnail: '/images/projects/fintech-portal.svg',
    previewVideo: '/videos/projects/fintech-preview.mp4',
    domain: 'https://verve-capital.example.com',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS'],
    featured: false,
    clientIndustry: 'Financial Advisory & Capital',
    overview: 'Crafted to establish trust and institutional prestige for high-net-worth clients. Features live market insights, regulatory disclosures, and responsive advisory consultation scheduling that integrates directly with partner calendars.',
    features: [
      'Weekly market commentary blog engine with audio readouts',
      'Interactive risk-tolerance portfolio projection tool',
      'Automated regulatory compliance archive and document vault',
      'Direct WhatsApp and email consultation booking channels'
    ],
    gallery: [
      '/images/projects/fintech-portal.svg',
    ],
    completionYear: '2023',
  },
  {
    id: 'proj-06',
    title: 'Apex Performance Lab — Member Portal & Booking App',
    slug: 'apex-performance-lab',
    category: 'Web Applications',
    description: 'A responsive client booking and wellness tracking web app featuring session scheduling, trainer assignment, biometric telemetry logs, and membership passes.',
    thumbnail: '/images/projects/fitness-app.svg',
    previewVideo: '/videos/projects/fitness-preview.mp4',
    domain: 'https://apex-performance.example.com',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    featured: false,
    clientIndustry: 'Sports Science & Wellness',
    overview: 'Engineered for an elite private performance training facility. Gives athletes quick access to session bookings, recovery metrics, and direct coach feedback via an ultra-responsive web application.',
    features: [
      'Interactive 7-day session booking grid with real-time capacity locks',
      'Trainer assignment and biometric workout metric logging',
      'Digital Apple Wallet & Google Wallet pass integration',
      'Dark mode customized interface for low-light gym environments'
    ],
    gallery: [
      '/images/projects/fitness-app.svg',
    ],
    completionYear: '2024',
  },
  {
    id: 'proj-07',
    title: 'Nordic Living Atelier — Scandinavian Furniture Store',
    slug: 'nordic-furnishings-store',
    category: 'E-Commerce',
    description: 'A premium minimalist online furniture showcase featuring interactive 360-degree product views, fabric customization swatch selector, and modular room builder.',
    thumbnail: '/images/projects/furniture-ecommerce.svg',
    previewVideo: '/videos/projects/furniture-preview.mp4',
    domain: 'https://nordic-atelier.example.com',
    technologies: ['React', 'Shopify Plus', 'Tailwind CSS', 'Three.js'],
    featured: false,
    clientIndustry: 'Interior Decor & Furniture',
    overview: 'Crafted for a luxury Scandinavian interior brand to provide customers with a tactile digital shopping journey including 3D model visualization and custom upholstery selection before checkout.',
    features: [
      'Dynamic fabric swatch selector updating 3D textures in real time',
      'Curated lookbooks with direct click-to-cart tagging',
      'Automated freight delivery estimation by postal code',
      'Architect and interior designer trade account registration'
    ],
    gallery: [
      '/images/projects/furniture-ecommerce.svg',
    ],
    completionYear: '2023',
  },
  {
    id: 'proj-08',
    title: 'Monolith Precast — Architectural Facade Static Showcase',
    slug: 'monolith-concrete-works',
    category: 'Static Websites',
    description: 'A raw, brutalist architectural website showcasing prefabricated concrete installations and structural facade engineering with high-fidelity texture previews.',
    thumbnail: '/images/projects/concrete-static.svg',
    previewVideo: '/videos/projects/concrete-preview.mp4',
    domain: 'https://monolith-precast.example.com',
    technologies: ['HTML5', 'Vite', 'Tailwind CSS', 'TypeScript'],
    featured: false,
    clientIndustry: 'Heavy Construction & Civil Works',
    overview: 'A stark, sculptural static showcase highlighting the engineering precision of precast architectural concrete. Features zero bloated dependencies and achieves a perfect 100 PageSpeed score.',
    features: [
      'High-resolution architectural texture zoom and specimen gallery',
      'Engineering load specification data sheets and downloadable blueprints',
      'Chronological case studies of metropolitan facade projects',
      'Zero JavaScript overhead for instant mobile rendering'
    ],
    gallery: [
      '/images/projects/concrete-static.svg',
    ],
    completionYear: '2023',
  },
];

/**
 * Helper to get project counts by category calculated from actual data
 */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {
    'All Projects': PROJECTS.length,
    'Static Websites': 0,
    'Dynamic Websites': 0,
    'E-Commerce': 0,
    'Web Applications': 0,
  };

  PROJECTS.forEach((p) => {
    if (counts[p.category] !== undefined) {
      counts[p.category] += 1;
    }
  });

  return counts;
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

/**
 * Get related projects (same category or featured, excluding current project)
 */
export function getRelatedProjects(currentSlug: string, category: ProjectCategory, limit = 2): Project[] {
  return PROJECTS
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (a.category === category ? -1 : (b.category === category ? 1 : 0)))
    .slice(0, limit);
}
