'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// Replace with your actual Formspree endpoint: https://formspree.io/f/YOUR_ID
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID'

export function Contact() {
  const prefersReduced = useReducedMotion()
  const vp = { once: true, amount: 0.2 as const }
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

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
    <section id="contact" className="py-24 px-6 border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="font-mono text-sm text-[#3b82f6] mb-3"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          // Contact
        </motion.p>
        <motion.h2
          className="text-3xl font-bold text-[#f5f5f5] mb-4"
          variants={prefersReduced ? {} : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          Let&apos;s Build Something
        </motion.h2>
        <motion.p
          className="text-[#888888] mb-12 max-w-md"
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
                <label htmlFor="name" className="text-xs text-[#888888]">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="h-10 px-3 text-sm bg-[#111111] border border-[#1f1f1f] rounded-sm text-[#f5f5f5] placeholder:text-[#444444] focus:outline-none focus:border-[#3b82f6]/50"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs text-[#888888]">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="h-10 px-3 text-sm bg-[#111111] border border-[#1f1f1f] rounded-sm text-[#f5f5f5] placeholder:text-[#444444] focus:outline-none focus:border-[#3b82f6]/50"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs text-[#888888]">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="px-3 py-2.5 text-sm bg-[#111111] border border-[#1f1f1f] rounded-sm text-[#f5f5f5] placeholder:text-[#444444] focus:outline-none focus:border-[#3b82f6]/50 resize-none"
                placeholder="Tell me about the project or role..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="h-11 px-6 bg-[#3b82f6] text-white text-sm font-medium rounded-sm hover:bg-[#2563eb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              <p className="text-xs text-[#888888] uppercase tracking-wider mb-4">Or reach me directly</p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:shashankanchuri@gmail.com"
                  className="inline-flex items-center gap-3 text-sm text-[#888888] hover:text-[#f5f5f5] transition-colors"
                >
                  <Mail size={16} className="text-[#3b82f6]" />
                  shashankanchuri@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/sai-shashank-anchuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-[#888888] hover:text-[#f5f5f5] transition-colors"
                >
                  <Linkedin size={16} className="text-[#3b82f6]" />
                  linkedin.com/in/sai-shashank-anchuri
                </a>
                <a
                  href="https://github.com/saishashank-a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-[#888888] hover:text-[#f5f5f5] transition-colors"
                >
                  <Github size={16} className="text-[#3b82f6]" />
                  github.com/saishashank-a
                </a>
              </div>
            </div>

            <div className="border border-[#1f1f1f] bg-[#111111] rounded-sm p-4">
              <p className="text-xs text-[#888888] mb-1">Response time</p>
              <p className="text-sm text-[#f5f5f5]">Usually within 24 hours</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
