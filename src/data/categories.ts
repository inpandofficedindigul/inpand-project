import { CategoryInfo, ProjectCategory } from '../types/project';

export const PROJECT_CATEGORIES: CategoryInfo[] = [
  {
    id: 'static-websites',
    slug: 'static-websites',
    name: 'Static Websites',
    description: 'High-speed, meticulously designed websites engineered for lightning-fast delivery, optimal SEO, and zero server overhead.',
    accentLabel: 'Speed & Architecture',
  },
  {
    id: 'dynamic-websites',
    slug: 'dynamic-websites',
    name: 'Dynamic Websites',
    description: 'Content-driven corporate platforms with integrated content workflows, custom interactive modules, and business logic.',
    accentLabel: 'Content & Interaction',
  },
  {
    id: 'e-commerce',
    slug: 'e-commerce',
    name: 'E-Commerce',
    description: 'Custom digital storefronts, high-converting product showcases, and streamlined checkout funnels tailored to sales growth.',
    accentLabel: 'Commerce & Scale',
  },
  {
    id: 'web-applications',
    slug: 'web-applications',
    name: 'Web Applications',
    description: 'Interactive browser-based software, client portals, internal management tools, and tailored enterprise web solutions.',
    accentLabel: 'Systems & Tools',
  },
];

/**
 * Find category by slug (e.g. 'static-websites') or name ('Static Websites')
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
export function getCategoryNameFromSlug(slug?: string | null): ProjectCategory | null {
  const cat = findCategory(slug);
  return cat ? cat.name : null;
}
