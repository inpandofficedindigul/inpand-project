# INPAND Technologies — Project Management Guide

This guide explains how to add, modify, or archive client projects in the **INPAND Digital Project Showcase**.

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
  id: string;               // Unique ID, e.g. "proj-01"
  slug: string;             // URL-friendly slug, e.g. "client-company-website"
  title: string;            // Official project title
  category: ProjectCategory;// 'Static Websites' | 'Dynamic Websites' | 'E-Commerce' | 'Web Applications'
  shortDescription: string; // Concise summary of the project
  thumbnail: string;        // Path to primary screenshot (e.g. "/images/projects/client.webp")
  screenshots?: string[];   // Optional array of additional screenshots
  previewVideo?: string;    // Optional path to MP4/WebM video (e.g. "/videos/projects/client.mp4")
  domain?: string;          // Optional verified live client URL (e.g. "https://clientdomain.com")
  technologies?: string[];  // Optional verified tech stack, e.g. ["React", "TypeScript", "Tailwind CSS"]
  featured?: boolean;       // Set to true to highlight on the homepage
  overview?: string;        // Optional detailed case study narrative
  features?: string[];      // Optional key deliverables
  completionYear?: string;  // e.g. "2024"
}
```

---

## 2. Step-by-Step: Adding an Approved Project

### Step 1: Place Media Assets
1. **Primary Screenshot**:
   Save the high-resolution screenshot to:
   ```
   public/images/projects/<your-project-slug>.webp
   ```
   *(Recommended size: 1200 x 750px or 16:10 aspect ratio)*

2. **Preview Video** *(Optional)*:
   If an approved screen recording exists, save it to:
   ```
   public/videos/projects/<your-project-slug>-preview.mp4
   ```
   *(H.264 / WebM, 1080p or 720p, under 15MB)*

---

### Step 2: Add Entry to `src/data/projects.ts`

Open `src/data/projects.ts` and append the project to the `PROJECTS` array:

```typescript
export const PROJECTS: Project[] = [
  {
    id: 'proj-01',
    slug: 'client-brand-portal',
    title: 'Client Brand Name — Official Web Experience',
    category: 'Dynamic Websites',
    shortDescription: 'A dynamic corporate website featuring content management workflows and interactive client touchpoints.',
    thumbnail: '/images/projects/client-brand-portal.webp',
    previewVideo: '/videos/projects/client-brand-portal-preview.mp4', // optional
    domain: 'https://clientbrand.com', // optional verified URL
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    overview: 'In-depth overview of the project objectives and architecture...',
    features: [
      'Responsive design across mobile and desktop',
      'Fast sub-second load times',
      'Direct WhatsApp and email enquiry funnels'
    ],
    completionYear: '2024',
  },
];
```

---

### Step 3: Verify the Changes Locally

In Windows PowerShell:
```powershell
npm run build
npm run preview
```

1. Navigate to `/projects` — verify the project card renders with title, category badge, and thumbnail.
2. Verify category filter buttons update counts dynamically from real data.
3. Click the card to open `/projects/client-brand-portal`.
4. Verify the video preview button only appears if `previewVideo` is provided.
5. Verify the "Visit Website" button only appears if `domain` is a valid external URL.
6. Verify the WhatsApp CTA pre-fills:
   `"Hello INPAND Technologies, I viewed Client Brand Name — Official Web Experience on your project showcase and would like to discuss a similar project."`

---

## 3. Official Company Information Reference

Configured in `src/lib/config.ts`:
- **Company**: INPAND Technologies
- **Email**: `info@inpand.com`
- **Phone**: `9080394828` (`+91 90803 94828`)
- **Office**: MRC Complex, Guziliamparai, Dindigul – 624703
- **Working Hours**: Monday–Saturday, 9:00 AM–6:00 PM
- **Corporate Website**: `https://www.inpand.com/`
