'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { projects } from '@/data/projects'
import { DragCard } from '@/components/ui/DragCard'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Sparkle, CurlyArrow } from '@/components/ui/Doodles'
import { Carousel } from '@/components/ui/Carousel'
import { LayoutToggle, useLayoutMode } from '@/components/ui/LayoutToggle'

// TODO(you): your three convictions. `font` sets the note's voice.
const beliefs = [
  { text: 'Ship the boring version first.', font: 'font-hand text-4xl' },
  { text: 'Evals over vibes.', font: 'font-display italic font-semibold text-4xl' },
  { text: 'Make the machine do the chores.', font: 'font-mono text-2xl' },
]

// Two projects per belief, featured first so every slot is filled; the mat shows whatever is left
export const showcase = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)].slice(0, 6)

function Belief({ i }: { i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // left and right cards drift at different speeds for depth
  const yLeft = useTransform(scrollYProgress, [0, 1], [30, -30])
  const yRight = useTransform(scrollYProgress, [0, 1], [-20, 40])
  const [left, right] = [showcase[i * 2], showcase[i * 2 + 1]]

  return (
    <div ref={ref} className="relative grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-6 py-8 md:py-10">
      <motion.div style={reduced ? undefined : { y: yLeft }} className="flex justify-center md:justify-start">
        {left && (
          <DragCard bounds={ref} rotate={-4}>
            <ProjectCard project={left} index={i * 2} />
          </DragCard>
        )}
      </motion.div>

      <DragCard bounds={ref} rotate={i % 2 ? 3 : -3} className="order-first md:order-none mx-auto">
        <Note i={i} />
      </DragCard>

      <motion.div style={reduced ? undefined : { y: yRight }} className="flex justify-center md:justify-end">
        {right && (
          <DragCard bounds={ref} rotate={5}>
            <ProjectCard project={right} index={i * 2 + 1} />
          </DragCard>
        )}
      </motion.div>
    </div>
  )
}

// The torn note, shared by both layouts
function Note({ i }: { i: number }) {
  const b = beliefs[i]
  return (
    <div className="note-scrap relative w-64 md:w-72 px-8 pl-10 pt-7 pb-12 text-[#1f1d1a] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)]">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-20 rotate-2 bg-[#f2e3cf]/60 backdrop-blur-[1px]" aria-hidden="true" />
      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#e35342] mb-2">belief 0{i + 1}</span>
      <p className={`${b.font} leading-[1.1]`}>{b.text}</p>
    </div>
  )
}

const slides = showcase.map((p, i) => ({ key: p.title, label: p.title, node: <ProjectCard project={p} index={i} /> }))

export function Values() {
  const [mode, pick] = useLayoutMode('values-mode')
  return (
    <section aria-labelledby="values-heading" className="relative px-6 md:px-20 pt-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-3 text-[var(--accent)]">
          <Sparkle className="w-6" />
          <h2 id="values-heading" className="font-display italic text-2xl md:text-3xl">
            3 things I strongly believe in
          </h2>
          <Sparkle className="w-6" />
        </div>
        <div className="mt-3 mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <p className="flex items-center gap-2 font-hand text-lg text-[var(--secondary)]">
            <CurlyArrow className="w-14 text-[var(--accent)]" />
            {mode === 'scatter' ? 'psst, everything here can be dragged' : 'notes stay put, projects take turns'}
          </p>
          <LayoutToggle mode={mode} onChange={pick} />
        </div>
        {mode === 'scatter' ? (
          beliefs.map((_, i) => <Belief key={i} i={i} />)
        ) : (
          <>
            {/* the three notes in a row, then one filmstrip for all six projects */}
            <div className="flex flex-wrap justify-center gap-6 py-6">
              {beliefs.map((_, i) => (
                <div key={i} className={i % 2 ? 'rotate-2' : '-rotate-2'}>
                  <Note i={i} />
                </div>
              ))}
            </div>
            <Carousel slides={slides} />
          </>
        )}
      </div>
    </section>
  )
}
