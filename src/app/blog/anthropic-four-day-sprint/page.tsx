import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AudioPlayer } from './AudioPlayer'
import { ShareBar } from './ShareBar'

export const metadata: Metadata = {
  title: "Anthropic's Four-Day Sprint: What Actually Shipped in April 2026 | Shashank Anchuri",
  description:
    "Anthropic shipped a new flagship model, completed its Office integration, redesigned its desktop app, and reshaped its board, all in four days. An engineer's read.",
  openGraph: {
    title: "Anthropic's Four-Day Sprint: What Actually Shipped in April 2026",
    description:
      "Anthropic shipped a new flagship model, completed its Office integration, redesigned its desktop app, and reshaped its board, all in four days. An engineer's read.",
    images: [{ url: '/images/blog/anthropic-four-day-sprint/infographic.png' }],
  },
}

export default function AnthropicFourDaySprintPost() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors mb-10"
        >
          ← Context Window
        </Link>

        {/* Header */}
        <p className="font-mono text-xs text-[var(--accent)] mb-3">Apr 2026 · AI Strategy</p>
        <h1 className="text-3xl font-bold text-[var(--fg)] leading-tight mb-6">
          Anthropic&apos;s Four-Day Sprint: What Actually Shipped in April 2026
        </h1>

        {/* Podcast player */}
        <AudioPlayer src="https://xjpzs8c0ln0qbf81.public.blob.vercel-storage.com/anthropic-four-day-sprint-podcast.m4a" />

        {/* Article body */}
        <div className="prose-blog">
          <p>
            Anthropic had one of those weeks where the release notes read like a strategy doc. Between
            April 13 and April 16, the company completed its Microsoft Office integration, shipped a
            new flagship model, redesigned the desktop app from scratch, and added a Novartis CEO to
            its board. Four announcements, four days, four different layers of the business.
          </p>

          <p>
            Most coverage treats this as a breathless round-up. This one&apos;s for people who
            actually use the tools and care about the implementation details: what changed, what it
            costs, and whether it holds up under real workloads.
          </p>

          {/* Main infographic */}
          <figure className="my-8">
            <Image
              src="/images/blog/anthropic-four-day-sprint/infographic.png"
              alt="Anthropic's April 2026 Playbook  -  four moves in four days across product, model, platform, and governance"
              width={1200}
              height={800}
              className="rounded-sm w-full h-auto"
              priority
            />
            <figcaption>
              Anthropic&apos;s April 2026 playbook: four layers, one direction. Generated via NotebookLM.
            </figcaption>
          </figure>

          <hr />

          <h2>The Office Trio Is Finally Complete</h2>

          <p>
            On April 13, Anthropic launched the Claude for Word add-in, which closed the loop on
            native Word, Excel, and PowerPoint integration. The March update already gave Excel and
            PowerPoint shared conversational context. Word now joins the same session.
          </p>

          <p>
            The practical version: open an Excel workbook, ask Claude to build a trading comps table
            from the data, switch to PowerPoint where Claude uses that same analysis to generate a
            valuation slide on your template, then move to Word for the client memo. No re-uploading,
            no re-prompting, no copy-paste. Claude remembers the whole chain.
          </p>

          <p>
            The add-ins ship through Microsoft AppSource and run on Windows, Mac, and Web. Enterprise
            deployment goes through Amazon Bedrock, Google Cloud Vertex AI, or Microsoft Foundry, so
            if your org already has an LLM gateway, you probably don&apos;t need to provision separate
            Claude accounts. Skills  -  which lets teams save standardized workflows as one-click
            actions  -  now works inside the add-ins too.
          </p>

          <p>
            <strong>So what:</strong> If your day involves moving numbers between Excel, slides, and
            written deliverables, this is the update that affects you most. The shared context is the
            feature that actually saves time. The rest is table stakes.
          </p>

          <hr />

          <h2>Claude Opus 4.7: The New Flagship</h2>

          <p>
            On April 16, Anthropic released Claude Opus 4.7. It is the company&apos;s most capable
            generally available model, a direct upgrade to Opus 4.6, though the more aggressive Mythos
            Preview remains limited to Project Glasswing cybersecurity partners.
          </p>

          <p>
            The benchmark numbers are real: SWE-bench Verified jumped to 87.6% from 80.8%,
            CursorBench to 70% from 58%, GPQA Diamond to 94.2%. On directly comparable evaluations,
            4.7 narrowly leads GPT-5.4 and Gemini 3.1 Pro, but benchmark leadership now lasts weeks,
            not quarters.
          </p>

          <div className="my-6 border border-[var(--border)] rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 font-mono text-xs text-[var(--secondary)] uppercase tracking-wider">Benchmark</th>
                  <th className="text-right px-4 py-3 font-mono text-xs text-[var(--accent)] uppercase tracking-wider">Opus 4.7</th>
                  <th className="text-right px-4 py-3 font-mono text-xs text-[var(--secondary)] uppercase tracking-wider">Opus 4.6</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[
                  ['SWE-bench Verified', '87.6%', '80.8%'],
                  ['CursorBench', '70%', '58%'],
                  ['GPQA Diamond', '94.2%', '91.3%'],
                ].map(([bench, v47, v46]) => (
                  <tr key={bench} className="bg-[var(--background)]">
                    <td className="px-4 py-2.5 text-[var(--fg)]">{bench}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-[var(--accent)] font-semibold">{v47}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-[var(--secondary)]">{v46}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            The features developers will actually use: a <strong>1M token context window</strong> at
            standard API pricing with no long-context premium; high-resolution image input up to
            2,576px with better pointing, counting, and localization; a new{' '}
            <strong>xhigh effort level</strong> that sits between &ldquo;high&rdquo; and
            &ldquo;max&rdquo; for finer control over the reasoning-depth-versus-cost tradeoff; and{' '}
            <strong>task budgets</strong> in public beta, which let you cap total tokens across a full
            agentic loop so a runaway agent doesn&apos;t generate a runaway bill. Claude Code also
            gets <code>/ultrareview</code>, designed to simulate a senior reviewer flagging subtle
            design flaws, not just syntax errors.
          </p>

          <p>
            One thing to budget for: Opus 4.7 uses a new tokenizer that can consume 1.0-1.35x more
            tokens on the same input. Pricing stays at $5 in / $25 out per million tokens, unchanged
            from 4.6, so that tokenizer delta is real money at scale. Box&apos;s early testing points
            the other way: 56% fewer model calls, 50% fewer tool calls, 24% faster responses, 30%
            fewer AI units consumed versus 4.6 on their workloads. If that holds for you, 4.7 is
            cheaper to run than its predecessor despite the tokenizer change.
          </p>

          <p>
            <strong>So what:</strong> If you&apos;re building agents or running Claude in production,
            xhigh effort, task budgets, and the new tokenizer warrant a day of testing before you roll
            this into prompts and pipelines you already depend on.
          </p>

          <hr />

          <h2>The Desktop App, Rebuilt Around Parallel Agents</h2>

          <p>
            Claude Code&apos;s desktop app got a ground-up redesign. The framing in Anthropic&apos;s
            own blog is honest: agentic coding doesn&apos;t look like one prompt and a wait anymore.
            It looks like a refactor running in one repo, a bug fix in another, a test pass in a
            third, with the developer in the orchestrator seat.
          </p>

          <p>
            The new app is built for that shape of work. A session sidebar shows every active and
            recent task, filterable by status, project, or environment. The workspace is drag-and-drop:
            chat, diff, preview, terminal, file editor, plan, tasks, and subagent panes arrange into
            whatever layout fits how you work. There&apos;s an integrated terminal that shares the
            session&apos;s working directory, a proper in-app file editor, a rebuilt diff viewer
            designed for large changesets, and an expanded preview pane that handles HTML, PDFs, and
            local app servers. Three view modes (Verbose, Normal, and Summary) let you dial in how
            much of Claude&apos;s tool-calling you actually want to see. SSH support now extends to
            Mac. Responses stream as they generate.
          </p>

          <p>
            <strong>So what:</strong> If you&apos;ve been managing multiple Claude Code sessions
            across terminal tabs, upgrade. If you&apos;re a solo developer working one task at a time,
            the old interface was fine and the new one is a learning curve.
          </p>

          <hr />

          <h2>Vas Narasimhan on the Board</h2>

          <p>
            The quietest announcement of the week is arguably the most strategically loaded. On April
            14, Anthropic&apos;s Long-Term Benefit Trust appointed Vas Narasimhan  -  physician-scientist
            and CEO of Novartis  -  to the Board of Directors.
          </p>

          <p>
            Two things are worth noting. Narasimhan is the first pharmaceutical executive on
            Anthropic&apos;s board. He&apos;s overseen more than 35 novel medicine approvals at
            Novartis and spent years earlier in his career on HIV/AIDS, malaria, and tuberculosis
            programs across India, Africa, and South America. That&apos;s experience shipping
            consequential products through one of the most heavily regulated industries on earth. With
            his addition, Trust-appointed directors now hold the majority on the board.
          </p>

          <p>
            Neither fact is accidental. Anthropic is reportedly weighing an IPO as early as Q4 2026.
            Adding a globally respected pharma CEO signals a strategic push into life sciences
            applications and a governance posture that reflects a Public Benefit Corporation preparing
            for public markets.
          </p>

          <p>
            <strong>So what:</strong> If you&apos;re watching Anthropic as a long-term bet  -  as an
            investor, a customer, or someone tracking AI governance  -  this is the update that tells you
            where the company wants to be in five years, not five months.
          </p>

          {/* Role-based guide */}
          <figure className="my-8">
            <Image
              src="/images/blog/anthropic-four-day-sprint/role-guide.png"
              alt="What Anthropic's April 2026 updates mean for you  -  a role-based guide to four back-to-back announcements"
              width={1200}
              height={800}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              A role-based guide to the four announcements. Generated via NotebookLM.
            </figcaption>
          </figure>

          <hr />

          <h2>The Shape of the Strategy</h2>

          <p>
            Read individually, each announcement is news. Read together, they are a strategy.
          </p>

          <p>
            <strong>Product depth</strong>  -  Claude now embedded across the apps knowledge workers
            live in.{' '}
            <strong>Model frontier</strong>  -  Opus 4.7 back in the lead.{' '}
            <strong>Platform experience</strong>  -  a desktop app designed for how agentic work
            actually happens.{' '}
            <strong>Governance maturity</strong>  -  a board composition that reflects where the company
            is headed.
          </p>

          <p>
            Four layers, one direction. Anthropic is no longer positioning itself as a model lab. It
            is positioning itself as the layer between the frontier model and the work you do every
            day.
          </p>

          <p>
            The question for the rest of 2026: which of these four compounds first in your workflow?
          </p>

          {/* Mind map */}
          <figure className="my-8">
            <Image
              src="/images/blog/anthropic-four-day-sprint/mindmap.png"
              alt="Mind map of Anthropic's major updates in April 2026  -  Microsoft Office integration, Claude Opus 4.7, desktop app redesign, and governance changes"
              width={800}
              height={1200}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              Full mind map of the April 2026 updates. Generated via NotebookLM.
            </figcaption>
          </figure>

          <hr />

          <p className="text-[var(--secondary)] text-sm italic">
            Context Window, built by an AI engineer. Not a journalist.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <div className="mb-6">
            <ShareBar />
          </div>
          <p className="text-sm text-[var(--secondary)] mb-4">
            Follow along for more AI research breakdowns.
          </p>
          <Link
            href="/blog"
            className="text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
          >
            ← Back to Context Window
          </Link>
        </div>
      </div>
    </main>
  )
}
