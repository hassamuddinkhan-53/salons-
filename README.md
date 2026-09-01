# Salon Sites — one codebase, 100+ demo URLs

A single Next.js website engine that renders a personalized beauty-salon demo from `/salon/{slug}`. The same components, layout, and features are reused for every lead. There are not 100 separate projects.

## Why this stack

The original workspace (`E:\salons`) had no cloned frontend. This app is a Next.js 15 App Router project so that:

- `/salon/[slug]` is a real route, not a duplicated site
- each salon gets its own title, description, and Open Graph image for WhatsApp previews
- every salon page can be pre-rendered at build time
- the data layer can later move to Supabase / Firebase / Postgres without rewriting the UI

**Vercel** (GitHub-connected) is the intended host. GitHub Pages is a poor fit here: it cannot run Next.js OG image generation or App Router server features without a static-export workaround, and WhatsApp unfurls need real HTML/OG tags per URL.

## Local development

```bash
npm install
npm run validate
npm run dev
```

Open:

- http://localhost:3000
- http://localhost:3000/salon/beauty-canvas-by-shireen-salon
- http://localhost:3000/salon/nadias-saloon
- http://localhost:3000/salon/fizzas-saloon

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run build` | Production build |
| `npm run validate` | Duplicate IDs/slugs, URL and phone checks |

## Data rules

Lead data lives in `data/leads.csv` and is mapped to `src/data/salons.json`.

Missing or unusable spreadsheet values (`#ERROR!`, `Not found`, `Not checked`, `Yes` without a URL/number) are stored as `null`. The UI hides WhatsApp, phone, Instagram, Facebook, website, hours, and Google-review buttons unless a verified value exists. The app does not invent contact details, prices, or services.

## Adding photos later

See `public/salons/README.md`.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: Next.js.
4. Set `NEXT_PUBLIC_SITE_URL` to the live origin, for example `https://your-project.vercel.app`.
5. Deploy.

After deploy, salon URLs look like:

`https://YOUR-DOMAIN/salon/beauty-canvas-by-shireen-salon`

Do not commit `.env` files or API keys.

## Windows note (FAT32)

If the project lives on a FAT32/exFAT drive (often `E:\`), `npm run dev` and `npm run build` preload `scripts/fat32-fs-patch.cjs` so webpack does not crash on `fs.readlink`. Vercel builds on Linux, so this does not affect deployment.

## GitHub

```bash
cd E:\salons
git init -b main
git add .
git commit -m "Add dynamic multi-salon website engine with 109 demo URLs."
gh repo create salon-sites --private --source=. --remote=origin --push
```

Or with a remote you already created:

```bash
git remote add origin https://github.com/YOUR_USER/salon-sites.git
git push -u origin main
```

Do not add `.env`, API keys, or credentials. `.gitignore` already excludes them.
