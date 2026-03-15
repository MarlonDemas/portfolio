# Portfolio 10x — Implementation Plan
Generated: 2026-03-13 | Based on: `session-1.md`

---

## Effort / Impact Matrix

| Feature | Effort | Impact | Tier |
|---------|--------|--------|------|
| Remote availability copy | XS (0h) | High | Do Now |
| Project count in nav | XS (0h) | Medium | Do Now |
| OG / social meta tags | S (1h) | High | Do Now |
| Copy email to clipboard | S (1h) | High | Do Now |
| Analytics (Plausible) | S (1h) | High | Do Now |
| Contact form (Formspree) | S (2h) | Very High | Do Now |
| Project filter on /projects | S (2h) | High | Do Now |
| Active nav section indicator | M (3h) | Medium | Do Next |
| GitHub contribution graph | S (1h) | Medium | Do Next |
| "Available For" rich indicator | M (3h) | Medium | Do Next |
| Case study pages | L (1–2 days) | Very High | Explore |
| Technical blog / writing section | L (2+ days) | High | Explore |
| Animated role typewriter | S (1h) | Low | Backlog |
| Keyboard accessibility audit | M (2h) | Medium | Backlog |
| Interactive architecture demos | XL | High | Backlog |

---

## Ship Sequence

The order below minimises rework and maximises compounding value. Analytics ships
first so every subsequent change is measurable. Zero-effort wins ship immediately
before writing any code. Conversion features land before polish.

```
1.  Analytics                 — baseline before touching anything else
2.  Remote availability copy  — 0 effort, do while reading this doc
3.  Project count in nav      — 0 effort, data edit in site.ts
4.  OG / social meta tags     — 1h, multiplies every existing share
5.  Copy email to clipboard   — 1h, highest-friction UX fix
6.  Contact form              — 2h, replaces leakiest conversion point
7.  Project filter            — 2h, directly serves recruiter workflow
8.  Active nav indicator      — 3h, completes single-page UX feel
9.  GitHub graph              — 1h, social proof for dev audiences
10. "Available For" popover   — 3h, improves inbound quality
11. Case study: Raptor        — write content first, then route
12. Case study: Mirai         — second case study once pattern proven
13. Blog / writing section    — depends on case study content momentum
```

---

## Tier 1 — Do Now

---

### 1. Analytics — Plausible

**Acceptance criteria**
- Unique visitors, referrers, pages, and CTA click events tracked
- No cookie banner required (Plausible is cookie-free)
- Zero impact on bundle size (external script)

**Files to modify**
- `index.html` — add Plausible script tag in `<head>`

**Key decisions**
- **Plausible vs Fathom vs Vercel Analytics**: Plausible is recommended — self-hostable,
  GDPR-compliant, great UI, $9/mo. If the site is on Vercel, Vercel Analytics
  (free tier) is viable but has fewer event-tracking capabilities.
  > **Decision needed**: Which hosting provider? (Vercel / Netlify / other)

**Implementation**
```html
<!-- index.html — inside <head> -->
<script
  defer
  data-domain="marlondemas.dev"
  src="https://plausible.io/js/script.tagged-events.js"
></script>
```
Then instrument CTA clicks with `data-analytics` attributes (Plausible's tagged
events pick these up automatically — no JS needed for basic events).

**Effort**: S (30 min + account setup)
**Dependencies**: None — ship first

---

### 2. Remote Availability Copy + Project Count in Nav

**Acceptance criteria**
- Availability badge reads something like "Available · Open to remote (intl)"
- Nav "Work" item reads "Work (9)"

**Files to modify**
- `src/data/site.ts` — update `siteMeta.availability` and `siteNav[1].label`

**Key decisions**
- How specific to be in the badge (just "remote" or "remote · Cape Town UTC+2")
- Whether to include "full-time" or "contract" preference

**Implementation sketch**
```ts
// site.ts
export const siteMeta = {
  availability: 'Available · Open to remote (intl)',
  // ...
}

export const siteNav: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Work (9)', href: '/#projects' },  // or derive dynamically from projects.length
  { label: 'Career', href: '/#career' },
  { label: 'Contact', href: '/#contact' },
]
```

