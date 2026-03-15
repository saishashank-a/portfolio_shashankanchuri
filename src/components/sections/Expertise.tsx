'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { domains } from '@/data/generalist'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

export function Expertise() {
  const prefersReduced = useReducedMotion()
  const vp = { once: true, amount: 0.2 as const }
  const cardVp = { once: true, amount: 0.3 as const }

  return (
    <section id="expertise" className="py-24 px-6 border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="font-mono text-sm text-[#3b82f6] mb-3"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          // Expertise
        </motion.p>

        <motion.h2
          className="text-3xl font-bold text-[#f5f5f5] mb-3"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          Why generalist?
        </motion.h2>
        <motion.p
          className="text-[#888888] mb-12 max-w-xl"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          Because real problems don&apos;t fit neat boxes.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={prefersReduced ? {} : cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={cardVp}
        >
          {domains.map((domain) => (
            <motion.article
              key={domain.title}
              variants={prefersReduced ? {} : cardItem}
              className="group relative border border-[#1f1f1f] bg-[#111111] p-6 rounded-sm transition-colors duration-300 hover:border-[#3b82f6]/30"
            >
              {/* Animated left-edge accent line */}
              <span
                className="absolute left-0 top-0 h-full w-0.5 bg-[#3b82f6] scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100"
                aria-hidden="true"
              />

              <div className="text-2xl mb-4" aria-hidden="true">{domain.icon}</div>
              <h3 className="text-base font-semibold text-[#f5f5f5] mb-2">{domain.title}</h3>
              <p className="text-sm text-[#888888] leading-relaxed">{domain.example}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
