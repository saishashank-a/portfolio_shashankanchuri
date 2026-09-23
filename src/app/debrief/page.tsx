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
    <main className="min-h-screen px-4 md:px-6 pt-8 pb-24">
      <div className="paper-sheet max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-hand text-lg text-[var(--secondary)] hover:text-[var(--accent)] transition-colors mb-10"
        >
          ← Home
        </Link>

        <p className="font-hand text-xl text-[var(--accent)] mb-2">
          {date || 'Not yet published'} · Morning Debrief
        </p>
        <h1 className="font-display text-[clamp(2rem,5vw,3.1rem)] font-semibold tracking-tight text-[var(--fg)] leading-[1.05] mb-3">
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