**Effort**: XS (5 min — data edit only)
**Dependencies**: None

---

### 3. Open Graph / Social Meta Tags

**Acceptance criteria**
- Pasting `marlondemas.dev` into LinkedIn / Slack / iMessage shows a rich preview card
- Card includes: site title, description, and a designed 1200×630 social image
- Twitter/X card also works (`twitter:card = summary_large_image`)

**Files to modify**
- `index.html` — add all OG + Twitter meta tags
- `public/assets/` — add `og-card.png` (1200×630, designed image)

**Key decisions**
- **Static vs dynamic OG**: For now, one static card is sufficient. When case studies
  land, consider `react-helmet-async` to set per-page OG tags for `/projects/:slug`
  routes (so each case study gets its own shareable card).
- **Image design**: The card should include Marlon's photo, name, role, and the site
  URL. Dark background matching the site aesthetic. Can be designed in Figma / Canva.

**Implementation**
```html
<!-- index.html — full <head> block -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Marlon Demas — Senior Full-Stack Software Engineer</title>
  <meta name="description" content="Senior Full-Stack Engineer building cross-platform products at scale. Vue 3, React Native, .NET, Web3. Currently at Raptor Technologies (60k+ schools, 55 countries)." />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://marlondemas.dev" />
  <meta property="og:title" content="Marlon Demas — Senior Full-Stack Software Engineer" />
  <meta property="og:description" content="Senior Full-Stack Engineer building cross-platform products at scale." />
  <meta property="og:image" content="https://marlondemas.dev/assets/og-card.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Marlon Demas — Senior Full-Stack Software Engineer" />
  <meta name="twitter:description" content="Senior Full-Stack Engineer building cross-platform products at scale." />
  <meta name="twitter:image" content="https://marlondemas.dev/assets/og-card.png" />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <script defer data-domain="marlondemas.dev" src="https://plausible.io/js/script.tagged-events.js"></script>
</head>
```

**Effort**: S (1h including image design)
**Dependencies**: Analytics already added

---

### 4. Copy Email to Clipboard

**Acceptance criteria**
- Clicking the email link in `ContactLinkRow` copies `hello@marlondemas.dev` to clipboard
- A brief "Copied!" toast/label replaces the email text for ~2 seconds, then reverts
- No external library needed — `navigator.clipboard.writeText` is sufficient
- Graceful fallback: if clipboard API is unavailable, fall back to standard mailto

**Files to modify**
- `src/components/ContactLinkRow.tsx` — add clipboard logic for `kind === 'email'` links

**Key decisions**
- **Toast vs inline label swap**: Inline label swap ("Copied!" replaces email text
  briefly) is simpler and needs no toast infrastructure. Keeps the component self-contained.
- **Library vs native API**: `navigator.clipboard.writeText` is available in all
  modern browsers and needs no dependency.

**Implementation sketch**
The component already conditionally renders based on `link.href`. Add a branch for
`link.kind === 'email'` that renders a `<button>` instead of `<a>`:

```tsx
// ContactLinkRow.tsx (email branch — ~15 lines)
const [copied, setCopied] = useState(false)

const handleCopy = async (email: string) => {
  try {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  } catch {
    window.location.href = `mailto:${email}`  // fallback
  }
}

// In the render — replace <a> with <button> when kind === 'email'
```

**Effort**: S (45 min)
**Dependencies**: None

---

### 5. Contact Form (Formspree)

**Acceptance criteria**
- The "SAY HELLO" section replaces or augments the mailto CTA with a short inline form
- Fields: Name, Email, Message, enquiry type (optional select: Job / Project / Other)
- On submit: success state shown, no page reload, email delivered to `hello@marlondemas.dev`
- No backend required — Formspree handles delivery
- Form is accessible (labels, error states, focus management)

**Files to modify**
- `src/pages/HomePage.tsx` — replace/augment contact section CTA with `<ContactForm />`
- `src/components/ContactForm.tsx` — new component (only new file in Do Now tier)

