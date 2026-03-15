---
title: Personal Developer Portfolio Website - Shashank Anchuri
type: feat
status: active
date: 2026-03-13
---

# Personal Developer Portfolio Website — Shashank Anchuri

## Overview

Build a production-grade personal developer portfolio website for Shashank Anchuri — an AI engineer targeting AI Engineer, Full-Stack, and ML Engineer roles at Indian companies and international remote positions. The site must tell a compelling story, showcase 6 real projects, display work experience, and include a blog placeholder that is architecturally ready for future weekly AI news roundup automation.

**Primary goal:** Get Shashank hired. Secondary goal: Build an audience via the blog.

---

## Problem Statement

Shashank has strong real-world experience (Yellow.ai, Secureworks, Novartis, Nextenti), a published ML research paper, and 6 substantial projects (RAG engines, AIOps, mobile apps). None of this is discoverable without a portfolio. A resume alone undersells the depth of work. A portfolio with a blog creates a flywheel — recruiters find the work, readers find the blog, the blog builds the brand.

---

## Proposed Solution

A single-domain Next.js portfolio with:
- A visually striking single-page scroll (Hero → About → Experience → Projects → Skills → Blog CTA → Contact)
- A `/blog` route that is a "Coming Soon" placeholder — architecturally MDX-ready so the blog can be activated later without a rewrite
- Dark, dramatic aesthetic (inspired by DevMastery & Enrico Deiana references) fitting for an AI/ML engineer
- Deployed on Vercel with a custom domain

---

## Tech Stack Decision

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSG for speed/SEO, MDX for future blog, API routes for future email subs, Vercel-native |
| Language | **TypeScript** | Type safety, better DX, professional standard |
| Styling | **Tailwind CSS** | Rapid development, consistent spacing, dark mode trivial |
| Animation | **Framer Motion** | Smooth scroll-triggered reveals, hero animations, hover effects |
| Icons | **Lucide React** | Consistent, tree-shakeable icon set |
| Fonts | **Geist (Vercel)** | Clean, modern, renders beautifully at all sizes |
| Deployment | **Vercel** | Free tier, zero-config Next.js, preview deployments, custom domain |
| Package manager | **pnpm** | Fast, efficient |

---

## Design Direction

**Aesthetic:** Dark, high-contrast, developer-native. Cinematic feel with intentional whitespace.

**Color palette:**
- Background: `#080808` (near-black)
- Surface: `#111111` (card backgrounds)
- Border: `#1f1f1f`
- Primary text: `#f5f5f5`
- Secondary text: `#888888`
- Accent: `#3b82f6` (electric blue — AI/tech brand color)
- Accent glow: `rgba(59, 130, 246, 0.15)` (for hover/focus states)

**Typography:**
- Headings: Geist, bold, large scale
- Body: Geist, regular, generous line-height
- Code snippets: Geist Mono

**Influences from shared screenshots:**
- DevMastery: Dark background, bold name + accent color, bento-style stat grid
- Enrico Deiana: Large dramatic hero typography
- CR7 site: Horizontal scroll image strip / career highlights grid
- Capture photographer: Floating UI cards over hero content

**Animations:**
- Hero: Typewriter effect on title or word-by-word reveal
- Sections: Fade-up on scroll enter (Framer Motion `viewport` trigger)
- Project cards: Subtle scale + border glow on hover
- Skills: Staggered pill reveal
- Navbar: Blur backdrop on scroll

---

## Site Structure

### Routes
```
/               → Main portfolio (single-page scroll)
/blog           → Placeholder "Coming Soon" page
/projects/[slug] → (Phase 2 — optional deep-dive per project)
```

### Single-Page Scroll Sections (in order)

1. **Navbar** — Fixed top, blurs on scroll. Links: About, Experience, Projects, Skills, Blog, Contact. GitHub + LinkedIn icon links.

2. **Hero** — Full viewport height.
   - Tag: `// Available for work`
   - Title: `I'm Shashank Anchuri`
   - Subtitle: `AI Engineer · Building intelligent systems that ship`
   - Two CTAs: `View My Work ↓` (scroll) + `Download Resume` (PDF link)
   - Subtle animated background: CSS grid dots or slow particle drift

3. **About** — Two-column layout.
   - Left: Short bio (3–4 sentences, first person, punchy)
   - Right: Profile photo (circular crop) + quick stats (3 roles, 2 years experience, 1 published paper)

