export type SoftwareCategory = 'Applications' | 'Electron Desktop Applications';

export type SoftwareFilterSlug = 'all' | 'applications' | 'electron-desktop-apps';

export interface SoftwareCategoryInfo {
  id: string;
  slug: SoftwareFilterSlug;
  name: string;
  description: string;
}

export interface SoftwareProject {
  id: string;
  slug: string;
  title: string;
  category: SoftwareCategory;
  applicationType: string;
  platform: string;
  duration: string;
  durationSec: number;
  shortDescription: string;
  videoUrl: string;
  originalFilename: string;
  poster: string;
  posterJpg?: string;
  aspectRatio: 'portrait' | 'landscape';
  features: string[];
  externalVideoUrl?: string; // Optional external CDN / Stream fallback
}

