import { ArrowRight, BookOpen, Link as LinkIcon, ShieldAlert, Smartphone } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink'
import { ContactForm } from '../components/ContactForm'
import { ContactLinkRow } from '../components/ContactLinkRow'
import { Footer } from '../components/Footer'
import { AccentIcon } from '../components/Icon'
import { Navigation } from '../components/Navigation'
import { OrbitingStats } from '../components/OrbitingStats'
import { ParticleBackground } from '../components/ParticleBackground'
import { Reveal } from '../components/Reveal'
import { TechTicker } from '../components/TechTicker'
import { accentVar } from '../data/accents'
import {
  aboutCopy,
  aboutStats,
  contactIntro,
  experience,
  heroStats,
  quickFacts,
  tickerItems,
} from '../data/home'
import { motionTokens } from '../data/motion'
import { featuredProjects } from '../data/projects'
import { contactLinks, footerLinks, heroCtas, siteMeta, siteNav } from '../data/site'

export function HomePage() {
  const sbaProject = featuredProjects.find(p => p.slug === 'sba-reading')

  return (
    <div className="page-shell" id="top">
      <Navigation ctaHref="/#contact" items={siteNav} />

      <main>
        {/* ── Hero ── */}
        <section
          className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden"
          data-testid="home-hero"
        >
          <ParticleBackground />
          <OrbitingStats stats={heroStats} />

          <div className="z-10 px-6 text-center">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              className="glass-panel mb-8 inline-flex items-center gap-3 rounded-full px-4 py-1.5"
              transition={{ duration: 4.8, ease: 'easeInOut', repeat: Infinity }}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--neon-green)]" />
              <span className="mono-heading text-[10px] font-bold uppercase tracking-widest text-[var(--neon-green)]">
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
              <h1 className="hero-name mono-heading text-5xl font-bold leading-[0.9] tracking-tighter md:text-[6.5rem]">
                MARLON
                <br />
                DEMAS
              </h1>
            </motion.div>

            <motion.p
              className="gradient-text mono-heading mb-10 text-lg font-semibold tracking-wide md:text-2xl"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.08, duration: motionTokens.durations.reveal }}
              animate={{ opacity: 1 }}
            >
              {siteMeta.role}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-6"
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
            <Reveal>
              <div className="grid items-start gap-16 lg:grid-cols-2">
                <div className="space-y-10">
                  <div>
                    <span className="mono-heading mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[var(--neon-blue)]">
                      Discover
                    </span>
                    <h2 className="mono-heading mb-6 text-3xl font-bold leading-tight text-white md:text-[2.75rem]">
                      Engineering solutions for global impact.
                    </h2>
                    <div className="max-w-[580px] space-y-6 text-lg leading-relaxed text-slate-300">
                      {aboutCopy.paragraphs.slice(0, 4).map((p) => (
                        <p key={p.slice(0, 30)}>{p}</p>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8 border-t border-white/5 pt-6">
                    {aboutStats.map((stat) => (
                      <div key={stat.label}>
                        <h4 className="mb-1 text-2xl font-bold text-white">{stat.value}</h4>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex h-full flex-col gap-8 pt-40">
                  <div className="bento-card group relative min-h-[380px] overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${aboutCopy.photo})`, backgroundPosition: 'top' }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 flex items-center gap-3">
                      <span className="mono-heading text-xs font-bold uppercase tracking-widest text-white">
                        {aboutCopy.photoLabel}
                      </span>
                    </div>
                  </div>

                  <div className="glass-panel space-y-6 rounded-[32px] p-8">
                    <h3 className="mono-heading text-sm font-bold uppercase tracking-widest text-white">
                      Quick Facts
                    </h3>
                    <div className="grid gap-4">
                      {quickFacts.map((fact) => (
                        <div className="flex items-center gap-4" key={fact.label}>
                          <AccentIcon accent={fact.accent} icon={fact.icon} />
                          <span className="text-slate-300">{fact.label}</span>
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
        <section className="py-24 md:py-32" id="projects">
          <div className="section-shell">
            <Reveal>
              <div className="mb-16 flex flex-col items-center text-center">
                <span className="mono-heading mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[var(--neon-cyan)]">
                  Portfolio
                </span>
                <h2 className="mono-heading text-4xl font-bold text-white md:text-5xl">
                  Products that ship.
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3" data-testid="featured-projects">
              {/* Raptor — Featured (2-col span) */}
              <Reveal className="md:col-span-2">
                <article className="bento-card bento-card--cyan group relative overflow-hidden p-10">
                  <div className="bento-glow-overlay bg-[var(--neon-cyan)]" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-8 flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="mono-heading text-3xl font-bold text-white">
                          {featuredProjects[0].name}
                        </h3>
                        <p className="text-sm font-bold uppercase tracking-widest text-[var(--neon-cyan)]">
                          Featured Project
                        </p>
                      </div>
                      <span className="glass-panel rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--neon-green)]">
                        {featuredProjects[0].statusLabel}
                      </span>
                    </div>
                    <p className="mb-10 max-w-[600px] text-lg leading-relaxed text-slate-300">
                      {featuredProjects[0].description}
                    </p>
                    <div className="mb-8 flex flex-wrap gap-2">
                      {featuredProjects[0].tags.map((tag) => (
                        <span
                          className="rounded-lg bg-white/5 px-3 py-1 text-xs text-slate-300"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {featuredProjects[0].externalUrl && (
                      <a
                        className="mt-auto inline-flex w-fit items-center gap-2 border-b border-transparent pb-0.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 hover:gap-3 hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]"
                        href={featuredProjects[0].externalUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Visit Site →
                      </a>
                    )}
                  </div>
                  <div className="absolute -bottom-20 -right-20 opacity-10 transition-transform duration-700 group-hover:scale-110">
                    <ShieldAlert className="h-[300px] w-[300px]" strokeWidth={0.5} />
                  </div>
                </article>
              </Reveal>

              {/* Mirai */}
              <Reveal delay={0.08}>
                <article className="bento-card bento-card--purple group relative flex h-full flex-col overflow-hidden p-8">
                  <div className="bento-glow-overlay bg-[var(--neon-purple)]" />
                  <div className="mb-6 flex items-start justify-between">
                    <h3 className="mono-heading text-xl font-bold text-white">
                      {featuredProjects[1].name}
                    </h3>
                    <Smartphone className="h-6 w-6 text-[var(--neon-purple)]" />
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-slate-300">
                    {featuredProjects[1].description}
                  </p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {featuredProjects[1].tags.slice(0, 3).map((tag) => (
                      <span
                        className="rounded-lg bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-300"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {featuredProjects[1].externalUrl && (
                    <a
                      className="mt-auto inline-flex w-fit items-center gap-2 border-b border-transparent pb-0.5 text-xs font-bold uppercase tracking-widest text-[var(--neon-purple)] transition-all duration-200 hover:gap-3 hover:border-[var(--neon-purple)]"
                      href={featuredProjects[1].externalUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Visit Site →
                    </a>
                  )}
                </article>
              </Reveal>

              {/* Momint */}
              <Reveal delay={0.12}>
                <article className="bento-card bento-card--green group relative flex h-full flex-col overflow-hidden p-8">
                  <div className="bento-glow-overlay bg-[var(--neon-green)]" />
                  <div className="mb-6 flex items-start justify-between">
                    <h3 className="mono-heading text-xl font-bold text-white">
                      {featuredProjects[2].name}
                    </h3>
                    <LinkIcon className="h-6 w-6 text-[var(--neon-green)]" />
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-slate-300">
                    {featuredProjects[2].description}
                  </p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {featuredProjects[2].tags.slice(0, 3).map((tag) => (
                      <span
                        className="rounded-lg bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-300"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {featuredProjects[2].externalUrl && (
                    <a
                      className="mt-auto inline-flex w-fit items-center gap-2 border-b border-transparent pb-0.5 text-xs font-bold uppercase tracking-widest text-[var(--neon-green)] transition-all duration-200 hover:gap-3 hover:border-[var(--neon-green)]"
                      href={featuredProjects[2].externalUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Visit Site →
                    </a>
                  )}
                </article>
              </Reveal>

              {/* SBA Reading (2-col span) */}
              <Reveal className="md:col-span-2 h-full" delay={0.16}>
                <article className="bento-card bento-card--blue group relative h-full overflow-hidden p-10">
                  <div className="bento-glow-overlay bg-[var(--neon-blue)]" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-8 flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="mono-heading text-3xl font-bold text-white">
                          {sbaProject?.name}
                        </h3>
                        <p className="text-sm font-bold uppercase tracking-widest text-[var(--neon-blue)]">
                          Educational PWA
                        </p>
                      </div>
                      <span className="glass-panel rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                        {sbaProject?.statusLabel}
                      </span>
                    </div>
                    <p className="mb-10 max-w-[600px] text-lg leading-relaxed text-slate-300">
                      {sbaProject?.description}
                    </p>
                    <div className="mb-8 flex flex-wrap gap-2">
                      {sbaProject?.tags.map((tag) => (
                        <span
                          className="rounded-lg bg-white/5 px-3 py-1 text-xs text-slate-300"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {sbaProject?.externalUrl && (
                      <a
                        className="mt-auto inline-flex w-fit items-center gap-2 border-b border-transparent pb-0.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 hover:gap-3 hover:border-[var(--neon-blue)] hover:text-[var(--neon-blue)]"
                        href={sbaProject.externalUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Visit Site →
                      </a>
                    )}
                  </div>
                  <div className="absolute -bottom-20 -right-20 opacity-5 transition-transform duration-700 group-hover:scale-110">
                    <BookOpen className="h-[300px] w-[300px]" strokeWidth={0.5} />
                  </div>
                </article>
              </Reveal>
            </div>

            <Reveal className="mt-12 text-center" delay={0.2}>
              <Link
                className="group/link inline-flex items-center gap-3 rounded-full border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/5 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[var(--neon-cyan)] transition-all duration-300 hover:border-[var(--neon-cyan)]/60 hover:bg-[var(--neon-cyan)]/10 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                to="/projects"
              >
                View All Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── Career Timeline ── */}
        <section className="py-24 md:py-32" id="career">
          <div className="section-shell">
            <Reveal>
              <div className="mb-20 flex flex-col items-center text-center">
                <span className="mono-heading mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[var(--neon-purple)]">
                  Experience
                </span>
                <h2 className="mono-heading text-4xl font-bold text-white md:text-5xl">
                  Professional Journey.
                </h2>
              </div>
            </Reveal>

            <div className="relative mx-auto max-w-[900px]">
              <div className="timeline-line absolute bottom-0 left-1/2 top-0 -translate-x-1/2" />

              <div className="space-y-24">
                {experience.map((entry, index) => {
                  const isEven = index % 2 === 0
                  return (
                    <Reveal delay={index * 0.08} key={entry.title}>
                      <div
                        className={`relative flex flex-col items-center justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                      >
                        <div className="mb-8 w-full md:mb-0 md:w-[42%]">
                          <div className="bento-card p-8">
                            <p
                              className="mono-heading mb-2 text-sm font-bold"
                              style={{ color: accentVar[entry.accent] }}
                            >
                              {entry.dateRange}
                            </p>
                            <h4 className="mono-heading mb-2 text-xl font-bold text-white">
                              {entry.title}
                            </h4>
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              {entry.company}
                            </p>
                            <p className="text-sm leading-relaxed text-slate-300">
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
                        <div className="hidden md:block md:w-[42%]" />
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
              <Reveal>
                <h2 className="mono-heading mb-8 text-5xl font-bold tracking-tighter text-white md:text-7xl">
                  Let us build the
                  <br />
                  future together.
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mb-12 max-w-[500px] text-lg text-slate-300">
                  {contactIntro.description}
                </p>
              </Reveal>
              <Reveal delay={0.12}>
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
