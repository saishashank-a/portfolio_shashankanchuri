'use client'

import { useState } from 'react'

export function NotifyForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Placeholder — wire to a backend or Formspree when blog launches
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-sm text-emerald-500 max-w-sm mx-auto">
        Got it! I&apos;ll notify you when The AI Weekly launches.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto mb-6">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        aria-label="Email for newsletter notification"
        className="flex-1 h-10 px-3 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-sm text-[var(--fg)] placeholder:text-[var(--very-muted)] focus:outline-none focus:border-[var(--accent)]/50"
      />
      <button
        type="submit"
        className="h-10 px-4 text-sm font-medium bg-[var(--accent)] text-white rounded-sm hover:bg-[var(--accent-hover)] transition-colors"
      >
        Notify me
      </button>
    </form>
  )
}