4. **Experience** — Vertical timeline.
   - Each entry: Company, role, date range, 2–3 bullet points
   - Entries (newest first): Nextenti Tech, AI Consultant (Self), Yellow.ai, Secureworks, Novartis
   - Visual: Left border timeline line with animated dot

5. **Projects** — 3-column card grid (2-column on tablet, 1 on mobile).
   - 6 project cards, each showing: title, 1-line description, tech stack pills, GitHub link icon
   - Projects:
     1. E-commerce RAG Engine — Python, Docker, K8s, ChromaDB
     2. High-Performance Review Analysis System — Python, Metal GPU, HDBSCAN
     3. Predictive Log Analysis & AIOps Platform — Ray, Scikit-Learn, Streamlit
     4. LockIn Habit Tracker — React Native, Expo, SQLite, TypeScript
     5. Face Recognition Attendance System — Django, Python, FaceNet
     6. Earthquake Magnitude Prediction (Research) — CNN + GRU (link to paper)
   - Featured project (RAG Engine) gets a larger card spanning 2 columns

6. **Skills** — Grouped pill grid.
   - Languages: Python, TypeScript, JavaScript, SQL, GoLang, Rust, C
   - Backend & Cloud: FastAPI, Django, Flask, Docker, Kubernetes, Ray
   - AI/ML: TensorFlow, Scikit-learn, ChromaDB, Sentence-Transformers, HDBSCAN, Pandas
   - Tools: Git, Salesforce, PowerBI, Streamlit, Ollama, SQLite

7. **Blog** — Placeholder CTA section.
   - Heading: `The AI Weekly`
   - Subtitle: `Every Sunday — what happened in the world of AI this week. Written, not filmed.`
   - Status badge: `Coming Soon`
   - Email capture input: `Notify me when it launches` (stores email, no sending yet — or just cosmetic for now)
   - Visual: Newsletter-style mockup card

8. **Contact** — Simple dark section.
   - Heading: `Let's Build Something`
   - Email: shashankanchuri@gmail.com (mailto link)
   - LinkedIn + GitHub buttons
   - Simple contact form (name, email, message) → POST to API route → forward to Gmail (or Formspree for simplicity)

9. **Footer** — Copyright, social links, "Built with Next.js"

---

## File/Folder Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← Root layout, fonts, metadata
│   │   ├── page.tsx                ← Home (assembles all sections)
│   │   ├── blog/
│   │   │   └── page.tsx            ← Blog placeholder
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts        ← Contact form handler
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── BlogPlaceholder.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── ProjectCard.tsx
│   │       ├── SkillPill.tsx
│   │       ├── TimelineItem.tsx
│   │       └── SectionHeader.tsx
│   ├── data/
│   │   ├── projects.ts             ← Project data (title, desc, tech, links)
│   │   ├── experience.ts           ← Work history data
│   │   └── skills.ts               ← Skills grouped data
│   └── lib/
│       └── utils.ts
├── public/
│   ├── resume.pdf                  ← Shashank's resume
│   └── images/
│       └── profile.jpg             ← Profile photo
├── docs/
│   └── plans/
│       └── (this file)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Implementation Phases

### Phase 1: Foundation & Setup
- Initialize Next.js 14 with TypeScript and Tailwind CSS in the Portfolio folder
- Configure Geist font, dark mode default, global CSS variables for color palette
- Set up Framer Motion
- Create base layout (Navbar + Footer)
- Configure `next.config.ts` for image optimization and metadata
- Add `public/resume.pdf` and `public/images/profile.jpg`

**Deliverables:** Running dev server, base layout renders, fonts load correctly.

### Phase 2: Section-by-Section Build
Build each section in order, mobile-first:
1. Hero (animations last)
2. About
3. Experience (timeline)
4. Projects (cards + data layer)
5. Skills (pill grid)
6. Blog placeholder
7. Contact (form + API route)

**Deliverables:** All sections render with real data, fully responsive.

### Phase 3: Animations & Polish
- Framer Motion scroll-triggered reveals on each section
- Hero typewriter / word reveal animation
- Project card hover effects (glow border, scale)
- Navbar blur on scroll
- Staggered skill pill entrance
- Smooth scroll behavior

**Deliverables:** Polished, animated experience matching the design references.

### Phase 4: Deployment
- Create Vercel account / connect GitHub repo
- Push to GitHub, connect to Vercel
- Configure `seo` metadata: title, description, Open Graph image
- Add `robots.txt` and `sitemap.xml` via Next.js built-in
- Configure custom domain (when purchased)
- Performance audit (Lighthouse ≥ 90 on all metrics)

