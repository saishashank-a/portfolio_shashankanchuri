import type { Metadata } from 'next'
import Link from 'next/link'
import { NotifyForm } from './NotifyForm'

export const metadata: Metadata = {
  title: 'Context Window | Shashank Anchuri',
  description:
    'AI research, tools, and ideas worth paying attention to. Written when there\'s something worth saying.',
}

const posts = [
  {
    slug: 'turboquant-how-google-just-made-ai-6x-cheaper',
    date: 'Apr 2026',
    tag: 'AI Research',
    title: 'TurboQuant: How Google just made AI 6x cheaper to run, and why you should care',
    excerpt:
      "3-bit KV cache compression, zero accuracy loss, no fine-tuning. Google Research's TurboQuant is a drop-in result with real production implications.",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <p className="font-mono text-sm text-[var(--accent)] mb-3">// Blog</p>
        <h1 className="text-3xl font-bold text-[var(--fg)] mb-3">Context Window</h1>
        <p className="text-[var(--secondary)] leading-relaxed mb-12">
          AI research, tools, and ideas worth paying attention to. Written when there&apos;s something worth saying.
        </p>

        {/* Posts */}
        <div className="space-y-px border border-[var(--border)] rounded-sm overflow-hidden mb-12">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-[var(--surface)] hover:bg-[var(--border)] transition-colors px-5 py-5 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-[var(--secondary)]">{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                <span className="text-xs font-mono text-[var(--accent)]">{post.tag}</span>
              </div>
              <h2 className="text-base font-semibold text-[var(--fg)] mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-[var(--secondary)] leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="border border-[var(--border)] bg-[var(--surface)] rounded-sm p-6">
          <p className="font-mono text-sm text-[var(--fg)] mb-1">Stay in the loop</p>
          <p className="text-sm text-[var(--secondary)] mb-5">
            Get notified when the weekly digest launches.
          </p>
          <NotifyForm />
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}
