import { CategoryInfo, FilterCategoryName } from '../types/project';

export const PROJECT_CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    slug: 'all',
    name: 'All Projects',
    description: 'Explore the complete index of 14 digital platforms, business websites, and technology solutions delivered by INPAND Technologies.',
  },
  {
    id: 'dynamic-websites',
    slug: 'dynamic-websites',
    name: 'Dynamic Websites',
    description: 'Content-driven platforms, interactive web systems, and dynamic business applications engineered with structured digital experiences.',
  },
  {
    id: 'static-websites',
    slug: 'static-websites',
    name: 'Static Websites',
    description: 'High-speed, meticulously designed business websites engineered for optimal reliability, speed, and clean corporate presentation.',
  },
  {
    id: 'hybrid-websites',
    slug: 'hybrid-websites',
    name: 'Hybrid Websites',
    description: 'Flexible digital solutions combining the speed of static architecture with dynamic interactive modules and real-time feeds.',
  },
  {
    id: 'e-commerce',
    slug: 'e-commerce',
    name: 'E-commerce',
    description: 'Digital storefronts, product catalogs, and local marketplace platforms built to connect businesses with customers.',
  },
  {
    id: 'saas-technology',
    slug: 'saas-technology',
    name: 'SaaS & Technology',
    description: 'Web-based software tools, discovery applications, and specialized utility solutions designed for organized digital workflows.',
  },
  {
    id: 'media-entertainment',
    slug: 'media-entertainment',
    name: 'Media & Entertainment',
    description: 'Digital television platforms, streaming media portals, sports platforms, and creative portfolio showcases.',
  },
  {
    id: 'education',
    slug: 'education',
    name: 'Education',
    description: 'Academic platforms, training institutions, and overseas education consultancy portals presenting programs and student guidance.',
  },
  {
    id: 'real-estate',
    slug: 'real-estate',
    name: 'Real Estate',
    description: 'Property discovery platforms showcasing land plots, housing communities, listings, and customer investment opportunities.',
  },
  {
    id: 'business-services',
    slug: 'business-services',
    name: 'Business & Services',
    description: 'Corporate websites, conference platforms, manufacturing showcases, and commercial service platforms.',
  },
];

/**
 * Find category by slug (e.g. 'dynamic-websites') or name ('Dynamic Websites')
 */
export function findCategory(identifier?: string | null): CategoryInfo | undefined {
  if (!identifier) return undefined;
  const normalized = identifier.toLowerCase().trim();
  return PROJECT_CATEGORIES.find(
    (c) => c.slug === normalized || c.name.toLowerCase() === normalized
  );
}

/**
 * Get category name from slug safely
 */
export function getCategoryNameFromSlug(slug?: string | null): FilterCategoryName | null {
  const cat = findCategory(slug);
  return cat ? cat.name : null;
}
