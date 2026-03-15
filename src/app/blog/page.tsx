import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The AI Weekly — Coming Soon | Shashank Anchuri',
  description:
    'A weekly newsletter on what happened in AI. Written, not filmed. Launching soon.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#080808]">
      <div className="max-w-lg w-full text-center">
        <p className="font-mono text-sm text-[#3b82f6] mb-4">// Blog</p>
        <h1 className="text-4xl font-bold text-[#f5f5f5] mb-4">The AI Weekly</h1>
        <p className="text-[#888888] leading-relaxed mb-8">
          Every Sunday — what happened in the world of AI this week. Written, not filmed.
          No fluff, no hype cycle — just the signal.
        </p>
        <span className="inline-block text-xs font-mono text-[#3b82f6] border border-[#3b82f6]/30 px-3 py-1.5 rounded-full mb-8">
          Coming Soon
        </span>
        <div className="flex gap-2 max-w-sm mx-auto mb-6">
          <input
            type="email"
            placeholder="your@email.com"
            aria-label="Email for newsletter notification"
            className="flex-1 h-10 px-3 text-sm bg-[#111111] border border-[#1f1f1f] rounded-sm text-[#f5f5f5] placeholder:text-[#444444] focus:outline-none focus:border-[#3b82f6]/50"
          />
          <button
            type="button"
            className="h-10 px-4 text-sm font-medium bg-[#3b82f6] text-white rounded-sm hover:bg-[#2563eb] transition-colors"
          >
            Notify me
          </button>
        </div>
        <Link
          href="/"
          className="text-sm text-[#888888] hover:text-[#f5f5f5] transition-colors"
        >
          ← Back to portfolio
        </Link>
      </div>
    </main>
  )
}
