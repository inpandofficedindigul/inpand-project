# INPAND Technologies — Digital Project Showcase

A premium, production-ready frontend showcase platform engineered for **INPAND Technologies** to present client websites, e-commerce stores, and enterprise web applications to prospective clients.

## Core Purpose

- Let prospective clients explore live digital solutions and completed works.
- Stream high-definition preview videos through a custom modal player.
- Link directly to verified, live client domains.
- Initiate project-specific enquiries through official WhatsApp Business and email channels.
- Demonstrate technical excellence, editorial typography, and high performance.

> **Design Philosophy**: Minimal, architectural, editorial, and professional. Engineered without bloated UI libraries, generic gradients, or AI-template clutter.

---

## Technology Stack

- **React 19**
- **TypeScript 5.7+** (Strict mode)
- **Vite 6** (Blazing fast HMR and bundling)
- **Tailwind CSS 3.4** (Custom design system palette & typography)
- **React Router 7** (SPA client-side routing & deep linking)
- **Lucide React** (Crisp, modern iconography)

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended, tested on Node.js v24)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/inpand-technologies/officewebsite.git
cd officewebsite

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build & Preview

```bash
# Type check and build optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Directory Architecture

```
officewebsite/
├── public/
│   ├── images/
│   │   ├── inpand-logo.svg       # Official studio mark
│   │   └── projects/             # High-res thumbnails and gallery assets
│   ├── videos/
│   │   └── projects/             # Preview video assets (MP4 / WebM)
│   ├── robots.txt                # Search engine crawler policies
│   └── sitemap.xml               # Indexed routes and project URLs
├── src/
│   ├── components/
│   │   ├── common/               # Reusable primitives (Button, Badge, VideoModal, SEOHead)
│   │   ├── layout/               # Navbar, Footer, and Page Layout shell
│   │   ├── projects/             # ProjectCard, ProjectGrid, ProjectFilter
│   │   └── sections/             # Homepage narrative sections (Hero, Categories, Process, etc.)
│   ├── data/
│   │   ├── projects.ts           # Centralized single source of truth for projects
│   │   └── categories.ts         # Category descriptors and metadata
│   ├── hooks/
│   │   └── useScrollLock.ts      # Scroll lock for modals and mobile navigation
│   ├── lib/
│   │   ├── config.ts             # Company configuration, WhatsApp & mailto generators
│   │   └── utils.ts              # Class merging utilities
│   ├── pages/
│   │   ├── HomePage.tsx          # Homepage with Hero, Categories, Featured, Process, CTA
│   │   ├── ProjectsPage.tsx      # All projects catalog with dynamic category filtering
│   │   ├── ProjectDetailPage.tsx # Deep-dive view for individual client case studies
│   │   ├── AboutPage.tsx         # Studio profile, ethos, and engineering principles
│   │   ├── ContactPage.tsx       # Direct client communication via WhatsApp & email
│   │   └── NotFoundPage.tsx      # Editorial 404 handler
│   ├── styles/
│   │   └── index.css             # Tailwind layers, scrollbar, and base styles
│   ├── types/
│   │   └── project.ts            # Strongly typed TypeScript interfaces
│   ├── App.tsx                   # Route definitions
│   └── main.tsx                  # Application entry point
├── documentation/
│   ├── PROJECT_GUIDE.md          # Technical guide to adding and managing projects
│   ├── CONTENT_GUIDE.md          # Editorial & asset guidelines for managers
│   └── DEPLOYMENT.md             # Production hosting and SPA rewrite configs
├── README.md
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Key Features

1. **Client-Side Category Filtering**: Instant categorization across *Static Websites*, *Dynamic Websites*, *E-Commerce*, and *Web Applications* with live count calculations.
2. **Accessible Video Preview Modal**: Keyboard accessible (Esc, Space, Mute, Fullscreen), background scroll lock, custom timeline scrubbing, and automatic playback termination on close.
3. **Project-Specific Enquiries**: Generates tailored pre-filled WhatsApp and email messages referencing the exact project title and category.
4. **Editorial Visual Design**: Large screenshots, strict typographic hierarchy (`Manrope` headings + `Inter` body), restrained borders (`#E5E5E5`), and subtle shadows.
5. **SEO & OpenGraph Ready**: Dynamic page titles, meta descriptions, canonical URLs, sitemap, and robots.txt.

---

## Documentation

For detailed instructions, refer to:
- [`PROJECT_GUIDE.md`](./PROJECT_GUIDE.md) — How to add, update, and manage project records.
- [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md) — Asset dimensions, video compression, and copywriting standards.
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) — Hosting instructions on Cloudflare Pages, Vercel, Netlify, or custom VPS.
