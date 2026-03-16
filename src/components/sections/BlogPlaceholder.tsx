'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function BlogPlaceholder() {
  const prefersReduced = useReducedMotion()
  const vp = { once: true, amount: 0.2 as const }

  return (
    <section id="blog" className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="max-w-2xl"
        >
          <p className="font-mono text-sm text-[var(--accent)] mb-3">// Blog</p>
          <h2 className="text-3xl font-bold text-[var(--fg)] mb-4">The AI Weekly</h2>
          <p className="text-[var(--secondary)] leading-relaxed mb-8">
            Every Sunday, what happened in the world of AI this week. Written, not filmed.
            No fluff, no hype cycle, just the signal.
          </p>

          {/* Newsletter card mockup */}
          <div className="border border-[var(--border)] bg-[var(--surface)] rounded-sm p-6 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-sm text-[var(--fg)]">The AI Weekly</span>
              <span className="text-[10px] font-mono text-[var(--accent)] border border-[var(--accent)]/30 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>

            <div className="space-y-2 mb-6">
              {['What OpenAI actually shipped this week', 'The paper everyone is misreading', 'Tool you should know about'].map((line, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" aria-hidden="true" />
                  <p className="text-xs text-[var(--secondary)]">{line}</p>
                </div>
              ))}
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center h-9 px-4 text-sm font-medium bg-[var(--accent)] text-white rounded-sm hover:bg-[var(--accent-hover)] transition-colors"
            >
              Get notified →
            </Link>
          </div>

          <p className="text-xs text-[var(--very-muted)] mt-4">
            or{' '}
            <Link href="/blog" className="text-[var(--secondary)] hover:text-[var(--fg)] transition-colors underline underline-offset-2">
              visit the blog page
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
