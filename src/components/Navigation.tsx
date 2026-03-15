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
  ctaLabel = 'Back To You',
}: {
  items: NavItem[]
  ctaHref: string
  ctaLabel?: string
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border-strong)] bg-[rgba(10,10,15,0.8)] backdrop-blur-md">
        <div
          className={`section-shell flex h-[72px] items-center justify-between gap-6 transition-all duration-300 ${
            scrolled ? 'nav-shadow' : ''
          }`}
        >
          <Link
            className="mono-heading text-2xl font-bold tracking-[0.18em]"
            style={{ color: 'var(--neon-blue)' }}
            to="/"
          >
            MD
          </Link>

          {/* Desktop */}
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
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

          {/* Mobile toggle */}
          {items.length > 0 && (
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={close}
              transition={{ duration: 0.2, ease: motionTokens.easing.out }}
            />

            {/* Panel */}
            <motion.nav
              animate={{ x: 0 }}
              aria-label="Mobile navigation"
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col border-l border-[var(--border-glass)] bg-[rgba(10,10,15,0.97)] backdrop-blur-xl lg:hidden"
              exit={{ x: '100%' }}
              initial={{ x: '100%' }}
              transition={{ duration: 0.28, ease: motionTokens.easing.out }}
            >
              {/* Drawer header */}
              <div className="flex h-[72px] items-center justify-between border-b border-[var(--border-glass)] px-6">
                <span className="mono-heading text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-muted)]">
                  Navigation
                </span>
                <button
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  onClick={close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-1 flex-col gap-1 px-4 py-6">
                {items.map((item, i) => (
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 24 }}
                    key={item.label}
                    transition={{ delay: 0.07 + i * 0.05, duration: 0.22, ease: motionTokens.easing.out }}
                  >
                    <Link
                      className="mono-heading flex h-14 items-center rounded-xl px-4 text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-[var(--text-primary)]"
                      onClick={close}
                      to={item.href}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="border-t border-[var(--border-glass)] p-6">
                <div onClick={close}>
                  <ButtonLink className="w-full justify-center" href={ctaHref} kind="primary">
                    Back To You
                  </ButtonLink>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
