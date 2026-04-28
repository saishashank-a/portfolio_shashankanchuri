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
    slug: 'india-ai-funding-surge-q1-2026',
    date: 'Apr 2026',
    tag: 'AI Strategy',
    title: "India's AI Funding Surge: The Numbers Are Big, the Policy Change Is Bigger",
    excerpt:
      'Indian AI startups raised ₹2,110 crore in Q1 2026 — a 73% YoY surge. AI took 38% of all startup capital. The new DPIIT deep tech framework just doubled the runway. Here is what shifts.',
  },
  {
    slug: 'openai-spud-what-we-actually-know',
    date: 'Apr 2026',
    tag: 'AI Strategy',
    title: "Spud: What We Actually Know About OpenAI's Next Model, and What's Speculation",
    excerpt:
      'Pre-training finished March 24. Sam Altman says "a few weeks." Greg Brockman says "big model feel." Everything else is somebody\'s guess dressed up as a spec sheet.',
  },
  {
    slug: 'anthropic-four-day-sprint',
    date: 'Apr 2026',
    tag: 'AI Strategy',
    title: "Anthropic's Four-Day Sprint: What Actually Shipped in April 2026",
    excerpt:
      "Anthropic shipped a new flagship model, completed its Office integration, redesigned its desktop app, and reshaped its board — all in four days. An engineer's read.",
  },
  {
    slug: 'anthropic-mythos-glasswing-double-play',
    date: 'Apr 2026',
    tag: 'AI Strategy',
    title: "Capability × Capacity: Anthropic's Double Play That Defines the Next Phase of AI",
    excerpt:
      "On April 7, 2026, Anthropic launched Project Glasswing with Claude Mythos — a model too dangerous to release — and announced a multi-gigawatt compute deal. These aren't two stories. They're one equation.",
  },
  {
    slug: 'openai-grew-up-sora-dies-razorpay-wins',
    date: 'Apr 2026',
    tag: 'AI Strategy',
    title: 'The Week OpenAI Grew Up: Sora Dies, Razorpay Wins, and AI Finally Picks Revenue Over Demos',
    excerpt:
      'OpenAI was spending $15M/day on an app that made $2.1M lifetime. Then they killed it — and wired payments into Codex. These are the same decision viewed from two angles.',
  },
  {
    slug: 'nvidia-ising-quantum-ai',
    date: 'Apr 2026',
    tag: 'AI Research',
    title: 'AI Is Teaching Quantum Computers How to Grow Up',
    excerpt:
      "NVIDIA released Ising: the world's first open-source AI models built to make quantum computers work. Harvard, Cornell, IonQ, and Fermilab are already using them. Here's why every AI engineer should care.",
  },
  {
    slug: 'arm-agi-cpu-breaks-35-year-rule',
    date: 'Apr 2026',
    tag: 'AI Infrastructure',
    title: 'Arm just broke a 35-year rule and it matters more than you think',
    excerpt:
      'For 35 years, Arm designed chips and never sold one. On March 24, 2026, that ended. What the AGI CPU means for agentic AI infrastructure.',
  },
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
