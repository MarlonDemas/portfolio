# Layouts

## Navigation (src/components/Navigation.tsx)

Sticky header with glass effect, logo "MD" on the left, nav links hidden on mobile, CTA button on the right.

```tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink } from './ButtonLink'
import type { NavItem } from '../types/content'

export function Navigation({
  items,
  ctaHref,
}: {
  items: NavItem[]
  ctaHref: string
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-strong)] bg-[rgba(10,10,15,0.8)] backdrop-blur-md">
      <div
        className={`section-shell flex h-[72px] items-center justify-between gap-6 transition-all duration-300 ${
          scrolled ? 'nav-shadow' : ''
        }`}
      >
        <Link className="mono-heading text-2xl font-bold tracking-[0.18em] text-[var(--neon-blue)]" to="/">
          MD
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {items.map((item) => (
            <Link
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
              key={item.label}
              to={item.href}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href={ctaHref} kind="primary">
            Back To You
          </ButtonLink>
        </nav>
        <ButtonLink className="lg:hidden" href={ctaHref} kind="primary">
          Contact
        </ButtonLink>
      </div>
    </header>
  )
}
```

## Footer (src/components/Footer.tsx)

```tsx
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
```

## Page Shell Pattern

Both pages use the same structure:
```tsx
<div className="page-shell">
  <Navigation ctaHref="/#contact" items={siteNav} />
  <main>
    {/* sections with alternating section-band-dark / section-band-soft */}
  </main>
  <Footer copy={siteMeta.footerCopy} links={footerLinks} />
</div>
```
