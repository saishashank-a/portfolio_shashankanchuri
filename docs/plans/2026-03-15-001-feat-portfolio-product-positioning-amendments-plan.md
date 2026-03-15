---
title: Portfolio-as-Product — Positioning & Conversion Amendments
type: feat
status: active
date: 2026-03-15
origin: docs/brainstorms/2026-03-15-001-portfolio-as-product-sell-the-person-brainstorm.md
deepened: 2026-03-15
---

# Portfolio-as-Product — Positioning & Conversion Amendments

## Enhancement Summary

**Deepened on:** 2026-03-15
**Research agents:** frontend-design skill, performance-oracle, julik-frontend-races-reviewer, architecture-strategist, kieran-typescript-reviewer, code-simplicity-reviewer, security-sentinel, pattern-recognition-specialist, framework-docs-researcher, best-practices-researcher

### Key Improvements Found

1. **Hero animation sequence is a LCP killer** — 1400ms total with H1 at 300ms delay will push Lighthouse LCP over target. Replaced with `staggerChildren` pattern, 60ms apart, full sequence completes in <400ms.
2. **`boxShadow` hover glow is not GPU-composited** — causes main-thread repaints on every hover frame. Replaced with `filter: drop-shadow()` which runs on the compositor alongside `transform`.
3. **Rename `AIGeneralist.tsx` → `Expertise.tsx`** — component name must match nav label ("Expertise"), not marketing copy ("AI Generalist"). Naming consistency with existing sections.
4. **`// Available for work` tag (base spec) must be removed** — it conflicts with the new availability badge in the same visual zone; two signals with different update mechanisms create confusion.
5. **`availability` needs `as const`** — without it, `open` is typed as `boolean` not `true`, losing TypeScript's narrowing guarantees.
6. **`'use client'` required on all animated sections** — Framer Motion is a client-only library; sections missing this directive will cause hydration errors in App Router.
7. **LCP: H1 title must not start at `opacity: 0`** — the large title is likely the LCP element; any animation delay on it will be measured by Lighthouse as deferred content paint.

### Naming Corrections Applied Throughout

- `AIGeneralist.tsx` → `Expertise.tsx`
- `#ai-generalist` anchor → `#expertise`
- `generalist.ts` data file → retained (correct pattern, do not merge into `about.ts`)

---

## Overview

A targeted set of amendments to the existing portfolio design spec (`docs/plans/2026-03-13-001-feat-personal-developer-portfolio-website-plan.md`) that transforms the site from a developer résumé into a **high-converting personal product page**. The organizing principle: Shashank is the product, every section is a sales argument, the visitor is the customer.

These amendments do **not** replace the existing plan — they override and extend specific sections of it. The underlying tech stack, aesthetic, deployment, and infrastructure decisions remain unchanged.

---

## Problem Statement / Motivation

The existing spec builds a technically excellent portfolio. What it lacks is a deliberate conversion strategy:

- The hero leads with identity ("I'm Shashank Anchuri") not value proposition
- There is no explicit "AI Generalist" framing — the differentiator is implied, not stated
- Project cards show what was built, not why it matters
- Social proof (credentials, companies) is buried, not leading
- A single CTA ("View My Work") loses visitors not ready to commit
- No availability signal — recruiters don't know if engagement is even worth their time

Research into top developer portfolios and SaaS landing pages shows the fix is a messaging layer, not an architectural rebuild. (see brainstorm: docs/brainstorms/2026-03-15-001-portfolio-as-product-sell-the-person-brainstorm.md)

---

## Proposed Changes

### Change 1: Hero Section — Complete Copy Rewrite

**File:** `src/components/sections/Hero.tsx`
**Directive required:** `'use client'` (Framer Motion is client-only in App Router)

**Current spec copy:**
```
Tag:      // Available for work        ← REMOVE: replaced by // AI Generalist label + badge
Title:    I'm Shashank Anchuri
Subtitle: AI Engineer · Building intelligent systems that ship
CTAs:     [View My Work ↓]  [Download Resume]
```

**New copy:**
```
Badge:    🟢 Open to full-time + consulting  (always visible, no animation — immediate signal)
Label:    // AI Generalist               (replaces // Available for work)
Title:    I build across the full AI stack.
Proof:    5 companies · 6 shipped projects · 1 published research paper
CTAs:     [Let's Work Together →]  [Download Resume ↓]  [See My Projects ↓]
Strip:    Yellow.ai  ·  Secureworks  ·  Novartis
```

