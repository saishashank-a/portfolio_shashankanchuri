'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import { DragCard } from '@/components/ui/DragCard'
import { Bulb, Plane, DeskBot, Duck, Sparkle } from '@/components/ui/Doodles'

// TODO(you): what you're hunting for next
const lookingFor = ['AI products real people use', 'Teams that ship weekly', 'Hard retrieval + eval problems', 'Room to own things end to end']

// One picture per number of ticked boxes; the last is the "all done" reward
const reactions = [
  { art: null, caption: 'tick a box →' },
  { art: <Bulb className="h-full w-auto" />, caption: 'ooh, good start' },
  { art: <Plane className="h-full w-auto" />, caption: 'now we’re moving' },
  { art: <Duck className="h-full w-auto" />, caption: 'quack. almost there' },
  { art: <DeskBot className="h-full w-auto" />, caption: 'all four? let’s talk!' },
]

const links = [
  { label: 'shashankanchuri@gmail.com', href: 'mailto:shashankanchuri@gmail.com', icon: Mail },
  { label: 'github/saishashank-a', href: 'https://github.com/saishashank-a', icon: Github },
  { label: 'linkedin', href: 'https://linkedin.com/in/sai-shashank-anchuri', icon: Linkedin },
  { label: 'resume.pdf', href: '/resume.pdf', icon: FileText },
]

const s = { fill: 'none', stroke: '#e35342', strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, pathLength: 1 }
// Doodles drawn over the polaroid on hover; a different one each time
const photoDoodles = [
  <g key="crown"><path {...s} d="M70 38 L78 14 L92 30 L104 8 L116 30 L130 14 L138 38 Z" /><path {...s} d="M40 60 l6 -6 M176 64 l-8 -4 M52 30 l4 4" /></g>,
  <g key="shades"><path {...s} d="M62 78 Q80 70 98 78 Q98 96 80 96 Q62 96 62 78 Z M112 78 Q130 70 148 78 Q148 96 130 96 Q112 96 112 78 Z M98 80 Q105 74 112 80" /><path {...s} d="M150 40 l8 -8 M158 50 h10 M150 30 v-10" /></g>,
  <g key="hi"><path {...s} d="M150 24 Q190 20 186 50 Q182 72 150 70 L138 84 L140 68 Q122 60 126 44 Q130 26 150 24 Z" /><path {...s} d="M148 38 v18 M148 47 h10 M158 38 v18 M168 40 v2 M168 48 v8" /><path {...s} d="M36 110 q8 -10 16 0 q8 10 16 0" /></g>,
]

function Confetti() {
  const pieces = Array.from({ length: 18 }, (_, i) => i)
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {pieces.map((i) => {
        const angle = (i / pieces.length) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-sm"
            style={{ backgroundColor: ['#e35342', '#e9b949', '#2f5d50', '#3a4a7a'][i % 4] }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: Math.cos(angle) * 120, y: Math.sin(angle) * 90 + 40, opacity: 0, rotate: 240 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

export function Connect() {
  const area = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [checked, setChecked] = useState<boolean[]>(() => lookingFor.map(() => false))
  const [doodle, setDoodle] = useState(0)
  const count = checked.filter(Boolean).length
  const r = reactions[count]

  return (
    <section id="connect" aria-labelledby="connect-heading" className="relative px-6 md:px-20 py-16">
      <div ref={area} className="relative mx-auto max-w-5xl grid md:grid-cols-[auto_1fr] gap-12 items-start">
        {/* polaroid: hover draws a doodle over the photo */}
        <DragCard bounds={area} rotate={-5} className="mx-auto">
          <figure
            className="group relative w-60 bg-[#faf6ee] p-3 pb-4 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]"
            onMouseLeave={() => setDoodle((d) => (d + 1) % photoDoodles.length)}
          >
            <span aria-hidden="true" className="absolute -top-3 left-6 h-6 w-16 -rotate-12 bg-[var(--accent)]/70" />
            <span aria-hidden="true" className="absolute -top-3 right-6 h-6 w-16 rotate-12 bg-[var(--accent)]/70" />
            <div className="relative">
              <Image src="/images/profile.jpg" alt="Shashank Anchuri" width={480} height={360} className="aspect-[4/5] w-full object-cover grayscale-[20%]" draggable={false} />
              <svg viewBox="0 0 216 270" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full [&_path]:[stroke-dasharray:1] [&_path]:[stroke-dashoffset:1] [&_path]:transition-[stroke-dashoffset] [&_path]:duration-700 group-hover:[&_path]:[stroke-dashoffset:0]">
                {photoDoodles[doodle]}
              </svg>
            </div>
            <figcaption className="mt-2 text-center font-hand text-2xl text-[var(--accent)]">shashank ✳</figcaption>
          </figure>
        </DragCard>

        <div className="relative rounded-[1.6rem] bg-[var(--paper)] text-[var(--ink)] p-6 md:p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] grid sm:grid-cols-[1fr_auto] gap-6">
          <div>
            <h2 id="connect-heading" className="font-display text-3xl font-semibold text-[var(--accent)] border-b-2 border-[var(--accent)]/30 pb-3">
              What I&apos;m looking for
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {lookingFor.map((item, i) => (
                <li key={item}>
                  <label className="flex cursor-pointer items-center gap-3 font-hand text-xl text-[var(--accent)]">
                    <input
                      type="checkbox"
                      checked={checked[i]}
                      onChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                      className="peer sr-only"
                    />
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-[var(--accent)] text-sm peer-checked:bg-[var(--accent)] peer-checked:text-[var(--paper)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent)]/50">
                      {checked[i] ? '✓' : ''}
                    </span>
                    <span className={checked[i] ? 'line-through decoration-2' : ''}>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-6 inline-block rounded-lg border-2 border-[var(--accent)] px-5 py-1.5 font-hand text-xl text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--paper)] transition-colors">
              let&apos;s chat!
            </a>
          </div>

          {/* reaction panel: changes with each ticked box */}
          <div className="relative mx-auto w-52 h-52 rounded-2xl border-[6px] border-[var(--accent)] bg-[#faf3e6] p-4 flex flex-col items-center justify-center text-[var(--accent)] overflow-hidden" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                className="flex h-full w-full flex-col items-center justify-center gap-2"
                initial={reduced ? false : { opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 6 }}
                transition={{ duration: 0.3 }}
              >
                {r.art && <div className="h-28 flex items-center justify-center">{r.art}</div>}
                <p className="font-hand text-xl text-center leading-tight">{r.caption}</p>
              </motion.div>
            </AnimatePresence>
            {count === lookingFor.length && !reduced && <Confetti />}
          </div>

          <Duck className="absolute -top-10 -right-4 w-20 text-[var(--paper)] rotate-12" />
        </div>

        {/* sticky note with direct links */}
        <div className="md:col-start-2 justify-self-end -mt-4 w-64 rotate-2 bg-[#e9b949] p-5 text-[#1f1d1a] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]">
          <p className="flex items-center gap-2 font-hand text-2xl">
            find me here <Sparkle className="w-5" />
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm">
            {links.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
                  <Icon size={14} /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
