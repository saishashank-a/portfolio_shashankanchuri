'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '@/data/experience'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export function Experience() {
  const prefersReduced = useReducedMotion()
  const vp = { once: true, amount: 0.2 as const }

  return (
    <section id="experience" className="py-24 px-6 border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="font-mono text-sm text-[#3b82f6] mb-3"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          // Experience
        </motion.p>
        <motion.h2
          className="text-3xl font-bold text-[#f5f5f5] mb-12"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          Where I&apos;ve worked.
        </motion.h2>

        <motion.div
          className="relative"
          variants={prefersReduced ? {} : container}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {/* Timeline vertical line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px bg-[#1f1f1f] hidden sm:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {experience.map((exp) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                variants={prefersReduced ? {} : item}
                className="sm:pl-8 relative"
              >
                {/* Timeline dot */}
                <span
                  className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[#3b82f6] hidden sm:block"
                  aria-hidden="true"
                />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-[#f5f5f5]">{exp.role}</h3>
                    <p className="text-sm text-[#3b82f6]">{exp.company}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-[#888888]">{exp.period}</p>
                    <p className="text-xs text-[#444444]">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-1.5">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#888888] leading-relaxed">
                      <span className="text-[#3b82f6] shrink-0 mt-0.5" aria-hidden="true">—</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
