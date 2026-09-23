# Portfolio — CLAUDE.md

## Project Overview
This is the **published personal site** at `shashankanchuri.space` (deployed on Vercel). It serves:
- A portfolio homepage (hero / projects / experience / skills / contact).
- A blog ("Context Window", formerly "The AI Weekly") under `/blog/<slug>` — each post is its own route folder with a `page.tsx`.
- A daily **Morning Debrief** at `/debrief`, rendered from `src/data/debrief.json`.

Crucially, this repo is a **publishing target**: an external `debrief` project (sibling repo, run via GitHub Actions) generates `src/data/debrief.json`, commits it, and git-pushes here to trigger a Vercel redeploy. Treat that JSON as a machine-written input, not source you author by hand.

## Tech Stack
- **Next.js 16.1.6** (App Router) + **React 19.2.3** / react-dom 19.2.3.
- **TypeScript 5** (strict-ish; path alias `@/*` → `./src/*`).
- **pnpm** (lockfile is `pnpm-lock.yaml`; `pnpm-workspace.yaml` exists but only declares `ignoredBuiltDependencies: [sharp, unrs-resolver]` — there are **no workspace packages**, so this is effectively a single-package repo, not a true monorepo).
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, configured in `postcss.config.mjs`; styles live in `src/app/globals.css` using CSS variables like `--background`, `--fg`, `--accent`).
- **framer-motion 12** for animations (hero signature animates letter-by-letter in aria-hidden spans — e2e matches the `<h1>` by accessible name).
- **Inter / Geist Mono** fonts via `next/font/google`.
- **next-themes** pinned to one dark studio theme (`forcedTheme="dark"`); `:root` and `.dark` share the palette in `globals.css`. Reading pages wrap content in `.paper-sheet` (ink-on-cream). No theme toggle.
- **react-markdown + remark-gfm** to render the debrief markdown.
- **Resend** for email (blog subscribe + debrief distribution); **@vercel/blob** for audio asset storage.
- **Playwright** (`@playwright/test` 1.59) for e2e, chromium-only, baseURL `http://localhost:3100`.
- **ESLint 9** with `eslint-config-next`.

## Architecture & Data Flow
```
debrief repo (GH Actions, scripts/run-debrief.sh + publish-brief.mjs)
   ├─ runs 9 research agents → output/*.md
   ├─ parses them → writes  src/data/debrief.json  (in THIS repo)
   └─ git commit + push  ──▶  Vercel redeploy  ──▶  /debrief renders the new JSON
```
- `/debrief` (`src/app/debrief/page.tsx`) imports `@/data/debrief.json` at build time; it sets `export const revalidate = 3600` (ISR) but fresh content arrives via redeploy on each push.
- Static portfolio/blog content lives in `src/data/*.ts` (`projects.ts`, `experience.ts`, `skills.ts`, etc.) and per-post route folders under `src/app/blog/`.
- `/api/subscribe` (`src/app/api/subscribe/route.ts`) adds blog subscribers to a Resend audience.
- Security headers (CSP, X-Frame-Options, etc.) are defined in `next.config.ts` — the CSP allowlists the Vercel Blob domain for media; **update the CSP there if you add a new external asset host or it will be blocked in production.**

## Folder Structure
```
src/app/            App Router routes
  page.tsx          homepage
  layout.tsx        root layout (fonts, ThemeProvider)
  globals.css       Tailwind v4 + CSS variable theme
  blog/<slug>/      one folder per blog post
  debrief/          Morning Debrief page (renders src/data/debrief.json)
  api/subscribe/    Resend subscribe endpoint
src/components/     ui/ · sections/ · layout/ · providers/
src/data/           static content (.ts) + debrief.json (GENERATED — do not hand-edit)
e2e/                Playwright specs (portfolio.spec.ts) + screenshots/
scripts/            debrief publisher + one-off email senders (publish-brief.mjs, send-*-email.mjs)
docs/               brainstorms/ + plans/ (human notes)
briefings/          (empty, .gitkeep) — reserved for debrief artifacts
output/             GENERATED + gitignored — debrief agent markdown, machine-written
logs/              GENERATED + gitignored — debrief run logs
public/             static assets (audio/*.mp3 are gitignored)
.github/workflows/  morning-debrief.yml (cron + publish)
Portfolio/          stray nested dir — a single orphan CLAUDE.md; not part of the app
```

## Commands (verified against package.json)
```bash
pnpm install            # install deps (use pnpm, not npm, locally — CI uses npm install)
pnpm dev                # next dev — local server on :3100 (3000 is taken by another local project)
pnpm build              # next build — production build
pnpm start              # next start — serve the production build
pnpm lint               # eslint

pnpm exec playwright test                 # run all e2e specs (start `pnpm dev` first; no webServer configured)
pnpm exec playwright test --headed        # watch the browser
pnpm exec playwright test -g "TurboQuant" # run a single test by title
pnpm exec playwright show-report e2e/playwright-report
```
Note: `playwright.config.ts` has **no `webServer`** block — you must run `pnpm dev` (or `pnpm build && pnpm start`) in a separate terminal before `playwright test`, or every test fails to connect to `localhost:3100`.

