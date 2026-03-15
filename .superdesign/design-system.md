# Design System — marlondemas.dev Portfolio

## Product Context
Personal portfolio website for Marlon Demas — software engineer. Dark-themed, minimal, developer-forward aesthetic with neon accent colors and glass morphism effects. Two pages: homepage (sections: hero, about, stack, work, experience, impact, personal, contact) and projects page (full project list).

## Color Palette

### Surfaces & Backgrounds
| Token | Value | Usage |
|-------|-------|-------|
| --surface-1 | #0a0a0f | Page background, footer |
| --surface-2 | #12121a | Card backgrounds |
| --surface-3 | #1a1a2e | Elevated card / hover states |
| --border-strong | #1e1e3a | Section dividers, card borders |
| --border-glass | rgba(255,255,255,0.07) | Glass panel borders |
| --glass-fill | rgba(255,255,255,0.04) | Glass panel fill |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| --text-primary | #f0f0ff | Headings, primary copy |
| --text-secondary | #8a8aa3 | Body text, descriptions |
| --text-muted | #4a4a6a | Captions, subtle labels |

### Accent Colors (Neon System)
| Name | Token | Value | Usage |
|------|-------|-------|-------|
| blue | --neon-blue | #00d4ff | Primary brand accent, logo, links, CTAs |
| cyan | --neon-cyan | #06b6d4 | Secondary tech accent |
| green | --neon-green | #10b981 | Success, active status |
| purple | --neon-purple | #8b5cf6 | Gradient text endpoint, decorative |
| yellow | --neon-yellow | #fbbf24 | Warning, highlight |
| red | --signal-red | #ff3b30 | Error, destructive |
| orange | --cta-orange | #ff8400 | CTA buttons, primary actions |

### Special
| Token | Value | Usage |
|-------|-------|-------|
| --cta-text | #111111 | Text on CTA buttons |
| --pill-fill | #e7e8e5 | Tag pill background |
| --pill-border | #cbccc9 | Tag pill border |

## Typography

### Font Families
- **Headings**: "JetBrains Mono", monospace — all section titles, nav logo, button text, labels
- **Body**: "Geist", sans-serif — paragraphs, descriptions, card copy

### Scale
| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| Page title (h1) | clamp(2.75rem, 5vw, 4.5rem) | 800 | -0.06em |
| Section title (h2) | 2.25rem → 2.625rem (md) | 700 | -0.06em |
| Card title (h3) | 1rem (base) | 700 | normal |
| Body | 1rem → 1.125rem (md) | 400 | normal |
| Small/caption | 0.875rem | 500 | normal |
| Tag pill | 0.75rem | 500 | 0.02em |
| Section label | 0.75rem | 600 | 0.16em, uppercase |

## Spacing & Layout

| Token | Value |
|-------|-------|
| --page-width | 1440px |
| --page-padding | clamp(1.5rem, 4vw, 7.5rem) |
| --radius-card | 16px |
| --radius-pill | 999px |
| Section vertical padding | py-20 md:py-28 |
| Card padding | p-5 to p-8 |
| Grid gaps | gap-4 to gap-8 |

## Component Patterns

### Cards
- `.surface-card`: bg surface-2, border border-strong, rounded radius-card
- `.glass-panel`: bg glass-fill, border border-glass, backdrop-blur-xl, subtle shadow
- Hover: y: -4 to -6px lift + scale 1.005–1.01 via Motion

### Buttons
- `.button-primary`: bg cta-orange, text cta-text, font JetBrains Mono, rounded-full, with pulse animation
- `.button-secondary`: bg glass-fill, border border-glass, text text-primary, backdrop-blur
- `.button-muted`: bg transparent, border border-glass, text text-secondary

### Section Headings
- Eyebrow label (section-label): uppercase, tiny, accent-colored, with decorative line
- Title: mono-heading, bold, large
- Optional description: text-secondary, max-w-[38rem]

### Tags
- `.tag-pill`: small rounded pill, light fill (#e7e8e5), dark text, monospace, 0.75rem

## Motion & Animation

### Tokens (from motion.ts)
| Property | Values |
|----------|--------|
| Durations | fast: 0.24s, base: 0.38s, reveal: 0.54s, slow: 0.72s |
| Delays | short: 0.08s, medium: 0.14s, long: 0.2s |
| Easing (out) | cubic-bezier(0.22, 1, 0.36, 1) |
| Easing (smooth) | cubic-bezier(0.16, 1, 0.3, 1) |
| Easing (inOut) | cubic-bezier(0.65, 0, 0.35, 1) |
| Viewport trigger | once: true, amount: 0.28 |

### Patterns
- **Scroll reveal**: fade-up (opacity 0→1, y 28→0) with staggered delays
- **Card hover**: translateY(-4 to -6px) + subtle scale
- **CTA pulse**: animated border ring on primary buttons
- **Contact gradient**: slow-moving animated gradient background

## Background Treatment
Body uses layered gradients:
```css
background:
  radial-gradient(circle at top center, rgba(26, 26, 78, 0.92), rgba(10, 10, 15, 0) 42%),
  linear-gradient(180deg, #090911 0%, #0a0a0f 100%);
```

## Grid Patterns
- Tech stack: 2-col → 3-col → 4-col responsive grid
- Featured projects: 1-col → 2-col grid (compact cards)
- Impact metrics: 1-col → 2-col → 4-col grid
- Personal cards: 1-col → 2-col → 3-col grid
- Experience timeline: single column with vertical line connector