**Critical: Remove `// Available for work` tag.** The base spec includes this tag in the hero. The new `// AI Generalist` label occupies the same position. The new availability badge handles the "available" signal. Two overlapping signals in the same zone create noise. The tag must be deleted.

**Animation sequence (narrative purpose, REVISED):**

> ⚠️ The original 1400ms sequence (label 0ms → title 300ms → proof 800ms → CTAs 1100ms → strip 1400ms) was identified as a critical UX and LCP problem. Recruiters scroll within 300ms. A 1.4s sequence means most visitors never see the proof line animate in. More critically, if the H1 title starts at `opacity: 0`, Lighthouse records LCP as deferred — threatening the ≥90 Performance target.

**Revised approach — use `staggerChildren` with tight timing, total sequence ≤ 400ms:**

```tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
// Note: 'framer-motion' and 'motion/react' are interchangeable; use framer-motion for now

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,   // 70ms between each child — entire sequence ~400ms
      delayChildren: 0.1,      // small delay after mount before first element
    },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}
```

**H1 LCP fix:** The large title ("I build across the full AI stack.") is likely the LCP element. Do NOT wrap it in a `hidden` initial state. Instead, render the title visible immediately and animate only the word-reveal:
- Words start at `opacity: 0.001` (not 0 — avoids display:none optimization that confuses LCP)
- Use `custom={i}` with a `delay: i * 0.06` per word (max ~0.4s for 7 words)
- The H1 element itself is never hidden — only its text content animates

```tsx
// Word-by-word reveal — safe for LCP
const wordVariants = {
  hidden: { opacity: 0.001, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
}

const titleWords = 'I build across the full AI stack.'.split(' ')
// In JSX — H1 is always in the DOM, words animate individually
<h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-[#f5f5f5]">
  {titleWords.map((word, i) => (
    <motion.span key={i} className="inline-block mr-[0.25em]"
      custom={i} variants={wordVariants} initial="hidden" animate="visible"
    >{word}</motion.span>
  ))}
</h1>
```

**Availability badge implementation (pinging green dot):**
```tsx
// Badge reads from src/data/availability.ts
{availability.open && (
  <span className="inline-flex items-center gap-2 text-sm text-[#888888]"
    aria-label="Currently open to full-time and consulting work">
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
    {availability.label}
  </span>
)}
```

**Aesthetic enhancement (from frontend-design skill):**
- Add a subtle SVG grain texture overlay (`opacity-[0.035]`) for film-stock depth
- Add a diffused blue ambient radial gradient in bottom-left corner (`rgba(59,130,246,0.07)`)
- Use `min-h-svh` (safe viewport height) not `min-h-screen` — avoids mobile browser chrome overlap

**CTA implementation:**
- Primary: `<Link href="#contact">` — blue filled button with `bg-[#3b82f6]`
- Secondary: `<a href="/resume.pdf" download rel="noopener noreferrer">` — bordered ghost button
- Tertiary: `<Link href="#projects">` — text-only with arrow, no border

**Credibility strip:**
```tsx
<p className="text-xs tracking-[0.2em] uppercase text-[#444444]"
  aria-label="Previously worked at">
  Yellow.ai&nbsp;&nbsp;·&nbsp;&nbsp;Secureworks&nbsp;&nbsp;·&nbsp;&nbsp;Novartis
</p>
```

**Layout (mobile-first):**
```
[badge — pinging green dot + label]
[label — // AI Generalist, mono, blue]
[title — clamp font, word-by-word reveal]
[proof line — small, muted #888888]
[cta-group — flex-col on mobile, flex-row on sm:]
[credibility strip — centered, letter-spaced, very muted]
```

---

### Change 2: New "Expertise" Section

**File:** `src/components/sections/Expertise.tsx` *(new component, previously named AIGeneralist — renamed)*
**Directive required:** `'use client'` (Framer Motion)
**Anchor:** `id="expertise"` (previously `#ai-generalist`)

**Naming rationale:** Component name must match nav label ("Expertise"), not marketing copy. `AIGeneralist.tsx` bakes content into architecture; `Expertise.tsx` is structural and stable if positioning ever shifts.

**Position:** Between `<About />` and `<Experience />` in `src/app/page.tsx`

**Purpose (from brainstorm):** This section does the job that a recruiter's brain would otherwise have to do — connecting the dots across a diverse resume into a single coherent narrative.

