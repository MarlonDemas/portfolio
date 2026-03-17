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

export const aboutCopy = {
  eyebrow: 'About Me',
  title: 'From electrical engineering to full-stack product leadership.',
  paragraphs: [
    'I started out studying electrical engineering at CPUT Bellville before discovering my passion for software development at Life Choices Academy in 2018. That decision set me on a new path into tech, where I’ve built a career around solving complex problems and building scalable digital products.',
    'My early experience at Adept ICT in Stellenbosch included helping lead a major dashboard migration from Vaadin to Vue, while becoming actively involved in the South African Vue community. Alongside that, I worked remotely with Longbeard in Rome, where I strengthened my React and Gatsby skills.',
    'Since joining Specno in late 2021, I’ve worked on products including the Old Mutual ANDTHIS mall shopping app, the SBA Reading multilingual children’s app, and Momint’s NFT solar energy marketplace. I also led Mirai from concept to launch and now contribute to Raptor Technologies.',
    'Today, I’m a full-stack software engineer focused on building scalable, high-performance solutions that connect strong technical execution with real business outcomes. I also care deeply about mentoring junior developers and building collaborative teams. Outside of work, you’ll usually find me on the football pitch or at the pool table.'
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
      'Shipped products across Angular, React Native, and full-stack roles. Led development on Mirai (goal-setting gamification app) and Momint (NFT solar energy marketplace). Previously built Old Mutual ANDTHIS app and SBA Reading multilingual children’s app. Currently engineering Raptor Technologies — school safety SaaS serving 60,000+ schools in 55 countries.',
    accent: 'blue',
    tags: ['React Native', 'Vue 3'],
  },
  {
    dateRange: '2019 — 2021',
    location: 'Stellenbosch, SA',
    title: 'Lead Frontend Developer',
    company: 'Adept ICT',
    description:
      'Led major dashboard migration from Vaadin to Vue. Built internal tools and client-facing dashboards using HTML, SASS, Bootstrap, Vue 2, Vue Composition API, Java, Docker, Vert.x, and Azure. Active in the South African Vue community — nearly organized VueConfSA alongside Shailen Naidoo before COVID cancellation.',
    accent: 'purple',
  },
  {
    dateRange: '2021',
    location: 'Remote (Rome)',
    title: 'Frontend Developer',
    company: 'Longbeard',
    description:
      'Concurrent freelance role building and maintaining websites using React, Gatsby, GraphQL, PHP, and WordPress. Handled site checks, updates, and minor feature implementations for international clients.',
    accent: 'cyan',
  },
  {
    dateRange: '2018 — 2019',
    location: 'Cape Town, SA',
    title: 'Full Stack Web Development Student',
    company: 'Life Choices Academy',
    description:
      'Intensive full-stack web development programme covering HTML, CSS, JavaScript, PHP, MySQL, design thinking, and professional development. Pivoted from electrical engineering (CPUT) into software — the decision that launched my career in tech.',
    accent: 'green',
  },
]


export const contactIntro = {
  title: "Let's build something together",
  description:
    "I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.",
}

export const projectsPageIntro = {
  eyebrow: 'All Projects',
  title: 'My Project Portfolio',
  description:
    "A comprehensive look at the products I've built — from school safety platforms and blockchain marketplaces to gamification apps, social networking tools, and government services.",
}
