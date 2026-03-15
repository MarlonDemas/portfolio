# Extractable Reusable Components

## Layout

### Navigation
- **Source**: `src/components/Navigation.tsx`
- **Description**: Sticky glass header with logo, nav links, CTA button
- **Props**: `items: NavItem[]`, `ctaHref: string`
- **Hardcoded**: "MD" logo text, lg breakpoint for nav visibility

### Footer
- **Source**: `src/components/Footer.tsx`
- **Description**: Bottom bar with copyright and links
- **Props**: `copy: string`, `links: Array<{label, href, external}>`

## Basic

### ButtonLink
- **Source**: `src/components/ButtonLink.tsx`
- **Description**: Pill-shaped CTA, auto-detects internal vs external
- **Props**: `href`, `kind: primary|secondary|muted`, `download?`, `external?`, `className?`

### Tag
- **Source**: `src/components/Tag.tsx`
- **Description**: Small monospace tag pill
- **Props**: `label: string`

### Icon / AccentIcon
- **Source**: `src/components/Icon.tsx`
- **Description**: Lucide icon wrapper; AccentIcon adds colored background circle
- **Props**: `name: IconName`, `accent: AccentName`

### SectionHeading
- **Source**: `src/components/SectionHeading.tsx`
- **Description**: Eyebrow + title + optional description
- **Props**: `accent`, `eyebrow`, `title`, `description?`, `align?`

### Reveal
- **Source**: `src/components/Reveal.tsx`
- **Description**: Scroll-triggered fade-up wrapper
- **Props**: `delay?`, `y?`, `className?`

## Cards

### ProjectCard
- **Source**: `src/components/ProjectCard.tsx`
- **Description**: Dual-mode project card (compact/full)
- **Props**: `project: Project`, `compact?: boolean`

### TechCard
- **Source**: `src/components/TechCard.tsx`
- **Description**: Tech stack item card
- **Props**: `item: TechItem`

### ImpactCard
- **Source**: `src/components/ImpactCard.tsx`
- **Description**: Impact metric card with icon
- **Props**: `metric: ImpactMetric`

### PersonalCard
- **Source**: `src/components/PersonalCard.tsx`
- **Description**: Image + text personal interest card
- **Props**: `card: PersonalCard`

### TimelineItem
- **Source**: `src/components/TimelineItem.tsx`
- **Description**: Experience timeline row with dot and line
- **Props**: `entry: ExperienceEntry`, `isLast: boolean`

### ContactLinkRow
- **Source**: `src/components/ContactLinkRow.tsx`
- **Description**: Horizontal row of contact links with icons
- **Props**: `links: ContactLink[]`
