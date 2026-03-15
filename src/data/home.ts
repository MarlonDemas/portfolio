import type {
  AboutStat,
  ExperienceEntry,
  HeroStat,
  QuickFact,
} from '../types/content'

export const heroStats: HeroStat[] = [
  { value: '7+', label: 'Years Experience', accent: 'blue' },
  { value: '20+', label: 'Projects Shipped', accent: 'purple' },
  { value: '60k+', label: 'Schools Served', accent: 'green' },
]

export const tickerItems = [
  'Vue.js',
  'React',
  'React Native',
  '.NET',
  'NestJS',
  'Node.js',
  'Docker',
  'Azure',
  'Firebase',
  'Solidity',
  'TypeScript',
  'Angular',
]

export const aboutStats: AboutStat[] = [
  { value: '7+', label: 'Years' },
  { value: '15+', label: 'Products' },
  { value: '60k+', label: 'Users' },
]

export const heroTagline = 'Turning complex problems into seamless digital experiences.'

export const aboutCopy = {
  eyebrow: 'About',
  title: 'Engineering for impact.',
  paragraphs: [
    'I started out studying electrical engineering before discovering my passion for software at Life Choices Academy in 2018. That pivot launched a career focused on solving complex problems and building scalable digital products across South Africa and Europe.',
    'Today, as a full-stack engineer at Specno, I lead development for diverse platforms — from NFT marketplaces to school safety SaaS. I focus on connecting strong technical execution with high-level business outcomes and mentoring the next generation of builders.',
  ],
  photo: '/assets/about-photo.jpeg',
  photoLabel: 'Cape Town, South Africa',
}

export const quickFacts: QuickFact[] = [
  {
    icon: 'map-pin',
    accent: 'blue',
    label: 'Based in Cape Town, South Africa',
  },
  {
    icon: 'globe',
    accent: 'cyan',
    label: 'Open to remote · UTC+2',
  },
  {
    icon: 'users',
    accent: 'purple',
    label: 'Mentoring & team leadership',
  },
  {
    icon: 'heart',
    accent: 'red',
    label: 'Manchester United supporter',
  },
]


export const experience: ExperienceEntry[] = [
  {
    dateRange: '2021 — Present',
    location: 'Cape Town, SA',
    title: 'Software Engineer',
    company: 'Specno — An Innovation Agency',
    description:
      'Leading cross-platform engineering for Raptor school safety SaaS and diverse product ecosystems.',
    accent: 'blue',
    tags: ['React Native', 'Vue 3'],
  },
  {
    dateRange: '2019 — 2021',
    location: 'Stellenbosch, SA',
    title: 'Lead Frontend Developer',
    company: 'Adept ICT',
    description:
      'Orchestrated large-scale Vue migration and dashboard architecture.',
    accent: 'cyan',
  },
  {
    dateRange: '2021',
    location: 'Remote (Rome)',
    title: 'Frontend Developer',
    company: 'Longbeard',
    description:
      'Engineered React/Gatsby web systems for international clients.',
    accent: 'purple',
  },
  {
    dateRange: '2018 — 2019',
    location: 'Cape Town, SA',
    title: 'Full Stack Web Development Student',
    company: 'Life Choices Academy',
    description:
      'Intensive full-stack programme. Pivoted from electrical engineering into software.',
    accent: 'green',
  },
]


export const testimonial = {
  quote:
    'Marlon is a rare breed of engineer who understands both deep technical architecture and the human side of product development.',
  attribution: 'Senior Stakeholder, Tech Partners',
}

export const contactIntro = {
  title: "Let's scale together.",
  description:
    "I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.",
}

export const projectsPageIntro = {
  eyebrow: 'All Projects',
  title: 'My Project Portfolio',
  description:
    "A comprehensive look at the products I've built — from school safety platforms and blockchain marketplaces to gamification apps, social networking tools, and government services.",
}