**Key decisions**
- **Formspree vs Netlify Forms vs Resend**:
  - Formspree: works with any host, free tier (50 submissions/mo), setup is one `action` attribute
  - Netlify Forms: only if the site is hosted on Netlify, zero config
  - Resend: requires an API route (no backend) → not viable without a serverless function
  > **Decision needed**: Hosting provider determines which to use. Formspree is the safe default.

- **Replace vs augment the mailto CTA**: Two options:
  - Option A: Replace "SAY HELLO" button with inline form that expands in place
  - Option B: Keep "SAY HELLO" button, add a smaller "or send a quick message" form below
  - Recommendation: Option A — cleaner, forces one primary conversion path

- **Form validation**: HTML5 `required` + `type="email"` is sufficient. No Zod/RHF needed
  for a 3-field form — that would be over-engineering.

**ContactForm component skeleton** (to be filled by user — see contribution request below)

```tsx
// src/components/ContactForm.tsx
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  // TODO: implement handleSubmit
  // POST to https://formspree.io/f/{FORM_ID}
  // Set status accordingly
  // Render: form fields → sending spinner → success message → error with retry

  return (
    <form
      action="https://formspree.io/f/{FORM_ID}"
      method="POST"
      onSubmit={handleSubmit}
    >
      {/* ... */}
    </form>
  )
}
```

**Effort**: S–M (2h including Formspree account setup + styling to match design system)
**Dependencies**: None (but ship after analytics so form submissions are measurable)

---

### 6. Project Filter by Tech Stack

**Acceptance criteria**
- `/projects` page shows filter pills above the project list
- Tags are derived automatically from all projects (no hardcoded list)
- "All" pill is active by default; clicking a tag filters to matching projects
- Active pill is visually distinguished (accent color)
- Filter is URL-friendly (optional: `?tag=Vue` so links to filtered views work)
- Smooth transition when list changes (Motion `AnimatePresence`)

**Files to modify**
- `src/pages/ProjectsPage.tsx` — add filter state + pill UI + filtered list rendering
- No new files needed

**Key decisions**
- **Derived vs hardcoded tag list**: Derive from `projects.flatMap(p => p.tags)` deduplicated.
  This auto-updates when new projects are added — no maintenance burden.
- **URL params vs local state**: Local state is simpler. URL params (`?tag=Vue`) are better
  for shareability but add complexity. Start with local state; upgrade later.
- **Multi-select vs single-select**: Single-select is simpler and covers 95% of use cases.
  Multi-select requires more UI work for marginal gain.
- **AnimatePresence layout animation**: Wrap the project list in `AnimatePresence` with
  `layout` prop on each item for smooth reflow. Motion is already in the project.

**Filter pill design** — match existing `.tag-pill` utility class from `index.css`:
```tsx
// Pill: default state uses tag-pill class, active state adds neon accent border
<button
  className={`tag-pill transition-colors ${active ? 'border-[var(--neon-cyan)] text-white' : ''}`}
  onClick={() => setActiveTag(tag)}
>
  {tag}
</button>
```

**Effort**: S (2h)
**Dependencies**: None

---

## Tier 2 — Do Next

---

### 7. Active Nav Section Indicator

**Acceptance criteria**
- As user scrolls through `/#about`, `/#projects`, `/#career`, `/#contact` sections,
  the corresponding nav item becomes visually active (brighter, underline, or accent color)
- Indicator updates smoothly during scroll
- Works on desktop only (mobile uses drawer — no persistent indicator needed)
- No layout shift — indicator is purely visual (color/weight change)

**Files to modify**
- `src/components/Navigation.tsx` — add `activeSection` state + IntersectionObserver logic
- `src/data/site.ts` — optionally add `sectionId` field to `NavItem` type

**Key decisions**
- **IntersectionObserver vs scroll position**: IntersectionObserver is the correct API.
  Watch each section's entry; whichever intersects at ≥30% viewport height is active.
  Scroll position arithmetic is brittle (fails on resize, zoom, etc.).
- **Where to run the observer**: Inside `Navigation.tsx` with a `useEffect`. The nav
  already has a `useEffect` for scroll shadow — extend this pattern.
- **Which sections to observe**: Only sections with matching nav `href` values.
  `siteNav` items have `href: '/#about'` — extract the section ID from the hash.

