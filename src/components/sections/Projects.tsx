'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

export function Projects() {
  const prefersReduced = useReducedMotion()
  const vp = { once: true, amount: 0.1 as const }

  return (
    <section id="projects" className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="font-mono text-sm text-[var(--accent)] mb-3"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          // Projects
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <h2 className="text-3xl font-bold text-[var(--fg)]">Things I&apos;ve built.</h2>
          <a
            href="https://github.com/saishashank-a"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline shrink-0"
          >
            See all on GitHub →
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={prefersReduced ? {} : container}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={prefersReduced ? {} : item}
              className={project.featured ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
