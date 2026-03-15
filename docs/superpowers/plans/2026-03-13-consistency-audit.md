# Consistency Audit Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve all 11 issues from the consistency audit — dead code, animation token drift, hardcoded design tokens, and duplicated component architecture patterns.

**Architecture:** Four independent categories, each scoped to non-overlapping files, safe to execute in parallel. No new routes, no new pages, no behavioural changes — only cleanup and pattern unification.

**Tech Stack:** React 19, TypeScript strict, Tailwind CSS v4, Motion v12 (`motion/react`), Vite

---

## Shared Context (read before any task)

### CSS Variables (src/index.css :root)
```
--surface-1: #0a0a0f
--surface-2: #12121a
--surface-3: #1a1a2e
--neon-blue:  #00d4ff
--neon-cyan:  #06b6d4
--neon-green: #10b981
--neon-purple:#8b5cf6
--neon-yellow:#fbbf24
--signal-red: #ff3b30
--cta-orange: #ff8400
```

### Motion tokens (src/data/motion.ts)
- `motionTokens.durations.base` — fast micro transitions
- `motionTokens.durations.reveal` — scroll reveal entrance
- `motionTokens.durations.slow` — hero entrance
- `motionTokens.easing.out` — primary easing curve (same bezier as `[0.22, 1, 0.36, 1]`)
- `motionTokens.viewport` — `{ once: true, amount: 0.28 }` — default scroll trigger

### Accent map pattern (used in 3 places, being unified in Category D)
```ts
const accentVar: Record<AccentName, string> = {
  blue:   'var(--neon-blue)',
  cyan:   'var(--neon-cyan)',
  green:  'var(--neon-green)',
  purple: 'var(--neon-purple)',
  yellow: 'var(--neon-yellow)',
  red:    'var(--signal-red)',
  orange: 'var(--cta-orange)',
}
```

### Verify commands
```bash
npm run typecheck   # tsc --noEmit — must exit 0
npm run lint        # ESLint — must exit 0
```
Run both after every task. Both must pass before committing.

---

## Category A — Dead Code Removal

**Issues:** ISSUE-1
**Files touched:** 4 deletions + 1 modification

### What to do

The following 4 component files are never imported by any page or other component. Delete them.

```
src/components/TechCard.tsx
src/components/ImpactCard.tsx
src/components/PersonalCard.tsx
src/components/TimelineItem.tsx
```

The following exports in `src/data/home.ts` are never imported anywhere. Remove them (keep all other exports — `heroStats`, `tickerItems`, `aboutStats`, `aboutCopy`, `quickFacts`, `experience`, `contactIntro`, `projectsPageIntro` are all active):

```ts
// REMOVE these exports:
export const stackIntro = { ... }          // lines 68–73
export const techCategories: TechCategory[] = [ ... ]  // lines 75–103
export const experienceIntro = { ... }     // lines 105–108
export const impactIntro = { ... }         // lines 150–153
export const impactMetrics: ImpactMetric[] = [ ... ]   // lines 155–184
export const personalIntro = { ... }       // lines 186–189
export const personalCards: PersonalCard[] = [ ... ]   // lines 191–210
```

Also remove the now-unused type imports at the top of `home.ts` (`ImpactMetric`, `PersonalCard`, `TechCategory` — check each is no longer needed after removal).

### Steps

- [ ] **Step 1: Delete the four unused component files**
  ```bash
  rm src/components/TechCard.tsx
  rm src/components/ImpactCard.tsx
  rm src/components/PersonalCard.tsx
  rm src/components/TimelineItem.tsx
  ```

- [ ] **Step 2: Remove the 7 unused exports from src/data/home.ts**
  Delete lines for `stackIntro`, `techCategories`, `experienceIntro`, `impactIntro`, `impactMetrics`, `personalIntro`, `personalCards` and their content blocks.

- [ ] **Step 3: Clean up unused type imports in home.ts**
  Remove `ImpactMetric`, `PersonalCard`, `TechCategory` from the import statement at line 1 (verify none are still used).

- [ ] **Step 4: Verify**
  ```bash
  npm run typecheck && npm run lint
  ```
  Expected: both exit 0. If typecheck fails, a deleted export is still referenced somewhere — find it with `grep -r "techCategories\|impactMetrics\|personalCards\|TechCard\|ImpactCard\|PersonalCard\|TimelineItem" src/`.

- [ ] **Step 5: Commit**
  ```bash
  git add -A
  git commit -m "chore: remove 4 unused components and 7 unused data exports"
  ```

---

## Category B — Animation Consistency

