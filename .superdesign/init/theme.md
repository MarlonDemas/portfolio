# Theme — Design Tokens & Styling

## Stack
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin, no tailwind.config file)
- **Fonts**: JetBrains Mono (headings), Geist (body) — loaded via Google Fonts
- **Animations**: Motion (framer-motion successor) for scroll reveals and hover effects

## CSS Custom Properties (src/index.css)

```css
:root {
  --surface-1: #0a0a0f;
  --surface-2: #12121a;
  --surface-3: #1a1a2e;
  --border-strong: #1e1e3a;
  --border-glass: #ffffff12;
  --glass-fill: #ffffff0a;
  --text-primary: #f0f0ff;
  --text-secondary: #8a8aa3;
  --text-muted: #4a4a6a;
  --neon-blue: #00d4ff;
  --neon-cyan: #06b6d4;
  --neon-green: #10b981;
  --neon-purple: #8b5cf6;
  --neon-yellow: #fbbf24;
  --signal-red: #ff3b30;
  --cta-orange: #ff8400;
  --cta-text: #111111;
  --pill-fill: #e7e8e5;
  --pill-border: #cbccc9;
  --page-width: 1440px;
  --page-padding: clamp(1.5rem, 4vw, 7.5rem);
  --radius-card: 16px;
  --radius-pill: 999px;
  --font-heading: "JetBrains Mono", monospace;
  --font-body: "Geist", sans-serif;
}
```

## Accent System

Seven named accents mapped to CSS variables throughout components:

| Name | Variable | Hex |
|------|----------|-----|
| blue | --neon-blue | #00d4ff |
| cyan | --neon-cyan | #06b6d4 |
| green | --neon-green | #10b981 |
| purple | --neon-purple | #8b5cf6 |
| yellow | --neon-yellow | #fbbf24 |
| red | --signal-red | #ff3b30 |
| orange | --cta-orange | #ff8400 |

## Motion Tokens (src/data/motion.ts)

```ts
export const motionTokens = {
  durations: { fast: 0.24, base: 0.38, reveal: 0.54, slow: 0.72 },
  delays: { short: 0.08, medium: 0.14, long: 0.2 },
  easing: {
    out: [0.22, 1, 0.36, 1] as const,
    smooth: [0.16, 1, 0.3, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
  },
  viewport: { once: true, amount: 0.28 },
}
```

## Key Utility Classes

- `.page-shell` — min-height: 100vh, overflow-x: clip
- `.section-shell` — max-width page container with responsive padding
- `.surface-card` — dark card with border and rounded corners
- `.glass-panel` — translucent card with backdrop blur
- `.mono-heading` — JetBrains Mono font
- `.gradient-text` — blue→purple gradient text
- `.button-link`, `.button-primary`, `.button-secondary`, `.button-muted` — pill-shaped CTAs
- `.tag-pill` — small monospace tag chip
- `.section-label` — uppercase eyebrow with decorative line
- `.contact-gradient` — animated gradient background for contact section
- `.cta-pulse` — pulsing border ring animation on CTA buttons

## Background Treatment

Body uses a layered radial + linear gradient:
```css
background:
  radial-gradient(circle at top center, rgba(26, 26, 78, 0.92), rgba(10, 10, 15, 0) 42%),
  linear-gradient(180deg, #090911 0%, #0a0a0f 100%);
```
