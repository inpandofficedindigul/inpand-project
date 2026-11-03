# INPAND Technologies — Production Deployment Guide

This guide details how to build and deploy the **INPAND Digital Project Showcase** to production hosting platforms.

---

## 1. Production Build & Verification

In Windows PowerShell:

```powershell
# Run 59-point verification audit
node scripts/verify.cjs

# Compile TypeScript and build static bundle
npm run build

# Preview compiled build locally
npm run preview
```

The compiled static assets are generated in `dist/`.

---

## 2. SPA Rewrite Configuration

Because this is a React Single Page Application (SPA), all routing requests (e.g. `/projects`, `/about`, `/contact`, `/projects/:slug`) must be served with `index.html`.

### Cloudflare Pages (Recommended)
Cloudflare automatically respects the `public/_redirects` file included in this repository:
```
/*    /index.html   200
```
- Build command: `npm run build`
- Build output directory: `dist`

### Vercel
Create or verify `vercel.json` in the root:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Netlify
Add `netlify.toml` in the root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 3. Post-Deployment Verification

1. Verify root `/` loads immediately with correct styling and verified company info.
2. Verify deep linking: refresh `/projects` or `/about` directly in browser.
3. Verify WhatsApp CTA initiates chat with `9080394828`.
4. Verify Email CTA opens `mailto:info@inpand.com`.
5. Verify Phone CTA opens `tel:9080394828`.
6. Verify 404 page displays cleanly for non-existent paths (e.g. `/unknown-path`).
