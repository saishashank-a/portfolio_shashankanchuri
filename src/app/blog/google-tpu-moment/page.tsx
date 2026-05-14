import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AudioPlayer } from './AudioPlayer'
import { ShareBar } from './ShareBar'

export const metadata: Metadata = {
  title: 'The TPU Moment: A Supply Chain Story as a Silicon Story | Shashank Anchuri',
  description:
    "Anthropic reserved a million TPUs. Meta is testing them. Google's Ironwood chip closed the gap with Nvidia — but the real story is supply chain optionality at hyperscale. An engineer's read on the TPU rise.",
  openGraph: {
    title: 'The TPU Moment: A Supply Chain Story as a Silicon Story',
    description:
      "Anthropic reserved a million TPUs. Meta is testing them. Why Google's TPU isn't winning on benchmarks — it's winning on supply chain.",
    images: [{ url: '/images/blog/google-tpu-moment/mindmap.png' }],
  },
}

export default function GoogleTpuMomentPost() {
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
          The TPU Moment: A Supply Chain Story as a Silicon Story
        </h1>

        {/* Podcast player */}
        <AudioPlayer src="https://xjpzs8c0ln0qbf81.public.blob.vercel-storage.com/google-tpu-moment-podcast.m4a" />

        {/* Article body */}
        <div className="prose-blog">
          <p>
            On November 24, 2025, The Information published a report that Meta was in talks to deploy
            Google&apos;s TPUs at scale. Nvidia&apos;s stock dropped roughly 3% that day. Not because
            Google&apos;s chip is faster than an H100, not because CUDA is suddenly irrelevant, but
            because for the first time, a company with Nvidia&apos;s largest single customer on the
            hook was looking &ndash; seriously, not hypothetically &ndash; at running a billion-dollar
            training workload somewhere else.
          </p>

          <p>That&apos;s the signal. Not the benchmark. The signal.</p>

          <hr />

          <h2>My thesis</h2>

          <p>
            I&apos;m going to say something that sounds counterintuitive: TPUs are not winning
            because they beat Nvidia at the chip level. They&apos;re winning because the AI industry
            is no longer willing to bet a generation of model development on a single-vendor supply
            chain, and Google is the only company with the silicon, the cloud capacity, and a
            co-design partner capable of delivering an alternative at hyperscale.
          </p>

          <p>The TPU story is a supply chain story as a silicon story.</p>

          <p>
            Everything else &ndash; the Ironwood specs, the JAX compiler, the systolic array
            architecture &ndash; flows from that. Understanding why Anthropic reserved a million TPUs,
            and why Meta is quietly testing them, requires understanding procurement logic before it
            requires understanding chip architecture.
          </p>

          <p>Let&apos;s start with the deals.</p>

          {/* Mind map overview */}
          <figure className="my-8">
            <Image
              src="/images/blog/google-tpu-moment/mindmap.png"
              alt="Mind map of The TPU Moment: major deals (Anthropic, Meta, Broadcom partnership), technical architecture (chip design, pod-level performance, hardware generations), software ecosystem (frameworks, engineering workflow), and strategic advantages (supply chain optionality, lower TCO, scaling reliability, inference cost-optimization)."
              width={1200}
              height={1800}
              className="rounded-sm w-full h-auto"
              priority
            />
            <figcaption>
              The full landscape: deals, architecture, software, strategic advantages. Generated via
              NotebookLM.
            </figcaption>
          </figure>

          <hr />

          <h2>The deal landscape</h2>

          <h3>What&apos;s confirmed</h3>

          <p>
            The first major anchor is the Anthropic&ndash;Google compute agreement, signed October
            23, 2025. The headline number is up to one million TPUs. Per SemiAnalysis&apos;s
            breakdown, that splits into two tranches: approximately 400,000 Ironwood units purchased
            directly via Broadcom &ndash; roughly $10 billion &ndash; deployed in Anthropic&apos;s
            own facilities; plus 600,000 units accessed through Google Cloud at an estimated $42
            billion. Total capacity committed for 2026: greater than one gigawatt.
          </p>

          <p>
            On April 24, 2026, Google announced a $40 billion investment in Anthropic at a $350
            billion post-money valuation &ndash; one of the largest venture investments on record.
            Embedded in that deal is an additional five gigawatts of TPU compute over five years,
            layered on top of the October agreement. Add in Anthropic&apos;s separate AWS Trainium
            reservation, also five gigawatts, and you get to a number that stops sounding like a chip
            procurement and starts sounding like utility infrastructure planning: ten gigawatts of
            reserved frontier compute, split across two hyperscalers.
          </p>

          <p>
            Meta&apos;s deal is structurally different but strategically just as important. On
            February 26, 2026, Meta signed a multi-billion-dollar TPU rental agreement with Google
            for 2026 workloads, with intent to purchase directly in 2027. The size of that eventual
            direct purchase isn&apos;t confirmed &ndash; industry consensus, based on an AceCamp
            expert interview, places it at 500,000 to 800,000 chips. I&apos;ll flag that as
            speculative: it&apos;s directionally credible but not a committed number.
          </p>

          <p>In April 2026, at Google Cloud Next, Ironwood (TPU v7) reached general availability.</p>

          <h3>The silicon supply chain underneath</h3>

          <p>
            The manufacturer behind the Ironwood chip &ndash; and the upcoming 8th-generation TPU
            &ndash; is Broadcom. Not as a contract chipmaker in the traditional sense: Broadcom
            co-designed the silicon, runs the high-speed networking layer, and is under a contract
            worth approximately $46 billion running through 2031. That&apos;s not a supplier
            relationship. That&apos;s a strategic partnership with a six-year horizon baked in.
          </p>

          <p>
            The 8th-generation roadmap, previewed but not committed, splits into two chips: TPU 8t
            Sunfish, a training-optimized part co-designed by Broadcom; and TPU 8i Zebrafish, an
            inference-optimized part designed by MediaTek. Both are targeting TSMC&apos;s
            2-nanometer process, with a target window of late 2027. This bifurcation &ndash;
            separate training and inference silicon &ndash; is new for the TPU line, and I&apos;ll
            explain why it matters when we get to the engineering section.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> When you see chip procurement at the gigawatt
            level and six-year co-design contracts, you&apos;re not reading a chip story anymore.
            You&apos;re reading an infrastructure story. The relevant comparison isn&apos;t TPU vs.
            H100 per FLOP. It&apos;s whether you can get a hundred thousand chips delivered on a
            roadmap. Right now, the honest answer for Nvidia is: sometimes. For Google, at the scale
            of a frontier lab, it&apos;s becoming: usually.
          </p>

          <hr />

          <h2>What is a TPU, actually</h2>

          <p>
            Before we get into the engineering depths, let me give you the version that makes the
            architecture click intuitively.
          </p>

          <p>
            A CPU is one very talented chef who can cook anything on any menu. Complex dishes,
            improvised specials, six different orders at once &ndash; but it&apos;s one chef, and
            there&apos;s a ceiling on throughput. A GPU is a thousand line cooks working in parallel.
            Great for high-volume repetitive work, but you still need to coordinate them and the
            kitchen is built for flexibility.
          </p>

          <p>
            A TPU is a factory assembly line built to produce one product at enormous scale. Matrix
            multiplications. That&apos;s it. The station is fixed, the tooling is fixed, the
            throughput is extraordinary, and you would absolutely not order a bespoke omelette from
            it.
          </p>

          <p>
            This turns out to matter enormously: a transformer model is, mechanically, a deep stack
            of matrix multiplications. Attention is a series of matrix products. The feed-forward
            layers are matrix products. The embeddings are matrix lookups and projections. When you
            strip away the mathematical abstraction, what you&apos;re running is a very expensive
            sequence of multiply-and-add operations on large rectangular arrays of numbers.
          </p>

          <p>TPUs are built to make exactly that pattern fast and cheap.</p>

          <p>
            The hardware mechanism that enables this is called a systolic array. Imagine data flowing
            through a grid of processing cells in a coordinated wave &ndash; each cell multiplies two
            numbers, adds the result to a running sum, and passes it to the next cell. No memory bus
            thrash. No waiting for data to arrive. The rhythm is set at design time, and then it just
            runs. The MXU (Matrix Multiply Unit) inside a TPU operates as a systolic array, and at
            the hardware level its tile size is 128&times;8. That alignment detail matters
            practically &ndash; we&apos;ll get to it in the engineering section.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> The useful mental model isn&apos;t &ldquo;TPU
            vs. GPU.&rdquo; It&apos;s specialized hardware that wins when your workload matches the
            specialization. If your workload is a transformer &ndash; and in 2026, most production ML
            workloads are &ndash; you are leaving efficiency on the table running on hardware
            designed to be general-purpose.
          </p>

          <hr />

          <h2>How TPUs actually work</h2>

          <h3>The Ironwood chip</h3>

          <p>
            The per-chip numbers tell a clearer story than the marketing does. Here&apos;s how the
            recent TPU generations stack up:
          </p>

          <div className="my-6 border border-[var(--border)] rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 font-mono text-xs text-[var(--secondary)] uppercase tracking-wider">Metric</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-[var(--secondary)] uppercase tracking-wider">TPU v5p</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-[var(--secondary)] uppercase tracking-wider">Trillium (v6e)</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-[var(--accent)] uppercase tracking-wider">Ironwood (v7)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[
                  ['FP8 TFLOPs', '459', '918', '4,614'],
                  ['BF16 TFLOPs', '459', '918', '2,307'],
                  ['HBM capacity', '95 GiB', '32 GiB', '192 GiB'],
                  ['HBM bandwidth', '2.77 TB/s', '1.6 TB/s', '7.4 TB/s'],
                  ['ICI bandwidth (bidir.)', '1.2 TB/s', '0.8 TB/s', '1.2 TB/s'],
                  ['TensorCores per chip', '2', '1', '2'],
                  ['SparseCores per chip', '4', '2', '4'],
                ].map(([metric, v5p, trillium, ironwood]) => (
                  <tr key={metric} className="bg-[var(--background)]">
                    <td className="px-4 py-2.5 text-[var(--fg)] font-semibold">{metric}</td>
                    <td className="px-4 py-2.5 text-[var(--secondary)] font-mono text-xs">{v5p}</td>
                    <td className="px-4 py-2.5 text-[var(--secondary)] font-mono text-xs">{trillium}</td>
                    <td className="px-4 py-2.5 text-[var(--accent)] font-mono text-xs">{ironwood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            For context: the Nvidia B200 delivers approximately 4.5 petaFLOPs FP8 per chip with 192
            GB HBM at 8 TB/s bandwidth. On a per-chip basis, Ironwood and the B200 are peers.
            That&apos;s the point &ndash; Google isn&apos;t claiming to beat Nvidia at the chip
            level. At the chip level, they&apos;ve closed the gap.
          </p>

          <figure className="my-8">
            <Image
              src="/images/blog/google-tpu-moment/tpu-generations.png"
              alt="TPU Generations: The Ironwood Leap. Per-chip specs comparing TPU v5p, Trillium (v6e), Ironwood (v7), and Nvidia B200. Ironwood delivers 10x the FP8 throughput of v5p and 4x Trillium, at roughly the same per-chip ballpark as Nvidia's B200."
              width={2000}
              height={1200}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              Ironwood closes the per-chip gap with Nvidia&apos;s B200. The story isn&apos;t the
              chip &ndash; it&apos;s what comes next.
            </figcaption>
          </figure>

          <h3>The chiplet design</h3>

          <p>
            Ironwood is a dual-chiplet design. Each chip contains two TensorCores, and each
            TensorCore bundles a Matrix Multiply Unit (MXU) with a Vector Processing Unit (VPU). The
            MXU handles the dense matrix math. The VPU handles elementwise operations &ndash;
            activations, normalization, residuals &ndash; that don&apos;t benefit from the systolic
            array.
          </p>

          <p>
            Ironwood also ships with four SparseCores per chip. SparseCores are purpose-built for
            sparse and irregular access patterns: mixture-of-experts routing, embedding lookups,
            recommendation system operations. If you&apos;re running dense-only transformers,
            SparseCores sit mostly idle. If you&apos;re running MoE architectures &ndash; which the
            frontier labs increasingly are &ndash; they start pulling weight.
          </p>

          <p>
            The 128&times;8 MXU tile size is a practical detail that bites you early in a TPU port.
            If your weight matrices don&apos;t align to multiples of 128 in the relevant dimension,
            XLA will pad them &ndash; and you&apos;ll pay for the padding in both memory and compute.
            Standard practice is to round embedding dimensions and hidden sizes to the nearest 128
            multiple before targeting TPU. This is not a bug. It&apos;s the cost of the specialized
            architecture.
          </p>

          <h3>The pod is the computer</h3>

          <p>
            Here&apos;s where the TPU architecture stops looking like a chip story and starts looking
            like a network architecture story.
          </p>

          <p>
            An Ironwood pod is 9,216 chips, liquid-cooled to handle approximately ten megawatts of
            power, connected via a three-dimensional torus topology using optical circuit switching
            with RDMA across chips. The total HBM addressable across a full Ironwood pod is 1.77
            petabytes. Not the memory capacity of one chip. The memory capacity of the entire pod,
            addressable as a unified resource by the compiler.
          </p>

          <figure className="my-8">
            <Image
              src="/images/blog/google-tpu-moment/pod-is-the-computer.png"
              alt="The Pod IS the Computer: how Ironwood scales from one chip (4.6 PFLOPs FP8, 192 GiB HBM) to a tray of 4 chips, to a rack of 64 chips, to a 3D torus cube, to a full 9,216-chip Superpod delivering 42.5 ExaFLOPs and 1.77 PB of HBM."
              width={2000}
              height={1100}
              className="rounded-sm w-full h-auto"
            />
            <figcaption>
              From one chip to 9,216: the pod scales as a single coherent machine. The abstraction is
              the product.
            </figcaption>
          </figure>

          <p>
            That is the argument for TPUs at scale. Not the chip. The pod. Nvidia&apos;s NVLink
            domain tops out well below that coherence boundary. When you&apos;re training a model
            with trillions of parameters, the question stops being &ldquo;how fast is one
            chip?&rdquo; and becomes &ldquo;how efficiently can I wire ten thousand chips
            together?&rdquo; TPUs win at that question.
          </p>

          <h3>Model FLOPs Utilization</h3>

          <p>
            One practical metric that matters more than peak FLOPs is MFU &ndash; Model FLOPs
            Utilization. It measures how much of the hardware&apos;s theoretical peak you actually
            use during training.
          </p>

          <p>
            GPUs, in practice, land between 30% and 50% MFU for large transformer training
            workloads. TPUs routinely hit 50% to 70%. Google Research has reported 95% scaling
            efficiency at 32,768 TPUs for specific transformer workloads &ndash; meaning near-linear
            throughput increase as chip count scales. No GPU cluster comes close to that at that
            scale.
          </p>

          <p>
            The reason is the compilation model. XLA compiles the full computation graph ahead of
            time. It knows the data flow, the communication pattern, and the memory layout before
            anything executes. That allows it to schedule collectives and eliminate gaps that an
            eager runtime can&apos;t avoid.
          </p>

          <h3>The 8th-gen split</h3>

          <p>
            The decision to bifurcate the 8th-generation TPU line into Sunfish (training) and
            Zebrafish (inference) is the most architecturally interesting signal in the roadmap.
            Training and inference have divergent requirements: training needs high-bandwidth memory,
            maximum FP8 throughput, and tight collective communication. Inference cares more about
            latency, token throughput, and the ability to handle variable-length sequences
            efficiently.
          </p>

          <p>
            Nvidia builds one chip and tunes the software stack. Google is betting that purpose-built
            silicon for each regime delivers better price/performance at scale. If they&apos;re right
            &ndash; and the emergence of inference-optimized chips from every major vendor suggests
            they are &ndash; this is where the market is heading.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> The 1.77-petabyte memory address space of an
            Ironwood pod isn&apos;t a marketing line. It&apos;s an architectural property that
            changes how you think about model sharding. On GPUs, parallelism strategy is largely a
            manual exercise &ndash; you choose tensor parallelism, pipeline parallelism, and data
            parallelism, and you implement the collectives. On TPUs, the compiler handles much of
            this automatically once you specify the sharding constraints. That&apos;s the real
            efficiency story.
          </p>

          <hr />

          <h2>Working with TPUs as an AI engineer</h2>

          <h3>The software stack</h3>

          <p>
            The compilation path looks like this: your model code, written in JAX or PyTorch, is
            lowered to StableHLO &ndash; a stable hardware-level IR that captures the computation
            graph without hardware specifics. StableHLO is then compiled by XLA (Accelerated Linear
            Algebra) into a TPU executable. XLA is the layer that knows about the physical chip,
            handles collective scheduling, and performs the memory layout optimizations.
          </p>

          <p>
            JAX is the native path. JAX was built around XLA from day one &ndash; functional
            transforms like <code>jit</code>, <code>vmap</code>, and <code>pmap</code> are thin
            wrappers that generate XLA computation graphs. When you write JAX, you&apos;re
            essentially writing in a language XLA was designed to consume.
          </p>

          <p>
            PyTorch is also supported via PyTorch/XLA, which translates PyTorch operations into XLA
            operations at runtime. The PyTorch/XLA 2.7 release introduced a Pallas-based ragged paged
            attention kernel that delivers up to 5&times; speedups on TPUs for variable-length
            sequences &ndash; which is significant for inference workloads where sequence lengths are
            unpredictable.
          </p>

          <p>
            A detail worth knowing: vLLM&apos;s TPU backend now uses JAX&rarr;XLA as the lowering
            path for all models, including PyTorch-defined ones. The reason is straightforward
            &ndash; JAX is the more mature stack for parallelism primitives on TPU. Even if your
            model is defined in PyTorch, the inference serving layer may ultimately run through JAX
            internals.
          </p>

          <h3>The compilation model is a mental shift</h3>

          <p>
            On GPU, PyTorch runs eagerly. Operations execute immediately. You can put a{' '}
            <code>print</code> statement in the middle of a forward pass and see the tensor values.
            Debugging is tactile.
          </p>

          <p>
            JAX on TPU compiles ahead of time. The first call to a JIT-compiled function traces the
            computation graph, compiles it to TPU bytecode, and caches the result. Subsequent calls
            execute the compiled artifact. Dynamic shapes break the cache and trigger recompilation.
            Variable-length sequences require padding or carefully structured bucketing. Control flow
            that depends on tensor values doesn&apos;t exist at compile time.
          </p>

          <p>
            The transition from eager PyTorch to compiled JAX is the biggest adjustment for engineers
            coming to TPUs from a GPU-first background. The payoff is that once your model compiles
            cleanly, the runtime is extremely predictable &ndash; no JIT warm-up spikes, no garbage
            collection pauses, no surprise allocation failures mid-training run.
          </p>

          <h3>JAX sharding in practice</h3>

          <p>
            Distributed training in JAX centers on device meshes and sharding constraints.
            Here&apos;s the minimal version:
          </p>

          <pre className="my-6 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-sm overflow-x-auto text-xs">
            <code>{`from jax.sharding import Mesh, PartitionSpec
from jax.experimental.shard_map import shard_map
import jax.numpy as jnp
import numpy as np

# Define a 2D device mesh: data parallelism x model parallelism
devices = np.array(jax.devices()).reshape(4, 2)  # 8 devices total
mesh = Mesh(devices, ('data', 'model'))

# Tell the compiler how a weight matrix should be sharded
from jax.sharding import NamedSharding
weight_sharding = NamedSharding(mesh, PartitionSpec('model', None))
# "shard along the 'model' axis, replicate across 'data'"

# Apply sharding constraint inside a jitted function
@jax.jit
def forward(params, x):
    w = jax.lax.with_sharding_constraint(params['w'], weight_sharding)
    return x @ w`}</code>
          </pre>

          <p>
            The compiler inspects the sharding constraints and generates the collective
            communications &ndash; all-reduces, all-gathers &ndash; automatically. You describe the
            intended layout. XLA figures out how to move the data.
          </p>

          <p>
            PyTorch&apos;s DTensor is explicitly modeled on this design. It&apos;s less mature, and
            lacks the same depth of compiler integration, but the mental model is converging. If you
            understand JAX sharding, PyTorch DTensor will feel familiar.
          </p>

          <h3>TPU vs. GPU: the practical decision framework</h3>

          <p>
            <strong>Reach for TPUs when:</strong>
          </p>
          <ul>
            <li>You&apos;re training or serving at more than 1,000 chips</li>
            <li>Your workload is dense-matmul-dominant &ndash; transformers, embeddings, large-batch matmul</li>
            <li>You&apos;re willing to invest in the JAX workflow and accept the compilation model</li>
            <li>You care about TCO and power efficiency at scale</li>
            <li>Your workloads are stable enough that compilation cost amortizes</li>
            <li>You&apos;re running large-batch inference or MoE decoding</li>
          </ul>

          <p>
            <strong>Stay on GPUs when:</strong>
          </p>
          <ul>
            <li>You&apos;re doing research with dynamic control flow, graph dependencies, or models that don&apos;t fit the static graph model</li>
            <li>You need the broadest kernel ecosystem &ndash; Flash Attention, custom CUDA, triton kernels</li>
            <li>Your team is small and eager-mode productivity is a real bottleneck</li>
            <li>You&apos;re deploying on-prem or at the edge</li>
            <li>You&apos;re building something that doesn&apos;t exist yet and need fast iteration</li>
          </ul>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> For most engineers reading this &ndash; the
            ones not training at frontier scale &ndash; PyTorch on H100 or H200 is still the right
            default. TPUs become genuinely compelling when the scale itself is the challenge. At
            10,000 chips, the compilation cost looks like a rounding error, and the MFU difference
            starts showing up in real training costs. Below that threshold, the friction is harder to
            justify. The honest position is: know JAX, understand the stack, but don&apos;t force the
            migration until the scale demands it.
          </p>

          <hr />

          <h2>Why these deals were made: the AI engineer&apos;s read</h2>

          <h3>Why Anthropic went a million deep</h3>

          <p>
            Anthropic&apos;s stated compute strategy is three-platform diversification: Google TPUs,
            AWS Trainium, and some continued Nvidia GPU access. That&apos;s not hedging. That&apos;s
            explicit supply chain architecture.
          </p>

          <p>
            The reasoning is straightforward. When you&apos;re planning a training run that will
            consume more than a gigawatt of compute for months, the risk of a single-vendor
            disruption isn&apos;t theoretical &ndash; it&apos;s a planning input. A six-month delay
            on a chip delivery at that scale doesn&apos;t cost you money. It costs you competitive
            position.
          </p>

          <p>
            The second factor is inference economics. Google has been explicit that Ironwood is
            designed for &ldquo;the age of inference&rdquo; &ndash; high-throughput, low-latency
            token generation at sustained load. James Bradbury, Anthropic&apos;s head of compute, has
            spoken to this &ndash; Ironwood&apos;s inference performance and training scalability
            were both flagged in Anthropic&apos;s announcement: as inference costs dominate the P&amp;L,
            the chip optimized for that regime wins on TCO. At the volumes Anthropic is running
            Claude, that math moves the needle.
          </p>

          <p>
            The third factor is that Google is the only vendor who can commit five gigawatts of
            dedicated compute on a multi-year timeline. That&apos;s not a sales pitch. That&apos;s a
            physical capacity constraint. The infrastructure to deliver that doesn&apos;t exist at
            most vendors in 2026.
          </p>

          <h3>Why Meta is testing TPUs</h3>

          <p>
            Meta is Nvidia&apos;s largest single customer. They were not looking at TPUs because
            Llama trains better on them. They were looking at TPUs because a credible second-source
            supply at scale is the only thing that forces a dominant supplier to compete on price.
          </p>

          <p>
            Meta already signed a $60 billion deal with AMD &ndash; another second-source signal. The
            TPU evaluation serves the same strategic function: demonstrate to Nvidia, with real
            engineering investment, that the alternative is viable. The moment the alternative is
            viable enough to run production workloads, the negotiation changes.
          </p>

          <p>
            At volumes that move Nvidia&apos;s quarterly earnings &ndash; hundreds of thousands of
            chips per year &ndash; even a 5% price reduction compounds into hundreds of millions of
            dollars in margin. The cost of the engineering investment to make TPUs work is a rounding
            error against that.
          </p>

          <h3>What Google actually wants</h3>

          <p>
            Google is not trying to dethrone Nvidia. That&apos;s a media framing, not a strategic
            goal. Google&apos;s actual target is capturing 10&ndash;15% of frontier training
            workloads and a meaningfully larger share of inference &ndash; because inference is where
            the sustained compute demand lives post-deployment.
          </p>

          <p>
            The 8th-generation architectural split &ndash; training-class Sunfish, inference-class
            Zebrafish &ndash; tells you exactly where they see the market going. They&apos;re not
            building one chip to rule everything. They&apos;re building purpose-built silicon for the
            two regimes that matter at scale.
          </p>

          <p>
            Broadcom is the underappreciated actor in this story. Co-designing the silicon, running
            the high-speed interconnect layer, and locked in through a $46 billion contract to 2031
            &ndash; Broadcom is the manufacturing and networking partner that lets Google scale
            without building a semiconductor fab. That&apos;s the partnership that makes the supply
            chain story coherent.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> The most interesting procurement decision in
            this landscape isn&apos;t Anthropic buying a million TPUs. It&apos;s Meta &ndash; the
            company that arguably benefited most from Nvidia&apos;s dominance, with the engineering
            resources to optimize any hardware &ndash; putting real engineering investment into a
            TPU evaluation. That&apos;s a signal. When the biggest buyer starts seriously qualifying
            alternatives, the market structure changes.
          </p>

          <hr />

          <h2>What this means for the broader ecosystem</h2>

          <h3>CUDA&apos;s moat is real but no longer infinite</h3>

          <p>
            CUDA has a fifteen-year head start on kernel development, tooling, and engineering
            familiarity. That doesn&apos;t disappear. What&apos;s changed is the top of the stack:
            frontier labs are porting to JAX, vLLM is consolidating on JAX&rarr;XLA for TPU
            inference, and the new capability releases from Google DeepMind are often published in
            JAX first.
          </p>

          <p>
            The moat is real at the midmarket level &ndash; teams of ten engineers, research
            workflows, fine-tuning pipelines. It&apos;s softening at the frontier, because the
            organizations with the resources to absorb the transition cost are the ones with the most
            to gain from the TCO improvement.
          </p>

          <h3>The frontier is bifurcating</h3>

          <p>
            Training-class chips and inference-class chips are diverging &ndash; not just in
            architecture, but in procurement, pricing, and deployment model. Nvidia saw this coming
            with H100/H200 for training and the Blackwell line&apos;s inference-tuned variants. AMD
            is following. Google&apos;s Sunfish/Zebrafish split is the clearest articulation of the
            bifurcation yet.
          </p>

          <p>
            For engineers, this means the question &ldquo;what chip should we run?&rdquo; is
            increasingly two questions: &ldquo;what chip should we train on?&rdquo; and &ldquo;what
            chip should we serve on?&rdquo; The answers may differ, and the cost structures
            definitely do.
          </p>

          <h3>Power is the binding constraint</h3>

          <p>
            Ten gigawatts of reserved compute is the headline that should matter most to anyone
            planning infrastructure at scale.
          </p>

          <p>
            The binding constraint in AI infrastructure is no longer chip availability &ndash; lead
            times have improved as TSMC and the packaging supply chain have expanded. The constraint
            is power. Site selection, power purchase agreements, grid interconnection timelines
            &ndash; these are the variables that determine whether a compute commitment can actually
            be delivered. The labs that move earliest on securing power capacity have a structural
            advantage that&apos;s hard to replicate.
          </p>

          <p>
            If you&apos;re an engineer at a company planning for training at scale, the conversation
            that matters most isn&apos;t with your chip vendor. It&apos;s with whoever owns your data
            center power contracts.
          </p>

          <h3>Walled gardens are softening</h3>

          <p>
            Every major hyperscaler with custom silicon is now selling it externally. AWS Trainium is
            publicly available. Google TPUs have been on Cloud for years, and Ironwood just hit
            general availability. Microsoft&apos;s Maia is in preview. The distinction between
            internal silicon and merchant silicon is blurring.
          </p>

          <p>
            This is good for the ecosystem. It means frontier hardware is available to teams that
            aren&apos;t named Google or Amazon. It means the software stacks &ndash; JAX,
            PyTorch/XLA &ndash; have external users driving quality. And it means the competition for
            inference workloads specifically will be intense, which generally moves prices in one
            direction.
          </p>

          <p>
            <strong>AI Engineer&apos;s Take:</strong> The shift to purpose-built inference silicon is
            the change that will matter most for production engineers over the next three years.
            Training runs happen once per major model version. Inference runs continuously, forever,
            at scale. The chip that&apos;s 40% cheaper per token for inference wins more than the
            chip that&apos;s 20% faster for training.
          </p>

          <hr />

          <h2>The practical call</h2>

          <p>
            For most workloads at most companies, the switch from PyTorch isn&apos;t worth it yet.
            PyTorch isn&apos;t going away &ndash; the ecosystem is too large and productive to be
            displaced quickly. The tooling, the debugging experience, the kernel library: PyTorch on
            GPU still wins for most teams most of the time. But &ldquo;most teams most of the
            time&rdquo; is a shrinking category. The scale at which TPUs become the right answer
            keeps moving down, and the software stack keeps improving.
          </p>

          <p>
            The path in is not steep. JAX&apos;s functional style is initially disorienting if
            you&apos;re coming from PyTorch, but the mental model is consistent: pure functions,
            explicit state management, ahead-of-time compilation. Once it clicks, it&apos;s elegant.
            The sharding primitives, in particular, are better designed than anything in the PyTorch
            ecosystem today.
          </p>

          <p>
            The companies training the next generation of frontier models have already made the bet.
            The infrastructure they&apos;re building on runs on JAX and XLA. That&apos;s the terrain
            that&apos;s going to produce the models the rest of the industry fine-tunes and serves.
          </p>

          <p>You want to know how that terrain works.</p>

          <p>Learn JAX.</p>

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
