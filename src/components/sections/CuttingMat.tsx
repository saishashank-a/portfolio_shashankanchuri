'use client'

import { useRef } from 'react'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { DragCard } from '@/components/ui/DragCard'
import { ExperienceCard } from '@/components/ui/ExperienceCard'
import { ProjectObject, type ObjectKind } from '@/components/ui/ProjectObject'
import { Carousel } from '@/components/ui/Carousel'
import { LayoutToggle, useLayoutMode } from '@/components/ui/LayoutToggle'
import { showcase } from '@/components/sections/Values'

// Values section shows six projects; the mat gets the rest
const rest = projects.filter((p) => !showcase.includes(p))
const tilts = [-4, 3, -2, 5, -5, 2, -3, 4]
// Projects on the mat become physical objects, cycling ticket → tag → wristband
const kinds: ObjectKind[] = ['ticket', 'tag', 'band']

// Same cards in both modes; only the arrangement changes
const slides = [
  ...experience.map((item) => ({ key: item.company, label: item.company, node: <ExperienceCard item={item} /> })),
  ...rest.map((p, i) => ({ key: p.title, label: p.title, node: <ProjectObject project={p} kind={kinds[i % kinds.length]} /> })),
]

export function CuttingMat() {
  const mat = useRef<HTMLDivElement>(null)
  const [mode, pick] = useLayoutMode('mat-mode')

  return (
    <section id="work" aria-labelledby="work-heading" className="relative px-4 md:px-20 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 id="work-heading" className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">
          Things I&apos;ve built<span className="text-[var(--accent)]">.</span>
        </h2>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <p className="font-hand text-xl text-[var(--secondary)]">
            {mode === 'scatter'
              ? 'and the places I built them. hover a badge to flip it, hover an object for the story, grab anything to move it.'
              : 'one at a time. use the arrows, ← → keys, or swipe.'}
          </p>
          <LayoutToggle mode={mode} onChange={pick} />
        </div>

        {/* coral backing sheet peeking out under the mat */}
        <div className="relative mt-10">
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-4 -rotate-1 rounded-[1.8rem] bg-[var(--accent)]" />
          <div ref={mat} className="mat-grid relative rounded-[1.8rem] border border-white/10 p-6 pl-12 pt-12 md:p-12 md:pl-16 md:pt-16 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            {/* rulers */}
            <div aria-hidden="true" className="absolute left-3 top-12 bottom-6 flex flex-col justify-between font-mono text-[10px] text-[var(--paper)]/40">
              {Array.from({ length: 12 }, (_, i) => <span key={i}>{i + 1}</span>)}
            </div>
            <div aria-hidden="true" className="absolute top-3 left-12 right-6 flex justify-between font-mono text-[10px] text-[var(--paper)]/40">
              {Array.from({ length: 16 }, (_, i) => <span key={i}>{i + 1}</span>)}
            </div>

            {mode === 'scatter' ? (
              <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                {experience.map((item, i) => (
                  <DragCard key={item.company} bounds={mat} rotate={tilts[i % tilts.length]}>
                    <ExperienceCard item={item} />
                  </DragCard>
                ))}
                {rest.map((p, i) => (
                  <DragCard key={p.title} bounds={mat} rotate={tilts[(i + 3) % tilts.length]}>
                    <ProjectObject project={p} kind={kinds[i % kinds.length]} />
                  </DragCard>
                ))}
              </div>
            ) : (
              <Carousel slides={slides} />
            )}

            <p className="mt-10 text-right font-hand text-lg text-[var(--paper)]/70">
              measure twice, ship once.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
