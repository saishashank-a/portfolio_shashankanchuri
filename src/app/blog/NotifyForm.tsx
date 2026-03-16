'use client'

import { useState } from 'react'

const WEB3FORMS_KEY = '9638a92b-ab20-42ba-a504-ceeccb265948'

export function NotifyForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'AI Weekly — new subscriber',
          email,
        }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p className="text-sm text-emerald-500 max-w-sm mx-auto">
        Got it! I&apos;ll notify you when The AI Weekly launches.
      </p>
    )
  }

  return (
    <>
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
          disabled={status === 'sending'}
          className="h-10 px-4 text-sm font-medium bg-[var(--accent)] text-white rounded-sm hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? 'Saving...' : 'Notify me'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-sm text-red-400 text-center mb-6">Something went wrong. Try again.</p>
      )}
    </>
  )
}
