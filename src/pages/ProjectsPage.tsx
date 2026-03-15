import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Footer } from '../components/Footer'
import { Navigation } from '../components/Navigation'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { projectsPageIntro } from '../data/home'
import { motionTokens } from '../data/motion'
import { projects } from '../data/projects'
import { footerLinks, siteMeta } from '../data/site'

const ALL = 'All'
const allTags = [ALL, ...Array.from(new Set(projects.flatMap((p) => p.tags))).sort()]

export function ProjectsPage() {
  const [activeTag, setActiveTag] = useState(ALL)

  const filtered = activeTag === ALL ? projects : projects.filter((p) => p.tags.includes(activeTag))

  return (
    <div className="page-shell">
      <Navigation ctaHref="/" ctaLabel="← Back to Portfolio" items={[]} />

      <main>
        <section data-testid="projects-hero">
          <div className="section-shell flex flex-col items-center gap-6 py-20 text-center">
            <Reveal>
              <SectionHeading
                accent="purple"
                align="center"
                description={projectsPageIntro.description}
                eyebrow={projectsPageIntro.eyebrow}
                title={projectsPageIntro.title}
              />
            </Reveal>
          </div>
        </section>

        <section>
          <div className="section-shell pb-24 md:pb-[100px]">
            {/* Filter pills */}
            <Reveal className="mb-8">
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`tag-pill transition-colors duration-150 ${
                      activeTag === tag
                        ? 'border-[var(--neon-cyan)] text-white'
                        : 'hover:border-white/20 hover:text-slate-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Project list */}
            <div className="flex flex-col gap-8" data-testid="projects-list">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: motionTokens.durations.reveal,
                      ease: motionTokens.easing.out,
                      delay: i < 4 ? i * 0.05 : 0,
                    }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <Footer copy={siteMeta.footerCopy} links={footerLinks} />
    </div>
  )
}