**Content — 3 domain cards:**

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  🔬              │  │  ⚙️              │  │  📱              │
│  AI/ML Research  │  │  Production Eng  │  │  Full-Stack      │
│                  │  │                  │  │  Products        │
│  Published CNN+  │  │  AIOps at        │  │  Mobile to web — │
│  GRU research    │  │  Secureworks,    │  │  shipped across  │
│  on seismic      │  │  100k+ logs/day  │  │  React Native,   │
│  prediction      │  │                  │  │  Django, Next.js │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

**Section headline:** `Why generalist? Because real problems don't fit neat boxes.`

**Animation:** Use `staggerChildren` on the card container, triggered `whileInView`:
```tsx
const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

<motion.div
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
  variants={cardContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  {domains.map((domain) => (
    <motion.article key={domain.title} variants={cardItem}>
      {/* card content */}
    </motion.article>
  ))}
</motion.div>
```

**Viewport `amount: 0.3`** — fires when 30% of the grid is visible. Use `amount` not `margin` for scroll trigger; `margin` expands the detection zone (use for preloading), `amount` specifies how much must be visible (use for animation timing).

**Card hover — film-frame left border (not glow):**
```tsx
// On hover: left border lights up in accent color
<article className="group relative border border-[#1f1f1f] bg-[#111111] p-6 rounded-sm
  transition-colors duration-300 hover:border-[#3b82f6]/30">
  {/* Animated left-edge accent line */}
  <span className="absolute left-0 top-0 h-full w-0.5 bg-[#3b82f6]
    scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" />
```
This uses CSS transform (GPU-composited) instead of box-shadow. No Framer Motion needed on the card itself — CSS handles hover.

**Data file — KEEP `src/data/generalist.ts` (do not inline or merge into `about.ts`):**

The `src/data/` layer is an established pattern (projects.ts, experience.ts, skills.ts). Three items is small but the pattern provides: a consistent import contract, a named type for consumers, and an isolated update path. Merging into `about.ts` would create a naming coupling violation (`Expertise.tsx` importing from `about.ts`).

```ts
// src/data/generalist.ts
export type Domain = {
  icon: string   // emoji for MVP; can be expanded to React.ReactNode later
  title: string
  example: string
}

export const domains: Domain[] = [
  {
    icon: '🔬',
    title: 'AI/ML Research',
    example: 'Published CNN+GRU research on seismic magnitude prediction',
  },
  {
    icon: '⚙️',
    title: 'Production Engineering',
    example: 'AIOps platform at Secureworks — 100k+ logs/day, live anomaly detection',
  },
  {
    icon: '📱',
    title: 'Full-Stack Products',
    example: 'Shipped across React Native, Django, Next.js — from mobile to API to web',
  },
]
```

---

### Change 3: Project Cards → Qualitative Impact Statements

**Files:** `src/components/ui/ProjectCard.tsx`, `src/data/projects.ts`

**Current card layout:**
```
[Project Title]
[1-line description]
[Tech stack pills]
[GitHub icon link]
```

**New card layout:**
```
[Project Title]
[Impact line — italic, muted #888888, line-clamp-2]
[1-line description]
[Tech stack pills]
[→ View on GitHub]  [→ Live Demo (if exists)]
```

**Impact field** (qualitative — metrics deferred to later iteration):

| Project | Impact Line |
|---|---|
| E-commerce RAG Engine | Production-grade semantic search with hallucination detection |
| High-Performance Review Analysis | GPU-accelerated clustering on 1M+ reviews |
| Predictive Log Analysis & AIOps | Live anomaly detection pipeline for security operations |
| LockIn Habit Tracker | Full mobile app — iOS + Android, shipped to real users |
| Face Recognition Attendance | Biometric-grade accuracy on edge hardware |
| Earthquake Magnitude Prediction | Published ML research — CNN+GRU hybrid architecture |

**Data type change in `src/data/projects.ts`:**
```ts
export type Project = {
  title: string
  impact?: string       // ← NEW, optional (consistent with featured?: boolean)
  description: string
  tech: string[]
  github: string
  demo?: string
  featured?: boolean
}
```

**`impact` is optional** (`impact?:`) for two reasons: (1) consistency with `featured?` which is already optional in the type; (2) future projects can be added without a metric ready. When `impact` is absent, the impact line simply doesn't render — no empty space.

