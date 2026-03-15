import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { ButtonLink } from './ButtonLink'
import { motionTokens } from '../data/motion'
import type { NavItem } from '../types/content'

export function Navigation({
  items,
  ctaHref,
  ctaLabel = 'Contact',
}: {
  items: NavItem[]
  ctaHref: string
  ctaLabel?: string
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border-strong)] bg-[rgba(10,10,15,0.8)] backdrop-blur-md">
        <div
          className={`section-shell flex h-[72px] items-center justify-between gap-6 transition-all duration-300 ${
            scrolled ? 'nav-shadow' : ''
          }`}
        >
          <Link
            className="mono-heading text-2xl font-bold tracking-[0.18em] text-[var(--neon-blue)]"
            to="/"
          >
            MD
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <Link
                className="text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                key={item.label}
                to={item.href}
              >
                {item.label}
              </Link>
            ))}
            {items.length === 0 ? (
              <Link
                className="text-sm font-medium text-[var(--neon-blue)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                to={ctaHref}
              >
                {ctaLabel}
              </Link>
            ) : (
              <ButtonLink href={ctaHref} kind="primary">
                {ctaLabel}
              </ButtonLink>
            )}
          </nav>

          <button
            aria-label="Open menu"
            className="p-2 text-white md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#0a0a0f] md:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: motionTokens.easing.out }}
          >
            <button
              aria-label="Close menu"
              className="absolute right-6 top-6 p-2 text-white"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>

            <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-8">
              {items.map((item, i) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  key={item.label}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.25,
                    ease: motionTokens.easing.out,
                  }}
                >
                  <Link
                    className="mono-heading text-2xl font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-[var(--neon-blue)]"
                    onClick={() => setMenuOpen(false)}
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{
                  delay: 0.08 + items.length * 0.06,
                  duration: 0.25,
                  ease: motionTokens.easing.out,
                }}
              >
                <Link
                  className="mono-heading text-2xl font-bold uppercase tracking-[0.18em] text-[var(--cta-orange)] transition-colors hover:text-[var(--neon-blue)]"
                  onClick={() => setMenuOpen(false)}
                  to={ctaHref}
                >
                  {ctaLabel}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
