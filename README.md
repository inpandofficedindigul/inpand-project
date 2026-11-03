# INPAND Technologies — Digital Project Showcase

A professional, production-ready frontend showcase platform engineered for **INPAND Technologies** to present client websites, e-commerce storefronts, and custom web applications to prospective clients.

Reference website: [https://www.inpand.com/](https://www.inpand.com/)  
Tagline: *"Transform Ideas Into Business Growth"*

---

## Primary Objectives

- **Client Discovery**: Prospective clients can explore real websites and digital solutions built by INPAND Technologies across key categories (*Static Websites*, *Dynamic Websites*, *E-Commerce*, *Web Applications*).
- **Direct Communication**: Prospective clients can directly reach out via official WhatsApp (`9080394828`), email (`info@inpand.com`), or telephone.
- **Client Domain Linking**: Secure external links directly to live client domains (`target="_blank" rel="noopener noreferrer"`).
- **Media Previews**: HTML5 video preview modal with custom scrubber, volume, keyboard controls, and background scroll locking.
- **Content Purity & Production Readiness**: Zero fabricated client names, zero fake testimonials, zero fake statistics, and zero dummy placeholder projects. Ready to dynamically display real client projects the moment approved data is added to `src/data/projects.ts`.

---

## Verified Company Information

- **Company**: INPAND Technologies
- **Tagline**: "Transform Ideas Into Business Growth"
- **Email**: `info@inpand.com`
- **Phone**: `9080394828` (`+91 90803 94828`)
- **Office**: MRC Complex, Guziliamparai, Dindigul – 624703
- **Working Hours**: Monday–Saturday, 9:00 AM–6:00 PM
- **Corporate Website**: [https://www.inpand.com/](https://www.inpand.com/)

---

## Technology Stack

- **React 19**
- **TypeScript 5.7+** (Strict mode)
- **Vite 6** (Blazing fast bundling & HMR)
- **Tailwind CSS 3.4** (Custom design tokens: `#F7F7F5` bg, `#171717` text, `#315EFB` accent, `#E5E5E5` borders)
- **React Router 7** (SPA client-side routing & URL query parameter synchronization)
- **Lucide React** (Clean, modern iconography)

---

## Local Setup & Running (Windows PowerShell)

### Prerequisites

- Node.js (v18 or higher recommended, tested on Node.js v24.22)
- npm

### 1. Installation

```powershell
npm install
```

### 2. Development Server

```powershell
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Production Build & Type Checking

```powershell
npm run build
```

This compiles TypeScript (`tsc -b`) and bundles static production assets into `dist/`.

### 4. Production Preview

```powershell
npm run preview
```

### 5. Automated Verification Suite

```powershell
node scripts/verify.cjs
```

---

## Project Structure

```
officewebsite/
├── public/
│   ├── images/
│   │   ├── inpand-logo.svg              # INPAND Technologies official studio mark
│   │   └── projects/                    # Directory for approved client screenshots
│   ├── videos/
│   │   └── projects/                    # Directory for approved preview videos
│   ├── _redirects                       # SPA fallback rewrite rule for Cloudflare
│   ├── robots.txt                       # Search engine crawler policies
│   └── sitemap.xml                      # XML sitemap configuration
├── src/
│   ├── components/
│   │   ├── common/                      # Reusable primitives (Button, Badge, VideoModal, SEOHead)
│   │   ├── layout/                      # Navbar, Footer, Page Layout shell
│   │   ├── projects/                    # ProjectCard, ProjectGrid, ProjectFilter, ProjectEmptyState
│   │   └── sections/                    # Homepage narrative sections (Hero, Categories, Process, etc.)
│   ├── data/
│   │   ├── projects.ts                  # Centralized single source of truth for projects
│   │   ├── categories.ts                # Category descriptors and URL slug mappers
│   │   └── fixtures.test.ts             # Quarantined test fixtures for verification
│   ├── hooks/
│   │   └── useScrollLock.ts             # Background scroll lock for modals & mobile navigation
│   ├── lib/
│   │   ├── config.ts                    # Verified company details, WhatsApp & mailto generators
│   │   └── utils.ts                     # Classname merging utility
│   ├── pages/
│   │   ├── HomePage.tsx                 # Showcase homepage
│   │   ├── ProjectsPage.tsx             # Project discovery page with query-parameter filters
│   │   ├── ProjectDetailPage.tsx        # Project case study template with video & live domain link
│   │   ├── AboutPage.tsx                # Verified company introduction & services
│   │   ├── ContactPage.tsx              # Direct WhatsApp, email, and phone contact channels
│   │   └── NotFoundPage.tsx             # Editorial 404 page
│   ├── styles/
│   │   └── index.css                    # Tailwind layers, custom scrollbar, base typography
│   ├── types/
│   │   └── project.ts                   # Strongly typed Project and Category interfaces
│   ├── App.tsx                          # Route declarations
│   └── main.tsx                         # Application entry point
├── documentation/
│   ├── PROJECT_GUIDE.md                 # Technical guide to adding and managing projects
│   ├── CONTENT_GUIDE.md                 # Media specs, video encoding, copywriting
│   └── DEPLOYMENT.md                    # Hosting instructions on Cloudflare, Vercel, Netlify, Nginx
├── scripts/
│   └── verify.cjs                       # 59-point automated verification suite
├── README.md
├── PROJECT_GUIDE.md
├── CONTENT_GUIDE.md
├── DEPLOYMENT.md
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Adding Approved Client Projects

When approved project assets arrive from the office, follow [`PROJECT_GUIDE.md`](./PROJECT_GUIDE.md) to add records to `src/data/projects.ts`. The showcase will automatically transition from the curated empty state to displaying project cards, category counts, and detail pages.
