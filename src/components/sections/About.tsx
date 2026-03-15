'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const leftVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const rightVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const stats = [
  { value: '5+', label: 'Companies' },
  { value: '2y+', label: 'Experience' },
  { value: '1', label: 'Published Paper' },
]

export function About() {
  const prefersReduced = useReducedMotion()
  const vp = { once: true, amount: 0.2 as const }

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="font-mono text-sm text-[#3b82f6] mb-3"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          // About
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Bio */}
          <motion.div
            variants={prefersReduced ? {} : leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <h2 className="text-3xl font-bold text-[#f5f5f5] mb-6">
              Building AI that ships.
            </h2>
            <div className="space-y-4 text-[#888888] leading-relaxed">
              <p>
                I&apos;m Shashank — an AI engineer based in Hyderabad with a B.E. in Artificial
                Intelligence and Data Science from CBIT. I work across the full AI stack: from
                training research models to shipping production APIs and mobile apps.
              </p>
              <p>
                My background spans conversational AI at Yellow.ai, security operations at
                Secureworks, data intelligence at Novartis, and independent consulting — giving me
                a rare cross-domain perspective on how AI actually lands in real organizations.
              </p>
              <p>
                I believe the most valuable engineers are the ones who can move between research
                and production without losing either rigour or pragmatism. That&apos;s what I aim to be.
              </p>
            </div>
          </motion.div>

          {/* Right: Photo + Stats */}
          <motion.div
            variants={prefersReduced ? {} : rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="flex flex-col items-center md:items-start gap-8"
          >
            {/* Profile photo */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border border-[#1f1f1f] bg-[#111111] flex items-center justify-center">
              <Image
                src="/images/profile.jpg"
                alt="Shashank Anchuri"
                fill
                className="object-cover"
                onError={() => {}}
                priority
              />
              {/* Fallback initials shown via CSS if image fails */}
              <span className="absolute text-2xl font-bold text-[#3b82f6] select-none">SA</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 w-full">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-2xl font-bold text-[#f5f5f5]">{stat.value}</p>
                  <p className="text-xs text-[#888888] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="border border-[#1f1f1f] bg-[#111111] rounded-sm p-4 w-full">
              <p className="text-xs text-[#888888] uppercase tracking-wider mb-1">Education</p>
              <p className="text-sm text-[#f5f5f5] font-medium">B.E. in AI & Data Science</p>
              <p className="text-xs text-[#888888] mt-0.5">Chaitanya Bharathi Institute of Technology · 2021–2025</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