**Issues:** ISSUE-2, ISSUE-3, ISSUE-4, ISSUE-5
**Files touched:** `src/pages/HomePage.tsx`, `src/pages/ProjectsPage.tsx`, `src/components/Navigation.tsx`

### What to do

#### B1 — Hero animations: replace `whileInView` with `animate` (HomePage.tsx, lines ~63–104)

The three motion elements in the hero section use `whileInView` but the hero is always fully visible on page load — `whileInView` without `viewport` falls back to `once: false`, meaning they re-animate on every route re-entry. Since these are hero entrance animations (not scroll reveals), replace `whileInView` with `animate`. Keep `initial` unchanged.

```tsx
// BEFORE (motion.div hero-name-wrap, ~line 65):
whileInView={{ opacity: 1, y: 0 }}

// AFTER:
animate={{ opacity: 1, y: 0 }}

// Same change on the role subtitle motion.p (~line 83):
// whileInView={{ opacity: 1 }} → animate={{ opacity: 1 }}

// Same change on the CTA buttons motion.div (~line 92):
// whileInView={{ opacity: 1, y: 0 }} → animate={{ opacity: 1, y: 0 }}
```

Remove the `viewport` prop from all three if present (it's unused with `animate`).

#### B2 — ProjectsPage duration: use motionTokens (ProjectsPage.tsx, line ~44)

```tsx
// BEFORE:
duration: 0.45,

// AFTER:
duration: motionTokens.durations.reveal,
```

Ensure `motionTokens` is already imported (it is, from `'../data/motion'`).

#### B3 — ProjectsPage viewport amount: document intentional override (ProjectsPage.tsx, line ~42)

The `amount: 0.08` on the projects list cards is **intentionally lower than the token value (0.28)** — using 0.28 on a list where each card is only ~300px tall would require 84px of each card to be visible before triggering, which caused all cards to stay invisible (the original bug). Keep `amount: 0.08` but add a comment:

```tsx
viewport={{ once: true, amount: 0.08 /* intentionally low: list cards are short */ }}
```

Do NOT change this to `motionTokens.viewport` — it would reintroduce the bug.

#### B4 — Navigation easing: reference motionTokens (Navigation.tsx, lines ~93, 103, 126)

```tsx
// Import motionTokens at top of Navigation.tsx:
import { motionTokens } from '../data/motion'

// BEFORE (backdrop transition, ~line 89):
transition={{ duration: 0.2 }}

// AFTER:
transition={{ duration: 0.2, ease: motionTokens.easing.out }}

// BEFORE (panel transition, ~line 99):
transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}

// AFTER:
transition={{ duration: 0.28, ease: motionTokens.easing.out }}

// BEFORE (link stagger transitions, ~line 122):
transition={{ delay: 0.07 + i * 0.05, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}

// AFTER:
transition={{ delay: 0.07 + i * 0.05, duration: 0.22, ease: motionTokens.easing.out }}
```

### Steps

- [ ] **Step 1: Fix hero animations (whileInView → animate) in HomePage.tsx**
  Find the three motion elements in the hero section (hero-name-wrap div, role subtitle p, CTA buttons div) and change `whileInView` to `animate` on all three.

- [ ] **Step 2: Fix ProjectsPage duration to use motionTokens**
  Change `duration: 0.45` to `duration: motionTokens.durations.reveal`.

- [ ] **Step 3: Document intentional viewport.amount override in ProjectsPage**
  Add the inline comment to `viewport={{ once: true, amount: 0.08 }}`.

- [ ] **Step 4: Fix Navigation easing to reference motionTokens.easing.out**
  Import `motionTokens` and replace the three inline `[0.22, 1, 0.36, 1]` arrays with `motionTokens.easing.out`.

- [ ] **Step 5: Verify**
  ```bash
  npm run typecheck && npm run lint
  ```
  Expected: both exit 0.

- [ ] **Step 6: Commit**
  ```bash
  git add src/pages/HomePage.tsx src/pages/ProjectsPage.tsx src/components/Navigation.tsx
  git commit -m "refactor: align animation tokens — use motionTokens for durations and easing"
  ```

---

## Category C — Design Token Consistency

**Issues:** ISSUE-6, ISSUE-7, ISSUE-9
**Files touched:** `src/components/TechTicker.tsx`, `src/components/AuroraBackground.tsx`, `src/pages/HomePage.tsx`, `src/index.css`

### What to do

#### C1 — TechTicker hardcoded hex values (TechTicker.tsx)

**tickerGlows array (line ~8):** These duplicate CSS variables. Change to `var(--neon-*)` strings (same format as `tickerAccents`):
```ts
// BEFORE:
const tickerGlows = ['#00d4ff', '#06b6d4', '#8b5cf6', '#10b981']

// AFTER:
const tickerGlows = ['var(--neon-blue)', 'var(--neon-cyan)', 'var(--neon-purple)', 'var(--neon-green)']
```

Note: `tickerGlows` is used in two places:
1. `backgroundColor: glow` on `.ticker-dot` — `var(--neon-*)` works fine as inline style value
2. `boxShadow: \`0 0 8px ${glow}\`` on `.ticker-dot` — this also works fine with `var()` in box-shadow

**Background gradient (inline style, line ~19):**
```tsx
// BEFORE:
background: 'linear-gradient(to bottom, #12121a, #1a1a2e)',

// AFTER:
background: 'linear-gradient(to bottom, var(--surface-2), var(--surface-3))',
```

**Dark vignette overlay (line ~83):**
```tsx
// BEFORE:
background: 'linear-gradient(to right, #0a0a0f 0%, rgba(10,10,15,0.92) 10%, ...)'

// AFTER:
background: 'linear-gradient(to right, var(--surface-1) 0%, rgba(10,10,15,0.92) 10%, rgba(10,10,15,0) 26%, rgba(10,10,15,0) 74%, rgba(10,10,15,0.92) 90%, var(--surface-1) 100%)',
```
(Keep the rgba transition stops as-is — they cannot be replaced with var() inside rgba())

#### C2 — AuroraBackground hardcoded #6366f1 (AuroraBackground.tsx)

The `#6366f1` blob has no CSS variable. Map it to `--neon-purple` (`#8b5cf6`) — it's the closest design token and keeps the aurora in the token system:

```tsx
// BEFORE:
className="aurora-blob bg-[#6366f1] ..."

// AFTER:
className="aurora-blob bg-[var(--neon-purple)] ..."
```

#### C3 — Contact section gradient (HomePage.tsx, line ~416)

```tsx
// BEFORE:
style={{ background: 'radial-gradient(circle, #1a1a4e, transparent)' }}

// AFTER:
style={{ background: 'radial-gradient(circle, var(--surface-3), transparent)' }}
```

`--surface-3` is `#1a1a2e` — close enough to `#1a1a4e` for this decorative glow, and keeps it in the token system.

### Steps

- [ ] **Step 1: Fix tickerGlows array in TechTicker.tsx**
  Replace the 4 hex values with `var(--neon-*)` strings.

- [ ] **Step 2: Fix inline background gradients in TechTicker.tsx**
  Replace `#12121a` → `var(--surface-2)`, `#1a1a2e` → `var(--surface-3)`, `#0a0a0f` → `var(--surface-1)`.

- [ ] **Step 3: Fix AuroraBackground #6366f1 → var(--neon-purple)**

- [ ] **Step 4: Fix contact gradient in HomePage.tsx**
  Replace `#1a1a4e` with `var(--surface-3)`.

- [ ] **Step 5: Verify**
  ```bash
  npm run typecheck && npm run lint
  ```
  Expected: both exit 0. Also do a quick visual check: the ticker dots should still glow cyan/blue, the aurora should still show the indigo-purple blob.

- [ ] **Step 6: Commit**
  ```bash
  git add src/components/TechTicker.tsx src/components/AuroraBackground.tsx src/pages/HomePage.tsx
  git commit -m "refactor: replace hardcoded hex values with CSS design tokens"
  ```

---

## Category D — Component & Data Architecture

**Issues:** ISSUE-8, ISSUE-10, ISSUE-11
**Files touched:** `src/data/accents.ts` (new), `src/pages/HomePage.tsx`, `src/components/ProjectCard.tsx`, `src/components/OrbitingStats.tsx`

### What to do

#### D1 — Create shared accent utility (src/data/accents.ts)

Extract the accent-to-CSS-var map that currently exists in 3 files into one canonical location:

```ts
// src/data/accents.ts
import type { AccentName } from '../types/content'

export const accentVar: Record<AccentName, string> = {
  blue:   'var(--neon-blue)',
  cyan:   'var(--neon-cyan)',
  green:  'var(--neon-green)',
  purple: 'var(--neon-purple)',
  yellow: 'var(--neon-yellow)',
  red:    'var(--signal-red)',
  orange: 'var(--cta-orange)',
}

export const accentText: Record<AccentName, string> = {
  blue:   'text-[var(--neon-blue)]',
  cyan:   'text-[var(--neon-cyan)]',
  green:  'text-[var(--neon-green)]',
  purple: 'text-[var(--neon-purple)]',
  yellow: 'text-[var(--neon-yellow)]',
  red:    'text-[var(--signal-red)]',
  orange: 'text-[var(--cta-orange)]',
}

export const accentLine: Record<AccentName, string> = {
  blue:   'bg-[var(--neon-blue)]',
  cyan:   'bg-[var(--neon-cyan)]',
  green:  'bg-[var(--neon-green)]',
  purple: 'bg-[var(--neon-purple)]',
  yellow: 'bg-[var(--neon-yellow)]',
  red:    'bg-[var(--signal-red)]',
  orange: 'bg-[var(--cta-orange)]',
}
```

#### D2 — Update ProjectCard.tsx to use shared accents

```tsx
// REMOVE the three local Record definitions (accentVar, accentText, accentLine)
// ADD import:
import { accentVar, accentText, accentLine } from '../data/accents'

// FIX roleLabel (line ~66) — was hardcoded blue, now uses accent:
// BEFORE:
<p className="text-sm font-medium text-[var(--neon-blue)]">{project.roleLabel}</p>

// AFTER:
<p className={`text-sm font-medium ${accentText[project.accent]}`}>{project.roleLabel}</p>
```

#### D3 — Update OrbitingStats.tsx to use shared accents

```tsx
// Check the file for a local accent map (likely named accentColor or similar)
// REMOVE the local map
// ADD import:
import { accentVar } from '../data/accents'
// Replace local map references with accentVar
```

#### D4 — Update HomePage.tsx to use shared accents

```tsx
// REMOVE the local accentDotColor Record (lines ~27–35)
// ADD import:
import { accentVar } from '../data/accents'
// Replace accentDotColor[x] references with accentVar[x]
```

#### D5 — Fix SBA Reading bento card to use data (HomePage.tsx, lines ~313–336)

Currently the 4th bento card has hardcoded name, description, and tags. Fix by:
1. In `src/data/projects.ts`, change the SBA Reading entry's `featured` flag: `featured: true`
2. In `HomePage.tsx`, find the SBA Reading card and replace hardcoded text with `featuredProjects.find(p => p.slug === 'sba-reading')`:

```tsx
// At top of bento section, after the existing featuredProjects[0/1/2] usages:
const sbaProject = featuredProjects.find(p => p.slug === 'sba-reading')

// Then in the SBA card, replace hardcoded strings:
<h3 ...>{sbaProject?.name}</h3>
// tags:
{sbaProject?.tags.slice(0, 2).map(tag => (
  <span key={tag} ...>{tag}</span>
))}
// description:
<p ...>{sbaProject?.description}</p>
```

Check what `slug` value SBA Reading uses in `src/data/projects.ts` before implementing — use the exact string.

### Steps

- [ ] **Step 1: Create src/data/accents.ts** with all three maps as shown above.

- [ ] **Step 2: Update ProjectCard.tsx** — remove local maps, import from accents.ts, fix roleLabel to use `accentText[project.accent]`.

- [ ] **Step 3: Update OrbitingStats.tsx** — remove local accent map, import `accentVar` from accents.ts.

- [ ] **Step 4: Update HomePage.tsx** — remove `accentDotColor`, import `accentVar` from accents.ts, replace all `accentDotColor[x]` with `accentVar[x]`.

- [ ] **Step 5: Fix SBA Reading card** — set `featured: true` in projects.ts, derive `sbaProject` with `.find()` in HomePage, replace hardcoded copy with data fields.

- [ ] **Step 6: Verify**
  ```bash
  npm run typecheck && npm run lint
  ```
  Expected: both exit 0. Check that `accentDotColor` no longer appears anywhere with `grep -r "accentDotColor" src/`.

- [ ] **Step 7: Commit**
  ```bash
  git add src/data/accents.ts src/components/ProjectCard.tsx src/components/OrbitingStats.tsx src/pages/HomePage.tsx src/data/projects.ts
  git commit -m "refactor: extract shared accent map, fix roleLabel theming, drive SBA card from data"
  ```

---

## Final Verification

After all four categories are merged:

```bash
npm run typecheck && npm run lint
```

Both must exit 0. Then do a full manual smoke-check:
- Home page loads, hero name animates in, bento cards all show correct accent colors
- SBA bento card shows correct name/description from data
- `/projects` page: all cards visible, correct accent colors on roleLabel
- Mobile: navigation drawer opens/closes correctly
- TechTicker: items glow in spotlight, separators visible
- AuroraBackground: purple blob still visible

No visual regressions expected — all changes are structural/token, not layout or component behaviour.
