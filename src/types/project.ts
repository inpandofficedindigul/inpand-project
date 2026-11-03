export type FilterCategoryName =
  | 'All Projects'
  | 'Dynamic Websites'
  | 'Static Websites'
  | 'Hybrid Websites'
  | 'E-commerce'
  | 'SaaS & Technology'
  | 'Media & Entertainment'
  | 'Education'
  | 'Real Estate'
  | 'Business & Services';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;             // Business category, e.g. "Media & Entertainment"
  websiteType: string;          // Classification: "Dynamic", "Static", "Hybrid", "E-commerce", etc.
  categories: string[];         // Filter categories this project matches
  shortDescription: string;
  thumbnail: string;            // Card thumbnail screenshot
  fullScreenshot?: string;      // Full-length screenshot
  domain: string;               // Live client website URL
  previewVideo?: string;
  technologies?: string[];
  featured?: boolean;
  overview?: string;
  features?: string[];
  completionYear?: string;
}

export interface CategoryInfo {
  id: string;
  slug: string;
  name: FilterCategoryName;
  description: string;
}
