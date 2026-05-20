import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AudioPlayer } from './AudioPlayer'
import { ShareBar } from './ShareBar'

export const metadata: Metadata = {
  title: 'Harness Engineering: Why the Model Stopped Being the Moat | Shashank Anchuri',
  description:
    'A new discipline emerged in six weeks. It explains why 88% of AI agent projects never reach production — and why that number will not drop until teams stop optimizing the wrong layer.',
  openGraph: {
    title: 'Harness Engineering: Why the Model Stopped Being the Moat',
    description:
      'Agent = Model + Harness. The model reasons. The harness does everything else. Six components, Hashimoto’s rule, and what to actually build.',
    images: [{ url: '/images/blog/harness-engineering/mindmap.png' }],
  },
}

export default function HarnessEngineeringPost() {
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
        <p className="font-mono text-xs text-[var(--accent)] mb-3">May 2026 · AI Engineering</p>
        <h1 className="text-3xl font-bold text-[var(--fg)] leading-tight mb-6">
          Harness Engineering: Why the Model Stopped Being the Moat
        </h1>

        {/* Podcast */}
        <AudioPlayer src="https://xjpzs8c0ln0qbf81.public.blob.vercel-storage.com/harness-engineering-podcast.m4a" />

        {/* Body */}
        <div className="prose-blog">
          <p className="italic text-[var(--secondary)]">
            A new discipline emerged in six weeks. It explains why 88% of AI agent projects never
            reach production &ndash; and why that number won&apos;t drop until teams stop optimizing
            the wrong layer.
          </p>

          <hr />

          <h2>The Convergence</h2>

          <p>
            On February 5, 2026, Mitchell Hashimoto published a blog post. Hashimoto is the engineer
            who co-founded HashiCorp and built Terraform &ndash; tools that became the load-bearing
            infrastructure for how cloud teams provision computing at scale. He&apos;d spent months
            working with AI agents, and he&apos;d noticed something. Every time an agent made a
            mistake, the right fix wasn&apos;t to tweak the prompt. It was to change the
            environment. Make the mistake structurally impossible. He called this &ldquo;engineering
            the harness.&rdquo;
          </p>

          <p>
            Six days later, Ryan Lopopolo at OpenAI published a 5,000-word writeup describing a
            five-month experiment: three engineers had shipped an internal beta with roughly a
            million lines of code, 1,500 merged pull requests, and zero manually-written code. Same
            idea. Different vocabulary. Anthropic, it turned out, had been using the term
            internally since late 2025 &ndash; referring to the Claude Agent SDK as a
            &ldquo;general-purpose agent harness.&rdquo;
          </p>

          <p>
            Two labs that disagree on nearly everything &ndash; alignment philosophy, safety
            posture, deployment approach &ndash; independently arrived at the same conclusion.
            That&apos;s not a coincidence. That&apos;s a signal.
          </p>

          <p>
            The thesis of this post: as frontier models converge in capability, the model is no
            longer the differentiator. The harness around it is. An oft-cited figure suggests 88% of
            AI agent projects never reach production &ndash; I&apos;ll flag below that this number
            is directional rather than validated research, but the underlying pattern is real.
            Models have gotten dramatically better over the past two years. That number hasn&apos;t
            moved. The bottleneck was never the model.
          </p>

          <p>
            This post breaks down what harness engineering actually is, why the term consolidated in
            six weeks flat, the six components that show up in every production harness, and the
            engineering practices that turn the concept into something your team can actually build.
          </p>

          {/* Mind map */}
          <figure className="my-8">
            <Image
              src="/images/blog/harness-engineering/mindmap.png"
              alt="Mind map of Harness Engineering: core thesis (model as commodity, harness as moat, fix the environment not the agent), evolutionary layers (prompt engineering 2022-24, context engineering 2025, harness engineering 2026), six harness components (guides, tools, sensors, feedback loops, constraints, context management), implementation strategies (progressive disclosure, Hashimoto's Rule), key case studies (OpenAI experiment, Anthropic insights), industry impact (88% production failure rate, traditional SWE skills value, non-deterministic systems governance)."
              width={994}
              height={2000}
              className="rounded-sm w-full h-auto"
              priority
            />
            <figcaption>The full landscape: thesis, layers, components, practices, impact.</figcaption>
          </figure>

          <hr />

          <h2>What Harness Engineering Actually Is</h2>

          <p>
            The formula is simple: <strong>Agent = Model + Harness</strong>. The model reasons. The
            harness does everything else.
          </p>

          <p>
            The word &ldquo;harness&rdquo; comes from horse tack &ndash; reins, bit, saddle, bridle.
            The gear that makes a powerful animal useful. That&apos;s the metaphor. Set it aside;
            the engineering is what matters.
          </p>

          <p>This is what the discipline looks like as a layer stack.</p>

          <p>
            Prompt engineering (2022&ndash;24) optimized a single turn. You found the phrasing, the
            examples, the instruction format that got the model to output what you wanted in one
            shot. It worked well for isolated tasks.
          </p>

          <p>
            Context engineering (2025) stepped up. It asked: what should the model see on each
            turn? RAG (retrieval-augmented generation &ndash; feeding relevant documents to the
            model at query time), memory compression, MCP servers (Model Context Protocol &ndash; a
            standard for connecting agents to external data sources). Andrej Karpathy formalized
            the term; Anthropic gave it structure. Context engineering is about retrieval and
            compression applied per turn.
          </p>

          <p>
            Harness engineering (2026) is the next abstraction up. It doesn&apos;t optimize a turn.
            It doesn&apos;t optimize what the model sees on a turn. It designs the world the agent
            operates in across hundreds or thousands of turns &ndash; the persistent rules, the
            tools it can reach, the sensors monitoring its behavior, the feedback loops that let it
            self-correct. Prompt engineering and context engineering are both subsumed by the
            harness. They&apos;re components of it, not competitors.
          </p>

          <figure className="my-8">
            <Image
              src="/images/blog/harness-engineering/layers.png"
              alt="Three evolutionary layers: Harness Engineering (2026) optimizes the full environment over 1,000+ turns including tools, sensors, constraints, and feedback loops; Context Engineering (2025) manages per-turn visibility using RAG, MCP, and memory compression within a single context window; Prompt Engineering (2022-24) optimizes a single exchange via phrasing, examples, and structure within a 1-turn scope."
              width={2000}
              height={1116}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              The model is the brain. The harness is everything else.
            </figcaption>
          </figure>

          <p>
            The working definition: harness engineering is the discipline of designing the
            execution environment around an autonomous AI agent &ndash; the tools it can call, the
            guides it reads at startup, the sensors that catch its mistakes, the constraints that
            limit its blast radius, and the feedback loops that let it self-correct.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> The model is the brain. The harness is the
            body, the nervous system, and the world it lives in. We spent three years obsessing
            over the brain. We&apos;re finally noticing that without the rest of the system, the
            brain is a science project &ndash; impressive in a lab, useless in production.
          </p>

          <hr />

          <h2>Why the Term Consolidated in Six Weeks</h2>

          <p>
            Three things had to line up for &ldquo;harness engineering&rdquo; to stick as a
            discipline rather than dissolve into the usual churn of AI terminology.
          </p>

          <p>
            First, the problem was already universal. Every team building agents in 2025 had hit
            the same wall: single-turn prompts work, RAG works for retrieval, but neither addresses
            what happens when an agent runs for six hours making hundreds of tool calls without
            supervision. By the time Hashimoto wrote his post, most engineering teams had already
            built some version of a harness &ndash; they just called it &ldquo;extra
            scaffolding&rdquo; or &ldquo;tooling&rdquo; or &ldquo;prompt tuning.&rdquo; The
            discipline existed before the name did.
          </p>

          <p>
            Second, the naming happened fast and from credible sources simultaneously. February 5:
            Hashimoto&apos;s post. February 11: Lopopolo at OpenAI. Mid-February: Ethan Mollick
            reorganized his public AI framework around &ldquo;models, apps, and harnesses.&rdquo;
            Martin Fowler published analysis. Late February: Anthropic published &ldquo;Effective
            harnesses for long-running agents,&rdquo; formalizing what had been internal practice.
            Six weeks, four credible sources, one converging vocabulary.
          </p>

          <p>
            Third &ndash; and this is the one that mattered most &ndash; the timing matched the
            model commoditization curve. By early 2026, GPT-5, Claude Opus 4.5, and Gemini 3 were
            close enough in capability that model selection had stopped being the differentiator
            for most agent use cases. Teams weren&apos;t asking &ldquo;which model should we
            use?&rdquo; anymore. They were asking &ldquo;why does our agent fail in production when
            it works in demos?&rdquo; The harness was the answer that had been hiding in plain
            sight.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> Naming a discipline is a forcing function.
            Before the name existed, every team solved harness problems ad-hoc and called the
            solutions something different. Once the name existed, teams could build org
            structures, hiring pipelines, and curriculum around it. The vocabulary changed what the
            work looked like &ndash; and who was responsible for it.
          </p>

          <hr />

          <h2>The Six Components of a Production Harness</h2>

          <p>
            This is the engineering core. Every production harness I&apos;ve seen, across teams and
            companies and use cases, has some version of all six.
          </p>

          <figure className="my-8">
            <Image
              src="/images/blog/harness-engineering/production-harness.png"
              alt="The Production Harness hexagon diagram: Model at the center reasons, generates, and calls tools, surrounded by six chambers — Guides (AGENTS.md, CLAUDE.md, .cursorrules at the 100-150 line sweet spot), Tools (bash, file editors, MCP servers, search, with fewer than 20 active tools), Sensors (linters, type checkers, tests, output validators that fix context rot), Feedback Loops (retry strategies, sub-agent escalation, human-in-the-loop), Constraints (sandboxing, permission scopes, allowlists as productivity plus safety), and Context Management (compaction and memory persistence with a 60K-80K effective working window). Encircled by Hashimoto's rule: every time the agent makes a mistake, engineer the environment so it can never make that mistake again."
              width={2000}
              height={1116}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              Agent = Model + Harness. The model is the brain. These six chambers are the body.
            </figcaption>
          </figure>

          <h3>1. Guides</h3>

          <p>
            Guides are the files the agent reads at startup. AGENTS.md, CLAUDE.md, .cursorrules
            &ndash; depending on your toolchain. Think of them as the project&apos;s standing
            instructions: what the codebase does, how the build system works, what commands to
            run, what the agent has consistently gotten wrong.
          </p>

          <p>
            Hashimoto&apos;s AGENTS.md for Ghostty (a terminal emulator project) is the canonical
            artifact. Every line corresponds to a specific failure mode he&apos;d already seen.
            OpenAI explicitly calls these files the &ldquo;system of record&rdquo; &ndash; the
            single source of truth for agent behavior in a repository.
          </p>

          <p>
            One critical pattern: don&apos;t write one giant AGENTS.md. Augment Code ran a study
            and found the performance sweet spot is 100&ndash;150 lines with separate reference
            documents the agent loads on demand. Past that threshold, performance reversed. The fix
            is to treat AGENTS.md as a table of contents, not an encyclopedia. Project knowledge
            lives in a structured <code>docs/</code> directory; the guide is the entry point.
          </p>

          <h3>2. Tools</h3>

          <p>
            Tools are what the agent can call &ndash; bash commands, file editors, MCP servers,
            search interfaces. This is the agent&apos;s reach into the world.
          </p>

          <p>
            Anthropic&apos;s position here is concrete: &ldquo;bash is all you need.&rdquo; The
            terminal is the most general-purpose interface humans have built. Giving an agent the
            same tools a developer uses &ndash; the shell, the file system, the test runner
            &ndash; turns out to be more effective than building custom AI-specific APIs for each
            operation. The agent already knows how to use these tools because it was trained on
            code that uses them.
          </p>

          <p>
            The empirical constraint that keeps showing up: keep fewer than 20 tools available to
            an agent at once. Accuracy degrades noticeably past 10. More tools doesn&apos;t mean
            more capable &ndash; it means more confused.
          </p>

          <h3>3. Sensors</h3>

          <p>
            Sensors are the mechanisms that catch when something has gone wrong. Linters, type
            checkers, test runners, output validators, telemetry &ndash; the observability layer
            for agent behavior.
          </p>

          <p>
            Anthropic identified something they call &ldquo;context rot&rdquo; and correctly
            diagnosed it as a sensor problem, not a model problem. Over a long session, the
            agent&apos;s context window accumulates stale information, outdated state, and
            contradictory instructions. Without a sensor monitoring context quality, outputs
            degrade silently. The agent keeps producing results; they just get worse. The fix
            isn&apos;t a more capable model &ndash; it&apos;s a sensor that detects when context
            quality has dropped below the reliability threshold and triggers a response.
          </p>

          <p>
            This reframing matters. If you&apos;re watching your agent produce increasingly bad
            outputs after 90 minutes of runtime and blaming hallucination, you&apos;re probably
            looking at context rot. That&apos;s an instrumentation problem.
          </p>

          <h3>4. Feedback Loops</h3>

          <p>
            Feedback loops are what the harness does when a sensor fires. Retry strategies,
            sub-agent escalation (routing to a more capable or specialized agent),
            human-in-the-loop triggers, context compaction, full session restart.
          </p>

          <p>
            Compaction is worth explaining precisely: when the agent&apos;s context approaches the
            window limit, the harness compresses prior conversation into a summary so work can
            continue. Anthropic&apos;s writeups are honest about the practical constraint here
            &ndash; nominal 200,000-token context windows have an effective working context of
            roughly 60,000&ndash;80,000 tokens during active agent execution. The rest is overhead.
            Engineers building persistent sessions have to account carefully for what survives
            compaction and what doesn&apos;t. The feedback loop design determines whether an agent
            that runs for four hours produces coherent output at hour four or starts repeating
            itself.
          </p>

          <h3>5. Constraints</h3>

          <p>
            Constraints define what the agent can and can&apos;t touch. Permission scopes,
            sandboxes, allowlists, filesystem boundaries. The agent can edit these directories,
            not those. It can run these commands, not those. It can call these APIs, not those.
          </p>

          <p>
            The instinct is to frame constraints as the safety layer &ndash; and they are &ndash;
            but they&apos;re also a productivity layer. Constraining the solution space
            paradoxically increases agent reliability. When the agent can reach everything, it will
            occasionally reach for the wrong thing. A well-designed constraint set doesn&apos;t
            just prevent harm; it focuses attention. Anthropic put it plainly: constraints help the
            agent stay on task.
          </p>

          <h3>6. Context Management</h3>

          <p>
            Context management is the harness component with no prior art in human engineering.
            Compaction, memory persistence, session handoff across context windows.
          </p>

          <p>
            Anthropic&apos;s framing for why this is hard: imagine a software project staffed by
            engineers working in shifts, where each new engineer arrives with no memory of what
            happened on the previous shift. That&apos;s an autonomous agent across context window
            boundaries. The agent doesn&apos;t remember the decisions it made four compactions ago.
            It doesn&apos;t know what it already tried.
          </p>

          <p>
            The architectural answer is progressive disclosure &ndash; a three-tier loading
            pattern. Agent metadata (short summaries of available skills and tools) loads at
            startup: roughly 50&ndash;100 tokens per skill. Full skill instructions load on
            activation, when the agent actually needs them. Deep reference docs load only when the
            task requires that level of context. A 133-skill session uses roughly
            7,000&ndash;13,000 tokens for all metadata combined, versus hundreds of thousands for
            all full skill bodies. That&apos;s the difference between an agent with broad
            capability and an agent with degraded attention from the start.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> Five of these six components look like things
            we&apos;ve been building for human engineering teams for two decades. Linters are
            sensors. CI pipelines are feedback loops. ACLs are constraints. The READMEs in your
            repo are guides. The only genuinely new component is context management &ndash;
            because humans don&apos;t have token windows. This is why senior engineers pick up
            harness engineering quickly and why it&apos;s harder for juniors than prompt
            engineering was. The discipline rewards people who&apos;ve already debugged a
            production incident at 3 AM and know which failure modes are worth engineering around
            versus which ones you catch with a monitor.
          </p>

          <hr />

          <h2>Hashimoto&apos;s Rule: The Operational Practice That Makes the Moat Compoundable</h2>

          <p>Every failure is a harness improvement waiting to happen.</p>

          <p>
            Hashimoto&apos;s rule, stated cleanly: every time the agent makes a mistake, engineer
            the environment so it can never make that mistake again. Don&apos;t patch the prompt.
            Don&apos;t retry with a different phrasing. Fix the world the agent lives in.
          </p>

          <p>
            This is the reframing that matters. A failed test is a missing sensor. A wrong tool
            call is a missing constraint. A hallucinated function signature is a missing guide.
            The failure is real; the diagnosis just changes. And the fix becomes structural
            instead of temporary.
          </p>

          <p>
            This is what turns the harness into a moat. Every failure pushes a permanent
            improvement into the environment. That improvement compounds. The harness gets sharper
            not because the model gets better, but because every bug produces an upgrade in the
            system surrounding the model. Hashimoto&apos;s AGENTS.md for Ghostty is the artifact
            of this practice &ndash; a file that got denser and more reliable over months of
            production debugging.
          </p>

          <p>
            OpenAI&apos;s team arrived at the same principle from a different direction. Their
            writeup describes early failures in the five-month experiment as the environment being
            &ldquo;underspecified&rdquo; &ndash; not Codex being incapable. The agent had the
            intelligence to do the work. The harness didn&apos;t have the structure to direct it.
            Their response wasn&apos;t to switch models or improve prompts. It was to specify the
            environment more precisely. The team&apos;s job shifted: instead of writing code, they
            designed environments, specified intent, and built feedback loops.
          </p>

          <p>
            Same discipline. Hashimoto calls it engineering the harness. OpenAI calls it enabling
            the agents to do useful work. The operational practice is identical.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> The teams whose agents get better over time
            are the ones pushing every fix down into the environment rather than patching prompts
            and moving on. That&apos;s what makes harness engineering compoundable in a way model
            selection isn&apos;t. You can&apos;t accumulate moat by picking a better model
            &ndash; that&apos;s a one-time advantage anyone can replicate in an afternoon. You
            accumulate moat by building a harness that gets sharper every week.
          </p>

          <hr />

          <h2>Why 88% of Agent Projects Die</h2>

          <p>
            The 88% figure &ndash; the claim that 88% of AI agent projects never reach production
            &ndash; appears across nearly every harness engineering writeup published since March
            2026. I can&apos;t trace it to a primary research methodology; most sources cite each
            other or cite it without attribution. Treat it as directional, not validated. The
            underlying pattern it describes, though, is structurally real.
          </p>

          <p>
            Here are the failure modes that show up repeatedly in post-mortems and engineering
            writeups:
          </p>

          <p>
            Missing guides. The agent starts every session with no project context. It learns the
            codebase by making mistakes, which costs time and produces errors.
          </p>

          <p>
            Missing sensors. Errors compound silently. The agent proceeds with bad state because
            nothing is watching for the signal that something went wrong three tool calls ago.
          </p>

          <p>
            Absent governance. No defined rules about what the agent can and can&apos;t do. The
            blast radius of a bad decision is unbounded.
          </p>

          <p>
            Poor data quality. The agent&apos;s inputs are noise &ndash; inconsistent,
            unstructured, contradictory. The model can&apos;t reason reliably on bad inputs
            regardless of capability.
          </p>

          <p>
            Over-engineered control flows. Too much orchestration, not enough autonomy. Teams
            build elaborate state machines that route every decision through a human approval
            step, then wonder why throughput is low.
          </p>

          <p>
            Underestimated integration complexity. The agent can&apos;t actually reach the systems
            it needs &ndash; authentication is broken, APIs are undocumented, data formats don&apos;t
            match. These aren&apos;t AI problems. They&apos;re integration problems that surface
            under agent automation.
          </p>

          <p>
            Misaligned success metrics. The team optimizes for demo quality &ndash; &ldquo;look at
            this impressive output&rdquo; &ndash; rather than production reliability &ndash;
            &ldquo;does this output 98% of the time without supervision.&rdquo;
          </p>

          <p>
            Every single one of these is a harness failure. None of them require a better model.
          </p>

          <p>
            OpenAI&apos;s team admitted this explicitly: early progress in their five-month
            experiment was slower than expected, not because Codex couldn&apos;t code, but because
            the environment was underspecified. The agent had the capability. The harness didn&apos;t
            have the structure. Once they built the structure, throughput hit roughly 3.5 pull
            requests per engineer per day &ndash; at roughly 1/10th the time their team estimated
            the manual equivalent would have taken. (Both numbers are self-reported and unverified
            externally, but the directional claim is consistent with what other teams report.)
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> The 88% number is directional, but the
            structural claim is sound. As models keep improving, the gap between demo and
            production won&apos;t close until teams stop investing in model selection and start
            investing in harness maturity. Writing AGENTS.md files, building linters, instrumenting
            telemetry &ndash; this is the unglamorous work. It&apos;s also the work that actually
            ships.
          </p>

          <hr />

          <h2>What This Means for How You Build</h2>

          <p>Three tiers, depending on where you are.</p>

          <p>
            <strong>If you&apos;re a solo developer:</strong> The lowest-effort thing you can do
            today is write an AGENTS.md at the root of your project. Three sections to start:
            project structure, build and test commands, and &ldquo;things the agent keeps getting
            wrong.&rdquo; Add a line every time the agent makes the same mistake twice. Inside a
            month, you&apos;ll have a project-specific collaborator that&apos;s materially more
            reliable than it was on day one. This is Hashimoto&apos;s rule operationalized at the
            smallest scale.
          </p>

          <p>
            <strong>If you&apos;re on a team:</strong> The highest-leverage move is sensors. Most
            teams already have linters, type checkers, and test runners. The problem is they don&apos;t
            pipe the output back into the agent&apos;s loop. Wire that feedback in &ndash; make
            the test runner output part of what the agent sees when a test fails &ndash; and the
            agent starts catching its own mistakes before you do. Then apply progressive
            disclosure: once your AGENTS.md crosses 150 lines, split it. The main file becomes a
            table of contents. The detail lives in referenced documents the agent loads when it
            needs them.
          </p>

          <p>
            <strong>If you&apos;re building products on top of agents:</strong> The long-term play
            is that the harness becomes your IP. Models will keep improving. API prices will keep
            dropping. The only thing that&apos;s uniquely yours is the accumulated set of guides,
            sensors, constraints, and feedback loops you&apos;ve engineered around your specific
            domain. Treat your harness like a codebase &ndash; version it, test it, refactor it.
            Because that&apos;s what it is.
          </p>

          <p>
            This is what harness engineering is actually doing for the field at a higher level:
            it&apos;s making AI agents legible. A prompt is a black box. A harness is a system you
            can read, debug, audit, and hand to someone else. That&apos;s what turns
            &ldquo;AI&rdquo; from a vibe into engineering.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> The uncomfortable open question is that
            nobody knows how to teach this yet. Prompt engineering had a learning curve you could
            climb in a weekend with a few good tutorials. Harness engineering requires you to have
            already built production systems, already seen things fail at scale, already have the
            instinct for which failure modes are worth structurally preventing versus which ones
            you catch with a monitor. It might be the first AI discipline that&apos;s genuinely
            harder for new engineers than for experienced ones. The curriculum doesn&apos;t exist.
            We&apos;re all learning by stumbling.
          </p>

          <hr />

          <h2>The Load-Bearing Layer</h2>

          <p>
            Two labs that disagree on almost everything converged on the same architectural
            conclusion in six weeks. That&apos;s the signal worth paying attention to.
          </p>

          <p>
            The model isn&apos;t the moat anymore. The harness is. The boring, unglamorous
            engineering work &ndash; guides that capture institutional knowledge, sensors that
            catch silent failures, constraints that define the blast radius, feedback loops that
            let the agent self-correct, context management that keeps behavior coherent across
            hours of autonomous execution &ndash; this is now the load-bearing layer for the next
            decade of AI agents.
          </p>

          <p>
            It doesn&apos;t make Hacker News. It&apos;s not what gets demoed at conferences. But
            it&apos;s the difference between teams that ship and teams that keep scheduling one
            more demo.
          </p>

          <p>
            Whoever figures out how to teach this discipline first will define what the next
            generation of AI engineers actually looks like.
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
