import { Link } from 'react-router-dom'

export function Footer({
  copy,
  links,
}: {
  copy: string
  links: Array<{ label: string; href: string; external: boolean }>
}) {
  return (
    <footer className="border-t border-[var(--border-strong)] bg-[var(--surface-1)]">
      <div className="section-shell flex min-h-[72px] flex-col justify-center gap-4 py-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p className="text-sm text-[var(--text-muted)]">{copy}</p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
          {links.map((link) =>
            link.external ? (
              <a
                className={`text-sm transition-colors duration-200 ${
                  link.label.startsWith('Back')
                    ? 'mono-heading font-semibold text-[var(--neon-blue)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ) : (
              <Link
                className="mono-heading text-sm font-semibold text-[var(--neon-blue)]"
                key={link.label}
                to={link.href}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </footer>
  )
}
