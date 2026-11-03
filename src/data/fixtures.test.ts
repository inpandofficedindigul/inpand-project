import { Project } from '../types/project';

/**
 * ISOLATED DEVELOPMENT FIXTURES FOR AUTOMATED VERIFICATION ONLY
 * Strict requirement: These fixtures are strictly quarantined from production
 * and must never appear in src/data/projects.ts or production bundles.
 */
export const TEST_FIXTURES: Project[] = [
  {
    id: 'test-01',
    slug: 'sample-static-site',
    title: 'Sample Static Showcase',
    category: 'Static Websites',
    shortDescription: 'Test fixture for static website rendering.',
    thumbnail: '/images/inpand-mark.png',
    previewVideo: undefined,
    domain: 'https://inpand.com',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    overview: 'Test overview description for verification suite.',
    features: ['High speed', 'SEO ready'],
    completionYear: '2024',
  },
  {
    id: 'test-02',
    slug: 'sample-ecommerce-store',
    title: 'Sample E-Commerce Store',
    category: 'E-Commerce',
    shortDescription: 'Test fixture for e-commerce rendering.',
    thumbnail: '/images/inpand-mark.png',
    previewVideo: undefined,
    domain: 'https://inpand.com',
    technologies: ['React', 'TypeScript'],
    featured: false,
    overview: 'Test overview description.',
    features: ['Catalog browsing', 'Checkout'],
    completionYear: '2024',
  },
];

