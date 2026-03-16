'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { skillGroups } from '@/data/skills'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const groupContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const pillItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

export function Skills() {
  const prefersReduced = useReducedMotion()
  const vp = { once: true, amount: 0.2 as const }

  return (
    <section id="skills" className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="font-mono text-sm text-[var(--accent)] mb-3"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          // Skills
        </motion.p>
        <motion.h2
          className="text-3xl font-bold text-[var(--fg)] mb-12"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          Tools of the trade.
        </motion.h2>

        <div className="flex flex-col gap-10">
          {skillGroups.map((group) => (
            <motion.div
              key={group.label}
              variants={prefersReduced ? {} : groupContainer}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              <h3 className="text-xs font-mono text-[var(--secondary)] uppercase tracking-wider mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={prefersReduced ? {} : pillItem}
                    className="text-sm font-mono text-[var(--fg)] bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 rounded-sm hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
