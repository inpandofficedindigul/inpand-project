# INPAND Technologies — Project Management Guide

This technical guide explains how to add, modify, or archive client projects in the **INPAND Digital Project Showcase**.

---

## 1. Project Data Architecture

All project records reside in a single centralized TypeScript file:
```
src/data/projects.ts
```

The data structure is strictly enforced by the `Project` interface defined in `src/types/project.ts`:

```typescript
export type ProjectCategory = 
  | 'Static Websites'
  | 'Dynamic Websites'
  | 'E-Commerce'
  | 'Web Applications';

export interface Project {
  id: string;               // Unique ID, e.g. "proj-09"
  title: string;            // Full display title
  slug: string;             // URL-friendly slug, e.g. "luxury-resort-showcase"
  category: ProjectCategory;// One of the 4 strict categories
  description: string;       // Concise 2-3 sentence overview
  thumbnail: string;         // Path to primary image, e.g. "/images/projects/name.webp"
  previewVideo?: string;    // Path to MP4/WebM video, e.g. "/videos/projects/name.mp4"
  domain?: string;          // Verified live client URL, e.g. "https://clientdomain.com"
  technologies: string[];   // Array of tech tags, e.g. ["React", "TypeScript", "Tailwind"]
  featured: boolean;        // Set to true to highlight on the homepage

  // Optional editorial fields
  clientIndustry?: string;  // e.g. "Hospitality & Tourism"
  overview?: string;        // In-depth case study breakdown
  features?: string[];      // Array of key capabilities delivered
  gallery?: string[];       // Secondary screenshot paths
  completionYear?: string;  // e.g. "2024"
}
```

---

## 2. Step-by-Step: Adding a New Project

### Step 1: Add Media Assets

1. **Thumbnail**: Save the primary project preview to:
   ```
   public/images/projects/<your-project-slug>.webp
   ```
   *(Recommended size: 1200 x 750px or 16:10 aspect ratio)*

2. **Preview Video** *(Optional)*: If an approved screen recording exists, save it to:
   ```
   public/videos/projects/<your-project-slug>-preview.mp4
   ```
   *(H.264 / AAC or WebM, 1080p or 720p, under 15MB)*

3. **Gallery Images** *(Optional)*: Save additional views to:
   ```
   public/images/projects/<your-project-slug>-view-1.webp
   ```

---

### Step 2: Register the Project in `src/data/projects.ts`

Open `src/data/projects.ts` and append a new record to the `PROJECTS` array:

```typescript
{
  id: 'proj-09',
  title: 'Apex Financial — Institutional Asset Advisory',
  slug: 'apex-financial',
  category: 'Dynamic Websites',
  description: 'A dynamic corporate portal engineered for an institutional wealth firm, featuring real-time market updates, compliance archives, and secure appointment booking.',
  thumbnail: '/images/projects/apex-financial.webp',
  previewVideo: '/videos/projects/apex-financial-preview.mp4',
  domain: 'https://apex-financial.com',
  technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
  featured: true,
  clientIndustry: 'Financial Advisory',
  overview: 'Apex Financial required a digital presence reflecting institutional authority. We engineered a sub-second dynamic web experience integrating automated regulatory filings and responsive appointment funnels.',
  features: [
    'Sub-second editorial transitions and instant page delivery',
    'Integrated WhatsApp consultation booking channel',
    'Automated compliance document vault',
    'Mobile-first responsive typography'
  ],
  gallery: [
    '/images/projects/apex-financial.webp',
    '/images/projects/apex-financial-view-1.webp'
  ],
  completionYear: '2024',
},
```

---

### Step 3: Verify the Changes

Run the development server:
```bash
npm run dev
```

1. Navigate to `/projects` — verify the project appears under **All Projects** and its category tab.
2. Check that the category count badge incremented automatically.
3. Click on the project card to verify the detail route (`/projects/apex-financial`).
4. Click **Watch Preview** to test video modal playback, volume, and fullscreen.
5. Click **Visit Website ↗** to verify the client URL opens in a secure new tab.
6. Click **Enquire via WhatsApp** to verify the message is pre-populated with:
   ```
   Hi INPAND Technologies,
   I viewed your Apex Financial — Institutional Asset Advisory project in the Dynamic Websites category.
   I'm interested in developing a similar solution for my business.
   Please share more details.
   ```

---

## 3. Configuring Company Contact & Numbers

To update the official WhatsApp Business number, email address, or verified social links, edit:
```
src/lib/config.ts
```

```typescript
export const COMPANY_CONFIG = {
  name: 'INPAND Technologies',
  whatsappNumber: '+919876543210',  // Official number in E.164 format
  whatsappDisplay: '+91 98765 43210',// Formatted display number
  email: 'contact@inpandtechnologies.com',
  address: 'Digital Innovation Hub, India',
  // ...
};
```
All buttons and message generators across the site update dynamically from this single file.
