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
