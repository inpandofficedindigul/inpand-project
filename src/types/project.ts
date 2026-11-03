export type ProjectCategory = 
  | 'Static Websites'
  | 'Dynamic Websites'
  | 'E-Commerce'
  | 'Web Applications';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  thumbnail: string;
  screenshots?: string[];
  previewVideo?: string;
  domain?: string;
  technologies?: string[];
  featured?: boolean;
  overview?: string;
  features?: string[];
  completionYear?: string;
}

export interface CategoryInfo {
  id: string;
  slug: string;
  name: ProjectCategory;
  description: string;
  accentLabel: string;
}
