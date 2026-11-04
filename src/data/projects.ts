import { Project } from '../types/project';
import { PROJECT_CATEGORIES } from './categories';

/**
 * INPAND TECHNOLOGIES — OFFICIAL CLIENT & COMPANY PORTFOLIO PROJECTS
 * 
 * 13 production websites delivered by INPAND Technologies.
 * Each entry maps to an actual website screenshot, verified client domain,
 * official business category, website classification, and factual description.
 */
export const PROJECTS: Project[] = [
  {
    id: 'proj-01',
    slug: 'mei-alai',
    title: 'Mei Alai',
    category: 'Media & Entertainment',
    websiteType: 'Dynamic',
    categories: ['Dynamic Websites', 'Media & Entertainment'],
    shortDescription: 'A digital media platform designed to present television content, entertainment programs and media-related information through an accessible online experience.',
    thumbnail: '/images/projects/mei-alai-thumb.webp',
    fullScreenshot: '/images/projects/mei-alai.png',
    domain: 'https://www.meialai.com/',
    featured: true,
  },
  {
    id: 'proj-02',
    slug: 'namma-jilla',
    title: 'Namma Jilla',
    category: 'E-commerce / Local Platform',
    websiteType: 'E-commerce',
    categories: ['E-commerce', 'Business & Services'],
    shortDescription: 'A digital platform focused on connecting local businesses, products and customers through an accessible online marketplace experience.',
    thumbnail: '/images/projects/namma-jilla-thumb.webp',
    fullScreenshot: '/images/projects/namma-jilla.png',
    domain: 'https://www.nammajilla.com/',
    featured: true,
  },
  {
    id: 'proj-03',
    slug: 'mei-alai-sports',
    title: 'Mei Alai Sports',
    category: 'Sports Platform',
    websiteType: 'Dynamic / Hybrid',
    categories: ['Dynamic Websites', 'Hybrid Websites', 'Media & Entertainment'],
    shortDescription: 'A sports-focused digital platform designed to bring sports content, fixtures, updates and community engagement together.',
    thumbnail: '/images/projects/mei-alai-sports-thumb.webp',
    fullScreenshot: '/images/projects/mei-alai-sports.png',
    domain: 'https://meialaisports.com/',
    featured: false,
  },
  {
    id: 'proj-04',
    slug: 'nizhal-visuals',
    title: 'Nizhal Visuals',
    category: 'Photography & Visual Media',
    websiteType: 'Static / Hybrid',
    categories: ['Static Websites', 'Hybrid Websites', 'Media & Entertainment', 'Business & Services'],
    shortDescription: 'A creative portfolio website presenting photography, cinematography and visual storytelling services with an elegant gallery experience.',
    thumbnail: '/images/projects/nizhal-visuals-thumb.webp',
    fullScreenshot: '/images/projects/nizhal-visuals.png',
    domain: 'https://www.nizhalvisuals.com/',
    featured: true,
  },
  {
    id: 'proj-05',
    slug: 'moonlight-enterprises',
    title: 'Moonlight Enterprises',
    category: 'Business / E-commerce',
    websiteType: 'E-commerce',
    categories: ['E-commerce', 'Business & Services'],
    shortDescription: 'A business-oriented digital platform designed to showcase products and services and provide customers with an online business interaction experience.',
    thumbnail: '/images/projects/moonlight-enterprises-thumb.webp',
    fullScreenshot: '/images/projects/moonlight-enterprises.png',
    domain: 'https://moonlightenterprises.co.in/',
    featured: false,
  },
  {
    id: 'proj-06',
    slug: 'eesan-tv',
    title: 'Eesan TV',
    category: 'Media & Entertainment',
    websiteType: 'Static',
    categories: ['Static Websites', 'Media & Entertainment'],
    shortDescription: 'A media-focused website designed to provide television-related information and present video content through a simple digital interface.',
    thumbnail: '/images/projects/eesan-tv-thumb.webp',
    fullScreenshot: '/images/projects/eesan-tv.png',
    domain: 'https://www.eesantv.com/',
    featured: false,
  },
  {
    id: 'proj-07',
    slug: 'image-scraper',
    title: 'Image Scraper Studio',
    category: 'SaaS / Technology',
    websiteType: 'Dynamic',
    categories: ['Dynamic Websites', 'SaaS & Technology'],
    shortDescription: 'A web-based image discovery and downloading solution designed to simplify image collection through an organized application interface.',
    thumbnail: '/images/projects/image-scraper-thumb.webp',
    fullScreenshot: '/images/projects/image-scraper.png',
    domain: 'https://www.imagescrapper.com/',
    featured: true,
  },
  {
    id: 'proj-08',
    slug: 'focus-tourism',
    title: 'Focus Tourism Eventz',
    category: 'Tourism & Travel',
    websiteType: 'E-commerce',
    categories: ['E-commerce', 'Business & Services'],
    shortDescription: 'A travel-focused digital platform showcasing tourism services, destinations and travel experiences with customer enquiry and package discovery features.',
    thumbnail: '/images/projects/focus-tourism-thumb.webp',
    fullScreenshot: '/images/projects/focus-tourism.png',
    domain: 'https://www.focustourismeventz.com/',
    featured: false,
  },
  {
    id: 'proj-09',
    slug: 'inpand-academy',
    title: 'Inpand Academy',
    category: 'Education & Training',
    websiteType: 'Static / Hybrid',
    categories: ['Static Websites', 'Hybrid Websites', 'Education'],
    shortDescription: 'An educational platform presenting academic programs, training opportunities and institutional information through a structured digital experience.',
    thumbnail: '/images/projects/inpand-academy-thumb.webp',
    fullScreenshot: '/images/projects/inpand-academy.png',
    domain: 'https://inpandacademy.com/',
    featured: true,
  },
  {
    id: 'proj-10',
    slug: 'med-jewel',
    title: 'MED Jewel Manufacturing',
    category: 'Jewellery Manufacturing',
    websiteType: 'Static',
    categories: ['Static Websites', 'Business & Services'],
    shortDescription: 'A corporate website presenting jewellery manufacturing services, company information and product-related details through a professional online presence.',
    thumbnail: '/images/projects/med-jewel-thumb.webp',
    fullScreenshot: '/images/projects/med-jewel.png',
    domain: 'https://medjewelmanufacturing.com/',
    featured: false,
  },
  {
    id: 'proj-11',
    slug: 'dove-education',
    title: 'Dove Education Consultancy',
    category: 'Education Consultancy',
    websiteType: 'Static / Hybrid',
    categories: ['Static Websites', 'Hybrid Websites', 'Education', 'Business & Services'],
    shortDescription: 'A student-focused consultancy website presenting international education opportunities, study destinations and guidance services.',
    thumbnail: '/images/projects/dove-education-thumb.webp',
    fullScreenshot: '/images/projects/dove-education.png',
    domain: 'https://doveeducationconsultancy.com/',
    featured: false,
  },
  {
    id: 'proj-12',
    slug: 'land-plot',
    title: 'Land Plot Real Estates',
    category: 'Real Estate',
    websiteType: 'Static',
    categories: ['Static Websites', 'Real Estate'],
    shortDescription: 'A property-focused website designed to showcase land plots, property information and real estate opportunities.',
    thumbnail: '/images/projects/land-plot-thumb.webp',
    fullScreenshot: '/images/projects/land-plot.png',
    domain: 'https://landplotrealestates.com/',
    featured: false,
  },
  {
    id: 'proj-13',
    slug: 'kumars-real-estate',
    title: "Kumar's Real Estate",
    category: 'Real Estate',
    websiteType: 'Dynamic / Hybrid',
    categories: ['Dynamic Websites', 'Hybrid Websites', 'Real Estate'],
    shortDescription: 'A digital property platform designed to present real estate listings, property details and customer discovery opportunities.',
    thumbnail: '/images/projects/kumars-real-estate-thumb.webp',
    fullScreenshot: '/images/projects/kumars-real-estate.png',
    domain: 'https://kumarsrealestate.com/',
    featured: true,
  },
];

/**
 * Get project counts derived strictly from published projects
 */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {
    'all': PROJECTS.length,
  };

  PROJECT_CATEGORIES.forEach((cat) => {
    if (cat.slug === 'all') {
      counts[cat.slug] = PROJECTS.length;
      counts[cat.name] = PROJECTS.length;
    } else {
      const matchCount = PROJECTS.filter((p) => p.categories.includes(cat.name)).length;
      counts[cat.slug] = matchCount;
      counts[cat.name] = matchCount;
    }
  });

  return counts;
}

/**
 * Get project by URL slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  if (!slug) return undefined;
  return PROJECTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Get featured projects for homepage showcase
 */
export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => Boolean(p.featured));
}

/**
 * Get related projects sharing at least one category (excluding current project)
 */
export function getRelatedProjects(currentSlug: string, category: string, limit = 2): Project[] {
  return PROJECTS
    .filter((p) => p.slug !== currentSlug && (p.category === category || p.categories.includes(category)))
    .slice(0, limit);
}
