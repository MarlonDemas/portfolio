export type AccentName =
  | 'blue'
  | 'cyan'
  | 'green'
  | 'purple'
  | 'yellow'
  | 'red'
  | 'orange'

export type IconName =
  | 'atom'
  | 'briefcase'
  | 'cloud'
  | 'component'
  | 'container'
  | 'diamond'
  | 'flame'
  | 'git-branch'
  | 'github'
  | 'globe'
  | 'heart'
  | 'layers'
  | 'linkedin'
  | 'mail'
  | 'map-pin'
  | 'rocket'
  | 'server'
  | 'smartphone'
  | 'triangle'
  | 'trending-up'
  | 'users'
  | 'hexagon'
  | 'coffee'

export type ProjectStatus = 'current' | 'completed'

export interface NavItem {
  label: string
  href: string
}

export interface CtaLink {
  label: string
  href: string
  kind: 'primary' | 'secondary' | 'muted'
  download?: boolean
  external?: boolean
}

export interface Project {
  slug: string
  name: string
  status: ProjectStatus
  statusLabel: string
  accent: AccentName
  image: string
  description: string
  roleLabel: string
  externalUrl?: string
  externalLabel: string
  tags: string[]
  featured: boolean
}

export interface TechItem {
  name: string
  subtitle: string
  icon: IconName
  accent: AccentName
}

export interface TechCategory {
  title: string
  items: TechItem[]
}

export interface ExperienceEntry {
  dateRange: string
  location: string
  title: string
  company: string
  description: string
  accent: AccentName
  tags?: string[]
}

export interface ImpactMetric {
  title: string
  description: string
  icon: IconName
  accent: AccentName
}

export interface PersonalCard {
  title: string
  description: string
  image: string
}

export interface ContactLink {
  kind: 'email' | 'linkedin' | 'github' | 'portfolio'
  label: string
  href: string
  icon: IconName
}

export interface QuickFact {
  icon: IconName
  accent: AccentName
  label: string
}

export interface HeroStat {
  value: string
  label: string
  accent: AccentName
}

export interface AboutStat {
  value: string
  label: string
}
