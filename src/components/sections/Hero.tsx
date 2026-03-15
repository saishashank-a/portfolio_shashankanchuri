'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { availability } from '@/data/availability'

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// Word-by-word reveal — H1 is always in DOM (LCP safe)
const wordVariants = {
  hidden: { opacity: 0.001, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

const titleWords = 'I build across the full AI stack.'.split(' ')

export function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Ambient gradient */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
        aria-hidden="true"
      />

      {/* SVG grain texture overlay */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.035]"
        aria-hidden="true"
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div className="relative z-10 max-w-4xl w-full mx-auto">
        <motion.div
          variants={prefersReduced ? {} : heroContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5"
        >
          {/* Availability badge */}
          <motion.div variants={prefersReduced ? {} : heroItem}>
            {availability.open && (
              <span
                className="inline-flex items-center gap-2 text-sm text-[#888888]"
                aria-label="Currently open to full-time and consulting work"
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {availability.label}
              </span>
            )}
          </motion.div>

          {/* // AI Generalist label */}
          <motion.p
            variants={prefersReduced ? {} : heroItem}
            className="font-mono text-sm text-[#3b82f6]"
          >
            // AI Generalist
          </motion.p>

          {/* H1 — always in DOM, words animate individually (LCP safe) */}
          <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-[#f5f5f5]">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                custom={i}
                variants={prefersReduced ? {} : wordVariants}
                initial="hidden"
                animate="visible"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Proof line */}
          <motion.p
            variants={prefersReduced ? {} : heroItem}
            className="text-base text-[#888888]"
          >
            5 companies · 6 shipped projects · 1 published research paper
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={prefersReduced ? {} : heroItem}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2"
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-sm bg-[#3b82f6] text-white text-sm font-medium hover:bg-[#2563eb] transition-colors"
            >
              Let&apos;s Work Together →
            </Link>
            <a
              href="/resume.pdf"
              download
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 rounded-sm border border-[#1f1f1f] text-[#f5f5f5] text-sm font-medium hover:border-[#888888] transition-colors"
            >
              Download Resume ↓
            </a>
            <Link
              href="#projects"
              className="inline-flex items-center h-11 text-sm text-[#888888] hover:text-[#f5f5f5] transition-colors"
            >
              See My Projects ↓
            </Link>
          </motion.div>

          {/* Credibility strip */}
          <motion.p
            variants={prefersReduced ? {} : heroItem}
            className="text-xs tracking-[0.2em] uppercase text-[#444444] pt-4"
            aria-label="Previously worked at"
          >
            Yellow.ai&nbsp;&nbsp;·&nbsp;&nbsp;Secureworks&nbsp;&nbsp;·&nbsp;&nbsp;Novartis
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-gradient-to-b from-[#3b82f6]/50 to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}
