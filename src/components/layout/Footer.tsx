import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--very-muted)]">
          © {new Date().getFullYear()} Shashank Anchuri. Built with Next.js.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/saishashank-a"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-[var(--very-muted)] hover:text-[var(--secondary)] transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/sai-shashank-anchuri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-[var(--very-muted)] hover:text-[var(--secondary)] transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <Link
            href="/blog"
            className="text-xs text-[var(--very-muted)] hover:text-[var(--secondary)] transition-colors"
          >
            Blog
          </Link>
        </div>
      </div>
    </footer>
  )
}
