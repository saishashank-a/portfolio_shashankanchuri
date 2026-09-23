'use client'

import Link from 'next/link'
import { Face } from '@/components/ui/Doodles'

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

// Tiny doodle + handwritten hint that pop up over each link on hover
const links = [
  { label: 'about', href: '/#about', hint: 'hi, it’s me', icon: <g {...stroke}><circle cx="16" cy="16" r="12" /><circle cx="12" cy="13" r="1.3" fill="currentColor" /><circle cx="20" cy="13" r="1.3" fill="currentColor" /><path d="M11 19 Q16 24 21 19" /></g> },
  { label: 'work', href: '/#work', hint: 'the good stuff', icon: <g {...stroke}><rect x="5" y="8" width="22" height="15" rx="2" /><path d="M2 26 H30 M13 16 l-3 -2 3 -2 M19 12 l3 2 -3 2" /></g> },
  { label: 'blog', href: '/blog', hint: 'thinking out loud', icon: <g {...stroke}><path d="M6 26 L8 19 L22 5 L27 10 L13 24 Z M19 8 L24 13" /><path d="M6 26 L10 25" /></g> },
  { label: 'debrief', href: '/debrief', hint: 'fresh every morning', icon: <g {...stroke}><circle cx="16" cy="18" r="6" /><path d="M16 6 V9 M6 18 H9 M23 18 H26 M9 11 l2 2 M23 11 l-2 2 M4 27 H28" /></g> },
  { label: 'connect', href: '/#connect', hint: 'say hello!', icon: <g {...stroke}><path d="M3 15 L29 5 L20 28 L15 19 Z M15 19 L29 5" /></g> },
]

// Handwritten site nav (every page); hover draws a scribble underline and pops a doodle
export function Navbar() {
  return (
    <header className="relative z-30 pt-12 pb-4">
      <nav aria-label="Main" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 sm:gap-x-6 md:gap-x-10 font-hand text-base sm:text-lg md:text-xl text-[var(--fg)]">
        {/* logo: doodle portrait; winks on hover */}
        <Link href="/" aria-label="Home" className="group/face relative h-10 w-10 text-[var(--accent)] transition-transform duration-300 hover:-rotate-6 hover:scale-110">
          <Face className="absolute inset-0 h-full w-full transition-opacity group-hover/face:opacity-0" />
          <Face wink className="absolute inset-0 h-full w-full opacity-0 transition-opacity group-hover/face:opacity-100" />
        </Link>
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="group relative px-1">
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 -top-9 h-8 w-8 -translate-x-1/2 text-[var(--accent)] opacity-0 translate-y-2 scale-75 -rotate-12 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:rotate-0"
            >
              {l.icon}
            </svg>
            {l.label}
            <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-2 w-full text-[var(--accent)]" aria-hidden="true">
              <path
                d="M2 8 Q25 2 50 7 T98 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
                className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-300 group-hover:[stroke-dashoffset:0]"
              />
            </svg>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs text-[var(--secondary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              {l.hint}
            </span>
          </Link>
        ))}
      </nav>
    </header>
  )
}