**Deliverables:** Live URL, passing Lighthouse audit.

---

## Technical Considerations

### SEO
- Each page has unique `<title>` and `<meta description>`
- Open Graph tags for social sharing (Twitter card, LinkedIn preview)
- `next/image` for all images (automatic WebP, lazy loading)
- Semantic HTML5 landmark elements (`<main>`, `<section>`, `<article>`, `<nav>`)
- JSON-LD structured data for `Person` schema

### Performance
- Static generation (SSG) — no server needed, Vercel CDN serves everything
- All images through `next/image` with `priority` on hero photo
- Framer Motion loaded lazily where possible
- Font subset loading (only characters used)
- Target: Lighthouse Performance ≥ 90

### Accessibility
- All interactive elements keyboard navigable
- `aria-label` on icon-only buttons (GitHub, LinkedIn)
- Sufficient color contrast ratios (WCAG AA minimum)
- `prefers-reduced-motion` respected in Framer Motion configs

### Contact Form
- Simple: use **Formspree** (free tier, zero backend) for Phase 1
- Future: migrate to Next.js API route + Resend/SendGrid when blog email infra is built
- No database needed for contact form submissions in Phase 1

### Blog Architecture (Placeholder, Future-Ready)
- `/blog` route exists now as a Coming Soon page
- `src/app/blog/[slug]/page.tsx` will be added when blog is activated
- MDX configured in `next.config.ts` from day one (adds near-zero overhead)
- Content will live in `content/blog/*.mdx`
- Email subscription: Resend + database (Phase 2 blog build)
- Auto-generation: AI pipeline (Claude API) scraping AI news → MDX → commit → deploy (Phase 3)

---

## Acceptance Criteria

### Functional
- [ ] All 7 sections render correctly on desktop (1440px), tablet (768px), and mobile (375px)
- [ ] Navbar smooth-scrolls to each section
- [ ] Resume PDF downloads on button click
- [ ] All project GitHub links open in new tab
- [ ] LinkedIn and GitHub social links work
- [ ] Contact form submits successfully (confirmation shown)
- [ ] Blog placeholder section renders with "Coming Soon" state
- [ ] `/blog` route loads as a standalone page

### Visual
- [ ] Dark theme consistent throughout
- [ ] Electric blue accent used consistently for CTAs and highlights
- [ ] All sections have adequate whitespace (not cramped)
- [ ] Typography hierarchy is clear (H1 > H2 > body)
- [ ] Profile photo renders without distortion

### Performance
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO ≥ 95
- [ ] Lighthouse Accessibility ≥ 90
- [ ] First Contentful Paint < 1.5s on Vercel CDN

### Code Quality
- [ ] No TypeScript errors
- [ ] All data (projects, experience, skills) in separate `data/` files, not hardcoded in components
- [ ] No unused dependencies
- [ ] `eslint` passes with no errors

---

## Out of Scope (Phase 1)

- Blog content or automation (placeholder only)
- Email subscription backend
- Project detail pages (`/projects/[slug]`)
- CMS integration
- Analytics (can add Vercel Analytics in 5 minutes post-launch — defer)
- Dark/light mode toggle (dark only for now)

---

## Dependencies & Prerequisites

- [ ] Profile photo (JPG) — Shashank to provide, or placeholder used initially
- [ ] GitHub repo created and pushed
- [ ] Vercel account connected to GitHub
- [ ] Decision on custom domain (shashankanchuri.com or similar)

---

## Future Considerations

### Blog (Phase 2 — Post Launch)
Full plan saved in memory. Summary:
- Weekly AI news roundup, every Sunday
- Automated content generation via AI pipeline
- Email subscriptions via Resend
- Automated LinkedIn post per publish
- MDX content in `content/blog/` committed to repo, Vercel redeploys automatically

### Project Detail Pages
Each project gets its own `/projects/[slug]` page with architecture diagrams, screenshots, technical deep-dive. Useful for technical recruiters.

### Vercel Analytics
Add `@vercel/analytics` in 5 minutes — shows which projects/sections get most traffic. Informs blog topic decisions.

---

## Sources & References

- Resume: `/Users/saishashankanchuri/Documents/AnchuriSaiShashank_Resume.pdf`
- Blog plan: `.claude/projects/.../memory/project_blog_plan.md`
- Design references: DevMastery (dark bento grid), Enrico Deiana (large hero type), CR7 (career highlights grid)
- LinkedIn: linkedin.com/in/sai-shashank-anchuri
- GitHub: github.com/saishashank-a
