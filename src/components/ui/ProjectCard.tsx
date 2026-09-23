'use client'

import { useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '@/data/projects'

// Cover colours cycle so neighbouring cards differ
const covers = [
  { bg: '#e35342', fg: '#f2e3cf' },
  { bg: '#f2e3cf', fg: '#1f1d1a' },
  { bg: '#2f5d50', fg: '#f2e3cf' },
  { bg: '#e9b949', fg: '#1f1d1a' },
  { bg: '#3a4a7a', fg: '#f2e3cf' },
]

function hostOf(p: Project) {
  const url = p.demo ?? p.github ?? ''
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'localhost'
}

// A project as an app window: chrome bar + cover. Hover (or tap) slides the details up.
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [open, setOpen] = useState(false)
  const c = covers[index % covers.length]

  return (
    <article
      className="group relative w-72 md:w-80 overflow-hidden rounded-2xl bg-[#faf6ee] text-[#1f1d1a] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] ring-1 ring-black/10"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-black/10 bg-[#efe6d6]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e35342]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e9b949]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#7aa36b]" />
        <span className="ml-2 truncate font-mono text-[10px] text-black/50">{hostOf(project)}</span>
      </div>

      <div className="relative h-48 p-5 flex flex-col justify-between" style={{ backgroundColor: c.bg, color: c.fg }}>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
          {project.tech.slice(0, 3).join(' · ')}
        </span>
        <h3 className="font-display text-3xl leading-[1.05] font-semibold tracking-tight">{project.title}</h3>

        {/* Details sheet */}
        <div
          className={`absolute inset-0 p-5 flex flex-col gap-3 bg-[#1f1d1a]/95 text-[#f2e3cf] transition-transform duration-300 ease-out group-hover:translate-y-0 ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <p className="font-hand text-lg leading-snug">{project.impact ?? project.description}</p>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-[#f2e3cf]/30 px-2 py-0.5 font-mono text-[10px]">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3 text-sm">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-[#e35342] hover:underline">
                Live <ArrowUpRight size={14} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-[#f2e3cf]/80 hover:underline" aria-label={`${project.title} on GitHub`}>
                <Github size={14} /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
