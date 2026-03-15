import { Quote } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink'
import { ContactForm } from '../components/ContactForm'
import { ContactLinkRow } from '../components/ContactLinkRow'
import { Footer } from '../components/Footer'
import { AccentIcon } from '../components/Icon'
import { Navigation } from '../components/Navigation'
import { ParticleBackground } from '../components/ParticleBackground'
import { Reveal } from '../components/Reveal'
import { TechTicker } from '../components/TechTicker'
import { accentVar } from '../data/accents'
import {
  aboutCopy,
  aboutStats,
  contactIntro,
  experience,
  heroTagline,
  quickFacts,
  testimonial,
  tickerItems,
} from '../data/home'
import { motionTokens } from '../data/motion'
import { featuredProjects } from '../data/projects'
import { contactLinks, footerLinks, heroCtas, siteMeta, siteNav } from '../data/site'

export function HomePage() {
  return (
    <div className="page-shell" id="top">
      <Navigation ctaHref="/#contact" items={siteNav} />

      <main>
        {/* ── Hero ── */}
        <section
          className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden"
          data-testid="home-hero"
        >
          <ParticleBackground />

          <div className="z-10 max-w-5xl px-6 text-center">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              className="glass-panel mb-8 inline-flex items-center gap-3 rounded-full px-5 py-2"
              transition={{ duration: 4.8, ease: 'easeInOut', repeat: Infinity }}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--neon-green)]" />
              <span className="mono-heading text-[11px] font-bold uppercase tracking-widest text-[var(--neon-green)]">
                {siteMeta.availability}
              </span>
            </motion.div>

            <motion.div
              className="hero-name-wrap mb-6"
              initial={{ opacity: 0, y: 28 }}
              transition={{
                duration: motionTokens.durations.slow,
                ease: motionTokens.easing.out,
              }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="hero-name text-7xl font-bold leading-[0.85] tracking-tighter md:text-[8.5rem]">
                MARLON
                <br />
                DEMAS
              </h1>
            </motion.div>

            <div className="space-y-4">
              <motion.p
                className="gradient-text mono-heading text-xl font-bold tracking-wide md:text-3xl"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.08, duration: motionTokens.durations.reveal }}
                animate={{ opacity: 1 }}
              >
                {siteMeta.role}
              </motion.p>
              <motion.p
                className="text-lg font-medium text-slate-400 md:text-xl"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.12, duration: motionTokens.durations.reveal }}
                animate={{ opacity: 1 }}
              >
                {heroTagline}
              </motion.p>
            </div>

            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 18 }}
              transition={{ delay: 0.16, duration: motionTokens.durations.reveal }}
              animate={{ opacity: 1, y: 0 }}
            >
              {heroCtas.slice(0, 2).map((cta) => (
                <ButtonLink
                  download={cta.download}
                  href={cta.href}
                  key={cta.label}
                  kind={cta.kind}
                >
                  {cta.label}
                </ButtonLink>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Tech Ticker ── */}
        <TechTicker items={tickerItems} />

        {/* ── About ── */}
        <section className="py-24 md:py-32" id="about">
          <div className="section-shell">
            {/* Stat cards */}
            <Reveal>
              <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
                {aboutStats.map((stat, i) => {
                  const accents = ['blue', 'purple', 'green'] as const
                  const accent = accents[i]
                  return (
                    <div
                      className="glass-panel p-8 text-center"
                      key={stat.label}
                      style={{ borderTop: `2px solid ${accentVar[accent]}` }}
                    >
                      <h4 className="mb-2 text-4xl font-bold text-white">{stat.value}</h4>
                      <p className="mono-heading text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {stat.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </Reveal>

            <Reveal>
              <div className="grid items-start gap-16 lg:grid-cols-5">
                {/* Left — Bio */}
                <div className="space-y-12 lg:col-span-3">
                  <div className="flex items-center gap-6">
                    <img
                      alt="Marlon Demas"
                      className="h-24 w-24 rounded-full border-4 border-[var(--neon-blue)] object-cover"
                      src={aboutCopy.photo}
                      style={{ objectPosition: 'top' }}
                    />
                    <div className="space-y-2">
                      <span className="section-label text-[var(--neon-blue)]">
                        {aboutCopy.eyebrow}
                      </span>
                      <h2 className="mono-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                        {aboutCopy.title}
                      </h2>
                    </div>
                  </div>

                  <div className="max-w-[650px] space-y-8 text-lg leading-relaxed text-slate-400">
                    {aboutCopy.paragraphs.map((p) => (
                      <p key={p.slice(0, 30)}>{p}</p>
                    ))}
                  </div>

                  <div>
                    <Link
                      className="text-xs font-bold uppercase tracking-widest text-[var(--neon-blue)] hover:underline"
                      to="/#career"
                    >
                      View My Journey →
                    </Link>
                  </div>
                </div>

                {/* Right — Quick Facts */}
                <div className="space-y-8 lg:col-span-2">
                  <div className="glass-panel space-y-8 p-8">
                    <h3 className="mono-heading text-sm font-bold uppercase tracking-widest text-white">
                      Quick Facts
                    </h3>
                    <div className="grid gap-6">
                      {quickFacts.map((fact) => (
                        <div className="flex items-center gap-4 text-slate-400" key={fact.label}>
                          <AccentIcon accent={fact.accent} icon={fact.icon} />
                          <span>{fact.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Projects (Bento Grid) ── */}
        <section className="bg-white/[0.02] py-24 md:py-32" id="projects">
          <div className="section-shell">
            <Reveal>
              <div className="mb-16 flex flex-col items-center gap-4 text-center">
                <span className="section-label text-[var(--neon-cyan)]">Portfolio</span>
                <h2 className="mono-heading text-4xl font-bold text-white md:text-5xl">
                  Products that ship.
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3" data-testid="featured-projects">
              {/* Raptor — Featured (2-col span) */}
              <Reveal className="md:col-span-2">
                <article className="bento-card bento-card--cyan flex h-auto flex-col overflow-hidden md:h-[480px] md:flex-row">
                  <div className="flex flex-col justify-between p-10 md:w-1/2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="mono-heading text-3xl font-bold text-white">
                          {featuredProjects[0].name}
                        </h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[var(--neon-cyan)]">
                          Platform Engineering
                        </p>
                      </div>
                      <p className="text-slate-400">
                        Scaling school safety SaaS serving 60,000+ schools across 55 countries using
                        Vue 3 and .NET.
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {featuredProjects[0].tags.slice(0, 3).map((tag) => (
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center overflow-hidden p-6 md:w-1/2">
                    <img
                      alt={`${featuredProjects[0].name} screenshot`}
                      className="perspective-card rounded-xl border border-white/10 shadow-2xl"
                      src={featuredProjects[0].image}
                    />
                  </div>
                </article>
              </Reveal>

              {/* Mirai */}
              <Reveal delay={0.08}>
                <article className="bento-card bento-card--purple flex h-[480px] flex-col overflow-hidden">
                  <div className="space-y-4 p-8">
                    <div>
                      <h3 className="mono-heading text-2xl font-bold text-white">
                        {featuredProjects[1].name}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[var(--neon-purple)]">
                        Mobile App
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                      Gamified habit-tracking app with AI-powered goal generation and smooth Skia
                      animations.
                    </p>
                  </div>
                  <div className="mt-auto flex justify-center overflow-hidden p-6">
                    <img
                      alt={`${featuredProjects[1].name} mockup`}
                      className="w-48 -translate-y-4 rotate-3 rounded-2xl border border-white/10 shadow-xl"
                      src={featuredProjects[1].image}
                    />
                  </div>
                </article>
              </Reveal>

              {/* Momint */}
              <Reveal delay={0.12}>
                <article className="bento-card bento-card--green flex h-[480px] flex-col overflow-hidden">
                  <div className="space-y-4 p-8">
                    <div>
                      <h3 className="mono-heading text-2xl font-bold text-white">
                        {featuredProjects[2].name}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[var(--neon-green)]">
                        Web3 Marketplace
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                      NFT solar energy investment platform. Fractional ownership via blockchain smart
                      contracts.
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-center overflow-hidden p-6">
                    <img
                      alt={`${featuredProjects[2].name} dashboard`}
                      className="-rotate-2 translate-y-2 rounded-lg border border-white/10 shadow-xl"
                      src={featuredProjects[2].image}
                    />
                  </div>
                </article>
              </Reveal>

              {/* SBA Reading (2-col span) */}
              <Reveal className="h-full md:col-span-2" delay={0.16}>
                <article className="bento-card bento-card--blue flex h-full flex-col overflow-hidden md:h-[480px] md:flex-row">
                  <div className="flex flex-col justify-between p-10 md:w-1/2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="mono-heading text-3xl font-bold text-white">
                          {featuredProjects[3].name}
                        </h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[var(--neon-blue)]">
                          Educational PWA
                        </p>
                      </div>
                      <p className="text-slate-400">
                        Multilingual reading app built for low-connectivity environments across South
                        Africa.
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {featuredProjects[3].tags.slice(0, 2).map((tag) => (
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-8 md:w-1/2">
                    <img
                      alt={`${featuredProjects[3].name} interface`}
                      className="rounded-xl border border-white/20 shadow-2xl"
                      src={featuredProjects[3].image}
                      style={{ transform: 'skewX(-3deg) rotate(1deg)' }}
                    />
                  </div>
                </article>
              </Reveal>
            </div>

            <Reveal className="mt-16 text-center" delay={0.2}>
              <Link
                className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--neon-cyan)] transition-colors duration-200 hover:text-white"
                to="/projects"
              >
                Explore Full Archive →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── Career Timeline ── */}
        <section className="py-24 md:py-32" id="career">
          <div className="section-shell">
            <Reveal>
              <div className="mb-12 flex flex-col items-center gap-4 text-center">
                <span className="section-label text-[var(--neon-purple)]">Experience</span>
                <h2 className="mono-heading text-4xl font-bold text-white md:text-5xl">
                  Professional Journey.
                </h2>
              </div>
            </Reveal>

            <div className="relative mx-auto max-w-[800px]">
              <div className="timeline-line absolute bottom-0 left-1/2 top-0 -translate-x-1/2 opacity-20" />

              <div className="space-y-12">
                {experience.map((entry, index) => {
                  const isEven = index % 2 === 0
                  return (
                    <Reveal delay={index * 0.08} key={entry.title}>
                      <div
                        className={`relative flex flex-col items-center justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                      >
                        <div className="mb-8 w-full md:mb-0 md:w-[45%]">
                          <div
                            className="bento-card bg-white/[0.03] p-6"
                            style={{
                              [isEven ? 'borderLeft' : 'borderRight']: `4px solid ${accentVar[entry.accent]}`,
                            }}
                          >
                            <p
                              className="mono-heading mb-1 text-[10px] font-bold"
                              style={{ color: accentVar[entry.accent] }}
                            >
                              {entry.dateRange}
                            </p>
                            <h4 className="mb-1 font-bold text-white">{entry.title}</h4>
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                              {entry.company}
                            </p>
                            <p className="text-xs leading-relaxed text-slate-400">
                              {entry.description}
                            </p>
                          </div>
                        </div>
                        <div
                          className="timeline-dot"
                          style={{
                            backgroundColor: accentVar[entry.accent],
                            color: accentVar[entry.accent],
                          }}
                        />
                        <div className="hidden md:block md:w-[45%]" />
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="relative overflow-hidden py-32 md:py-48" id="contact">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30">
            <div
              className="h-[800px] w-[800px] animate-pulse rounded-full"
              style={{ background: 'radial-gradient(circle, var(--surface-3), transparent)' }}
            />
          </div>

          <div className="section-shell relative z-10">
            <div className="flex flex-col items-center text-center">
              {/* Testimonial */}
              <Reveal>
                <div className="mb-16 max-w-3xl space-y-6">
                  <Quote className="mx-auto h-8 w-8 text-[var(--neon-blue)] opacity-20" />
                  <p className="text-xl font-medium italic text-slate-300 md:text-2xl">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-px w-8 bg-slate-700" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      {testimonial.attribution}
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="mono-heading mb-8 text-5xl font-bold tracking-tighter text-white md:text-7xl">
                  {contactIntro.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mb-12 max-w-[500px] text-lg text-slate-400">
                  {contactIntro.description}
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <ContactForm />
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-12">
                  <ContactLinkRow links={contactLinks} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer copy={siteMeta.footerCopy} links={footerLinks} />
    </div>
  )
}
