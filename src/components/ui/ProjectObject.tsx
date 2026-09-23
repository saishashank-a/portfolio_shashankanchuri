'use client'

import { useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '@/data/projects'

export type ObjectKind = 'ticket' | 'tag' | 'band'

// Fake-but-stable barcode from the title so every object gets its own stripes
function Barcode({ seed, className = '' }: { seed: string; className?: string }) {
  const bars = Array.from({ length: 28 }, (_, i) => ((seed.charCodeAt(i % seed.length) * (i + 3)) % 4) + 1)
  return (
    <div aria-hidden="true" className={`flex h-8 items-stretch gap-[2px] ${className}`}>
      {bars.map((w, i) => (
        <span key={i} className="bg-current" style={{ width: w }} />
      ))}
    </div>
  )
}

// Handwritten side note that slides out on hover (or tap on touch)
function Note({ project, open }: { project: Project; open: boolean }) {
  return (
    <div
      className={`pointer-events-auto absolute left-full top-4 z-10 ml-3 w-56 rotate-2 bg-[#faf6ee] p-4 text-[#1f1d1a] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 max-md:left-4 max-md:top-full max-md:ml-0 max-md:mt-3 ${
        open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 max-md:hidden md:pointer-events-none md:group-hover:pointer-events-auto'
      }`}
    >
      <p className="font-hand text-lg leading-snug text-[#c8402f]">{project.impact ?? project.description}</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-black/50">{project.tech.slice(0, 4).join(' · ')}</p>
      <div className="mt-3 flex gap-3 text-sm">
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-[#c8402f] hover:underline">
            Live <ArrowUpRight size={14} />
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 hover:underline" aria-label={`${project.title} on GitHub`}>
            <Github size={14} /> Code
          </a>
        )}
      </div>
    </div>
  )
}

export function ProjectObject({ project, kind }: { project: Project; kind: ObjectKind }) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((v) => !v)

  if (kind === 'ticket') {
    return (
      <div className="group relative" onClick={toggle}>
        <article className="relative flex w-80 bg-[#1f1d1a] text-[#f2e3cf] ring-1 ring-[#e35342]/60 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] [clip-path:polygon(0_0,100%_0,100%_42%,97%_50%,100%_58%,100%_100%,0_100%,0_58%,3%_50%,0_42%)]">
          <div className="flex-1 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#e35342]">admit one · {project.tech[0]}</p>
            <h3 className="mt-3 font-mono text-2xl font-bold uppercase leading-tight tracking-tight">{project.title}</h3>
            <p className="mt-2 text-xs text-[#f2e3cf]/60 line-clamp-2">{project.description}</p>
          </div>
          <div className="flex w-16 flex-col items-center justify-between border-l-2 border-dashed border-[#f2e3cf]/30 py-4 text-[#e35342]">
            <span className="font-mono text-[10px] [writing-mode:vertical-rl]">No. {project.title.length * 97}</span>
            <Barcode seed={project.title} className="rotate-90 origin-center scale-75" />
          </div>
        </article>
        <Note project={project} open={open} />
      </div>
    )
  }

  if (kind === 'tag') {
    return (
      <div className="group relative pt-10" onClick={toggle}>
        {/* string loop */}
        <svg viewBox="0 0 60 50" aria-hidden="true" className="absolute left-1/2 top-0 h-12 w-14 -translate-x-1/2 text-[#f2e3cf]/70">
          <path d="M30 46 C10 30 8 6 30 4 C52 6 50 30 30 46" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <article className="relative w-60 rounded-b-2xl bg-[#f2e3cf] px-5 pb-5 pt-12 text-[#1f1d1a] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] [clip-path:polygon(22%_0,78%_0,100%_14%,100%_100%,0_100%,0_14%)]">
          <span aria-hidden="true" className="absolute left-1/2 top-5 h-5 w-5 -translate-x-1/2 rounded-full bg-[#1b1a18] ring-4 ring-[#d6c4a8]" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c8402f]">handle with care</p>
          <h3 className="mt-2 font-mono text-2xl font-bold leading-tight">{project.title}</h3>
          <p className="mt-2 text-xs text-black/60 line-clamp-3">{project.description}</p>
          <Barcode seed={project.title} className="mt-4 text-[#1f1d1a]" />
        </article>
        <Note project={project} open={open} />
      </div>
    )
  }

  // wristband
  return (
    <div className="group relative" onClick={toggle}>
      <article className="relative flex w-[26rem] max-w-[85vw] items-center gap-4 rounded-r-lg bg-[#e35342] py-3 pl-6 pr-4 text-[#f2e3cf] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] [clip-path:polygon(0_12%,4%_0,100%_0,100%_100%,4%_100%,0_88%)]">
        <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-[#1b1a18] ring-2 ring-[#f2e3cf]/60" />
        <div className="min-w-0">
          <h3 className="font-mono text-xl font-bold uppercase tracking-wide">{project.title}</h3>
          <p className="truncate font-mono text-[11px] text-[#f2e3cf]/80">{project.impact ?? project.description}</p>
        </div>
        <span aria-hidden="true" className="ml-auto h-3 w-3 shrink-0 rounded-full bg-[#1b1a18] ring-2 ring-[#f2e3cf]/60" />
      </article>
      <Note project={project} open={open} />
    </div>
  )
}
