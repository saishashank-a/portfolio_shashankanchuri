import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AudioPlayer } from './AudioPlayer'
import { ShareBar } from './ShareBar'

export const metadata: Metadata = {
  title: 'The Money Is Going in a Circle | Shashank Anchuri',
  description:
    "A trillion-dollar valuation and a fourteen-billion-dollar loss describe the same company. Follow the dollars through AI's capital frenzy: the circular financing loop, the bull and bear cases, and what an AI engineer should build for if the circle breaks.",
  openGraph: {
    title: 'The Money Is Going in a Circle',
    description:
      "What AI's capital frenzy actually looks like once you follow the dollars, why it looks different from inside the stack, and what happens if the circle breaks.",
    images: [{ url: '/images/blog/the-money-is-going-in-a-circle/money-loop.png' }],
  },
}

function EngineerTake({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 border-l-2 border-[var(--accent)] bg-[var(--surface)] rounded-r-sm pl-5 pr-4 py-4">
      <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider mb-3">
        AI Engineer&apos;s Take
      </p>
      {children}
    </div>
  )
}

export default function MoneyCirclePost() {
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
        <p className="font-mono text-xs text-[var(--accent)] mb-3">Jun 2026 · AI Infrastructure</p>
        <h1 className="text-3xl font-bold text-[var(--fg)] leading-tight mb-4">
          The Money Is Going in a Circle
        </h1>
        <p className="text-[var(--secondary)] leading-relaxed mb-6 italic">
          What AI&apos;s capital frenzy actually looks like once you follow the dollars, why it looks
          different from inside the stack, and what happens if the circle breaks.
        </p>

        {/* Podcast player */}
        <AudioPlayer src="https://xjpzs8c0ln0qbf81.public.blob.vercel-storage.com/the-money-is-going-in-a-circle-podcast.m4a" />

        {/* Article body */}
        <div className="prose-blog">
          <p>
            A trillion-dollar valuation and a fourteen-billion-dollar annual loss are describing the
            same company in the same year. OpenAI is on track to lose roughly $14 billion in 2026,
            close to triple its 2025 losses, even as it projects $100 billion in revenue by 2029. Both
            numbers are real. The question worth asking is not how one company survives that gap. It is
            how an entire industry decided the gap was worth funding at a scale the world has never
            seen, and whether the ground underneath that decision is solid.
          </p>

          <p>
            I build on this infrastructure for a living, so this is not an investor&apos;s curiosity
            for me. It is the floor I stand on. Here is what it looks like once you stop reading the
            headlines and start following the dollars.
          </p>

          {/* Hero infographic */}
          <figure className="my-8">
            <Image
              src="/images/blog/the-money-is-going-in-a-circle/money-loop.png"
              alt="The AI Money Loop — sketch-style infographic showing the circular flow between a chip maker (Nvidia), an AI lab (OpenAI), and cloud providers (Oracle / Microsoft), with over $800 billion in circular commitments at the center and a breakdown of long-term infrastructure obligations."
              width={1200}
              height={628}
              className="rounded-sm w-full h-auto"
              priority
            />
            <figcaption>
              The loop in one visual — chip maker funds lab, lab buys chips, cloud providers complete
              the circle. Generated via NotebookLM.
            </figcaption>
          </figure>

          <hr />

          <h2>The surface</h2>

          <p>
            Start with the headline figures, because they are staggering. SpaceX went public in June
            in one of the largest IPOs in history, targeting a raise near $75 billion at a valuation
            around $1.75 trillion. Anthropic closed a round at a $965 billion valuation and has
            confidentially filed for its own IPO. Microsoft now expects 2026 capital expenditure to
            reach about $190 billion. These are not growth-stage bets. They are the kind of capital
            commitments that used to belong to energy companies and national governments.
          </p>

          <p>
            But the scale is the easy part of the story. The interesting part is not how big the
            numbers are. It is how the money moves.
          </p>

          <hr />

          <h2>The loop</h2>

          <p>
            Trace the dollars and they do not run in a straight line from investors to companies to
            products. They circle a small group of firms that keep showing up on multiple sides of the
            same deals.
          </p>

          <pre className="text-xs sm:text-sm font-mono bg-[var(--surface)] border border-[var(--border)] rounded-sm p-4 overflow-x-auto leading-relaxed">
{`   Chip maker  ----invests in---->  AI lab
       ^                              |
       |                              | commits $$ to
   buys GPUs                          v
       |                         Cloud provider
       +-------------------------------+`}
          </pre>

          <p>
            Nvidia takes equity in an AI lab. The lab uses that money, plus its compute deals, to buy
            GPUs, most of them from Nvidia. Nvidia&apos;s revenue rises (its most recent quarter came
            in around $81.6 billion, up roughly 85 percent year on year), and it recycles the proceeds
            into equity in more AI companies, who buy more GPUs. The same loop runs through the
            hyperscalers: Microsoft owns roughly a quarter of OpenAI, and OpenAI has committed about
            $250 billion right back to Azure.
          </p>

          <p>
            The commitments are where it gets dizzying. OpenAI has reportedly lined up around $1.15
            trillion in infrastructure obligations across seven vendors between 2025 and 2035:
            Broadcom near $350 billion, Oracle $300 billion, Microsoft $250 billion, Nvidia $100
            billion, AMD $90 billion, AWS $38 billion, and CoreWeave $22 billion. Nvidia&apos;s own
            letter of intent to invest up to $100 billion in OpenAI is tied to deploying at least ten
            gigawatts of its systems. Analysts now put the total of these circular arrangements north
            of $800 billion.
          </p>

          {/* Commitments infographic */}
          <figure className="my-8">
            <Image
              src="/images/blog/the-money-is-going-in-a-circle/commitments.png"
              alt="The $1.15 Trillion AI Capital Loop — sketch-style bar chart of OpenAI's infrastructure commitments from 2025 to 2035: Broadcom $350B, Oracle $300B, Microsoft $250B, Nvidia $100B, AMD $90B, AWS $38B, CoreWeave $22B, alongside a circular-capital-ecosystem diagram and an $800B circular-arrangements estimate."
              width={1300}
              height={720}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              OpenAI&apos;s reported $1.15 trillion in infrastructure obligations, by vendor. Figures
              from 2026 reporting; treat as moving targets. Generated via NotebookLM.
            </figcaption>
          </figure>

          <hr />

          <h2>The bull case</h2>

          <p>
            It would be lazy to call this a scam, so steelman it first. Building frontier AI is
            extraordinarily expensive, and the best chips are still scarce. In that kind of market, you
            do not just place an order and wait. You lock in supply by pairing long-term buying
            commitments with financing. Janus Henderson described the wave of deals as a virtuous
            circle that lines up suppliers, builders, and customers to meet exploding demand for
            compute. By baking spending into investment deals, the players bypass slower fundraising
            and pull the physical buildout forward by years. If demand is real, this is just efficient
            capital allocation under scarcity.
          </p>

          <hr />

          <h2>The bear case</h2>

          <p>
            The problem is what happens to incentives when a vendor funds its own customer. The
            pressure shifts toward booking the deal rather than testing whether anyone downstream
            actually needs the capacity. Each leg of the loop can record revenue or backlog from the
            same underlying dollar, which means demand can look larger than it is. The echoes of
            dot-com vendor financing are hard to miss.
          </p>

          <p>
            You can see the fragility under stress. When reporting earlier this year suggested
            Nvidia&apos;s OpenAI investment had stalled, investors immediately connected the dots:
            Oracle was borrowing tens of billions to build servers largely for OpenAI, so if Nvidia
            pulled back, could OpenAI still pay Oracle? Oracle&apos;s stock fell before the company
            issued a defensive statement. The circle is only as strong as the weakest balance sheet in
            it.
          </p>

          <hr />

          <h2>Are the returns real</h2>

          <p>
            Here is the signal I would watch. Microsoft spent about $97 billion over four quarters
            while its AI services generated roughly $37 billion in annual recurring revenue. That gap
            is not damning on its own, but it keeps the return-on-investment question open. The IMF
            flagged AI investment reassessment as a downside risk in its spring outlook, and investors
            are starting to do something sensible: separating revenue earned from third parties from
            revenue paid by companies the supplier just invested in.
          </p>

          <hr />

          <h2>An AI engineer&apos;s take</h2>

          <p>
            Now the part most coverage skips, because most coverage is written by people who do not
            ship on this stack.
          </p>

          <p>
            Every API call you make is priced inside this structure. When you budget a feature at a few
            dollars per million tokens, you are not paying the true cost of running that model. You are
            paying a number that capital is currently holding down. Frontier inference at today&apos;s
            prices is subsidized, directly through investment dollars and indirectly through providers
            racing for market share before the music slows. That is great while it lasts. It also means
            your unit economics are sitting on someone else&apos;s balance sheet, and you did not sign
            that loan.
          </p>

          <p>
            So a few things that read as paranoia in a planning meeting are actually just engineering
            hygiene now.
          </p>

          <p>
            <strong>Treat the model provider as a dependency, not a foundation.</strong> The moment
            your product assumes one vendor&apos;s pricing, latency, and availability are permanent,
            you have coupled your survival to their funding round. Put an abstraction layer between
            your application and whatever model answers the call. Make the provider a config value, not
            an architectural assumption. I would rather eat a small abstraction tax today than rewrite
            my serving path the week a price sheet doubles.
          </p>

          <p>
            <strong>Watch availability, not just price.</strong> We already got a preview of what gated
            compute feels like. When frontier models get pulled, throttled, or restricted to approved
            partners, the bottleneck is no longer your code, it is who is allowed to run what. If your
            roadmap depends on a specific top-tier model being reachable on demand, that is a single
            point of failure dressed up as a feature.
          </p>

          <p>
            <strong>Efficiency is leverage, and it is about to matter more, not less.</strong>{' '}
            Quantization, distillation, smaller fine-tuned models, smarter routing, caching: these used
            to be optimizations you reached for when the bill got scary. In a world where the subsidy
            on frontier inference could thin out, the team that can hit acceptable quality on cheaper
            compute is the team that keeps its margins when everyone else&apos;s costs reset. The boring
            inference work is the hedge.
          </p>

          <EngineerTake>
            <p>
              The uncomfortable summary: the capital frenzy is quietly underwriting your demo. Build as
              if it will not always.
            </p>
          </EngineerTake>

          <hr />

          <h2>What happens if the loop breaks</h2>

          <p>
            &ldquo;Breaking&rdquo; is not one event, it is two very different ones.
          </p>

          <p>
            <strong>The sharp version is a credit event.</strong> One major leg pulls financing, or one
            large lab cannot meet a payment on those trillion-dollar commitments. Because the same
            dollar sits on multiple balance sheets, the failure does not stay contained. A funding
            pullback at the lab becomes a revenue hole at the cloud provider, which becomes a demand
            shock for the chip maker, which becomes a stock move that drags index funds most people did
            not know were this exposed. The dot-com vendor-financing collapse is the closest historical
            rhyme, and it was not gentle.
          </p>

          <p>
            <strong>The slow version is quieter and, in my view, likelier.</strong> Demand keeps
            growing, just not fast enough to justify the spend. The return-on-investment gap refuses to
            close. Capital does not flee, it tightens: fewer mega-rounds, harder questions about real
            third-party revenue, valuation compression rather than collapse. The buildout slows from a
            sprint to a walk.
          </p>

          <p>Either way, here is what it would mean for the rest of us.</p>

          <p>
            <strong>Compute could get cheaper, eventually.</strong> This is the counterintuitive part.
            After the dot-com bust, the over-built fiber did not vanish. It got bought for cents on the
            dollar and powered the next decade of the internet, including the streaming and cloud era
            that made the original bet look smart in hindsight. A glut of data centers and depreciating
            GPUs would be painful for the people who financed them and a gift to the builders who come
            after. Cheap, abundant compute is how a bubble&apos;s wreckage becomes a platform.
          </p>

          <p>
            <strong>Prices could spike before they fall.</strong> In the short window where subsidies
            thin out but cheap surplus capacity has not hit the market yet, token prices could rise.
            That is the squeeze the efficiency work above is meant to survive.
          </p>

          <p>
            <strong>Consolidation.</strong> Fewer independent frontier labs, more of them absorbed into
            the companies that own the compute and the capital. We have already watched that begin. The
            result is a more concentrated set of model providers, which is exactly why swappability
            stops being a nice-to-have.
          </p>

          <p>
            <strong>Open weights get more important.</strong> When frontier access is expensive,
            restricted, or unreliable, the gravity shifts toward open-weight models you can run
            yourself. A broken loop accelerates that shift, and it rewards the people who already know
            how to serve a model rather than just call one.
          </p>

          <p>
            <strong>The job market splits.</strong> The froth-funded layer, roles that exist because
            money was cheap, thins out first. The durable layer, people who build real products that
            real users pay for on top of this infrastructure, gets more valuable, because the question
            quietly changes from &ldquo;who can raise&rdquo; to &ldquo;who can ship something worth
            paying for.&rdquo;
          </p>

          <EngineerTake>
            <p>
              And the most important point: the capability is real even if the capital structure is
              fragile. The models work. The productivity is not imaginary. What is uncertain is the
              financing scaffolding wrapped around them, not the technology underneath. If the loop
              breaks, AI does not disappear. The way we paid for its first few years does.
            </p>
          </EngineerTake>

          {/* Mindmap */}
          <figure className="my-8">
            <Image
              src="/images/blog/the-money-is-going-in-a-circle/mindmap.png"
              alt="The Great AI Capital Circle mindmap — branches covering Staggering Capital Scale, The Circular Loop, The Bull Case, The Bear Case, Measuring Real Returns, and Strategic Implications for Builders."
              width={1100}
              height={2000}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              The whole argument decomposed — scale, the loop, bull and bear cases, real returns, and
              what builders should do about it. Generated via NotebookLM.
            </figcaption>
          </figure>

          <hr />

          <h2>The close</h2>

          <p>
            The money is moving in a circle. Whether that circle is a flywheel or a centrifuge is the
            most important open question in the industry, and you do not need a hedge fund to watch the
            dials.
          </p>

          <p>So three habits worth keeping.</p>

          <p>
            Read the infrastructure providers&apos; balance sheets, not just the model release notes.
            Treat every single provider as swappable, and architect so you can move. And when a new
            mega-deal gets announced, look for the gap between the backlog number and recognized
            third-party revenue, because that gap is the whole story.
          </p>

          <p>
            Build like the capability is permanent and the prices are not. That is the posture that
            survives either ending.
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
