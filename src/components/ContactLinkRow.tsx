import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import type { ContactLink } from '../types/content'

function CopyEmailLink({ link }: { link: ContactLink }) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const handleClick = async () => {
    const email = link.href.replace('mailto:', '')
    try {
      await navigator.clipboard.writeText(email)
      if (timerRef.current) clearTimeout(timerRef.current)
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = link.href
    }
  }

  return (
    <button
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      className="group flex cursor-pointer items-center gap-2 text-[var(--text-secondary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--text-primary)]"
      onClick={handleClick}
    >
      <Icon
        className="h-[1.05rem] w-[1.05rem] text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--neon-blue)]"
        name={link.icon}
      />
      <span className="transition-colors duration-200">
        {copied ? 'Copied!' : link.label}
      </span>
    </button>
  )
}

export function ContactLinkRow({ links }: { links: ContactLink[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:gap-8">
      {links.map((link) => {
        if (link.kind === 'email') {
          return <CopyEmailLink key={link.label} link={link} />
        }

        const external = !link.href.startsWith('/') && !link.href.startsWith('mailto:')

        return (
          <a
            className="group flex items-center gap-2 text-[var(--text-secondary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--text-primary)]"
            href={link.href}
            key={link.label}
            rel={external ? 'noreferrer' : undefined}
            target={external ? '_blank' : undefined}
          >
            <Icon
              className="h-[1.05rem] w-[1.05rem] text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--neon-blue)]"
              name={link.icon}
            />
            <span>{link.label}</span>
          </a>
        )
      })}
    </div>
  )
}
