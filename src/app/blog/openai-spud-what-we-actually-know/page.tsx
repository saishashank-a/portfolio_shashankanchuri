import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AudioPlayer } from './AudioPlayer'
import { ShareBar } from './ShareBar'

export const metadata: Metadata = {
  title: "Spud: What We Actually Know About OpenAI's Next Model | Shashank Anchuri",
  description:
    'Pre-training finished March 24. Sam Altman says "a few weeks." Greg Brockman says "big model feel." Everything else is speculation dressed up as a spec sheet.',
  openGraph: {
    title: "Spud: What We Actually Know About OpenAI's Next Model",
    description:
      'Pre-training finished March 24. Sam Altman says "a few weeks." Greg Brockman says "big model feel." Everything else is speculation.',
    images: [{ url: '/images/blog/openai-spud/mindmap.png' }],
  },
}

export default function SpudPost() {
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
        <h1 className="text-3xl font-bold text-[var(--fg)] leading-tight mb-3">
          Spud: What We Actually Know About OpenAI&apos;s Next Model, and What&apos;s Speculation
        </h1>
        <p className="text-[var(--secondary)] text-sm mb-8 italic">
          Built by an AI engineer. Not a journalist.
        </p>

        {/* Podcast player */}
        <AudioPlayer src="https://xjpzs8c0ln0qbf81.public.blob.vercel-storage.com/openai-spud-podcast.m4a" />

        {/* Article body */}
        <div className="prose-blog">
          <p>
            Pre-training finished March 24. Sam Altman says &ldquo;a few weeks.&rdquo; Greg Brockman
            says &ldquo;big model feel.&rdquo; Everything else you&apos;ve read is somebody&apos;s
            guess dressed up as a spec sheet.
          </p>

          <p>
            The sequence matters as much as the facts. Here&apos;s what&apos;s confirmed about Spud,
            how it lines up against Claude Mythos, Opus 4.7, and Gemini 3.1 Pro, and what actually
            matters before Google I/O on May 19.
          </p>

          <hr />

          <h2>The confirmed facts</h2>

          <p>
            There are five. Every other claim about parameter counts, context windows, pricing, or
            launch dates is inference.
          </p>

          <p>
            <strong>1. The codename is Spud.</strong> Internal placeholder, first reported by The
            Information. Whether it ships as GPT-5.5 or GPT-6 hasn&apos;t been decided publicly
             -  reportedly that depends on how significant the performance gap is relative to
            GPT-5.4.
          </p>

          <p>
            <strong>2. Pre-training completed March 24, 2026.</strong> At OpenAI&apos;s Stargate
            data center in Abilene, Texas. Publicly confirmed by Sam Altman. OpenAI&apos;s typical
            pre-training-to-release window is 3-6 weeks, which puts the highest-probability
            launch window in May.
          </p>

          <p>
            <strong>3. Sora was shut down the same day.</strong> Not coincidence. Sora was burning
            an estimated $1 million per day in compute against $2.1 million in lifetime in-app
            revenue. OpenAI walked away from the $1 billion Disney licensing deal built around it,
            reassigned the team to world models and robotics, and removed video generation from the
            product roadmap entirely.
          </p>

          <p>
            <strong>4. Leadership language is unusually charged.</strong> Altman described Spud
            internally as &ldquo;a very strong model&rdquo; that could &ldquo;accelerate the
            economy.&rdquo; Brockman called it the product of &ldquo;two years of research&rdquo;
            with a &ldquo;big model feel.&rdquo; These aren&apos;t specs  -  they&apos;re tells.
            OpenAI doesn&apos;t use &ldquo;big model feel&rdquo; for incremental updates.
          </p>

          <p>
            <strong>5. It&apos;s still in safety evaluation.</strong> No official date, no model
            card, no API announcement as of mid-April. Polymarket has trimmed &ldquo;GPT-6 by April
            30&rdquo; from 78% to around 72%.
          </p>

          <p>
            To put these facts in sequence: Google shipped Gemini 3.1 Pro on February 19. OpenAI
            released GPT-5.4 on March 5. Spud pre-training completed March 24, Sora shut down the
            same day, and OpenAI closed its $122B round on March 31. Anthropic announced Mythos and
            Project Glasswing on April 7. Opus 4.7 shipped April 16. Anthropic&apos;s $100B AWS
            commitment landed April 20. Three months of escalation, compressed into what I&apos;d
            call the most consequential stretch in frontier AI since ChatGPT launched.
          </p>

          {/* Mind map */}
          <figure className="my-8">
            <Image
              src="/images/blog/openai-spud/mindmap.png"
              alt="Mind map: Spud  -  branching structure tracing the confirmed facts, competitive context, and engineering implications of OpenAI's next model."
              width={900}
              height={1200}
              className="rounded-sm w-full h-auto"
              priority
            />
            <figcaption>
              The full knowledge map  -  confirmed facts, speculation, and competitive positioning.
              Generated via NotebookLM.
            </figcaption>
          </figure>

          <hr />

          <h2>Why OpenAI is under this much pressure</h2>

          <p>
            GPT-5.4, OpenAI&apos;s current flagship, launched March 5. Native computer use, a 1
            million token context window, 33% fewer hallucinations than GPT-5.2. It scores 57.7% on
            SWE-bench Pro  -  credible, but not leading.
          </p>

          <p>Then two things changed the shape of the field.</p>

          <p>
            Google shipped Gemini 3.1 Pro on February 19. It scored 77.1% on ARC-AGI-2  - 
            more than double Gemini 3 Pro. 80.6% on SWE-Bench Verified. 94.3% on GPQA Diamond. It
            leads 13 of 16 tracked benchmarks. At $2 per 1M input tokens and $12 per 1M output,
            it&apos;s 7.5&times; cheaper than Claude Opus 4.6 on input. For enterprises running
            high-volume workloads, the pricing is as important as the capability.
          </p>

          <p>
            Then Anthropic revealed Claude Mythos  -  a model that doesn&apos;t sit in the
            Opus/Sonnet/Haiku hierarchy. It sits above it. The coding and reasoning numbers are in
            the benchmark grid below, but the one that matters most structurally is
            Anthropic&apos;s internal fuzzing result: on ~7,000 entry points where Opus 4.6 managed
            a single tier-3 crash, Mythos achieved 595 crashes at tiers 1 and 2, with full
            control-flow hijack on ten separate, fully patched targets. This is the capability that
            made Anthropic decide against a broad release.
          </p>

          <p>
            On April 7, Anthropic announced Mythos would not be generally available  -  rolling
            it out instead through Project Glasswing to nine partners: AWS, Apple, Cisco,
            CrowdStrike, Google, JPMorganChase, Microsoft, Nvidia, and Broadcom, restricted to
            defensive cybersecurity use cases.
          </p>

          <p>
            Last Thursday, Anthropic shipped Claude Opus 4.7. It beats Opus 4.6, GPT-5.4, and
            Gemini 3.1 Pro across Anthropic&apos;s selected benchmarks, but still trails Mythos
            Preview. The release doubles as a live test of the safeguards before they apply them to
            Mythos-class models at broader scale.
          </p>

          <p>
            So here&apos;s OpenAI&apos;s position heading into Q2: one competitor has a publicly
            benchmarked model that makes GPT-5.4 look like a previous generation on cyber and
            coding, and another has a cheaper, higher-context Pro-tier model leading the leaderboards
            on capability. Spud is the response.
          </p>

          <hr />

          <h2>What&apos;s speculated (but reasonable)</h2>

          <p>None of this is confirmed. All of it is inference from pattern, pressure, and process of elimination.</p>

          <p>
            <strong>2M token context window.</strong> GPT-5.4 is already at 1M. Gemini 3.1 Pro
            ships at 1M input. Competitive parity alone makes 2M the floor for Spud.
          </p>

          <p>
            <strong>Persistent memory as the headline feature.</strong> Altman has pointed at it
            publicly as the next major breakthrough  -  not the shallow &ldquo;remember my
            name&rdquo; layer that shipped last year, but cross-session state that survives between
            conversations. That kind of shift is what &ldquo;two years of research&rdquo; framing is
            written for.
          </p>

          <p>
            <strong>Unified super-app architecture.</strong> OpenAI is building a combined platform:
            ChatGPT, Codex, Atlas, and other tools in one interface, with Spud powering the whole
            thing. The goal is users moving between conversation, code, web research, and agentic
            execution without switching contexts.
          </p>

          <p>
            <strong>Stealth testing through GPT-5.4 in production.</strong> Multiple reports suggest
            OpenAI is running A/B tests of Spud outputs through existing GPT-5.4 Pro endpoints.
            Leaked outputs circulating include a one-shot playable VoxelCraft clone, a fully
            interactive Pok&eacute;mon battle game, and SVG work accurate enough to look
            hand-traced. Treat these as signal, not proof.
          </p>

          <hr />

          <h2>The competitive matrix, as of April 20</h2>

          <div className="overflow-x-auto my-8">
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Available?</th>
                  <th>Context</th>
                  <th>Pricing (per 1M in/out)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Spud / GPT-6</strong></td>
                  <td>No  -  safety eval</td>
                  <td>Speculated 2M</td>
                  <td>Unknown</td>
                </tr>
                <tr>
                  <td><strong>Claude Mythos Preview</strong></td>
                  <td>Glasswing partners only</td>
                  <td>Not disclosed</td>
                  <td>~5&times; Opus 4.7</td>
                </tr>
                <tr>
                  <td><strong>Claude Opus 4.7</strong></td>
                  <td>Yes, all channels</td>
                  <td>200K</td>
                  <td>Same as Opus 4.6</td>
                </tr>
                <tr>
                  <td><strong>Gemini 3.1 Pro</strong></td>
                  <td>Yes, preview</td>
                  <td>1M in / 64K out</td>
                  <td>$2 / $12</td>
                </tr>
                <tr>
                  <td><strong>GPT-5.4</strong></td>
                  <td>Yes</td>
                  <td>1M</td>
                  <td> - </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>The strategic read, in one line:</strong> Mythos is the defensive-cyber outlier
            you can&apos;t use. Opus 4.7 is the coding leader you can. Gemini 3.1 Pro wins on
            price-performance for high-volume loads. Spud is the empty column that reshapes all
            three positions the moment it ships.
          </p>

          <hr />

          <h2>The benchmark picture, apples-to-apples</h2>

          <div className="overflow-x-auto my-8">
            <table>
              <thead>
                <tr>
                  <th>Benchmark</th>
                  <th>Claude Mythos</th>
                  <th>Claude Opus 4.7</th>
                  <th>Gemini 3.1 Pro</th>
                  <th>GPT-5.4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SWE-bench Verified</td>
                  <td><strong>93.9%</strong></td>
                  <td>87.6%</td>
                  <td>80.6%</td>
                  <td>72.8%</td>
                </tr>
                <tr>
                  <td>SWE-bench Pro</td>
                  <td> - </td>
                  <td><strong>64.3%</strong></td>
                  <td>54.2%</td>
                  <td>57.7%</td>
                </tr>
                <tr>
                  <td>GPQA Diamond</td>
                  <td><strong>94.6%</strong></td>
                  <td>94.2%</td>
                  <td>94.3%</td>
                  <td>94.4%</td>
                </tr>
                <tr>
                  <td>Humanity&apos;s Last Exam</td>
                  <td><strong>64.7%</strong></td>
                  <td>54.7%</td>
                  <td>51.4%</td>
                  <td>58.7%</td>
                </tr>
                <tr>
                  <td>ARC-AGI-2</td>
                  <td> - </td>
                  <td> - </td>
                  <td><strong>77.1%</strong></td>
                  <td> - </td>
                </tr>
                <tr>
                  <td>OSWorld</td>
                  <td><strong>79.6%</strong></td>
                  <td>78.0%</td>
                  <td> - </td>
                  <td>75.0%</td>
                </tr>
                <tr>
                  <td>Cybench</td>
                  <td><strong>100%</strong></td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            GPQA Diamond is saturating. All four models are within 0.4 points. This benchmark has
            stopped discriminating between frontier models. If you see a provider leading with GPQA
            Diamond in Q2, that&apos;s a tell.
          </p>

          <p>
            HLE has a tool-use story worth pulling out. GPT-5.4 leads Opus 4.7 without tools, but
            Opus 4.7 takes it with tools. That gap  -  model capability versus
            model-plus-scaffolding capability  -  is where real-world performance gets decided.
          </p>

          <p>Spud is the missing column. When it ships, those blanks fill in.</p>

          <hr />

          <h2>Google I/O on May 19 is the timing pressure point</h2>

          <p>
            Google I/O 2026 runs May 19-20. Gemini 4 is widely speculated for reveal
             -  prediction markets put roughly a 15% probability on it shipping publicly before
            June 30. Google&apos;s pattern at I/O is to announce frontier models, not ship them.
            The most likely scenario: Gemini 4 announced May 19, staged rollout through Q2 and Q3.
          </p>

          <p>
            This is the deadline OpenAI is racing. If Spud ships before May 19, OpenAI owns the
            narrative for at least a week before Google takes the stage. If Spud slips past I/O,
            Google defines what frontier capability looks like in Q2, and Spud launches into a
            conversation that&apos;s already moved on.
          </p>

          <p>
            That&apos;s why Altman&apos;s &ldquo;a few weeks&rdquo; from March 24 matters. The
            window that preserves OpenAI&apos;s narrative advantage closes around May 18.
          </p>

          <hr />

          <h2>The other story that dropped today: Anthropic&apos;s $100B+ Amazon commitment</h2>

          <p>
            Anthropic announced a new compute agreement with Amazon on April 20 that changes how to
            read the whole landscape.
          </p>

          <p>
            Anthropic committed more than $100 billion over ten years to AWS, securing up to 5GW of
            new capacity to train and run Claude. Significant Trainium2 capacity comes online in Q2;
            Trainium3 later this year; nearly 1GW in total before end of 2026. Amazon is investing
            $5 billion today, with up to $20 billion more to come, on top of the $8 billion
            previously committed.
          </p>

          <p>
            <strong>
              The number that actually tells you why this happened: Anthropic&apos;s run-rate revenue
              has surpassed $30 billion, up from approximately $9 billion at the end of 2025.
            </strong>
          </p>

          <p>
            The Claude regression complaints have a structural cause. Anthropic explicitly
            acknowledged that unprecedented consumer growth has hit reliability and performance for
            free, Pro, Max, and Team users during peak hours. Their answer: they&apos;re
            capacity-constrained, not quietly degrading the model. The $100B commitment is how they
            make that argument credible.
          </p>

          <p>
            This is the AWS answer to Stargate. OpenAI&apos;s Stargate is a $500B infrastructure
            bet with Microsoft and Oracle, running on Nvidia silicon. Anthropic is betting on
            Amazon&apos;s custom chips  -  Trainium2, 3, and 4  -  locked in through at
            least 2035. Two different hardware philosophies. If Trainium3 delivers on the
            price-performance Amazon claims, Anthropic&apos;s marginal cost per token stays
            structurally lower than OpenAI&apos;s.
          </p>

          {/* Infographic */}
          <figure className="my-8">
            <Image
              src="/images/blog/openai-spud/infographic.png"
              alt="Competitive landscape infographic: Spud vs. the field  -  benchmark grid, infrastructure bets, and the Google I/O timing window."
              width={1200}
              height={630}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              The full competitive picture  -  Spud as the missing column against Mythos, Opus
              4.7, and Gemini 3.1 Pro. Generated via NotebookLM.
            </figcaption>
          </figure>

          <hr />

          <h2>An engineer&apos;s read on what Spud actually changes</h2>

          <p>
            I&apos;ve been building on these APIs long enough to know the difference between a model
            launch that changes what you write and a model launch that changes what you{' '}
            <em>deploy</em>. Spud is looking like the second kind.
          </p>

          <h3>Persistent memory is an architecture shift, not a feature</h3>

          <p>
            If Spud ships with genuine long-term memory  -  actual persistent state across
            conversations, not session-scoped layers  -  every RAG pipeline built in the last 18
            months gets less valuable overnight. The whole reason we pay the complexity tax on vector
            stores, chunking strategies, and re-ranking is because the model forgets. If the model
            stops forgetting, a significant chunk of the LangChain/LlamaIndex ecosystem becomes
            legacy tooling for a problem that got solved upstream.
          </p>

          <p>
            The catch: persistent memory introduces its own failure modes. Stale context, identity
            confusion across users, prompt-injection attacks that survive across sessions instead of
            dying at the turn boundary. Day-one persistent memory will probably have the same
            reliability profile as early function calling  -  impressive in demos, brittle in
            production.
          </p>

          <h3>The 2M context window matters less than people think</h3>

          <p>
            Everyone fixates on the number. What actually matters is what the model does at 80%
            fill. Gemini 3.1 Pro advertises 1M input tokens, but real-world retrieval quality
            degrades meaningfully past ~200K. If Spud ships 2M with flat retrieval quality across
            the whole window, that&apos;s a genuine capability jump. If it ships 2M with the usual
            mid-context rot, it&apos;s marketing.
          </p>

          <p>
            The test I&apos;ll run on day one: needle-in-a-haystack at 500K, 1M, and 1.5M tokens,
            with the needle at the 40% mark  -  the hardest position. That number, not the max
            window, tells you whether you can actually use the context.
          </p>

          <h3>The stealth testing signal</h3>

          <p>
            If OpenAI is A/B-testing Spud outputs through GPT-5.4 Pro endpoints  -  and
            multiple reports suggest they are  -  the model is already running at production
            scale on real user traffic. That&apos;s further along than &ldquo;safety
            evaluation&rdquo; implies.
          </p>

          <p>
            If your evals against GPT-5.4 have been weirdly inconsistent over the past two weeks,
            that&apos;s probably not your prompt.
          </p>

          <h3>What I&apos;d bet on</h3>

          <p>
            Spud&apos;s coding capability beats Opus 4.7 on SWE-bench Verified by 2-4 points,
            not 10+. Mythos is the outlier. Persistent memory ships, and it&apos;s broken enough
            that most serious developers won&apos;t trust it until v2. The super-app rollout is
            staged  -  Codex + ChatGPT first, Atlas integration lagging. Launch pricing closes
            the gap with Gemini 3.1 Pro on output tokens, though matching Gemini outright requires
            TPU-level margins OpenAI doesn&apos;t have.
          </p>

          <p>
            <strong>
              The bet underneath the bet: Spud vs. Mythos is a model comparison. Stargate vs.
              Trainium is a ten-year infrastructure race. The first determines who wins Q2. The
              second determines who&apos;s still here in 2030.
            </strong>
          </p>

          <hr />

          <h2>What to actually do with this information</h2>

          <p>
            Stop building against specific model IDs. Hardcoded <code>gpt-5.4</code> or{' '}
            <code>claude-opus-4-6</code> in config is a migration liability every 6-8 weeks at
            this cadence.
          </p>

          <p>Five things that age well:</p>

          <ol>
            <li>
              <strong>Config-flag your model selection.</strong> Swap at deploy time, not in code.
            </li>
            <li>
              <strong>Build an eval set.</strong> A dozen representative tasks you can run against
              any model. When Spud ships, you&apos;ll know within an hour whether to switch.
            </li>
            <li>
              <strong>Use the previous-response-ID pattern on the Responses API</strong> for better
              cache hits and lower latency on multi-turn flows.
            </li>
            <li>
              <strong>
                Put human approval on any agentic tool use that touches external systems.
              </strong>{' '}
              This gets more important as models get better, not less.
            </li>
            <li>
              <strong>Watch the 272K-token pricing cliff on GPT-5.4.</strong> Prompts over that
              threshold trigger a 2&times; input / 1.5&times; output multiplier.
            </li>
          </ol>

          <p>
            The skill that transfers across model generations isn&apos;t knowing which one is best
            this week. It&apos;s knowing how to evaluate, route, and fail gracefully between them.
          </p>

          <hr />

          <h2>What to watch over the next 30 days</h2>

          <p>
            <strong>Spud launches before May 19.</strong> Most likely based on the confirmed
            pre-training date and Altman&apos;s stated timeline. The cleanest outcome for
            OpenAI&apos;s narrative.
          </p>

          <p>
            <strong>Google I/O, May 19-20.</strong> Gemini 4 announced, likely with staged
            availability. Watch the live demos with unscripted inputs  -  those tell you whether
            benchmark numbers translate to real-world reliability.
          </p>

          <p>
            <strong>Spud launches after I/O.</strong> Less likely, but possible. If it happens, the
            framing becomes &ldquo;response to Google&rdquo; rather than &ldquo;lead the field.&rdquo;
          </p>

          <p>
            The model landscape you&apos;re building against on July 1 will not be the one
            you&apos;re building against today. Two decade-long infrastructure bets just got made in
            the same week. Plan for what&apos;s coming, not what&apos;s current.
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