**Effort**: M (2–3h)
**Dependencies**: Ship after contact form and filter (those are higher impact)

---

### 8. GitHub Contribution Graph

**Acceptance criteria**
- Contribution graph embedded in the About section below the stats
- Visible on desktop; optional on mobile (can hide at `sm` breakpoint)
- No build-time dependency — uses an external image embed
- Graph reflects real activity (uses GitHub's chart API)

**Files to modify**
- `src/pages/HomePage.tsx` — add `<img>` embed after the about stats grid
- No new components needed

**Implementation**
```tsx
{/* Below aboutStats grid in About section */}
<div className="border-t border-white/5 pt-8">
  <p className="mono-heading mb-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
    GitHub Activity
  </p>
  <img
    src="https://ghchart.rshah.org/39d353/marlondemas"
    alt="Marlon Demas GitHub contribution graph"
    className="w-full rounded-lg opacity-80"
  />
</div>
```

**Key decisions**
- **ghchart.rshah.org vs GitHub's SVG API**: `ghchart.rshah.org` is simpler (single img tag,
  custom color support). GitHub's own SVG requires authentication. Use ghchart.
- **Color**: `#39d353` matches GitHub's green. Can be changed to match the portfolio's
  neon-green (`--neon-green: #22d3a0` approx) for brand consistency.
- **Privacy**: The graph is public data — no concern.

**Effort**: S (30 min)
**Dependencies**: None

---

### 9. "Available For" Rich Indicator

**Acceptance criteria**
- Clicking the "Available for opportunities" badge in the hero opens a small popover/card
- Card shows: availability start date, role preference (full-time / contract / remote),
  preferred tech/domains, timezone
- Popover closes on click-outside or Escape
- Data lives in `site.ts` (not hardcoded in component)
- Follows existing glass-panel design language

**Files to modify**
- `src/data/site.ts` — add `availability` object with rich fields
- `src/pages/HomePage.tsx` — make badge clickable, render popover
- `src/components/AvailabilityPopover.tsx` — new component

**Key decisions**
- **Tooltip vs bottom-sheet vs modal**: A small `glass-panel` popover anchored to the
  badge is most appropriate. Tooltip is too small for structured content; modal is overkill.
- **Click vs hover**: Click. Hover is unreliable on mobile and creates accessibility issues.
- **What data to surface**: Start date, role type (full-time preferred / open to contract),
  remote preference, timezone, preferred domains. Keep it scannable — 4-5 lines max.

**Data shape in site.ts**:
```ts
export const availabilityDetails = {
  status: 'Available',
  from: 'Immediately', // or 'April 2026'
  type: ['Full-time', 'Open to contract'],
  remote: true,
  timezone: 'UTC+2 (Cape Town)',
  preferredDomains: ['Product companies', 'Scale-ups', 'International remote'],
}
```

**Effort**: M (2–3h)
**Dependencies**: None, but do after higher-priority items

---

## Tier 3 — Explore (Strategic Bets)

---

### 10. Case Study Pages — `/projects/:slug`

**Acceptance criteria**
- New route `/projects/:slug` renders a full case study for that project
- Case study includes: problem statement, approach, key decisions, measurable impact,
  tech breakdown, lessons learned, "what I'd do differently"
- Each project card on `/projects` links to its case study (where one exists)
- Projects without a case study link to `externalUrl` as before (no broken links)
- Dynamic OG tags per case study (so sharing `/projects/raptor-technologies` shows
  the Raptor card, not the generic site card)
- Start with Raptor + Mirai only; other slugs 404 gracefully

**Files to create**
- `src/pages/CaseStudyPage.tsx` — the page component
- `src/data/casestudies.ts` — case study content (separate from `projects.ts` to
  keep the projects data lean for the card views)

**Files to modify**
- `src/App.tsx` — add `/projects/:slug` route
- `src/types/content.ts` — add `CaseStudy` interface
- `src/components/ProjectCard.tsx` — add case study link where `casestudy` exists

