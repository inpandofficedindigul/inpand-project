import { Project, ProjectCategory } from '../types/project';
import { PROJECT_CATEGORIES } from './categories';

/**
 * INPAND TECHNOLOGIES — CENTRALIZED PUBLISHED PROJECT DATA
 * 
 * In accordance with content verification standards:
 * Real client project screenshots, preview videos, and client domains will be populated
 * here as approved by INPAND Technologies management.
 * 
 * To add an approved project:
 * Add an object adhering to the Project interface:
 * {
 *   id: 'proj-01',
 *   slug: 'client-project-slug',
 *   title: 'Official Project Title',
 *   category: 'Static Websites', // 'Static Websites' | 'Dynamic Websites' | 'E-Commerce' | 'Web Applications'
 *   shortDescription: 'Approved client project summary...',
 *   thumbnail: '/images/projects/client-project-slug.webp',
 *   previewVideo: '/videos/projects/client-project-slug.mp4', // optional
 *   domain: 'https://clientdomain.com', // optional verified URL
 *   technologies: ['React', 'TypeScript', 'Tailwind CSS'],
 *   featured: true,
 *   overview: 'Detailed project overview...',
 *   features: ['Key feature 1', 'Key feature 2'],
 *   completionYear: '2024'
 * }
 */
export const PROJECTS: Project[] = [];

/**
 * Get accurate project counts derived strictly from published projects
 */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {
    'all': PROJECTS.length,
  };

  PROJECT_CATEGORIES.forEach((cat) => {
    counts[cat.slug] = 0;
    counts[cat.name] = 0;
  });

  PROJECTS.forEach((p) => {
    if (counts[p.category] !== undefined) {
      counts[p.category] += 1;
    }
    const matchingCat = PROJECT_CATEGORIES.find((c) => c.name === p.category);
    if (matchingCat) {
      counts[matchingCat.slug] += 1;
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
 * Get related projects in the same category (excluding current project)
 */
export function getRelatedProjects(currentSlug: string, category: ProjectCategory, limit = 2): Project[] {
  return PROJECTS
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (a.category === category ? -1 : (b.category === category ? 1 : 0)))
    .slice(0, limit);
}
