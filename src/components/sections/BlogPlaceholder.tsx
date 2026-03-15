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
    <section id="blog" className="py-24 px-6 border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="max-w-2xl"
        >
          <p className="font-mono text-sm text-[#3b82f6] mb-3">// Blog</p>
          <h2 className="text-3xl font-bold text-[#f5f5f5] mb-4">The AI Weekly</h2>
          <p className="text-[#888888] leading-relaxed mb-8">
            Every Sunday — what happened in the world of AI this week. Written, not filmed.
            No fluff, no hype cycle — just the signal.
          </p>

          {/* Newsletter card mockup */}
          <div className="border border-[#1f1f1f] bg-[#111111] rounded-sm p-6 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-sm text-[#f5f5f5]">The AI Weekly</span>
              <span className="text-[10px] font-mono text-[#3b82f6] border border-[#3b82f6]/30 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>

            <div className="space-y-2 mb-6">
              {['What OpenAI actually shipped this week', 'The paper everyone is misreading', 'Tool you should know about'].map((line, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#3b82f6] shrink-0" aria-hidden="true" />
                  <p className="text-xs text-[#888888]">{line}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                className="flex-1 h-9 px-3 text-sm bg-[#080808] border border-[#1f1f1f] rounded-sm text-[#f5f5f5] placeholder:text-[#444444] focus:outline-none focus:border-[#3b82f6]/50"
              />
              <button
                type="button"
                className="h-9 px-4 text-sm font-medium bg-[#3b82f6] text-white rounded-sm hover:bg-[#2563eb] transition-colors"
              >
                Notify me
              </button>
            </div>
          </div>

          <p className="text-xs text-[#444444] mt-4">
            or{' '}
            <Link href="/blog" className="text-[#888888] hover:text-[#f5f5f5] transition-colors underline underline-offset-2">
              visit the blog page
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