**Content interface**
```ts
// types/content.ts
export interface CaseStudySection {
  heading: string
  body: string        // markdown or plain paragraphs
  image?: string      // optional screenshot
}

export interface CaseStudy {
  slug: string        // matches Project.slug
  headline: string    // one-sentence hook
  problem: string
  approach: CaseStudySection[]
  impact: { metric: string; label: string }[]
  lessons: string
  ogImage?: string    // custom OG image for this case study
}
```

**Key decisions**
- **Markdown vs JSX content**: Markdown (with `react-markdown` or similar) is more
  maintainable for long-form writing. JSX gives more layout control.
  Recommendation: start with structured data objects (`CaseStudySection[]`) rendered
  as plain JSX — avoids a new dependency while keeping content editable in data files.
- **Content-first**: Write the Raptor case study content in a doc before building
  the route. The engineering is trivial once the content exists. Writing first prevents
  building a system for content that never materialises.
- **Per-page OG tags**: Add `react-helmet-async` when this ships. It's the only
  feature that justifies a `<head>` management library.

**Effort**: L (1 day engineering + 1–2 days writing per case study)
**Dependencies**: Ship analytics first (to measure case study engagement)

---

### 11. Technical Blog / Writing Section

**Acceptance criteria**
- New route `/writing` lists published posts
- New route `/writing/:slug` renders a full post
- Posts are written in structured data (same pattern as case studies)
- Minimum viable: 1 published post before shipping the section publicly
- RSS feed (optional but high value for syndication)

**Files to create**
- `src/pages/WritingPage.tsx`
- `src/pages/PostPage.tsx`
- `src/data/writing.ts`
- `src/types/content.ts` — add `Post` interface

**Files to modify**
- `src/App.tsx` — add `/writing` and `/writing/:slug` routes
- `src/data/site.ts` — add Writing to `siteNav`

**Content first — suggested first post topics** (rank by uniqueness + usefulness):
1. "Building a multilingual PWA for low-connectivity SA classrooms" — highly specific, rare perspective
2. "What NFT solar panels taught me about explaining Web3 to non-technical stakeholders"
3. "Lessons from leading a React Native app from 0 to App Store in under a year"

**Key decisions**
- **MDX vs structured data**: MDX gives full layout control in posts but adds build
  complexity. Structured data (title, sections[], tags) rendered by a `<PostPage>`
  component is simpler and sufficient. Start there; upgrade to MDX if needed.
- **Don't build until content exists**: Engineer the route after 1 post is written,
  not before. Empty blog sections are worse than no blog section.

**Effort**: L (2 days engineering + content creation is ongoing)
**Dependencies**: Case studies should ship first (establishes long-form content habit)

---

## Backlog

### Animated Role Typewriter
- Motion already in project; simple `AnimatePresence` sequence cycling `siteMeta.role` variants
- Low priority — cosmetic
- File: `src/pages/HomePage.tsx` (hero subtitle element)

### Keyboard Accessibility Audit
- Tab through all interactive elements; add `aria-label` where missing
- Check `Navigation.tsx` mobile drawer, `ProjectCard`, `ContactLinkRow`
- Run axe-core or Lighthouse accessibility audit
- Estimated: 1–2h

### Interactive Architecture Demos
- Revisit only after case studies prove the depth-of-thinking content strategy works
- If pursued: Raptor microservices diagram via Excalidraw embed or custom canvas

---

## Open Questions (Need Input)

| # | Question | Affects |
|---|----------|---------|
| 1 | Which hosting provider? (Vercel / Netlify / other) | Analytics choice, form choice |
| 2 | Is Marlon open to international remote? | How aggressively to promote availability |
| 3 | Which 2 projects to write case studies for first? | Case study content sprint |
| 4 | Is a writing/blog section in scope for this cycle? | Whether to plan content now |
| 5 | What is the actual domain? (`marlondemas.dev` assumed) | OG tag URLs |

---

## Notes on What NOT to Do

- **No backend** — every feature in this plan is static or uses a serverless third party
- **No new dependencies for simple features** — clipboard API, IntersectionObserver, and
  `fetch()` are native; don't add libraries to replace them
- **No premature abstraction** — the filter, OG tags, and copy-email features are all
  ~20 lines each; don't abstract until there's a second consumer
- **Content before infrastructure** — don't build case study routes or blog infrastructure
  until the first piece of content is written and compelling
