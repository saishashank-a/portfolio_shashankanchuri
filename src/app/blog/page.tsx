import type { Metadata } from 'next'
import Link from 'next/link'
import { NotifyForm } from './NotifyForm'

export const metadata: Metadata = {
  title: 'The AI Weekly, Coming Soon | Shashank Anchuri',
  description:
    'A weekly newsletter on what happened in AI. Written, not filmed. Launching soon.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--background)]">
      <div className="max-w-lg w-full text-center">
        <p className="font-mono text-sm text-[var(--accent)] mb-4">// Blog</p>
        <h1 className="text-4xl font-bold text-[var(--fg)] mb-4">The AI Weekly</h1>
        <p className="text-[var(--secondary)] leading-relaxed mb-8">
          Every Sunday, what happened in the world of AI this week. Written, not filmed.
          No fluff, no hype cycle, just the signal.
        </p>
        <span className="inline-block text-xs font-mono text-[var(--accent)] border border-[var(--accent)]/30 px-3 py-1.5 rounded-full mb-8">
          Coming Soon
        </span>
        <NotifyForm />
        <Link
          href="/"
          className="text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
        >
          ← Back to portfolio
        </Link>
      </div>
    </main>
  )
}
