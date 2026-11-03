export type ProjectCategory = 
  | 'Static Websites'
  | 'Dynamic Websites'
  | 'E-Commerce'
  | 'Web Applications';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  thumbnail: string;
  previewVideo?: string;
  domain?: string;
  technologies: string[];
  featured: boolean;
  
  // Optional detailed fields
  clientIndustry?: string;
  overview?: string;
  features?: string[];
  gallery?: string[];
  completionYear?: string;
}

export interface CategoryInfo {
  id: ProjectCategory | 'All Projects';
  name: string;
  description: string;
  accentLabel: string;
}
