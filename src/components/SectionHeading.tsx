import type { AccentName } from '../types/content'

const accentText: Record<AccentName, string> = {
  blue: 'text-[var(--neon-blue)]',
  cyan: 'text-[var(--neon-cyan)]',
  green: 'text-[var(--neon-green)]',
  purple: 'text-[var(--neon-purple)]',
  yellow: 'text-[var(--neon-yellow)]',
  red: 'text-[var(--signal-red)]',
  orange: 'text-[var(--cta-orange)]',
}

export function SectionHeading({
  accent,
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  accent: AccentName
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      <span className={`section-label ${accentText[accent]}`}>{eyebrow}</span>
      <h2 className="mono-heading text-[2.25rem] leading-[1.15] font-bold tracking-[-0.06em] text-[var(--text-primary)] md:text-[2.625rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[38rem] text-base leading-[1.7] text-[var(--text-secondary)] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
