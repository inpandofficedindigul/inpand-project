# INPAND Technologies — Production Deployment Guide

This guide details how to build and deploy the **INPAND Digital Project Showcase** to modern cloud hosting platforms.

---

## 1. Production Build

To generate the optimized static distribution bundle:

```bash
npm run build
```

This executes:
1. `tsc -b` (TypeScript strict type verification)
2. `vite build` (Minification, CSS bundling, asset hashing, and tree-shaking)

The compiled static files are output to:
```
dist/
├── assets/             # Bundled, fingerprinted JS and CSS
├── images/             # Optimized project mockups & SVGs
├── videos/             # Project preview MP4 video assets
├── index.html          # HTML shell
├── robots.txt          # Crawler instructions
└── sitemap.xml         # XML sitemap
```

To test the build locally before deploying:
```bash
npm run preview
```

---

## 2. Platform Deployment Instructions

Because this is a Single Page Application (SPA) with client-side routing, all incoming route requests (such as `/projects/restaurant-website` or `/about`) must be rewritten to `/index.html`.

### Option A: Cloudflare Pages (Recommended)

1. Connect your GitHub repository to Cloudflare Pages.
2. Configure build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. SPA Redirect:
   Cloudflare Pages handles SPA routing automatically when `dist/_redirects` or single-page setting is enabled. Create a `public/_redirects` file with:
   ```
   /*    /index.html   200
   ```

---

### Option B: Vercel

Create a `vercel.json` file in the root directory:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/videos/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

Deploy via Vercel CLI:
```bash
vercel --prod
```

---

### Option C: Netlify

Create a `netlify.toml` file in the root directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/videos/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### Option D: Custom Linux Server (Nginx)

If hosting on an Ubuntu/Debian server with Nginx:

```nginx
server {
    listen 80;
    server_name showcase.inpandtechnologies.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name showcase.inpandtechnologies.com;

    ssl_certificate /etc/letsencrypt/live/showcase.inpandtechnologies.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/showcase.inpandtechnologies.com/privkey.pem;

    root /var/www/officewebsite/dist;
    index index.html;

    # Gzip & Brotli compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    # Cache static assets
    location ~* \.(js|css|webp|svg|png|jpg|mp4|webm|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # SPA routing fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 3. Post-Deployment Verification Checklist

- [ ] Verify root route `/` loads instantly.
- [ ] Direct visit to deep link: `https://your-domain.com/projects/restaurant-website` loads without 404.
- [ ] Category filtering on `/projects` updates without full page reload.
- [ ] Video preview modal opens and plays video smoothly.
- [ ] WhatsApp button initiates conversation with verified business number and pre-filled project message.
- [ ] Email button opens user's email client with pre-filled subject and body.
- [ ] Lighthouse audit achieves 95+ score on Performance, Accessibility, and Best Practices.
