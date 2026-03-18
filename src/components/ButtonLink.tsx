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
  children,
  href,
  kind,
  className = '',
  download = false,
  external = false,
}: PropsWithChildren<{
  href: string
  kind: ButtonKind
  className?: string
  download?: boolean
  external?: boolean
}>) {
  const classes = `button-link mono-heading text-sm font-medium ${kindClass[kind]} ${className}`.trim()

  if (download || !isInternalLink(href) || external) {
    return (
      <a
        className={classes}
        download={download || undefined}
        href={href}
        rel={download || external ? 'noreferrer' : undefined}
        target={download || external ? '_blank' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <Link className={classes} to={href}>
      {children}
    </Link>
  )
}
