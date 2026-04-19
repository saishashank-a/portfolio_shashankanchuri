import type { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import debriefData from '@/data/debrief.json'

export const metadata: Metadata = {
  title: 'Morning Debrief | Shashank Anchuri',
  description:
    'Daily briefing: geopolitics, tech, AI, markets. Written fresh every morning.',
}

// Revalidate daily — Vercel redeploys when the JSON changes, but ISR keeps it fast between deploys.
export const revalidate = 3600

export default function DebriefPage() {
  const { date, generatedAt, content } = debriefData

  const hasContent = content && content.trim().length > 0

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors mb-10"
        >
          ← Home
        </Link>

        <p className="font-mono text-xs text-[var(--accent)] mb-3">
          {date || 'Not yet published'} · Morning Debrief
        </p>
        <h1 className="text-3xl font-bold text-[var(--fg)] leading-tight mb-3">
          Today&apos;s Briefing
        </h1>
        {generatedAt && (
          <p className="font-mono text-xs text-[var(--secondary)] mb-10">
            Generated {new Date(generatedAt).toLocaleString('en-US', {
              timeZone: 'Asia/Kolkata',
              dateStyle: 'medium',
              timeStyle: 'short',
            })} IST
          </p>
        )}

        <div className="prose-blog">
          {hasContent ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          ) : (
            <p className="text-[var(--secondary)]">
              No briefing published yet. Check back in the morning.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
