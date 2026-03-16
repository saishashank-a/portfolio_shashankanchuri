'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, Copy, Check } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// Replace with your actual Formspree endpoint: https://formspree.io/f/YOUR_ID
const FORMSPREE_URL = 'https://formspree.io/f/xbdzanyb'

export function Contact() {
  const prefersReduced = useReducedMotion()
  const vp = { once: true, amount: 0.2 as const }
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [copied, setCopied] = useState(false)
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  function copyEmail() {
    navigator.clipboard.writeText('shashankanchuri@gmail.com').catch(() => {})
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    setCopied(true)
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="font-mono text-sm text-[var(--accent)] mb-3"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          // Contact
        </motion.p>
        <motion.h2
          className="text-3xl font-bold text-[var(--fg)] mb-4"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          Let&apos;s Build Something
        </motion.h2>
        <motion.p
          className="text-[var(--secondary)] mb-12 max-w-md"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          Open to full-time roles and consulting projects. If you have something interesting,
          I want to hear about it.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs text-[var(--secondary)]">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="h-10 px-3 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-sm text-[var(--fg)] placeholder:text-[var(--very-muted)] focus:outline-none focus:border-[var(--accent)]/50"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs text-[var(--secondary)]">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="h-10 px-3 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-sm text-[var(--fg)] placeholder:text-[var(--very-muted)] focus:outline-none focus:border-[var(--accent)]/50"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs text-[var(--secondary)]">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="px-3 py-2.5 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-sm text-[var(--fg)] placeholder:text-[var(--very-muted)] focus:outline-none focus:border-[var(--accent)]/50 resize-none"
                placeholder="Tell me about the project or role..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="h-11 px-6 bg-[var(--accent)] text-white text-sm font-medium rounded-sm hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message sent ✓' : 'Send Message'}
            </button>

            {status === 'error' && (
              <p className="text-sm text-red-400">Something went wrong. Email me directly instead.</p>
            )}
          </form>

          {/* Direct contact */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs text-[var(--secondary)] uppercase tracking-wider mb-4">Or reach me directly</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:shashankanchuri@gmail.com"
                    className="inline-flex items-center gap-3 text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
                  >
                    <Mail size={16} className="text-[var(--accent)]" />
                    shashankanchuri@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
                <a
                  href="https://linkedin.com/in/sai-shashank-anchuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
                >
                  <Linkedin size={16} className="text-[var(--accent)]" />
                  linkedin.com/in/sai-shashank-anchuri
                </a>
                <a
                  href="https://github.com/saishashank-a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
                >
                  <Github size={16} className="text-[var(--accent)]" />
                  github.com/saishashank-a
                </a>
              </div>
            </div>

            <div className="border border-[var(--border)] bg-[var(--surface)] rounded-sm p-4">
              <p className="text-xs text-[var(--secondary)] mb-1">Response time</p>
              <p className="text-sm text-[var(--fg)]">Usually within 24 hours</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