**`line-clamp-2` on impact text** — enforces max 2 lines on narrow viewports, prevents card height divergence in the grid:
```tsx
<p className="text-sm italic text-[#888888] line-clamp-2">{project.impact}</p>
```
`line-clamp-2` is built into Tailwind CSS v3.3+. No plugin needed.

**Card hover — use `filter: drop-shadow()` not `boxShadow`:**
```tsx
// AVOID: causes main-thread repaint on every hover frame
whileHover={{ boxShadow: '0 0 24px rgba(59,130,246,0.4)' }}

// CORRECT: GPU-composited via filter compositor layer
whileHover={{ scale: 1.02, filter: 'drop-shadow(0 0 16px rgba(59,130,246,0.35))' }}
```
`box-shadow` is not a GPU-composited property and triggers layout repaint on every animation frame. `filter` runs on the compositor thread alongside `transform` and `opacity`.

**GitHub as destination:** Full text "View on GitHub →" (not icon-only). Links to the specific repo. Add `target="_blank" rel="noopener noreferrer"` on all external links.
```tsx
<a href={project.github} target="_blank" rel="noopener noreferrer"
  className="text-sm font-medium text-[#3b82f6] hover:underline">
  View on GitHub →
</a>
```

---

### Change 4: Scroll Animation Philosophy

**Files:** All `src/components/sections/*.tsx`
**Directive required on each:** `'use client'` — Framer Motion cannot run in Server Components

**Principle (from brainstorm):** Every animation must *reveal* something. No motion for aesthetics alone.

This is a refinement to the existing Phase 3 animation spec:

| Section | Animation | Narrative Purpose |
|---|---|---|
| Hero | Word-by-word title reveal + fast stagger (≤400ms total) | "Arrival" — earns attention without making visitor wait |
| About | Left column from left, right (photo) from right | Two sides of the same person, converging |
| Expertise | `staggerChildren` 150ms, cards enter left → center → right | Breadth revealed progressively |
| Experience | Timeline items stagger oldest-first | Career arc as progression |
| Projects | Cards fade-scale in (100ms stagger) | Depth hidden until explored |
| Skills | Pill groups stagger by category (80ms per pill) | Taxonomy: languages → backend → AI → tools |
| Blog | Fade up from below | "What's coming" — deferred, not denied |
| Contact | Single fade-in | Clean close |

**Standard `whileInView` pattern (use this everywhere):**
```tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function SomeSection() {
  const prefersReduced = useReducedMotion()
  return (
    <motion.section
      variants={prefersReduced ? {} : sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}  // fires when 20% visible
    >
```

**`amount` vs `margin` in `viewport`:**
- Use `amount: 0.2` (20% visible) as the standard trigger — consistent across all sections
- `margin` expands/contracts the detection boundary — use it for preloading (not animation triggers)
- `once: true` is mandatory — prevents animations reversing on scroll-up

**GPU-safe properties only:**
- Animate: `opacity`, `transform` (y, x, scale, rotate) — compositor-threaded
- Never animate: `width`, `height`, `top`, `left`, `margin`, `padding` — triggers layout
- Card glow: `filter: drop-shadow()` not `box-shadow`
- Card border highlight: CSS `scale-y` pseudo-element, not `border-color` animation

**`useReducedMotion` pattern:**
```tsx
const prefersReduced = useReducedMotion()
// If true: pass empty variants {} and skip initial/animate props
// Framer Motion renders elements in their final state immediately
```

**Hero-specific: `'use client'` placement matters for Next.js App Router:**
- `src/app/page.tsx` should remain a Server Component (no `'use client'`)
- Each section component (`Hero.tsx`, `Expertise.tsx`, etc.) gets its own `'use client'` directive
- This enables Next.js to code-split Framer Motion into per-section chunks
- Verify after build: `framer-motion` must NOT appear in First Load JS shared bundle

**Stagger pattern for child lists (Skills pills, Project cards, Expertise cards):**
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

// Parent uses whileInView; children inherit through variants
<motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
  {items.map((item) => <motion.li key={item.id} variants={item} />)}
</motion.ul>
```
Children do **not** need their own `initial`/`whileInView` — they inherit from the parent automatically when using shared variant names.

---

### Change 5: Navbar Update

**File:** `src/components/layout/Navbar.tsx`

**Addition:** "Expertise" nav link → `#expertise` anchor (note: updated from `#ai-generalist` to match component rename).

