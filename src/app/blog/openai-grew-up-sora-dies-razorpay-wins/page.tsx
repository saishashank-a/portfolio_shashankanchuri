import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AudioPlayer } from './AudioPlayer'
import { ShareBar } from './ShareBar'

export const metadata: Metadata = {
  title: 'The Week OpenAI Grew Up: Sora Dies, Razorpay Wins | Shashank Anchuri',
  description:
    'OpenAI was spending $15M/day on an app that made $2.1M lifetime. Then they killed it  -  and wired payments into Codex. These are the same decision viewed from two angles.',
  openGraph: {
    title: 'The Week OpenAI Grew Up: Sora Dies, Razorpay Wins',
    description:
      'OpenAI was spending $15M/day on an app that made $2.1M lifetime. Then they killed it  -  and wired payments into Codex.',
    images: [{ url: '/images/blog/openai-grew-up/infographic-sora.png' }],
  },
}

export default function OpenAIGrewUpPost() {
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
          The Week OpenAI Grew Up: Sora Dies, Razorpay Wins, and AI Finally Picks Revenue Over Demos
        </h1>

        {/* Podcast player */}
        <AudioPlayer src="https://xjpzs8c0ln0qbf81.public.blob.vercel-storage.com/openai-grew-up-podcast.m4a" />

        {/* Article body */}
        <div className="prose-blog">
          <p>
            OpenAI was spending $15 million a day on an app that made $2.1 million in its entire
            lifetime. Then they killed it.
          </p>

          <p>
            And less than two weeks later, they helped Razorpay wire payments directly into the AI
            coding platform a million developers use every week.
          </p>

          <p>
            These look like two separate news items. They&apos;re not. They&apos;re the same
            decision, viewed from two angles.
          </p>

          <p>
            Between March 24 and April 6, 2026, OpenAI executed the clearest strategic pivot the AI
            industry has seen. The era of viral consumer apps  -  the flashy demos, the Disney deals,
            the &ldquo;ChatGPT for creativity&rdquo; announcements  -  just ended. The era of
            revenue-generating infrastructure just started. Compute that was burning on Sora is now
            flowing to Codex. The Razorpay partnership only matters because Sora died first.
          </p>

          {/* Mind map */}
          <figure className="my-8">
            <Image
              src="/images/blog/openai-grew-up/mindmap.png"
              alt="Mind map: The Week OpenAI Grew Up  -  branching structure tracing Sora and Razorpay events back to one strategic root: compute is a zero-sum game and demos don't generate revenue."
              width={900}
              height={1200}
              className="rounded-sm w-full h-auto"
              priority
            />
            <figcaption>
              The full map of how these pieces connect  -  two pivot decisions sharing one root.
              Generated via NotebookLM.
            </figcaption>
          </figure>

          <hr />

          <h2>Sora: The $5.4 Billion Science Project That Died in 176 Days</h2>

          <h3>What Sora Was</h3>

          <p>
            Sora was simple to explain. You typed a text description and Sora generated a
            photorealistic video. No camera. No set. No actors. Just a prompt and a video.
          </p>

          <p>
            OpenAI launched it as a standalone app in September 2025. The pitch: an AI-powered
            TikTok where every video is generated from scratch. The flagship feature was called
            &ldquo;Cameo&rdquo; (later renamed &ldquo;Characters&rdquo;): you scanned your face
            once, and the AI could insert you into any video scene. Sam Altman called it
            OpenAI&apos;s &ldquo;ChatGPT for creativity&rdquo; moment.
          </p>

          <h3>The Numbers Before the Fall</h3>

          <p>
            By November 2025, Sora hit 3.3 million downloads. It was the top app in the App
            Store&apos;s Photo &amp; Video category within 24 hours of launch. In December 2025,
            Disney signed a $1 billion deal to license 200+ characters for Sora-generated videos on
            Disney+. Hollywood was scared. Actors&apos; unions protested. The Japanese government
            formally demanded that OpenAI stop generating anime and manga characters.
          </p>

          <p>When regulators and studios are both paying attention, you&apos;ve built something that matters.</p>

          <h3>The Numbers That Killed It</h3>

          <p>
            Generating a single 10-second Sora clip required approximately 40 minutes of GPU time
            across four parallel GPUs. At roughly $2 per GPU-hour in cloud compute, each short clip
            cost about $1.30 to produce. One 10-second Sora clip consumed GPU resources equivalent
            to thousands of standard ChatGPT conversations.
          </p>

          <p>
            OpenAI&apos;s daily inference cost was approximately{' '}
            <strong>$15 million per day</strong>. Annualized: $5.4 billion.
          </p>

          <p>
            Total lifetime revenue from in-app purchases:{' '}
            <strong>$2.1 million. Not per month. Not per quarter. Total. Lifetime.</strong>
          </p>

          <p>
            Monthly downloads crashed from 3.3 million in November 2025 to 1.1 million by February
            2026  -  a 66% decline in three months. Active users peaked around one million and fell
            below 500,000.
          </p>

          {/* Sora infographic */}
          <figure className="my-8">
            <Image
              src="/images/blog/openai-grew-up/infographic-sora.png"
              alt="The Sora Autopsy: How a $5.4B 'Science Project' Died in 176 Days  -  timeline from Feb 2024 unveil to Mar 2026 shutdown, showing the tilted cost/revenue scale and Anthropic comparison."
              width={1200}
              height={630}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              The full post-mortem in one visual  -  from the cost horror show to the Anthropic
              wake-up call that triggered the shutdown. Generated via NotebookLM.
            </figcaption>
          </figure>

          <h3>The Deepfake Nightmare</h3>

          <p>
            Deepfakes of Martin Luther King Jr. and Robin Williams appeared on the platform. Both of
            their daughters publicly asked users to stop. Users generated copyrighted characters.
            The Japanese government formally demanded action. The &ldquo;Take Down Act,&rdquo; signed
            by President Trump in 2025, added federal legal risk to the existing reputational damage.
          </p>

          <p>
            The brutal irony: every viral Sora clip was simultaneously an advertisement for the
            product and a documented argument for regulators to shut it down.
          </p>

          <h3>Why It Really Died</h3>

          <p>
            The actual trigger was competitive pressure. While OpenAI&apos;s Sora team focused on
            video generation, Anthropic&apos;s Claude Code was systematically winning enterprise
            customers. The numbers:{' '}
            <strong>Anthropic at $19 billion annualized with 80% from enterprise clients.</strong>{' '}
            OpenAI at $25 billion total but only 40% from enterprises. A smaller company capturing
            twice the enterprise share of a larger one.
          </p>

          <p>
            Eight of the Fortune 10 are Claude customers. More than 500 companies spend over $1
            million annually on Claude. On March 16, 2026, OpenAI&apos;s applications CEO Fidji Simo
            told staff that Anthropic was a &ldquo;wake-up call&rdquo; and that OpenAI was spreading
            itself across too many &ldquo;side quests.&rdquo;
          </p>

          <p>Sora was the most expensive side quest.</p>

          <p>
            On March 24, 2026, OpenAI shut it down. Disney executives learned less than an hour
            before the public announcement. The $1 billion deal collapsed. No money ever changed
            hands.
          </p>

          <h3>The AI Engineer&apos;s Take on Sora</h3>

          <p>
            <strong>Inference cost is the ultimate product filter.</strong> If the per-request
            compute cost exceeds what users will pay, the product is dead regardless of how
            technically impressive the demo is. No subscription tier fixes a $1.30 variable cost on
            a product people will pay $20 a month for.
          </p>

          <p>
            <strong>GPU allocation is a zero-sum game.</strong> Every H100 running a Sora clip is an
            H100 not running a Codex session or a ChatGPT Enterprise query from a Fortune 500 company
            paying $60 per user per month. The kitchen only has so many burners.
          </p>

          <p>
            <strong>The impressive demo moat has evaporated.</strong> Open-Sora 2.0 achieved
            near-parity with Sora&apos;s output quality for approximately $200,000 in training costs.
            If your competitive advantage only exists while you&apos;re ahead of the open-source
            replication timeline, you don&apos;t have a moat. You have a head start.
          </p>

          <p>
            <strong>Video generation has fundamentally different economics than text.</strong>{' '}
            Generating text costs fractions of a cent. A 10-second video clip costs $1.30. Flat
            subscription models that work for text break down completely when applied to video.
          </p>

          <hr />

          <h2>Razorpay x OpenAI: The &ldquo;Boring&rdquo; Thing That Actually Matters</h2>

          <h3>What Actually Happened</h3>

          <p>
            On April 6, 2026  -  twelve days after Sora went dark  -  Razorpay partnered with OpenAI to
            integrate payments directly into Codex, OpenAI&apos;s AI-powered coding platform used by
            over one million developers every week.
          </p>

          <p>
            You open Codex and type: &ldquo;Build me an AI fitness coaching app that charges users
            ₹499 per month via Razorpay.&rdquo; Codex builds the entire application. And now, with
            this integration, it also wires up the payment gateway, sets up checkout flows, and
            configures transaction processing. From idea to working product with live payments, in
            under five minutes.
          </p>

          <p>
            For context: doing this manually used to take{' '}
            <strong>6 to 14 weeks</strong>. Now: one prompt.
          </p>

          <h3>MCP: The Universal Power Adapter for AI</h3>

          <p>
            MCP stands for Model Context Protocol. Think of it as a universal power adapter for AI
             -  the kind you take on international trips to plug any device into any outlet anywhere.
            Before MCP, connecting an AI system to an external service required writing custom
            integration code every single time. MCP standardizes all of that. One protocol, any
            service.
          </p>

          <p>
            Razorpay&apos;s MCP Server provides{' '}
            <strong>35 specialized tools</strong> covering payments, orders, refunds, settlements,
            QR codes, and payment links. It&apos;s open-source on GitHub under an MIT license, works
            with Claude Desktop, Cursor, VS Code, and Codex, and is the first self-serve payment MCP
            server in India.
          </p>

          <h3>The Three-Phase Strategy</h3>

          <p>The Codex integration is the third phase of a deliberate progression:</p>

          <p>
            <strong>Phase 1, October 2025: AI Discovers.</strong> Razorpay, NPCI, and OpenAI
            launched a pilot where ChatGPT users in India could find products and purchase them using
            UPI. Discovery plus facilitation.
          </p>

          <p>
            <strong>Phase 2, February 2026: AI Executes.</strong> Razorpay launched Agentic Payments
            on Claude. Users could order from Zomato, Swiggy, and Zepto entirely within a chat
            interface. UPI Reserve Pay let the AI transact within a pre-authorized limit without
            requiring your PIN each time. Full execution, not just facilitation.
          </p>

          <p>
            <strong>Phase 3, April 2026: AI Builds AND Earns.</strong> The Codex integration. The AI
            doesn&apos;t help you buy things or execute your purchases. It builds the entire
            revenue-generating product for you, payments infrastructure included.
          </p>

          <p>The arc: AI discovering → AI executing → AI creating businesses.</p>

          {/* Razorpay infographic */}
          <figure className="my-8">
            <Image
              src="/images/blog/openai-grew-up/infographic-razorpay.png"
              alt="The Prompt-to-Payment Pipeline: How AI Is Collapsing the Startup Timeline  -  2023 traditional build (6-14 weeks) vs 2026 AI pipeline (under 5 minutes), three-phase strategy, and India's structural lead."
              width={1200}
              height={630}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              The collapse from six-week builds to five-minute prompts  -  and the three-phase
              progression from October 2025 to April 2026. Generated via NotebookLM.
            </figcaption>
          </figure>

          <h3>Why India Is Ahead of the West on This</h3>

          <p>
            India processes over <strong>20 billion UPI transactions monthly</strong>  -  the
            world&apos;s largest real-time payment network, built on open infrastructure, with NPCI
            actively collaborating with AI platforms rather than treating them as threats.
          </p>

          <p>
            UPI Reserve Pay provides a regulatory framework for AI-initiated transactions that
            doesn&apos;t exist in the United States yet. India&apos;s UPI-first, MCP-enabled,
            NPCI-backed ecosystem was, somewhat accidentally, built for agentic commerce. The West
            will get there. India is already there.
          </p>

          <h3>The AI Engineer&apos;s Take on Razorpay x OpenAI</h3>

          <p>
            <strong>MCP fluency is becoming as important as REST API knowledge was five years ago.</strong>{' '}
            If you&apos;re building AI systems today and MCP isn&apos;t in your working vocabulary,
            you&apos;re accumulating technical debt.
          </p>

          <p>
            <strong>The prompt-to-payment pipeline changes who can build companies.</strong> The
            barrier to launching a revenue-generating product used to be measured in weeks and
            thousands of dollars. That barrier is now measured in minutes and the ability to clearly
            describe what you want to build.
          </p>

          <p>
            <strong>Agentic payments are where the commercial opportunity concentrates.</strong> An
            AI that recommends products is a feature. An AI that buys them, within pre-authorized
            parameters, on your behalf is infrastructure. Infrastructure gets paid for every time
            it&apos;s used.
          </p>

          <p>
            <strong>Razorpay&apos;s MCP server is a positioning move, not just a product launch.</strong>{' '}
            They&apos;re attempting to become the default payment layer for the agentic era. Getting
            there first, while the standards are still forming, is the entire game.
          </p>

          <hr />

          <h2>The Thread That Connects Everything</h2>

          <p>
            <strong>Compute is the literal bridge between them.</strong> The GPUs running Sora clips
            on March 23 were physically reallocated to Codex and enterprise tools after the shutdown
            on March 24. This is not metaphorical. The compute headroom freed by killing Sora gives
            Codex room to scale into demand that was already surging: India&apos;s Codex usage had
            grown 4x in February alone.
          </p>

          <p>
            <strong>Anthropic forced both decisions.</strong> Claude Code&apos;s enterprise dominance
            caused OpenAI to kill Sora (defensive: free the compute, stop the bleeding) and
            aggressively pursue Codex partnerships like Razorpay (offensive: win back enterprise
            developers). Neither event makes strategic sense without understanding that
            Anthropic&apos;s numbers changed OpenAI&apos;s internal calculus in early March 2026.
          </p>

          <p>
            <strong>The money follows the boring stuff.</strong> Sora was flashy. It had a Disney
            deal. It generated billions of social media impressions. It is dead. Razorpay&apos;s MCP
            integration was announced with a press release that most tech journalists didn&apos;t
            cover. It is the future.
          </p>

          <p>
            <strong>Build rails, not roller coasters.</strong> Sora was a roller coaster: thrilling,
            expensive, built for the experience, and the experience ends when the ride stops.
            Razorpay&apos;s MCP server is a rail: quiet, foundational infrastructure that everything
            else runs on top of. Roller coasters make money for one season. Rails compound.
          </p>

          <hr />

          <h2>What This Means for Builders</h2>

          <p>
            <strong>If you&apos;re a solo developer or early-stage founder in India:</strong> The
            cost of building and monetizing a product just fell to near-zero. Codex plus Razorpay MCP
            equals idea to revenue in one sitting. The next Y Combinator batch will include startups
            that were built in an afternoon.
          </p>

          <p>
            <strong>If you&apos;re an AI engineer:</strong> MCP is not optional in 2026.
            Razorpay&apos;s server is open-source on GitHub. The learning curve is hours, not weeks.
            Start before every job description lists it as a requirement.
          </p>

          <p>
            <strong>If you&apos;re watching the AI industry from the outside:</strong> Stop tracking
            which model generates the best images. Track who controls the infrastructure layer:
            payments, code generation, agent orchestration. The model is becoming a commodity. The
            rails are the moat.
          </p>

          <p>
            <strong>If you&apos;re in India:</strong> For once, the infrastructure that matters got
            built here first. India isn&apos;t following the West on this. We&apos;re ahead of it.
          </p>

          <hr />

          <p>
            The AI industry&apos;s most expensive lesson in 2026: a billion-dollar Disney deal is
            worth less than a five-minute payment integration. Build the rails.
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
