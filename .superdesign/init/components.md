# Shared UI Components

## ButtonLink (src/components/ButtonLink.tsx)

Pill-shaped CTA that renders as `<Link>` for internal routes or `<a>` for external/download links.

```tsx
import { Link } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

type ButtonKind = 'primary' | 'secondary' | 'muted'

const kindClass: Record<ButtonKind, string> = {
  primary: 'button-primary',
  secondary: 'button-secondary',
  muted: 'button-muted',
}

function isInternalLink(href: string) {
  return href.startsWith('/')
}

export function ButtonLink({
  children, href, kind, className = '', download = false, external = false,
}: PropsWithChildren<{
  href: string; kind: ButtonKind; className?: string; download?: boolean; external?: boolean
}>) {
  const classes = `button-link mono-heading text-sm font-medium ${kindClass[kind]} ${className}`.trim()
  if (download || !isInternalLink(href) || external) {
    return <a className={classes} download={download} href={href} rel={external ? 'noreferrer' : undefined} target={external ? '_blank' : undefined}>{children}</a>
  }
  return <Link className={classes} to={href}>{children}</Link>
}
```

## Tag (src/components/Tag.tsx)

Small monospace pill for tech tags.

```tsx
export function Tag({ label }: { label: string }) {
  return <span className="tag-pill">{label}</span>
}
```

## Icon & AccentIcon (src/components/Icon.tsx)

Lucide icon wrapper with accent-colored background circle.

```tsx
import type { ComponentType, SVGProps } from 'react'
import { Atom, BriefcaseBusiness, Cloud, Coffee, Component, Container, Diamond, Flame, GitBranch, Github, Globe, Heart, Hexagon, Linkedin, Mail, MapPin, Rocket, Server, Smartphone, Triangle, TrendingUp, Users, Layers3 } from 'lucide-react'
import type { AccentName, IconName } from '../types/content'

const icons: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  atom: Atom, briefcase: BriefcaseBusiness, cloud: Cloud, coffee: Coffee, component: Component,
  container: Container, diamond: Diamond, flame: Flame, 'git-branch': GitBranch, github: Github,
  globe: Globe, heart: Heart, hexagon: Hexagon, layers: Layers3, linkedin: Linkedin, mail: Mail,
  'map-pin': MapPin, rocket: Rocket, server: Server, smartphone: Smartphone, triangle: Triangle,
  'trending-up': TrendingUp, users: Users,
}

const accentClasses: Record<AccentName, string> = {
  blue: 'text-[var(--neon-blue)] bg-[rgba(0,212,255,0.08)]',
  cyan: 'text-[var(--neon-cyan)] bg-[rgba(6,182,212,0.08)]',
  green: 'text-[var(--neon-green)] bg-[rgba(16,185,129,0.08)]',
  purple: 'text-[var(--neon-purple)] bg-[rgba(139,92,246,0.08)]',
  yellow: 'text-[var(--neon-yellow)] bg-[rgba(251,191,36,0.08)]',
  red: 'text-[var(--signal-red)] bg-[rgba(255,59,48,0.08)]',
  orange: 'text-[var(--cta-orange)] bg-[rgba(255,132,0,0.08)]',
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name]
  return <Component className={className} strokeWidth={1.9} />
}

export function AccentIcon({ accent, icon }: { accent: AccentName; icon: IconName }) {
  return (
    <span className={`tech-icon-wrap ${accentClasses[accent]}`}>
      <Icon className="h-5 w-5" name={icon} />
    </span>
  )
}
```

## Reveal (src/components/Reveal.tsx)

Scroll-triggered fade-up animation wrapper.

```tsx
import type { PropsWithChildren } from 'react'
import { motion } from 'motion/react'
import { motionTokens } from '../data/motion'

export function Reveal({
  children, className = '', delay = 0, y = 28,
}: PropsWithChildren<{ className?: string; delay?: number; y?: number }>) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }}
      transition={{ duration: motionTokens.durations.reveal, ease: motionTokens.easing.out, delay }}
      viewport={motionTokens.viewport} whileInView={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  )
}
```

## SectionHeading (src/components/SectionHeading.tsx)

Section header with accent eyebrow, title, optional description.

```tsx
import type { AccentName } from '../types/content'

const accentText: Record<AccentName, string> = {
  blue: 'text-[var(--neon-blue)]', cyan: 'text-[var(--neon-cyan)]', green: 'text-[var(--neon-green)]',
  purple: 'text-[var(--neon-purple)]', yellow: 'text-[var(--neon-yellow)]', red: 'text-[var(--signal-red)]',
  orange: 'text-[var(--cta-orange)]',
}

export function SectionHeading({
  accent, eyebrow, title, description, align = 'left',
}: { accent: AccentName; eyebrow: string; title: string; description?: string; align?: 'left' | 'center' }) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      <span className={`section-label ${accentText[accent]}`}>{eyebrow}</span>
      <h2 className="mono-heading text-[2.25rem] leading-[1.15] font-bold tracking-[-0.06em] text-[var(--text-primary)] md:text-[2.625rem]">{title}</h2>
      {description ? <p className="max-w-[38rem] text-base leading-[1.7] text-[var(--text-secondary)] md:text-lg">{description}</p> : null}
    </div>
  )
}
```

## ProjectCard (src/components/ProjectCard.tsx)

Dual-mode project card — compact (vertical) or full-width (horizontal with image). Hover lifts with Motion.

```tsx
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { motionTokens } from '../data/motion'
import type { AccentName, Project } from '../types/content'
import { Tag } from './Tag'

const accentText: Record<AccentName, string> = { /* ... accent → text class map */ }
const accentLine: Record<AccentName, string> = { /* ... accent → bg class map */ }

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <motion.article className="surface-card overflow-hidden"
      transition={{ duration: motionTokens.durations.base, ease: motionTokens.easing.out }}
      whileHover={{ y: -6, scale: compact ? 1.01 : 1.005 }}>
      <div className={compact ? 'project-card-grid--compact' : 'project-card-grid'}>
        <div className={`project-card-image ${compact ? '' : 'project-card-image--full'}`}
          style={{ backgroundImage: `url(${project.image})` }} />
        <div className={`${compact ? 'p-6' : 'p-8'} flex flex-col gap-4`}>
          {/* status label, name, role, description, tags, external link */}
        </div>
      </div>
    </motion.article>
  )
}
```

## TechCard (src/components/TechCard.tsx)

Tech stack card with accent icon and subtitle.

```tsx
import { motion } from 'motion/react'
import type { TechItem } from '../types/content'
import { AccentIcon } from './Icon'

export function TechCard({ item }: { item: TechItem }) {
  return (
    <motion.article className="surface-card flex h-full flex-col justify-center gap-3 p-5"
      whileHover={{ y: -4, scale: 1.01 }}>
      <AccentIcon accent={item.accent} icon={item.icon} />
      <h3 className="mono-heading text-base font-bold text-[var(--text-primary)]">{item.name}</h3>
      <p className="text-sm text-[var(--text-muted)]">{item.subtitle}</p>
    </motion.article>
  )
}
```

## TimelineItem (src/components/TimelineItem.tsx)

Timeline row with colored dot, date/location sidebar, and description. Vertical line between entries.

## ImpactCard (src/components/ImpactCard.tsx)

Glass card with icon, title, description. Hover lifts with shadow.

## PersonalCard (src/components/PersonalCard.tsx)

Card with background image and text overlay. Hover lifts with scale.

## ContactLinkRow (src/components/ContactLinkRow.tsx)

Horizontal row of contact links with icons. Hover lifts each link.
