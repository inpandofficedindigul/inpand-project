# INPAND Technologies — Digital Project Showcase

A professional, production-ready frontend showcase platform engineered for **INPAND Technologies** to present client websites, e-commerce storefronts, and custom web applications to prospective clients.

Reference website: [https://www.inpand.com/](https://www.inpand.com/)  
Tagline: *"Transform Ideas Into Business Growth"*

---

## Primary Objectives

- **Client Discovery**: Prospective clients can explore 14 real websites and 6 production applications (Mobile Applications and Electron Desktop Systems) built by INPAND Technologies.
- **Application & Electron Video Showcase**: Walkthrough video previews of production mobile apps (iOS & Android) and Electron desktop ERP software with custom playback controls (play/pause, timeline scrubber, volume, fullscreen).
- **Direct Communication**: Prospective clients can directly reach out via official WhatsApp (`9080394828`), email (`info@inpand.com`), or telephone.
- **Client Domain Linking**: Secure external links directly to live client domains (`target="_blank" rel="noopener noreferrer"`).
- **High-Performance Image & Video Optimization**: Dual WebP thumbnails + full-resolution WebP screenshots for websites; H.264 FastStart optimized delivery clips (<19 MB total) + WebP poster frames for software walkthroughs.
- **Content Purity & Production Readiness**: 13 fully integrated client website projects and 6 software application video showcases with real assets, verified domains, and accurate business classifications. Zero fabricated client names or placeholder projects.

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
Runs 103 automated checks validating project domains, high-res screenshots, thumbnails, filter counts, and UI requirements.

---

## Integrated Client Projects (13 Published)

| # | Project | Domain | Business Category | Website Type |
|---|---|---|---|---|
| 1 | **Mei Alai** | [meialai.com](https://www.meialai.com/) | Media & Entertainment | Dynamic |
| 2 | **Namma Jilla** | [nammajilla.com](https://www.nammajilla.com/) | E-commerce / Local Platform | E-commerce |
| 3 | **Mei Alai Sports** | [meialaisports.com](https://meialaisports.com/) | Sports Platform | Dynamic / Hybrid |
| 4 | **Nizhal Visuals** | [nizhalvisuals.com](https://www.nizhalvisuals.com/) | Photography & Visual Media | Static / Hybrid |
| 5 | **Moonlight Enterprises** | [moonlightenterprises.co.in](https://moonlightenterprises.co.in/) | Business / E-commerce | E-commerce |
| 6 | **Eesan TV** | [eesantv.com](https://www.eesantv.com/) | Media & Entertainment | Static |
| 7 | **Image Scraper Studio** | [imagescrapper.com](https://www.imagescrapper.com/) | SaaS / Technology | Dynamic |
| 8 | **Focus Tourism Eventz** | [focustourismeventz.com](https://www.focustourismeventz.com/) | Tourism & Travel | E-commerce |
| 9 | **Inpand Academy** | [inpandacademy.com](https://inpandacademy.com/) | Education & Training | Static / Hybrid |
| 10 | **MED Jewel Manufacturing** | [medjewelmanufacturing.com](https://medjewelmanufacturing.com/) | Jewellery Manufacturing | Static |
| 11 | **Dove Education Consultancy** | [doveeducationconsultancy.com](https://doveeducationconsultancy.com/) | Education Consultancy | Static / Hybrid |
| 12 | **Land Plot Real Estates** | [landplotrealestates.com](https://landplotrealestates.com/) | Real Estate | Static |
| 13 | **Kumar's Real Estate** | [kumarsrealestate.com](https://kumarsrealestate.com/) | Real Estate | Dynamic / Hybrid |

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
