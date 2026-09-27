# kumod-portfolio

**Personal portfolio of Nguyen Thanh Dat (KumoD)** — Front-End Developer specializing in React, Next.js, and modern web applications.

---

## Overview

A full-featured portfolio website built to:

- **Showcase projects** — Detailed case studies: problem → solution → results, with images/video and real metrics
- **Share knowledge** — Technical blog covering architecture decisions, trade-offs, and lessons learned
- **Introduce the person** — Personal story, brand, and engineering philosophy
- **Enable contact** — Email and social links (protected by Cloudflare Turnstile)

Unlike typical static portfolios, this includes a **dedicated Dashboard** for content management — create, edit, and delete content without redeploying code.

---

## Purpose

1. **Demonstrate real capability** — Not just a tech stack list, but the thinking process, architectural decisions, and concrete problem-solving
2. **Own the content** — Write blogs, update projects, upload media directly in the Dashboard — no external CMS dependency
3. **Zero cost** — Runs entirely on permanent free tiers: Vercel Hobby + Neon Postgres + Upstash Redis + Cloudinary free tier. No credit card, no surprise charges, no instance sleeping after inactivity
4. **Performance & SEO first** — Default dark theme, ISR for public pages, hybrid canvas+DOM hero (WebGL decorative only, content is real HTML), variable fonts, Cloudinary-transformed images

---

## Features

### Public Site (no auth required)

| Route | Description |
|-------|-------------|
| `/` | Hero with canvas/WebGL background + DOM content, intro, featured projects |
| `/projects` | Full project list, filterable by tech stack/tag |
| `/projects/[slug]` | Case study: Problem → Solution → Result, images/video, metrics |
| `/about` | Personal story, brand, technical trade-offs |
| `/blog` & `/blog/[slug]` | Blog posts (optional) |
| `/contact` | Email, social links — Turnstile protected |

### Dashboard (single admin via GitHub OAuth)

| Route | Description |
|-------|-------------|
| `/dashboard` | Overview: project/post counts, recent activity |
| `/dashboard/login` | GitHub OAuth login |
| `/dashboard/projects` | Project list, drag-drop reorder, toggle featured |
| `/dashboard/projects/new` & `/[id]` | Create/edit project — form + MDXEditor for case study |
| `/dashboard/posts` | Blog management (optional) |
| `/dashboard/media` | Browse Cloudinary uploads for reuse (optional) |
| `/dashboard/activity` | Audit log of all changes (optional) |

---

## Tech Stack (and Why)

| Layer | Technology | Reason |
|-------|------------|--------|
| **Framework** | Next.js 15 App Router | Server Components, ISR, Server Actions, edge middleware |
| **Database** | Neon (Postgres serverless) | Scale-to-zero, no sleep like Supabase free, fast cold start |
| **ORM** | Drizzle ORM | Lightweight, type-safe, no heavy runtime like Prisma |
| **Auth** | Auth.js v5 + GitHub OAuth | Single admin, no public signup, no password forms |
| **Validation** | Zod v4 | Shared schema server/client, no duplicate rules |
| **Media** | Cloudinary signed upload | Auto transform, global CDN, client direct upload (no server proxy) |
| **Rate limiting** | Upstash Redis | Free tier, edge-compatible, simple |
| **UI** | shadcn/ui + Tailwind v4 | Accessible, customizable, CSS-first config (no tailwind.config.js) |
| **Editor** | MDXEditor | Markdown/MDX, custom image/video plugins → Cloudinary |
| **Fonts** | next/font/google | Bodoni Moda (heading), Plus Jakarta Sans (body) — variable fonts reduce CLS |
| **Hosting** | Vercel Hobby | Optimized for Next.js, auto deploy |

**All services have permanent free tiers, no credit card required.**

---

## Design & Experience

- **Theme**: Dark-only, "Metallic Gold" luxury aesthetic
  - Background: `#0A0A0B` / `#161618`
  - Gold accent: `#D4AF37`, Highlight: `#F0D678`, Shadow: `#8A6D1F`
  - Text: `#E8E6E1`
- **Typography**: Bodoni Moda (heading), Plus Jakarta Sans (body), JetBrains Mono (code)
- **Hero**: Hybrid canvas/WebGL (decorative only: particles, cursor trail, background animation) + real DOM content — fast LCP, SEO-friendly, accessible
- **Desktop vs Mobile**: Separate logic — Desktop has full WebGL/animation/custom cursor; Mobile uses its own layout/components, NOT just CSS hiding
- **Accessibility**: Global `prefers-reduced-motion: reduce` support

---

