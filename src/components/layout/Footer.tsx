import { Github, Linkedin } from 'lucide-react'
import { Sparkle } from '@/components/ui/Doodles'

// TODO(you): what you're up to lately
const now = [
  'currently: building agents that don’t hallucinate',
  'reading: eval papers, slowly',
  'coffee count today: 3',
  'based in Hyderabad, 31°C and humid',
  'shipping: this very website',
  'next: learning Rust, again',
]

export function Footer() {
  return (
    <footer className="relative px-6 md:px-20 pt-16 pb-10">
      {/* handwritten "currently" ticker, loops via the shared marquee styles */}
      <div className="marquee mx-auto max-w-6xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]" aria-label="What I'm up to">
        <div className="marquee-track font-hand text-lg text-[var(--secondary)]" style={{ '--marquee-duration': '45s' } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {now.map((line) => (
                <li key={line} className="flex items-center whitespace-nowrap px-6">
                  <Sparkle className="mr-3 w-3.5 text-[var(--accent)]" />
                  {line}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <p aria-hidden="true" className="mt-10 text-center font-hand text-5xl md:text-6xl text-[var(--accent)] -rotate-3 select-none">
        Shashank ✳
      </p>

      <div className="mx-auto mt-10 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-dashed border-[var(--border)] pt-8">
        <p className="flex items-center gap-2 font-hand text-lg text-[var(--secondary)]">
          <Sparkle className="w-4 text-[var(--accent)]" />
          made with coffee and chai in Hyderabad · © {new Date().getFullYear()} Shashank Anchuri
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/saishashank-a"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-[var(--secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/sai-shashank-anchuri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-[var(--secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
