import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { accentVar, accentText, accentLine } from '../data/accents'
import { motionTokens } from '../data/motion'
import type { Project } from '../types/content'
import { Tag } from './Tag'

export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project
  compact?: boolean
}) {
  return (
    <motion.article
      className={`bento-card project-card bento-card--${project.accent} relative overflow-hidden`}
      transition={{ duration: motionTokens.durations.base, ease: motionTokens.easing.out }}
      whileHover={{ y: -6, scale: compact ? 1.01 : 1.005 }}
    >
      <div className="bento-glow-overlay" style={{ backgroundColor: accentVar[project.accent] }} />
      <div className={compact ? 'project-card-grid--compact' : 'project-card-grid'}>
        <div
          className={`project-card-image ${compact ? '' : 'project-card-image--full'}`}
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className={`${compact ? 'p-6' : 'p-8'} flex flex-col gap-4`}>
          <div className="flex items-center gap-2">
            <span className={`h-[2px] w-6 ${accentLine[project.accent]}`} />
            <span className={`mono-heading text-[0.68rem] font-bold uppercase tracking-[0.22em] ${accentText[project.accent]}`}>
              {project.statusLabel}
            </span>
          </div>
          <h3 className={`mono-heading font-bold text-[var(--text-primary)] ${compact ? 'text-xl' : 'text-[1.75rem] tracking-[-0.06em]'}`}>
            {project.name}
          </h3>
          <p className={`text-sm font-medium ${accentText[project.accent]}`}>{project.roleLabel}</p>
          <p className={`text-[var(--text-secondary)] ${compact ? 'text-sm leading-[1.6]' : 'text-[0.95rem] leading-[1.7]'}`}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          {project.externalUrl ? (
            <a
              className="mono-heading mt-1 text-sm font-semibold text-[var(--neon-cyan)] transition-colors duration-200 hover:text-[var(--text-primary)]"
              href={project.externalUrl}
              rel="noreferrer"
              target="_blank"
            >
              {project.externalLabel}
            </a>
          ) : (
            <span className="mono-heading mt-1 text-sm font-semibold text-[var(--text-muted)]">
              {project.externalLabel}
            </span>
          )}
          {compact ? (
            <Link
              className="mono-heading mt-2 text-sm font-semibold text-[var(--neon-blue)]"
              to="/projects"
            >
              View all work →
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
