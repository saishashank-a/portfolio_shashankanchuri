'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function BlogPlaceholder() {
  const prefersReduced = useReducedMotion()
  const vp = { once: true, amount: 0.2 as const }
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

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
          <h2 className="text-3xl font-bold text-[var(--fg)] mb-4">Context Window</h2>
          <p className="text-[var(--secondary)] leading-relaxed mb-8">
            AI research, tools, and ideas worth paying attention to. Written when there&apos;s something worth saying.
          </p>

          {/* Newsletter card */}
          <div className="border border-[var(--border)] bg-[var(--surface)] rounded-sm p-6 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-sm text-[var(--fg)]">Context Window</span>
              <span className="text-[10px] font-mono text-[var(--accent)] border border-[var(--accent)]/30 px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>

            <div className="space-y-2 mb-6">
              {['Research that\'s actually moving things forward', 'The paper worth your time this month', 'A tool that changes how you build'].map((line, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" aria-hidden="true" />
                  <p className="text-xs text-[var(--secondary)]">{line}</p>
                </div>
              ))}
            </div>

            {status === 'done' ? (
              <p className="text-sm text-emerald-500">You&apos;re on the list. I&apos;ll notify you when it launches.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  aria-label="Email for newsletter notification"
                  className="flex-1 h-9 px-3 text-sm bg-[var(--background)] border border-[var(--border)] rounded-sm text-[var(--fg)] placeholder:text-[var(--very-muted)] focus:outline-none focus:border-[var(--accent)]/50"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="h-9 px-4 text-sm font-medium bg-[var(--accent)] text-white rounded-sm hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
                >
                  {status === 'sending' ? 'Saving...' : 'Notify me'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-400 mt-2">Something went wrong. Try again.</p>
            )}
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