## Editing Rules
- Use **pnpm** for local dependency changes (keep `pnpm-lock.yaml` authoritative). Do not introduce `package-lock.json` / `yarn.lock`.
- Use the `@/` import alias for anything under `src/`.
- New blog post = new folder `src/app/blog/<slug>/page.tsx`; follow the structure of an existing post (e.g. `turboquant-how-google-just-made-ai-6x-cheaper`). If you add an e2e assertion for it, list it the way existing post tests do.
- Styling is Tailwind v4 + CSS variables — reuse the `--fg` / `--background` / `--accent` / `--secondary` variables rather than hard-coding colors, so light/dark stay consistent.
- If you add an external image/media/font/connect host, **also add it to the CSP in `next.config.ts`** or it breaks only in production.
- Keep components in the right bucket: `ui/` (atoms), `sections/` (homepage sections), `layout/` (nav/footer), `providers/` (context).

## Dangerous Areas — do NOT hand-edit
- **`src/data/debrief.json`** — machine-generated by the `debrief` repo's `publish-brief.mjs`. Any manual edit will be silently overwritten on the next 5:30 AM IST run, and a malformed edit breaks the `/debrief` build. If you must change the *rendering*, edit `src/app/debrief/page.tsx`, not the data.
- **`output/` and `logs/`** — gitignored, written by `scripts/run-debrief.sh`. Ephemeral; never commit, never rely on their contents persisting.
- **`briefings/`** — reserved for machine artifacts; leave the `.gitkeep` and don't author files here by hand without checking the debrief pipeline.
- **Vercel deploy triggers** — a push to the default branch redeploys production. The debrief bot pushes daily via `.github/workflows/morning-debrief.yml`. Avoid force-pushes or rebases that could collide with the bot's automated commits (author `Morning Debrief Bot`).
- **`next.config.ts` CSP** — too-tight changes silently break media/fonts in prod only (local dev is more permissive).
- **`scripts/*.mjs`** — `publish-brief.mjs` and the `send-*-email.mjs` scripts call Resend and can send real email to real recipients. Do not run them casually; respect `SKIP_EMAIL` / `EMAIL_ONLY` env guards.

## Debugging Playbook
1. **Build fails after a debrief push** → suspect malformed `src/data/debrief.json`. Validate it (`node -e "require('./src/data/debrief.json')"` won't work for JSON import, use `cat | jq .`). The page expects keys `date`, `generatedAt`, `content` (markdown string).
2. **`/debrief` shows "Not yet published"** → `debrief.json` has empty/whitespace `content`. Check the latest GH Actions "Morning Debrief" run and `logs/<date>.log` in the debrief repo.
3. **e2e all fail / connection refused** → no dev server running. Start `pnpm dev` first (no `webServer` in playwright config).
4. **e2e hero text assertion fails** → hero name (signature) letters are aria-hidden framer-motion spans; the `<h1>` name comes from `aria-label`. Match with `getByRole('heading', { level: 1, name: 'Shashank Anchuri' })`.
5. **Media/font 404 only in production** → CSP in `next.config.ts` is blocking the host. Add it to the relevant `*-src` directive.
6. **Subscribe endpoint 500** → check `RESEND_API_KEY` / `RESEND_AUDIENCE_ID` env vars (set in `.env.local` / Vercel, not committed).
7. **Local vs CI dep drift** → CI uses `npm install` (see workflow), local uses pnpm. If something works locally but breaks in Actions, reconcile against `pnpm-lock.yaml`.

## Self-Improvement Rule
When you fix a bug, discover a non-obvious constraint, or get corrected, append a **specific, reusable** rule here under "Recent Lessons" (or in the nearest directory-level CLAUDE.md, e.g. `e2e/CLAUDE.md` for test gotchas). Write the concrete trigger and fix, not a generic platitude.

## Recent Lessons
- 2026-09-23: `pnpm lint` showed 48 errors while `pnpm build` passed → Next 16 does not lint during build, so lint rot goes unnoticed → run `pnpm lint` explicitly before pushing.
- 2026-09-23: `// Label` eyebrow text in JSX tripped `react/jsx-no-comment-textnodes` → it's intended visible text → write it as `{'// Label'}`.
- 2026-09-23: `npx pnpm …` (no global pnpm) rewrote `pnpm-workspace.yaml` with an `allowBuilds:` block → pnpm 10 build-approval prompt → `git checkout pnpm-workspace.yaml` after, or `corepack enable` so real pnpm is used.
- 2026-09-23: "Hydrated yet?" checks via `useEffect(() => setX(true), [])` fail `react-hooks/set-state-in-effect` → use `useSyncExternalStore(() => () => {}, () => true, () => false)` (ThemeToggle, since removed, used this).
- 2026-09-23: Hydration mismatch on every blog post → each post has its own `ShareBar.tsx` copy that rendered `{typeof navigator !== 'undefined' && …}` → use `useSyncExternalStore(..., () => !!navigator.share, () => false)`. Fix all copies together (they're duplicated per post, not shared).
- 2026-09-23: Site theme lives in one place → `:root, .dark` palette + `.paper-sheet` in `globals.css`; nav/footer/tiles/cursor render from `src/app/layout.tsx`. New pages get the look by wrapping content in `<div className="paper-sheet max-w-2xl mx-auto">`.
- 2026-09-23: Paper texture "not visible" though it looked fine in 2x screenshots → at 1x DPR the blank-paper luma stddev was ~1 (humans need ~3+) → tune `.paper-sheet::before` by measuring luma stddev on a blank strip of /debrief at 1x (target ~3.5–5), not by eyeballing retina shots.