## Getting Started

### Requirements

- Node.js 18+
- Yarn 1.22.x (see `packageManager` in package.json)
- Accounts: Neon, Cloudinary, GitHub OAuth App, Upstash Redis, Cloudflare Turnstile

### Installation

```bash
git clone <repo-url>
cd kumod-portfolio
yarn install
cp .env.example .env.local
# Fill in all 11 env variables
yarn db:push
yarn dev
```

Open http://localhost:3000

### Environment Variables (11 required)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon connection string |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Base URL (local: `http://localhost:3000`) |
| `AUTH_GITHUB_ID` | GitHub OAuth Client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth Client Secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key |
| `TURNSTILE_SITE_KEY` | Turnstile site key |

---

## Available Scripts

```bash
yarn dev        # Development server
yarn build      # Production build
yarn start      # Run production server
yarn lint       # ESLint
yarn db:push    # Push schema to Neon
yarn db:studio  # Drizzle Studio UI
yarn db:generate # Generate migrations
yarn db:migrate  # Run migrations
```

---

## Project Structure

```
kumod-portfolio/
├── app/
│   ├── (public)/       # Public routes — no auth
│   ├── (dashboard)/    # Protected routes — middleware guard
│   ├── api/            # Webhook endpoints only
│   ├── globals.css     # Tailwind v4 + design tokens
│   └── layout.tsx      # Root layout + fonts
├── components/
│   ├── ui/             # shadcn/ui components
│   └── customs/        # Custom components
├── server/
│   ├── actions/        # Server Actions (CRUD)
│   ├── db/             # Drizzle + schema
│   ├── lib/            # Auth, Redis, Cloudinary utils
│   └── services/       # Business logic
├── lib/validators/     # Zod schemas (shared)
├── hooks/queries/      # React Query hooks
├── features/public/    # Public feature modules
├── features/dashboard/ # Dashboard feature modules
├── assets/             # Icons, images, lotties
├── configs/            # App config
├── types/              # Global TS types
├── locales/            # i18n en/vi
└── docs/               # Architecture & design docs
```

---

## Security & Authentication

- **Single admin**: Only one GitHub account can access `/dashboard/**`
- **Edge middleware**: Blocks unauthorized access before route loads — no per-page checks
- **No public signup**: No registration, no password forms
- **Rate limiting**: Upstash Redis on login & contact form
- **Bot protection**: Turnstile only on `/contact` — NOT on homepage (avoids blocking crawlers, link previews, and slowing LCP)
- **Signed uploads**: Server generates signature, client uploads directly to Cloudinary — no unsigned presets

---

## Content Management (Dashboard)

- **Projects**: Create/edit/delete, reorder, toggle featured, MDX case studies
- **Posts**: Blog management with MDXEditor (optional)
- **Media**: Browse Cloudinary uploads for reuse (optional)
- **Activity log**: Audit trail of all changes (optional)

### MDXEditor Workflow

1. User inserts image → editor calls Server Action to sign Cloudinary upload
2. Client uploads directly to Cloudinary → receives URL
3. Inserts `![alt](url)` into MDX
4. Video: custom `<Video src="..." />` component via JSX plugin
5. Public render: `next-mdx-remote` + component map resolves `Video` → `<video>`

---

## Deployment

**Vercel (recommended)**:

1. Connect repository
2. Add all 11 environment variables
3. Push to main → auto deploy

**After first deploy**:

```bash
yarn db:migrate
```

**Image optimization**: All images via Cloudinary transformations (resize, auto format). Use `next/image` with Cloudinary loader. Never serve raw originals.

---

## Development Guidelines

1. **No `any` types** — Strict TypeScript
2. **Shared Zod schemas** — Single source of truth for validation
3. **Server Actions for mutations** — No REST API for internal CRUD
4. **Tailwind v4 CSS-first** — Use `@theme inline` in `globals.css`, no `tailwind.config.js`
5. **ISR for public pages** — `revalidate` or `revalidatePath`/`revalidateTag` triggered on Dashboard save
6. **Dynamic imports** for heavy components (MDXEditor, Three.js)
7. **Variable fonts** to reduce CLS
8. **Adding features**: Check `.kilo/rules/architecture.md` → follow existing patterns → shared Zod → Server Action → update README

---

## License

Private project — all rights reserved.

---

## Author

**Nguyen Thanh Dat (KumoD)**
- Front-End Developer
- React / Next.js Specialist
- Web Applications, CMS, E-Commerce, Blogs

---

*Built with ❤️ using Next.js 15, TypeScript, and a free-tier-first architecture.*