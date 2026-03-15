import type { ComponentType, SVGProps } from 'react'
import {
  Atom,
  BriefcaseBusiness,
  Cloud,
  Coffee,
  Component,
  Container,
  Diamond,
  Flame,
  GitBranch,
  Github,
  Globe,
  Heart,
  Hexagon,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
  Server,
  Smartphone,
  Triangle,
  TrendingUp,
  Users,
  Layers3,
} from 'lucide-react'
import type { AccentName, IconName } from '../types/content'

const icons: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  atom: Atom,
  briefcase: BriefcaseBusiness,
  cloud: Cloud,
  coffee: Coffee,
  component: Component,
  container: Container,
  diamond: Diamond,
  flame: Flame,
  'git-branch': GitBranch,
  github: Github,
  globe: Globe,
  heart: Heart,
  hexagon: Hexagon,
  layers: Layers3,
  linkedin: Linkedin,
  mail: Mail,
  'map-pin': MapPin,
  rocket: Rocket,
  server: Server,
  smartphone: Smartphone,
  triangle: Triangle,
  'trending-up': TrendingUp,
  users: Users,
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

export function Icon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  const Component = icons[name]
  return <Component className={className} strokeWidth={1.9} />
}

export function AccentIcon({
  accent,
  icon,
}: {
  accent: AccentName
  icon: IconName
}) {
  return (
    <span className={`tech-icon-wrap ${accentClasses[accent]}`}>
      <Icon className="h-5 w-5" name={icon} />
    </span>
  )
}