**Nav links (updated order — 7 links):**
```
About | Expertise | Experience | Projects | Skills | Blog | Contact
```

**Mobile concern (identified in review):** 7 links is approaching the limit for a single-row nav on mobile. Implementation should include a hamburger menu at `sm:` breakpoint or smaller. The base spec mentions this but doesn't define it. Recommended pattern:

```tsx
// Show full nav on md: and above; hamburger below
<nav className="hidden md:flex items-center gap-6">
  {/* full link list */}
</nav>
<button className="md:hidden" aria-label="Open menu">
  {/* hamburger icon */}
</button>
```

**All nav anchor links** must use `href="#section-id"` (hash links). Next.js `<Link>` handles these correctly for same-page scroll. Add `scroll-behavior: smooth` to the global CSS via `html { scroll-behavior: smooth }` in `globals.css`.

---

## Updated File/Folder Structure

Additions to existing structure from `2026-03-13-001` plan:

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx              ← MODIFIED: new copy, 3 CTAs, badge, credibility strip, grain texture
│   │   ├── Expertise.tsx         ← NEW: generalist positioning section (was AIGeneralist.tsx)
│   │   └── (all others — each needs 'use client' directive for Framer Motion)
│   └── ui/
│       └── ProjectCard.tsx       ← MODIFIED: adds optional impact field + filter:drop-shadow hover
├── data/
│   ├── projects.ts               ← MODIFIED: adds impact?: string to Project type
│   ├── generalist.ts             ← NEW: Domain type + domains array
│   └── availability.ts           ← NEW: { open: boolean, label: string } as const
└── app/
    └── page.tsx                  ← MODIFIED: inserts <Expertise /> between <About /> and <Experience />
```

**`src/data/availability.ts` — must use `as const`:**
```ts
// Without 'as const': open is typed as boolean (mutable, loses narrowing)
// With 'as const': open is typed as literal true/false (immutable, TypeScript narrows correctly)
export const availability = {
  open: true,
  label: 'Open to full-time + consulting',
} as const
```

**Security note on `availability.ts` in public repo:** Committing availability status to git makes your availability history permanently visible in git log. This is intentional for a public portfolio — it's public information. If you want to avoid the history trail, use an environment variable instead: `NEXT_PUBLIC_AVAILABLE=true` in `.env.local` and `process.env.NEXT_PUBLIC_AVAILABLE === 'true'` in the component. For Phase 1, the file approach is simpler and sufficient.

---

## Updated Section Order

The portfolio now has **10 sections** (was 9):

1. Navbar (updated: +Expertise link, hamburger on mobile)
2. Hero (updated: new copy, pinging badge, credibility strip, 3 CTAs, grain texture)
3. About (unchanged)
4. **Expertise** *(new — `Expertise.tsx`, `#expertise`)*
5. Experience (unchanged)
6. Projects (updated: optional impact statements, `filter: drop-shadow()` hover)
7. Skills (unchanged)
8. Blog (unchanged)
9. Contact (unchanged)
10. Footer (unchanged)

---

## Technical Considerations

### Performance Impact

Adding one new section and expanding ProjectCard adds minimal overhead when done correctly:
- `Expertise.tsx` is a static component (SSG) — zero runtime cost
- Impact strings in `projects.ts` are data, not logic
- All new animations use `transform` + `opacity` + `filter` only — GPU-composited
- No new dependencies (Framer Motion already in stack)
- The package `framer-motion` and `motion` are the same library; either import works

**LCP risk — most important performance concern:** The H1 title in the hero is likely the LCP element. Any animation that starts it at `opacity: 0` will cause Lighthouse to record LCP only after the animation completes. Fix: H1 is always in the DOM and visible; only its child `<motion.span>` words animate from near-invisible (`opacity: 0.001`). Verify LCP in Lighthouse after implementation.

**Framer Motion code-splitting:** Every section component must have `'use client'` at the top. `page.tsx` and `layout.tsx` must remain Server Components. This lets Next.js code-split Framer Motion into per-section chunks, keeping it out of the First Load JS critical path. Verify with `@next/bundle-analyzer` after build.

**`box-shadow` vs `filter: drop-shadow()`:** `box-shadow` is not GPU-composited — it triggers main-thread repaint on every animation frame. All hover glow effects must use `filter: drop-shadow()` instead. The visual result is equivalent; the performance cost is ~10x lower.

### Accessibility

