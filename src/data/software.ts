import { SoftwareProject, SoftwareCategoryInfo, SoftwareFilterSlug } from '../types/software';

export const SOFTWARE_CATEGORIES: SoftwareCategoryInfo[] = [
  {
    id: 'all',
    slug: 'all',
    name: 'All Software Projects',
    description: 'Explore the complete suite of mobile applications and Electron desktop software developed by INPAND Technologies.',
  },
  {
    id: 'applications',
    slug: 'applications',
    name: 'Applications',
    description: 'Native and cross-platform mobile applications engineered for on-demand media, hyperlocal commerce, and retail scheme tracking.',
  },
  {
    id: 'electron-desktop-apps',
    slug: 'electron-desktop-apps',
    name: 'Electron Desktop Apps',
    description: 'High-performance Electron desktop enterprise applications, specialized management portals, and multi-user offline-capable ERP solutions.',
  },
];

export const SOFTWARE_PROJECTS: SoftwareProject[] = [
  {
    id: 'app-01',
    slug: 'eesan-tv-app',
    title: 'Eesan TV',
    category: 'Applications',
    applicationType: 'Mobile Application (Media & Directory)',
    platform: 'Mobile (iOS & Android)',
    duration: '0:40',
    durationSec: 40,
    shortDescription:
      'A digital television broadcasting and regional directory mobile app featuring 24/7 live television streaming, classified real estate listings, and business promotions.',
    videoUrl: '/videos/software/eesan-tv.mp4',
    originalFilename: 'EesanTV.mp4',
    poster: '/images/software/eesan-tv-poster.webp',
    posterJpg: '/images/software/eesan-tv-poster.jpg',
    aspectRatio: 'portrait',
    features: [
      '24/7 Live Stream Player',
      'Hyperlocal Business Directory',
      'Property & Real Estate Listings',
      'Media Gallery & Video Archives',
    ],
  },
  {
    id: 'app-02',
    slug: 'krishna-jewellers-app',
    title: 'Sri Krishna Jewellers',
    category: 'Applications',
    applicationType: 'Mobile Application (Jewellery Savings & Loyalty)',
    platform: 'Mobile (iOS & Android)',
    duration: '5:08',
    durationSec: 308,
    shortDescription:
      'A customer loyalty and savings scheme mobile application enabling jewellery buyers to manage cash and weight-based chit schemes, view passbooks, and download statements.',
    videoUrl: '/videos/software/krishna-jewellers.mp4',
    originalFilename: 'KrishnaJewllers.mp4',
    poster: '/images/software/krishna-jewellers-poster.webp',
    posterJpg: '/images/software/krishna-jewellers-poster.jpg',
    aspectRatio: 'portrait',
    features: [
      'Secure MPIN & OTP Authentication',
      'Cash & Metal Weight Savings Schemes',
      'Digital Passbook & PDF Downloads',
      'Installment Due & Payment History',
    ],
  },
  {
    id: 'app-03',
    slug: 'krishna-software-erp',
    title: 'Sri Krishna Jewellers ERP',
    category: 'Electron Desktop Applications',
    applicationType: 'Electron Desktop Application (Retail ERP)',
    platform: 'Desktop (Windows / macOS)',
    duration: '5:11',
    durationSec: 311,
    shortDescription:
      'A specialized Electron desktop management system designed for jewellery retail operations, featuring counter billing, customer ledgers, box stock inventory, and QR verification.',
    videoUrl: '/videos/software/krishna-software.mp4',
    originalFilename: 'KrishnaSoftware.mp4',
    poster: '/images/software/krishna-software-poster.webp',
    posterJpg: '/images/software/krishna-software-poster.jpg',
    aspectRatio: 'landscape',
    features: [
      'Fast Multi-Counter Billing & Checkout',
      'Gold & Silver Stock Inventory Control',
      'Customer QR Verification & Profile Sync',
      'Daily Settlement & Audit Reporting',
    ],
  },
  {
    id: 'app-04',
    slug: 'mei-alai-app',
    title: 'Mei Alai OTT',
    category: 'Applications',
    applicationType: 'Mobile Application (OTT Streaming)',
    platform: 'Mobile (iOS & Android)',
    duration: '1:29',
    durationSec: 89,
    shortDescription:
      'An on-demand digital entertainment and video streaming mobile application delivering full-length movies, original web series, live broadcast channels, and curated watchlists.',
    videoUrl: '/videos/software/mei-alai.mp4',
    originalFilename: 'MeiAlai.mp4',
    poster: '/images/software/mei-alai-poster.webp',
    posterJpg: '/images/software/mei-alai-poster.jpg',
    aspectRatio: 'portrait',
    features: [
      'Adaptive HLS Video Streaming',
      'Categorized Movie & Web Series Catalog',
      'Live Channel Broadcast Feed',
      'Personalized Recommendations & Watchlists',
    ],
  },
  {
    id: 'app-05',
    slug: 'mrc-builders-erp',
    title: 'MRC Builders ERP',
    category: 'Electron Desktop Applications',
    applicationType: 'Electron Desktop Application (Construction ERP)',
    platform: 'Desktop (Windows / macOS)',
    duration: '0:31',
    durationSec: 31,
    shortDescription:
      'A high-performance desktop enterprise resource planning software engineered for construction firms to oversee active project sites, track construction materials, and manage labour payroll.',
    videoUrl: '/videos/software/mrc-builders.mp4',
    originalFilename: 'MRC.mp4',
    poster: '/images/software/mrc-builders-poster.webp',
    posterJpg: '/images/software/mrc-builders-poster.jpg',
    aspectRatio: 'landscape',
    features: [
      'Active Site Milestone Monitoring',
      'Raw Material Procurement & Stock Tracking',
      'Subcontractor & Labour Wage Accounting',
      'Financial Outlay & Spending Analytics',
    ],
  },
  {
    id: 'app-06',
    slug: 'namma-jilla-app',
    title: 'Namma Jilla',
    category: 'Applications',
    applicationType: 'Mobile Application (Hyperlocal Directory)',
    platform: 'Mobile (iOS & Android)',
    duration: '2:25',
    durationSec: 145,
    shortDescription:
      'A regional business directory and hyperlocal marketplace mobile app connecting Tamil Nadu district merchants, exclusive seasonal offers, vendor storefronts, and consumers.',
    videoUrl: '/videos/software/namma-jilla.mp4',
    originalFilename: 'Nammajilla.mp4',
    poster: '/images/software/namma-jilla-poster.webp',
    posterJpg: '/images/software/namma-jilla-poster.jpg',
    aspectRatio: 'portrait',
    features: [
      'District-Wise Business Directory',
      'Exclusive Store Discount & Deals Explorer',
      'Merchant Profile & Contact Cards',
      'Location-Based Category Filtering',
    ],
  },
];

export function getSoftwareCategoryCounts(): Record<SoftwareFilterSlug, number> {
  return {
    all: SOFTWARE_PROJECTS.length,
    applications: SOFTWARE_PROJECTS.filter((p) => p.category === 'Applications').length,
    'electron-desktop-apps': SOFTWARE_PROJECTS.filter(
      (p) => p.category === 'Electron Desktop Applications'
    ).length,
  };
}

export function filterSoftwareProjects(slug: SoftwareFilterSlug): SoftwareProject[] {
  if (slug === 'all') return SOFTWARE_PROJECTS;
  if (slug === 'applications') {
    return SOFTWARE_PROJECTS.filter((p) => p.category === 'Applications');
  }
  if (slug === 'electron-desktop-apps') {
    return SOFTWARE_PROJECTS.filter((p) => p.category === 'Electron Desktop Applications');
  }
  return SOFTWARE_PROJECTS;
}

export function getSoftwareBySlug(slug: string): SoftwareProject | undefined {
  return SOFTWARE_PROJECTS.find((p) => p.slug === slug);
}

