import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AudioPlayer } from './AudioPlayer'
import { ShareBar } from './ShareBar'

export const metadata: Metadata = {
  title: "Anthropic split your subscription in two. Here's the engineering logic. | Shashank Anchuri",
  description:
    "Same week, Claude Code got more permissive interactively and significantly more expensive programmatically. The June 15 credit pool closes a 12×–175× subscription arbitrage. An engineer's read.",
  openGraph: {
    title: "Anthropic split your subscription in two. Here's the engineering logic.",
    description:
      'Interactive Claude Code got more permissive. Programmatic got expensive. Cache economics, the SpaceX/Colossus unlock, and what to do before June 15.',
    images: [{ url: '/images/blog/anthropic-split-subscription/mindmap.png' }],
  },
}

export default function AnthropicSplitSubscriptionPost() {
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
        <p className="font-mono text-xs text-[var(--accent)] mb-3">May 2026 · AI Infrastructure</p>
        <h1 className="text-3xl font-bold text-[var(--fg)] leading-tight mb-6">
          Anthropic split your subscription in two. Here&apos;s the engineering logic.
        </h1>

        {/* Podcast player */}
        <AudioPlayer src="https://xjpzs8c0ln0qbf81.public.blob.vercel-storage.com/anthropic-split-subscription-podcast.m4a" />

        {/* Article body */}
        <div className="prose-blog">
          <p>
            Same week. Interactive Claude Code got significantly more permissive. Programmatic Claude
            Code got significantly more expensive. Those aren&apos;t contradictions. They&apos;re the
            same move, and if you run agents in CI or rely on any third-party Claude Code harness,
            you have until June 15 to understand it.
          </p>

          <p>
            The compute headroom from the SpaceX/Colossus deal (220,000+ GPUs turned on in Memphis)
            paid for the interactive generosity. The programmatic carve-out recovers the
            cache-economics subsidy that was funding a third-party agent ecosystem Anthropic now
            intends to compete with directly. And the simultaneous shipping of Agent View,{' '}
            <code>/goal</code>, and per-session orchestration flags in Claude Code v2.1.139-143 turns
            the third-party wrapper category into an Anthropic feature, right at the moment those
            wrappers got expensive to run on a subscription.
          </p>

          <p>
            The line between interactive and programmatic Claude Code usage is now load-bearing.
            Everything downstream (pricing, product strategy, ecosystem positioning, the competitor
            response) sits on that line. I&apos;m going to walk through how we got here, what the
            economics actually say, and what to do before June 15.
          </p>

          {/* Mind map overview */}
          <figure className="my-8">
            <Image
              src="/images/blog/anthropic-split-subscription/mindmap.png"
              alt="Mind map of Anthropic's Great Repricing: central strategy (split subscription, interactive vs. programmatic divide, subsidy recovery, first-party orchestration), compute infrastructure (SpaceX Colossus deal, 220,000 NVIDIA GPUs, multi-cloud strategy), pricing changes (interactive limits raised, programmatic carve-out), Claude Code updates (Agent View, /goal, supervisor architecture, plugin marketplace), market context (OpenAI Codex promotion, Cursor Ultra, Copilot usage-based), and the technical logic (cache-hit economics, KV cache optimization, ARR protection)."
              width={1400}
              height={2200}
              className="rounded-sm w-full h-auto"
              priority
            />
            <figcaption>
              The full landscape: strategy, compute, pricing, orchestration, market context, and the
              technical logic underneath.
            </figcaption>
          </figure>

          <hr />

          <h2>1. The Compute Unlock</h2>

          <p>
            On May 6, 2026, Anthropic announced at Code with Claude in San Francisco that it had
            signed a deal for the entirety of SpaceX&apos;s Colossus 1 cluster in Memphis: 300+
            megawatts of capacity, 220,000+ NVIDIA GPUs (H100s, H200s, and next-generation GB200
            accelerators) available within a month.
          </p>

          <p>
            A few pieces of context worth holding onto. Colossus 1 is now operated by SpaceXAI, the
            entity that emerged from the xAI-SpaceX merger. xAI shifted Grok training to Colossus 2
            to free up the first cluster. The CNBC reporting on this deal noted that Elon
            Musk&apos;s relationship with Anthropic has been openly adversarial. He called the
            company &ldquo;doomed to become misanthropic.&rdquo; That the deal happened anyway tells
            you something about how tight Anthropic&apos;s capacity situation was. I won&apos;t read
            into the politics. I&apos;ll just note what the behavior implies.
          </p>

          <p>
            This is short-term capacity. Anthropic&apos;s long-term infrastructure commitments are
            in a different weight class: a $25B+ Amazon deal, a 5-gigawatt Google/Broadcom buildout
            projected for 2027, a $30B Microsoft/NVIDIA Azure expansion, a $50B Fluidstack
            commitment. Those are multi-year construction projects. Colossus 1 is what Anthropic
            could turn on now.
          </p>

          <p>The immediate user-facing changes landed the same day, May 6:</p>

          <ul>
            <li><strong>5-hour rate windows doubled (2×)</strong> for Pro, Max, Team, and seat-based Enterprise plans</li>
            <li><strong>Peak-hour throttling removed entirely</strong> for Pro and Max users</li>
            <li><strong>Claude Opus API rate limits significantly increased</strong></li>
            <li><strong>Weekly limits bumped an additional 50%</strong>, valid through July 13, 2026</li>
          </ul>

          <p>
            That last point matters for how you read the competitive response later. The 2× 5-hour
            windows and the removal of peak-hour throttling appear to be permanent changes. The 50%
            weekly bump is explicitly temporary. It expires July 13. Keep those two categories
            distinct.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> Capacity headroom is upstream of every other
            decision in this week. You can&apos;t carve out programmatic usage, give interactive
            users a 2× window, and remove peak throttling unless you&apos;ve solved the supply side
            first. The SpaceX deal is the thing that made the rest of the play possible.
          </p>

          <p>
            Without it, the June 15 changes would look like a panic cap: a company rationing its way
            through constrained infrastructure. With it, they look like deliberate workload
            segmentation: a company that finally has enough room to price the two workloads
            correctly. Engineers reading the wire stories saw three disconnected announcements.
            Engineers reading the serving stack saw one.
          </p>

          <hr />

          <h2>2. The Arbitrage Closure</h2>

          <p>This is the section that actually matters. Everything else is context.</p>

          <p>
            On June 15, 2026, usage of the following tools will stop drawing from your standard
            subscription limits and will instead draw from a new, separate monthly credit pool:
          </p>

          <ul>
            <li>The Claude Agent SDK (<code>@anthropic-ai/claude-agent-sdk</code> and equivalents)</li>
            <li>The <code>claude -p</code> non-interactive command</li>
            <li>Claude Code GitHub Actions</li>
            <li>Third-party Agent SDK tools: Conductor, gstack, OpenClaw, Zed via ACP (Anthropic&apos;s agent communication protocol), T3 Code, Jean</li>
          </ul>

          <p>
            One thing that is <strong>not</strong> changing: API-key authenticated SDK calls. If
            you&apos;re authenticating the Agent SDK with a direct API key rather than your
            subscription credentials, nothing happens on June 15. Pay-as-you-go continues exactly as
            before. This entire policy is about subscription-authenticated programmatic usage. The
            path where a $20/month Pro plan was doing the pricing work of a direct API account.
          </p>

          <p><strong>The new credit pool mechanics:</strong></p>

          <div className="my-6 border border-[var(--border)] rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 font-mono text-xs text-[var(--secondary)] uppercase tracking-wider">Plan</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-[var(--accent)] uppercase tracking-wider">Monthly Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[
                  ['Pro', '$20'],
                  ['Max 5x', '$100'],
                  ['Max 20x', '$200'],
                  ['Team', '$20–$100/seat'],
                  ['Enterprise', '$20–$200/seat'],
                ].map(([plan, credit]) => (
                  <tr key={plan} className="bg-[var(--background)]">
                    <td className="px-4 py-2.5 text-[var(--fg)] font-semibold">{plan}</td>
                    <td className="px-4 py-2.5 text-[var(--accent)] font-mono text-xs">{credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            The credits are dollar-denominated and metered at full API list rates. They don&apos;t
            roll over. They can&apos;t be pooled across seats. They&apos;re per-user. They must be
            claimed once via a toggle after June 15. Anthropic says it will email on June 8 with
            instructions.
          </p>

          <p>
            The overage (&ldquo;extra usage&rdquo;) toggle defaults to OFF. If you don&apos;t enable
            it, programmatic calls fail silently when the credit pool is exhausted. If you do enable
            it, you pay full API list rates for overages, with the option to set a monthly dollar
            cap. That default-off behavior is the thing most engineers I&apos;ve talked to
            haven&apos;t absorbed yet.
          </p>

          <p><strong>The math, and this is where the post earns its credibility</strong></p>

          <p>
            The Register documented one OpenClaw user extracting approximately $236/month of
            API-equivalent token value from a $20 Pro plan before the April ban. That&apos;s roughly
            a 12× ratio. Theo Browne, creator of T3 Code, cited what he described as a 25× effective
            cut for his users, the middle of the range. At the high end, Sonnet-heavy agent fleets
            running near the top of Max 20x weekly quotas could reach 150-175× extracted API value.
            That last figure is reconstructed from documented weekly quotas priced at current API
            list rates. Anthropic hasn&apos;t published it directly, and I&apos;m flagging it as a
            reconstruction, not a confirmed data point.
          </p>

          <p>
            So the effective price increase is 12×-175× depending on workload shape, cache hit
            rates, and model mix. The spread is enormous. Your position in that range depends almost
            entirely on how you&apos;ve been running your agents.
          </p>

          <p><strong>Boris Cherny, Head of Claude Code, to The Register and VentureBeat:</strong></p>

          <blockquote>
            &ldquo;Our systems are highly optimized for one kind of workload. Our subscriptions
            weren&apos;t built for the usage patterns of these third-party tools.&rdquo;
          </blockquote>

          <p>
            That quote is the technical Rosetta Stone for the whole policy. Everything else in this
            announcement follows from it.
          </p>

          <p>
            Claude Code&apos;s serving infrastructure is built around KV cache: the mechanism by
            which a transformer model can reuse computation from earlier in a conversation rather
            than reprocessing tokens it&apos;s already seen. In a long interactive session, every
            turn benefits from the context built up in previous turns. The KV cache is warm. The
            per-token serving cost is low.
          </p>

          <p>
            Third-party harnesses break that pattern. They spawn new sessions with each run. They
            use different system prompts from what Anthropic&apos;s infrastructure anticipates. They
            miss the cache. The KV cache is cold. Every call starts fresh, and Anthropic&apos;s
            serving stack has to do the full computation. From the infrastructure perspective, an
            OpenClaw call costs meaningfully more compute per token than an interactive Claude Code
            call, even for identical underlying models.
          </p>

          <p>
            The cleanest way to see the workload-shape asymmetry is to trace what actually happens
            at the serving layer across the two paths. The diagram below maps the cache-hit
            differential and shows where the credit pool boundary sits.
          </p>

          <figure className="my-8">
            <Image
              src="/images/blog/anthropic-split-subscription/two-paths.png"
              alt="Two Paths Through the Same Model. Two Prices. Interactive path (cache-warm): long-lived IDE sessions, consistent system prompts, warm KV cache with 70%+ hit rate, subscription-based limits. Programmatic path (cache-cold): stateless script invocations, fresh sessions with no prior context, cold KV cache with 0% hit rate, metered credit pool at full API list rates. June 15, 2026 transition delineates cache-warm interactive from cache-cold programmatic for sustainable pricing."
              width={2000}
              height={1100}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              Same weights, different cost. The 12×–175× price differential comes from cache-hit
              economics, not the model.
            </figcaption>
          </figure>

          <p>
            The split-pool is, mechanically, a per-workload-shape pricing model. Interactive users
            get the cache-warm path and the subscription. Programmatic users get the cache-cold path
            and API list rates. The &ldquo;free credit&rdquo; framing (Anthropic calling the new
            pool a &ldquo;monthly credit&rdquo; that comes with your plan) is a marketing wrapper
            around what is structurally a serving-cost recovery scheme.
          </p>

          <h3>The Lydia Hallie moment</h3>

          <p>
            Hallie, an Anthropic employee on the Claude Code team, posted a clarification on X that
            read: &ldquo;you don&apos;t pay extra. Same subscription, same price.&rdquo; The post
            received a Community Note within hours. The note stated: &ldquo;Previously, programmatic
            usage counted toward subsidized subscription limits. Starting June 15, it draws from a
            separate $20-$200 credit at full API rates, while interactive limits remain
            unchanged.&rdquo;
          </p>

          <p>
            Community Notes require cross-ideological consensus to post. A note landing on a company
            employee&apos;s framing tweet is a specific kind of public failure. It means people with
            opposing priors agreed the framing omitted the material fact: that programmatic usage
            was previously drawing from subsidized subscription capacity, and is now metered at full
            API list rates. I&apos;m not piling on. I&apos;m noting the signal: the framing was
            clumsy enough that the crowd-correction mechanism activated.
          </p>

          <p>
            The strongest community reactions said the same thing in different ways. One Max user on
            Hacker News said 99% of their usage is non-interactive and the new pricing &ldquo;will
            far, far exceed what I can afford.&rdquo; Ben Hylak, CTO of Raindrop.ai, posted that
            this was &ldquo;either really silly, or shows how bad of a spot Anthropic is in re:
            gpus.&rdquo; Theo Browne was more direct. He had to make T3 Code&apos;s Claude
            experience &ldquo;significantly worse&rdquo; to avoid burning through the credit ceiling
            for his users.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> This is a cache-economics story, not a
            price-gouge story. The previous regime was unsustainable not because users were doing
            anything wrong, but because the serving stack was paying for a workload it wasn&apos;t
            designed to serve. The right read isn&apos;t &ldquo;Anthropic is screwing
            developers.&rdquo; It&apos;s &ldquo;Anthropic finally priced the workload
            differential.&rdquo;
          </p>

          <p>
            The framing was clumsy. The economics were inevitable. If you were getting 12-25×
            effective value out of a Pro plan via OpenClaw, you had been receiving a subsidy that no
            SaaS business survives giving away indefinitely. The question for you isn&apos;t whether
            this was fair. It&apos;s whether your workflow is cache-warm or cache-cold, and which
            side of that line you want to be on before June 15.
          </p>

          <hr />

          <h2>3. The Orchestration Shipped In-House</h2>

          <p>
            Between May 12 and May 16, Claude Code shipped five daily releases: v2.1.139 through
            v2.1.143. The changelogs read like a checklist of every reason someone might have
            downloaded a third-party orchestration wrapper in the first place.
          </p>

          <p>The major landings:</p>

          <p>
            <strong>Agent View</strong> (<code>claude agents</code>, Research Preview): A
            single-list dashboard for every Claude Code session (running, blocked, and finished)
            hosted by a per-user supervisor process. Haiku-class one-line row summaries for each
            session, refreshing at up to 15 times per second. You can dispatch, peek into, attach
            to, and detach from any background session from one terminal. This is what every
            multi-session harness was building.
          </p>

          <p>
            <strong>The <code>/goal</code> command:</strong> Set a completion condition for Claude
            Code in natural language. Claude iterates across turns (sometimes for hours, sometimes
            for days) until the condition is met. Works in interactive mode, <code>-p</code>, and
            Remote Control. Shows a live overlay of elapsed time, turns, and tokens consumed. The
            architecture worth understanding: an independent Claude session, separate from the one
            doing the work, acts as the goal supervisor. It audits whether the stated goal was
            actually achieved before notifying you. That separation is what makes <code>/goal</code>{' '}
            trustworthy rather than just persistent.
          </p>

          <p>
            <strong>Per-session flags for <code>claude agents</code>:</strong> <code>--model</code>,{' '}
            <code>--effort</code>, <code>--mcp-config</code> (MCP is Anthropic&apos;s Model Context
            Protocol, the standard for connecting Claude to external tools and data sources),{' '}
            <code>--permission-mode</code>, <code>--plugin-dir</code>, <code>--add-dir</code>,{' '}
            <code>--settings</code>, <code>--dangerously-skip-permissions</code>. Parallel
            background sessions can each carry their own configuration. This is what every
            multi-agent harness was threading through at the command-line level.
          </p>

          <p>
            <strong>Plugin marketplace:</strong> Shows projected per-session token cost before
            install. Plugin dependency enforcement: disabling a plugin refuses if another installed
            plugin depends on it; enabling force-enables transitive dependencies. No more silent
            broken-state failures after a plugin change.
          </p>

          <p>
            <strong>The <code>worktree.bgIsolation: &ldquo;none&rdquo;</code> setting:</strong> An
            escape hatch for repositories where Git worktrees (separate working trees from the same
            repo, used to run parallel Claude agents without file conflicts) are impractical.
          </p>

          <p>
            <strong>Fast Mode now defaults to Opus 4.7</strong> (was 4.6). Override via{' '}
            <code>CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1</code> if you need the old behavior.
          </p>

          <p>
            The pattern across all five releases is the same: every major reason a developer reached
            for OpenClaw, Conductor, or T3 Code (multi-session orchestration, completion conditions,
            per-agent configuration, context budgeting, dependency safety) just got a first-party
            implementation.
          </p>

          <h3>The <code>/goal</code> + stop hook + test suite loop</h3>

          <p>
            Here&apos;s the cleanest &ldquo;leave it running until done&rdquo; pattern Claude Code
            has ever shipped, and it&apos;s worth tracing in full:
          </p>

          <ol>
            <li><code>/goal</code> sets the completion condition: &ldquo;all tests in the auth module pass, no regressions in the full suite&rdquo;</li>
            <li>A stop hook runs your test suite at the end of each turn</li>
            <li>If tests fail, the hook blocks the stop; Claude continues iterating</li>
            <li>If tests pass and the goal supervisor confirms the completion condition is met, the goal resolves and Claude notifies you</li>
            <li>The <code>CLAUDE_CODE_STOP_HOOK_BLOCK_CAP</code> environment variable (default: 8 consecutive blocks) prevents runaway loops if something goes wrong</li>
          </ol>

          <p>
            ExplainX called <code>/goal</code> &ldquo;the single most underrated AI feature of
            2026.&rdquo; More telling: OpenAI&apos;s Codex has integrated the same pattern.
            Completion conditions for agent sessions are becoming a cross-vendor standard, not a
            differentiator. The window to build a business on &ldquo;Claude Code, but with
            completion conditions&rdquo; has closed.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> Third-party orchestration wrappers built their
            value proposition on a gap: &ldquo;Claude Code can&apos;t do X, but we can.&rdquo; That
            gap just got an order of magnitude narrower.
          </p>

          <p>
            Agent View is what every harness was building. <code>/goal</code> is what every harness
            was wrapping. Per-session flags are what every harness was passing through. The wrappers
            that survive will be the ones doing something Anthropic structurally can&apos;t or
            won&apos;t do: bringing a non-Claude model into the mix, providing tight IDE integration
            the terminal can&apos;t match, or serving a specific vertical workflow that requires a
            different permission model.
          </p>

          <p>
            The middle of the market: &ldquo;Claude Code, but with multi-session management&rdquo;
            is gone. And it got expensive to run on the same day it became redundant. That&apos;s
            not an accident. That&apos;s the move.
          </p>

          <hr />

          <h2>4. The Competitor Response</h2>

          <p>
            OpenAI moved the same day. On May 14, Sam Altman announced that enterprise users
            switching from Claude Code to Codex within 30 days would receive two months free, plus a
            one-click migration tool that transfers Claude Code prompts, skills, and MCP
            configurations.
          </p>

          <p>
            The timing is not subtle. Anthropic&apos;s 50% weekly usage bump runs through July 13.
            OpenAI&apos;s 30-day window plus two free months lands on almost exactly the same
            horizon. Both companies are racing to lock in heavy agentic users before the IPO windows
            most analysts are projecting for H2 2026.
          </p>

          <p>
            Codex&apos;s structural pitch in this window: Codex Pro at $100 gets 10× Plus through
            May 31. Codex Pro at $200 gets a permanent 20× Plus bump plus 25× Plus 5-hour limits
            through May 31. Critically (and this is Codex&apos;s first credible structural pitch
            since launch) Codex doesn&apos;t split interactive from programmatic. It&apos;s a
            unified pool. That&apos;s the explicit pitch now: one plan, no fragmentation, no credit
            pool to claim via toggle.
          </p>

          <p>
            The timeline below maps how the May 6 – June 15 – July 13 sequence lines up against
            where each major vendor&apos;s incentives sit, and what the competitive window actually
            looks like for someone deciding where to route their workloads this quarter.
          </p>

          <figure className="my-8">
            <Image
              src="/images/blog/anthropic-split-subscription/timeline.png"
              alt="The 68-day window. May 6: SpaceX/Colossus catalyst — Anthropic secures 220,000 GPUs. May 14: OpenAI counter-offensive — 2-month free Codex trials and migration tools for Claude users. June 1: GitHub Copilot pauses Pro signups and moves to usage-based billing. June 15: Programmatic carve-out — Agent SDK and third-party tools move to metered credit pools at full API list rates (permanent). July 13: The window closes — Anthropic's temporary +50% weekly bonus ends within 24 hours of OpenAI's defector promo expiration. Right side: data table showing Pro tier old extracted value (~$236) vs. new $20 programmatic credit pool; first-party orchestration moat from /goal and Agent View."
              width={2000}
              height={1200}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              68 days. Anthropic&apos;s weekly bonus and OpenAI&apos;s defector promo expire within
              24 hours of each other.
            </figcaption>
          </figure>

          <p>
            <strong>Cursor</strong> is the obvious migration target for ex-Max-20x heavy users. The
            tiers are Pro at $20, Pro+ at $60, and Ultra at $200 (20× Pro usage). Model flexibility
            is a real feature here: Claude Opus 4.6, GPT-5.4, Gemini 3 Pro, Grok Code. If
            you&apos;re worried about vendor capture after this week, Cursor&apos;s multi-model
            architecture is a genuine hedge. Cursor switched to usage-based pricing back in June
            2025. Cursor&apos;s own usage data puts daily Agent users at $60-$100/month and power
            users at $200+/month. They solved the &ldquo;what if my agent eats the credit?&rdquo;
            problem months ago. They just got new marketing ammunition.
          </p>

          <p>
            <strong>Zed</strong> is facing direct existential pressure, not from the market, but
            from their own product blog. Zed published a post acknowledging that ACP-routed Claude
            Code usage now draws from the new credit pool, and recommending that users run the
            native Anthropic CLI directly inside Zed&apos;s terminal as a workaround. That&apos;s a
            remarkable concession. ACP (the protocol Zed uses to integrate Claude Code) is now
            explicitly the worse path compared to the native terminal. The same bind applies to any
            tool built on ACP.
          </p>

          <p>
            <strong>GitHub Copilot</strong> is moving to usage-based billing on June 1, 2026. New
            Copilot Pro and Pro+ signups have been paused since April 20. Flat-fee inference
            subsidies are ending industry-wide. Anthropic just moved first on the part that produces
            the sharpest developer reaction.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> Flat-fee inference subsidies with no usage
            floor are a tragedy of the commons. Any one vendor that moves first forces the others to
            follow within 6-12 months, or bleed to death subsidizing every heavy user the market
            pushes their way.
          </p>

          <p>
            Anthropic moved first on the programmatic side because they had the most leverage.
            Highest-perceived-quality coding model means the lowest near-term churn risk on a price
            change. Cursor already solved the problem with metering. Copilot is solving it by going
            usage-based June 1. OpenAI is the only major vendor still subsidizing programmatic usage
            outright, and they&apos;re doing it as an explicit two-month promotional spike into a
            competitive window.
          </p>

          <p>
            By Q4 2026, every coding agent stack will look structurally like Anthropic&apos;s split.
            The right framing isn&apos;t &ldquo;Anthropic is greedy.&rdquo; It&apos;s
            &ldquo;Anthropic is early.&rdquo;
          </p>

          <hr />

          <h2>5. What to Actually Do Before June 15</h2>

          <p>Concrete steps. No fluff.</p>

          <p>
            <strong>1. Audit your usage.</strong> Grep your repos and CI pipelines for{' '}
            <code>claude -p</code>, Agent SDK imports (<code>@anthropic-ai/claude-agent-sdk</code>{' '}
            and any equivalents), and GitHub Actions referencing{' '}
            <code>anthropics/claude-code-action</code>. Anything you find is moving to the credit
            pool on June 15. Estimate your monthly token spend for those calls at full API list
            rates. That&apos;s your new cost baseline.
          </p>

          <p>
            <strong>2. Decide whether to enable the &ldquo;extra usage&rdquo; toggle.</strong> It
            defaults to OFF, which means your CI silently fails when the monthly credit is
            exhausted. If you have any unattended workload that can&apos;t fail mid-month (a nightly
            PR-review action, a scheduled refactor agent, a background documentation pass) turn it
            on and set a dollar cap. Write the cap into your runbook so you don&apos;t lose track of
            the toggle state three months from now.
          </p>

          <p>
            <strong>3. Try <code>claude agents</code> and <code>/goal</code> before investing
            another dollar in a third-party orchestrator.</strong> The <code>/goal</code> + stop
            hook + test suite loop covers roughly 80% of what engineers were using OpenClaw for. If
            your harness was primarily a wrapper around multi-session management and completion
            conditions, the wrapper just got obsoleted. If it was doing something structurally
            different (cross-model routing, IDE-tight integration, a vertical workflow requiring a
            specific permission model) it&apos;s still valuable. Know which category you&apos;re in.
          </p>

          <p>
            <strong>4. If your programmatic spend exceeds your plan&apos;s credit allocation ($20
            for Pro, $100 for Max 5x, $200 for Max 20x) at API-equivalent token rates,
            hybrid-route.</strong> Move cache-cold batch workloads (large-scale code review,
            classification pipelines, anything with cold-start sessions and no cache warmth) to
            Codex or local models. Keep cache-warm interactive work on Claude. The new pricing
            rewards correct workload placement. Route accordingly.
          </p>

          <p>
            <strong>5. If you&apos;re authenticating the Agent SDK with a direct API key, not your
            subscription credentials, nothing changes for you.</strong> Pay-as-you-go continues
            exactly as before. No credit pool, no toggle to claim, no June 15 cutover. This point is
            buried in most coverage; confirm your auth path before assuming you&apos;re affected.
          </p>

          <hr />

          <h2>The Line Is Load-Bearing</h2>

          <p>Interactive got better. Programmatic got expensive. The line between them is now the architecture.</p>

          <p>
            The compute unlock made the move possible. Without 220,000 GPUs coming online in
            Memphis, Anthropic didn&apos;t have the supply-side room to be generous with one side
            while pricing the other correctly. The credit pool closed a subsidized arbitrage at
            ratios no SaaS model survives: 12× at the documented floor, 150-175× at the
            reconstructed ceiling. The orchestration primitives shipped the same week turned the
            third-party wrapper category from a gap to fill into an Anthropic feature to compete
            with.
          </p>

          <p>
            The competitor response is already visible. The industry math is already moving. Within
            12 months, I expect every major coding agent stack to have an interactive/programmatic
            split of some kind. The economics of warm-cache and cold-cache workloads are different,
            and the platforms will price them differently.
          </p>

          <p>
            The question for an engineer in May 2026 isn&apos;t whether to like or dislike the
            change. It&apos;s whether your workflow is on the right side of the new line.
          </p>

          <p>
            Audit. Toggle. <code>/goal</code>. Move before June 15.
          </p>

          <hr />

          <p className="text-[var(--secondary)] text-sm italic">
            Built by an AI Engineer. Not a journalist.
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