- Availability badge: `aria-label="Currently open to full-time and consulting work"` — emoji is decorative; screen readers skip it
- Credibility strip: wrap in `<p aria-label="Previously worked at">` — not a heading
- Expertise section: each domain card uses `<article>` semantic element
- All external links: `target="_blank" rel="noopener noreferrer"` — prevents tab-napping, cleans referrer
- Smooth scroll: add `html { scroll-behavior: smooth }` to `globals.css`; Framer Motion `whileInView` is compatible

### Mobile Layout

- Hero CTAs: `flex-col` on mobile, `flex-row` on `sm:` — tap targets minimum 44px height
- Credibility strip: `flex-wrap justify-center` on mobile — all 3 names fit in one row at 375px, wrap gracefully if not
- Expertise section: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` — tablet shows 2 cards top + 1 centered
- Navbar: hamburger at `md:` breakpoint — 7 links don't fit a single row on mobile

### Impact Line Truncation

Apply `line-clamp-2` (Tailwind v3.3+ built-in, no plugin needed) to the impact `<p>` element — caps at 2 lines on narrow viewports and prevents card height divergence in the grid.

### Availability Badge Update Mechanism

Toggle `availability.open` in `src/data/availability.ts` and push. Vercel redeploys in ~30s. Use `as const` to preserve TypeScript narrowing. For zero-git-history updates, use `NEXT_PUBLIC_AVAILABLE` env var instead (set in Vercel dashboard, triggers redeploy).

### CTA Behavior Specification

- "Let's Work Together →": `href="#contact"` — same-page smooth scroll
- "Download Resume": `<a href="/resume.pdf" download rel="noopener noreferrer">` — `download` attribute triggers download, `rel` prevents tab-napping
- "See My Projects ↓": `href="#projects"` — same-page smooth scroll

### Security

- **PDF metadata:** Run `exiftool resume.pdf` and strip metadata (`exiftool -all= resume.pdf`) before committing. PDF metadata can leak editor name, creation date, company names you may not want public.
- **External links:** All `target="_blank"` links must have `rel="noopener noreferrer"` — prevents reverse tab-napping attack.
- **Email mailto link:** Displayed plaintext emails are scraped by bots. Consider obfuscating with CSS direction trick or encoding, or using a contact form only. Low priority for a portfolio — make your own call.
- **Credibility strip framing:** Text must clearly imply past employment, not current partnership or endorsement (legal risk). Good: "Worked at Yellow.ai · Secureworks · Novartis". Avoid: "In partnership with..." or "Trusted by...".

---

## Acceptance Criteria

### Hero

- [ ] Title reads "I build across the full AI stack." (not "I'm Shashank Anchuri")
- [ ] Label "// AI Generalist" appears above the title
- [ ] Proof line "5 companies · 6 shipped projects · 1 published research paper" appears between title and CTAs
- [ ] Three CTAs render: "Let's Work Together →", "Download Resume", "See My Projects ↓"
- [ ] Availability badge "🟢 Open to full-time + consulting" is visible in hero
- [ ] Credibility strip shows "Yellow.ai · Secureworks · Novartis" in muted text below CTAs
- [ ] All CTAs work: contact scrolls to Contact, resume downloads PDF, projects scrolls to Projects
- [ ] Animations play in specified sequence (label → title → proof → CTAs → strip)

### Expertise Section

- [ ] Section renders between About and Experience sections (component: `Expertise.tsx`, anchor: `#expertise`)
- [ ] Three domain cards display: AI/ML Research, Production Engineering, Full-Stack Products
- [ ] Each card has icon, title, and one-line example
- [ ] Section headline "Why generalist? Because real problems don't fit neat boxes." renders above cards
- [ ] `staggerChildren` entrance animation plays on scroll entry (`viewport={{ once: true, amount: 0.3 }}`)
- [ ] Cards are equal height on desktop (CSS grid row alignment)
- [ ] Layout: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`
- [ ] Navbar "Expertise" link smooth-scrolls to `#expertise`
- [ ] `Expertise.tsx` has `'use client'` directive

### Project Cards

- [ ] Each of 6 project cards has an impact line in muted italic style
- [ ] Impact line appears between title and description
- [ ] GitHub link is full text "View on GitHub →", not icon-only
- [ ] `projects.ts` data type includes `impact` field for all 6 projects

### Animations

- [ ] Every section has scroll-triggered entrance animation
- [ ] `prefers-reduced-motion` disables or reduces all animations
- [ ] No layout-triggering properties (width, top, left) animated — only transform + opacity
- [ ] AI Generalist cards stagger with 150ms delay between each

