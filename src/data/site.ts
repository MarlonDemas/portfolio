import type { ContactLink, CtaLink, NavItem } from '../types/content'

export const siteNav: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Work (9)', href: '/#projects' },
  { label: 'Career', href: '/#career' },
  { label: 'Contact', href: '/#contact' },
]

export const heroCtas: CtaLink[] = [
  { label: 'View Projects', href: '/projects', kind: 'primary' },
  {
    label: 'Download CV',
    href: '/assets/docs/Marlon_Demas_CV.pdf',
    kind: 'secondary',
    download: true,
  },
  { label: 'Contact Me', href: '/#contact', kind: 'muted' },
]

export const contactCta: CtaLink = {
  label: 'Say Hello',
  href: 'mailto:marlon@specno.com',
  kind: 'primary',
}

export const contactLinks: ContactLink[] = [
  {
    kind: 'email',
    label: 'marlon@specno.com',
    href: 'mailto:marlon@specno.com',
    icon: 'mail',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/marlondemas/',
    icon: 'linkedin',
  },
  {
    kind: 'github',
    label: 'GitHub',
    href: 'https://github.com/marlondemas',
    icon: 'github',
  },
  {
    kind: 'portfolio',
    label: 'Portfolio',
    href: '/projects',
    icon: 'globe',
  },
]

export const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/marlondemas', external: true },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/marlondemas/',
    external: true,
  },
  { label: 'Back to top ↑', href: '/#top', external: false },
]

export const siteMeta = {
  title: 'Marlon Demas',
  role: 'Senior Full-Stack Software Engineer',
  availability: 'Available · Open to remote (intl)',
  description:
    'From electrical engineering to leading cross-platform product development. Currently engineering Raptor Technologies at Specno — a school safety platform serving 60,000+ schools worldwide. Previously led Mirai, a gamification app. Angular, React Native, Web3, and everything in between.',
  footerCopy: '© 2026 Marlon Demas. Architected with Purpose.',
}
