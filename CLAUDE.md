# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build (output: dist/): client bundle, then one prerendered HTML per page and language
npm run preview   # Preview production build locally
```

There are no tests or linting configured.

`npm run preview` serves the prerendered pages (a small plugin in `vite.config.ts` maps URLs to files as nginx does), but not nginx's 301s for the old numeric URLs nor its 404 status. To check the real thing: `docker build -t portfolio . && docker run --rm -p 8099:80 portfolio`.

## Architecture

Single-page portfolio app built with React 19 + TypeScript + Vite. Routing is handled by React Router (`/`, `/projects`, `/projects/:slug`, `/blog`, `/blog/:slug`, `/contact`, `/cv`).

### URLs, languages and prerendering

- **Language lives in the URL**: English at the root, Spanish under `/es` (`/es/blog/about-me`). `lib/routes.ts` has the helpers (`languageOf`, `localePath`, `projectPath`, `postPath`). Components pass language-neutral paths (`/projects`) to `LocaleLink` / `LocaleNavLink` (`components/ui/LocaleLink.tsx`), which add the prefix — never use react-router's `Link` directly for in-site links.
- **Slugs**: detail pages are `/projects/<slug>` and `/blog/<slug>`; the `slug` field equals the data file's name and is the same in both languages. The numeric `id` is internal (ordering, `relatedPostId`). The five pre-slug URLs (`/projects/5`…) are 301s in `nginx.conf`.
- **Prerender**: `npm run build` ends with `scripts/prerender.mjs`, which renders every page in both languages (via `entry-server.tsx`) into `dist/<path>/index.html` with its own `<head>`, and writes `sitemap.xml`. The browser hydrates that HTML (`index.tsx`). `/cv` and unknown URLs get the bare shell (`spa.html`, `404.html`).
- **One source for `<head>`**: `lib/seo.ts` (`resolveMeta`) feeds both the prerender and `usePageMeta`.
- **First visit**: an inline script in `index.html` sends Spanish-speaking browsers from an English URL to its `/es` counterpart, unless the visitor chose English on the language switch (`localStorage.lang`).

Anything rendered on first paint must come out the same in Node and in the browser, or hydration breaks: no `window`/`localStorage`/`Intl` in the first render (see `hooks/useTheme.ts` and `lib/formatDate.ts` for how the theme and dates deal with it). `index.tsx` logs `Hydration mismatch:` to the console when it happens. Don't put entrance animations that start at `opacity: 0` on page wrappers: they hide prerendered content and keep it out of LCP.

### Content system

All portfolio content lives in `contentData.ts`, which exports `{ en, es }` — two full `AppContent` objects for English and Spanish. `App.tsx` picks one from the URL and passes it as `data` throughout the app.

Projects and blog articles are defined as bilingual `{ en, es }` objects in separate files:
- `data/projects/*.ts` — each exports a `ProjectItem` pair
- `data/articles/*.ts` — each exports a `BlogPost` pair

These are imported and assembled in `contentData.ts`. To add a new project or article, create a file in the appropriate `data/` subfolder and import it in `contentData.ts`.

All TypeScript interfaces are in `types.ts` (`AppContent`, `ProjectItem`, `BlogPost`, `ExperienceItem`, etc.).

### Case-study project schema

`ProjectItem` supports an extended schema for case studies (all fields optional):
- `status`: `'production' | 'prototype' | 'archived' | 'in-development'`
- `role`, `timeline`: short strings rendered in the project meta block
- `problem`, `solution`: plain-text paragraphs (whitespace preserved)
- `businessMetrics`: `{ label, value }[]` — rendered as cards at the top
- `architectureDiagram`: path to an image in `public/`
- `techStack`: `{ category, items }[]`
- `lessonsLearned`: `string[]`
- `content` (HTML string) remains as a fallback but prefer structured fields for new projects

Section labels used by `ProjectDetail` are bilingual in `AppContent.ui.caseStudy`.

### App structure

`App.tsx` is the top-level layout + router. Views live in `components/` (`HomeView`, `ProjectsView`, `ProjectDetail`, `BlogView`, `BlogPostDetail`, `Header`, `Footer`, `GitHubStats`, `Icons`). The `useFadeInOnScroll` hook lives in `hooks/`.

Shared UI lives in `components/ui/` (`buttonClass` — the only button styles to use —, `SectionHeading`, `PageShell`, `CardGrid`, `TagFilter`/`CardTags`); cards are `ProjectCard`/`PostCard`, and detail pages end with `DetailFooter` (related item via `ProjectItem.relatedPostId` / `BlogPost.relatedProjectId`, next item, `ClosingCta`). Non-visual helpers are in `lib/` (`getProjectLinks`, `formatPostDate`). Listing tag filters only show from 6 items up (`TAG_FILTER_MIN_ITEMS`).

## Adding a new project or article

The preferred workflow uses the project-local Claude Code skills (in `.claude/skills/`):

1. **`add-content-item`** — scaffolds the bilingual data file in `data/projects/<slug>.ts` or `data/articles/<slug>.ts` with the full extended schema as placeholders, sets `slug` (the public URL) and the next `id`, and wires imports + arrays in `contentData.ts`. The sitemap and the static pages are generated by the build; nothing else to register. Never fills fields with invented content.
2. The user fills in one language with **real** content (no made-up metrics, quotes, or post-mortems).
3. **`sync-bilingual`** — produces the other-language version, preserving HTML parity, glossary terms, and number format conventions (`19,776` vs `19.776`).
4. **`bilingual-content-reviewer` subagent** — final parity + fabrication audit before commit.

The `tsc-on-edit` hook (`.claude/hooks/tsc-on-edit.sh`) runs `tsc --noEmit` on every edit to `.ts`/`.tsx` files as the quality gate. There are no tests or linting beyond this.

**Hard rule**: portfolio content (projects, metrics, testimonials, posts) is always real and user-provided. Claude prepares the infrastructure; the user provides the substance. See `~/.claude/.../memory/feedback_no_fake_content.md`.

### Styling

Tailwind CSS v4 via PostCSS (configured in `postcss.config.js` and `tailwind.config.ts`). Custom animations (`animate-fade-in-up`, `animate-soft-ping`, etc.) are defined in `styles.css`. The `dark` class on `<html>` drives dark mode via Tailwind's `dark:` variant.

Visual identity (phase 3 of the 2026-09-28 audit, direction "B"): the site takes after the share card, `public/og-image-v2.png`. The card is a static PNG with the name and title written in it: a new title means a new image under a new file name (PNGs are served as immutable for a year, so reusing the name would leave Cloudflare and social scrapers on the old one). `accent` is amber — on light surfaces body-size text needs `accent-700` or darker (`accent-600` is 3.2:1 on white: large text and fills only). Display face is Newsreader (`font-serif`, weight 600); body is Inter. The `night` / `cream` / `gold` colours are the og-image's own palette, used only in the dark theme by the home hero (`HeroPortrait` draws the node graph around the photo) and the project covers (`.project-cover` / `.project-shot` in `styles.css`); in the light theme both follow the page. The hero's buttons use `buttonClass(variant, size, 'hero')`.

The "Open source" heatmap and language bar are drawn from `public/activity.json` (`contributions`, `languages`), which `scripts/fetch-activity.mjs` refreshes every 6 hours; no third-party chart service.

### Static assets

`/cv-en.pdf`, `/cv-es.pdf`, and `/profile.png` are served from the `public/` directory. The CV PDFs are generated by visiting `/cv` (English) and `/es/cv` (Spanish) in the browser (which render `components/CVView.tsx` from `data/cv/{en,es}.ts`) and printing each to PDF (Ctrl+P → Save as PDF, A4, "Background graphics" enabled). The `Download CV` button in `HomeView` links to `/cv-${language}.pdf`.

### Path alias

`@` resolves to the project root (configured in `vite.config.ts`).
