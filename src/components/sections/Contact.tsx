'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, Copy, Check } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

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
    // Emails go out through /api/contact (Resend, same sender as the debrief)
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
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
    <section id="contact" className="py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="font-hand text-xl text-[var(--accent)] mb-2"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          or drop a note ↓
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)] mb-4"
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
          className="paper-sheet grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Honeypot: hidden from people and screen readers, bots fill it and get silently dropped */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="font-hand text-lg text-[var(--secondary)]">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="h-10 px-3 text-sm bg-[#faf3e6] border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder:text-[var(--very-muted)] focus:outline-none focus:border-[var(--accent)]/50"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-hand text-lg text-[var(--secondary)]">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="h-10 px-3 text-sm bg-[#faf3e6] border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder:text-[var(--very-muted)] focus:outline-none focus:border-[var(--accent)]/50"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-hand text-lg text-[var(--secondary)]">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="px-3 py-2.5 text-sm bg-[#faf3e6] border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder:text-[var(--very-muted)] focus:outline-none focus:border-[var(--accent)]/50 resize-none"
                placeholder="Tell me about the project or role..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="h-11 px-6 bg-[var(--accent)] text-[var(--paper)] text-sm font-medium rounded-full hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              <p className="font-hand text-xl text-[var(--accent)] mb-4">Or reach me directly</p>
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

            <div className="-rotate-2 w-fit bg-[#e9b949] text-[#1f1d1a] p-4 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.5)]">
              <p className="font-hand text-lg">response time</p>
              <p className="text-sm">Usually within 24 hours</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