### Navbar

- [ ] "Expertise" nav link added and scrolls to AI Generalist section
- [ ] Nav remains readable and not overcrowded on mobile (collapse to hamburger if needed)

### General

- [ ] No TypeScript errors introduced
- [ ] Lighthouse scores remain ≥ 90 Performance, ≥ 95 SEO, ≥ 90 Accessibility
- [ ] All sections render correctly at 375px (mobile), 768px (tablet), 1440px (desktop)
- [ ] `src/data/availability.ts` uses `as const` and badge reads from it
- [ ] Impact lines on project cards never exceed 2 lines (`line-clamp-2` applied)
- [ ] CTAs use correct href anchors: `#contact`, `/resume.pdf`, `#projects`
- [ ] `public/resume.pdf` exists before first deploy (PDF metadata stripped)
- [ ] All animated sections have `'use client'` directive; `page.tsx` remains Server Component
- [ ] LCP element (H1 title) is never fully hidden at `opacity: 0` — Lighthouse verified
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] `framer-motion` does NOT appear in First Load JS shared bundle (check with bundle-analyzer)
- [ ] `// Available for work` tag removed from base Hero spec — replaced by `// AI Generalist` label + badge

---

## Alternatives Considered

### Full SaaS-style Page Restructure (Rejected)

Rebuilding section order to: Hero → Proof strip → Case studies → About → Experience → Contact. Rejected because recruiter expectations for portfolio structure are real — deviating too far feels off and reduces trust. (see brainstorm: docs/brainstorms/2026-03-15-001-portfolio-as-product-sell-the-person-brainstorm.md)

### Quantified Metrics on Project Cards (Deferred)

"Reduced latency by 40%" style impact lines would convert better than qualitative ones. Deferred — Shashank needs to compile the actual numbers first. The `impact` field in `projects.ts` is designed to accept either format when metrics are ready.

### Single CTA (Rejected)

Keeping a single "View My Work" CTA. Rejected — research shows single CTAs lose all visitors not ready for that commitment level. Three levels serve three visitor intents simultaneously.

---

## Implementation Order

Within the existing Phase 2 (section-by-section build) and Phase 3 (animations), integrate changes in this order:

1. **Data first:** Update `src/data/projects.ts` with `impact` field; create `src/data/generalist.ts`
2. **Hero rewrite:** New copy, badge, strip, 3 CTAs (structure first, animations in Phase 3)
3. **ProjectCard update:** Add impact line rendering
4. **AIGeneralist component:** Build the new section (static first, animate in Phase 3)
5. **page.tsx:** Insert `<AIGeneralist />` in correct position
6. **Navbar update:** Add "Expertise" link
7. **Animations (Phase 3):** Assign narrative-purpose animations to all sections per the table above

---

## Sources & References

### Origin

- **Brainstorm document:** [docs/brainstorms/2026-03-15-001-portfolio-as-product-sell-the-person-brainstorm.md](../brainstorms/2026-03-15-001-portfolio-as-product-sell-the-person-brainstorm.md)
  - Key decisions carried forward: "AI Generalist" positioning in hero, 3-level CTA funnel, new AI Generalist section, narrative-purpose animations, text-only credibility strip, "Open to full-time + consulting" badge

### Internal References

- Base portfolio spec: [docs/plans/2026-03-13-001-feat-personal-developer-portfolio-website-plan.md](2026-03-13-001-feat-personal-developer-portfolio-website-plan.md)
- Blog automation plan: `.claude/projects/.../memory/project_blog_plan.md`

### External References

- [How Recruiters Actually Look at Portfolios](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio) — 3-minute rule, proof-first structure
- [SaaS Landing Page Best Practices 2025](https://magicui.design/blog/saas-landing-page-best-practices) — multiple CTA levels, social proof placement
- [GSAP ScrollTrigger + Framer Motion patterns](https://animation-addons.com/blog/30-gsap-scrolltrigger-examples/) — narrative animation techniques
- [Daiki Fujita Portfolio 2025](https://tympanus.net/codrops/2025/09/30/abstract-feelings-concrete-forms-daiki-fujita-portfolio-2025/) — progressive reveal as curiosity mechanism
- [Framer Motion `useReducedMotion` docs](https://www.framer.com/motion/use-reduced-motion/) — accessibility implementation
