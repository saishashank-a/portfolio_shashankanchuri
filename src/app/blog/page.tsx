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
    slug: 'the-money-is-going-in-a-circle',
    date: 'Jun 2026',
    tag: 'AI Infrastructure',
    title: 'The Money Is Going in a Circle',
    excerpt:
      "A trillion-dollar valuation and a fourteen-billion-dollar loss describe the same company in the same year. Follow the dollars through AI's capital frenzy — the circular financing loop, the bull and bear cases, and what to build for if the circle breaks.",
  },
  {
    slug: 'claude-fable-5',
    date: 'Jun 2026',
    tag: 'AI Strategy',
    title: 'Claude Fable 5: Anthropic Ships the Model It Called Too Dangerous in April',
    excerpt:
      'In April, Anthropic said Mythos-class capability was too dangerous to release. On June 9, they shipped it to everyone. Fable 5 and Mythos 5 are the same weights  -  the only difference is a classifier-routing layer. Capability and safety became separable.',
  },
  {
    slug: 'harness-engineering',
    date: 'May 2026',
    tag: 'AI Engineering',
    title: 'Harness Engineering: Why the Model Stopped Being the Moat',
    excerpt:
      'A new discipline emerged in six weeks. Agent = Model + Harness. Six components, Hashimoto’s rule, and why 88% of agent projects never reach production.',
  },
  {
    slug: 'anthropic-split-subscription',
    date: 'May 2026',
    tag: 'AI Infrastructure',
    title: "Anthropic split your subscription in two. Here's the engineering logic.",
    excerpt:
      "Same week, Claude Code got more permissive interactively and significantly more expensive programmatically. The June 15 credit pool closes a 12×–175× subscription arbitrage. Cache economics, the SpaceX/Colossus unlock, and what to do before the cutover.",
  },
  {
    slug: 'google-tpu-moment',
    date: 'May 2026',
    tag: 'AI Infrastructure',
    title: 'The TPU Moment: A Supply Chain Story as a Silicon Story',
    excerpt:
      "Anthropic reserved a million TPUs. Meta is testing them. Google's Ironwood closed the per-chip gap with Nvidia — but the real story is supply chain optionality at hyperscale.",
  },
  {
    slug: 'anthropic-spacex-colossus',
    date: 'May 2026',
    tag: 'AI Infrastructure',
    title: 'Anthropic and SpaceX: The Deal Nobody Saw Coming',
    excerpt:
      "Anthropic just rented every GPU in Elon Musk's Memphis data center. Three months ago, Musk called the company evil. This isn't a merger — it's the only block of near-term GPU capacity that could move fast enough.",
  },
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
    <main className="min-h-screen px-4 md:px-6 pt-8 pb-24">
      <div className="paper-sheet max-w-2xl mx-auto">
        {/* Header */}
        <p className="font-hand text-2xl text-[var(--accent)] mb-2">the blog ✳</p>
        <h1 className="font-display text-[clamp(2rem,5vw,3.1rem)] font-semibold tracking-tight text-[var(--fg)] leading-[1.05] mb-3">Context Window</h1>
        <p className="text-[var(--secondary)] leading-relaxed mb-12">
          AI research, tools, and ideas worth paying attention to. Written when there&apos;s something worth saying.
        </p>

        {/* Posts */}
        <div className="flex flex-col gap-5 mb-12">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group block rounded-xl bg-[#faf3e6] px-5 py-5 ring-1 ring-black/5 shadow-[0_10px_24px_-16px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 ${
                i % 2 ? 'hover:rotate-[0.6deg]' : 'hover:-rotate-[0.6deg]'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-hand text-lg text-[var(--secondary)]">{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                <span className="rounded-full border border-[var(--accent)]/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">{post.tag}</span>
              </div>
              <h2 className="font-display text-xl font-semibold leading-snug text-[var(--fg)] mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-[var(--secondary)] leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="-rotate-1 bg-[#e9b949] text-[#1f1d1a] p-6 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.55)]">
          <p className="font-hand text-2xl mb-1">stay in the loop ✳</p>
          <p className="text-sm text-[#1f1d1a]/75 mb-5">
            Get notified when the weekly digest launches.
          </p>
          <NotifyForm />
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="font-hand text-lg text-[var(--secondary)] hover:text-[var(--accent)] transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}
