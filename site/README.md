# i.ahoo.me

Personal site of Ahoo Wang, built with [Astro](https://astro.build) and deployed to GitHub Pages by
[`.github/workflows/pages.yml`](../.github/workflows/pages.yml) on every push to `main` that touches `site/`.

- **Edit content:** everything visible lives in [`src/content.ts`](src/content.ts), English and Chinese side by side.
- **Pages:** `/` (English) and `/zh/` (Chinese) both render [`src/components/Home.astro`](src/components/Home.astro).
- **SEO:** metadata, hreflang, Open Graph and JSON-LD live in [`src/layouts/Layout.astro`](src/layouts/Layout.astro).
  `sitemap-index.xml`, `robots.txt` and `llms.txt` are generated at build time.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

The pages ship no JavaScript.
