# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Marlon Demas — a React SPA with two routes (home and projects), dark-themed with neon accents, scroll-reveal animations via Motion, and Tailwind CSS v4 styling.

## Commands

```bash
npm run dev          # Vite dev server (HMR)
npm run build        # TypeScript check + Vite production build (tsc -b && vite build)
npm run typecheck    # TypeScript only (tsc --noEmit)
npm run lint         # ESLint (flat config, TS + React hooks + React Refresh)
npm run preview      # Serve the production build locally
npm run test:e2e     # Playwright smoke tests (auto-starts dev server on 127.0.0.1:4173)
```

Run a single Playwright test:
```bash
npx playwright test tests/smoke.spec.ts -g "home route renders"
```

Update visual snapshots after intentional UI changes:
```bash
npx playwright test --update-snapshots
```

## Architecture

### Data-Driven Content

All portfolio content lives in typed data files under `src/data/`. Pages are pure renderers with zero hardcoded copy. To update content (bio, projects, experience, tech stack, links), edit the data files — not the page components.

| Data file | Exports |
|-----------|---------|
| `data/site.ts` | Nav items, hero CTAs, contact links, footer links, site metadata |
| `data/home.ts` | About copy, quick facts, tech categories, experience entries, impact metrics, personal cards, contact/projects-page intros |
| `data/projects.ts` | Full project list + `featuredProjects` (filtered subset) |
| `data/motion.ts` | Shared motion tokens (durations, delays, easing curves, viewport config) |

### Type System

`src/types/content.ts` defines all content interfaces (`Project`, `TechItem`, `ExperienceEntry`, `ImpactMetric`, etc.) and literal union types (`AccentName`, `IconName`, `ProjectStatus`). New content shapes must be typed here first.

### Component Patterns

- **`Reveal`** — Reusable scroll-triggered fade-up wrapper using Motion's `whileInView`. Used extensively on both pages. Accepts `delay` and `y` offset props.
- **`ProjectCard`** — Dual-mode card: `compact` (vertical, used on home featured grid) vs full-width (horizontal, used on `/projects`). Driven by the `Project` type.
- **Accent system** — Components map `AccentName` to CSS custom properties (`--neon-blue`, `--neon-purple`, etc.) via lookup objects. Consistent color theming across cards, headings, and icons.

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no `tailwind.config` file — config is in CSS)
- **CSS custom properties** in `src/index.css` define the design tokens (surfaces, borders, neon accents, fonts, spacing)
- **Utility classes** in `index.css` for reusable patterns: `.page-shell`, `.section-shell`, `.surface-card`, `.glass-panel`, `.mono-heading`, `.gradient-text`, `.button-*`, `.tag-pill`, `.section-label`
- Fonts: JetBrains Mono (headings) + Geist (body) loaded from Google Fonts

### Routing

Two routes via `react-router-dom` v7: `/` (HomePage) and `/projects` (ProjectsPage). `ScrollManager` in `App.tsx` handles hash-based smooth scrolling and scroll-to-top on navigation.

### Testing

Playwright E2E smoke tests in `tests/smoke.spec.ts` cover:
- Section visibility assertions on both routes
- Navigation link wiring and CTA href correctness
- Visual regression snapshots at desktop (1440px) and mobile (390px) viewpoints

Snapshot baselines live in `tests/smoke.spec.ts-snapshots/`. The Playwright config starts the dev server automatically for test runs.

### Static Assets

All images and documents are in `public/assets/` — project screenshots, personal photos, about photo, and CV PDF. Referenced by data files via absolute paths (e.g., `/assets/projects/raptor.png`).
