'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { availability } from '@/data/availability'
import { DeskBot, Coffee, Duck, Plane, Bulb, Wiggle } from '@/components/ui/Doodles'

function useLocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })
    // Deferred first tick: the server has no local time, so render it only after hydration
    const first = setTimeout(() => setTime(fmt()), 0)
    const id = setInterval(() => setTime(fmt()), 30_000)
    return () => {
      clearTimeout(first)
      clearInterval(id)
    }
  }, [])
  return time
}

const name = 'Shashank Anchuri'

// TODO(you): the endings the tagline cycles through
const endings = ['disappear into the work.', 'just work.', 'earn its place.', 'make you faster.', 'feel obvious.']

function useCycle(length: number, ms: number, paused: boolean) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((v) => (v + 1) % length), ms)
    return () => clearInterval(id)
  }, [length, ms, paused])
  return i
}

export function Notebook() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const time = useLocalTime()
  const ending = useCycle(endings.length, 2600, !!reduced)

  // Notebook tips back and shrinks as it scrolls away
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 28])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section ref={ref} id="about" className="relative px-6 md:px-20 pb-16 [perspective:1600px]">
      {/* floating doodles around the notebook */}
      <Wiggle className="absolute left-[6%] top-[38%] hidden lg:block w-16 text-[var(--fg)] cursor-grab">
        <Coffee />
      </Wiggle>
      <Wiggle className="absolute right-[7%] top-[18%] hidden lg:block w-24 text-[var(--fg)] cursor-grab">
        <Plane />
      </Wiggle>
      <Wiggle className="absolute right-[8%] top-[60%] hidden lg:block w-24 text-[var(--fg)] cursor-grab">
        <Duck />
      </Wiggle>

      <motion.div
        style={reduced ? undefined : { rotateX, scale, y, transformOrigin: '50% 100%' }}
        className="relative mx-auto max-w-5xl"
      >
        {/* binder cover (rim) */}
        <div className="rounded-[2.2rem] bg-[var(--accent)] p-3 md:p-4 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
          {/* ribbon bookmark */}
          <div aria-hidden="true" className="absolute -bottom-8 left-[18%] h-16 w-5 bg-[#c63b2b] [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]" />
          {/* paper page */}
          <div className="paper-grid relative overflow-hidden rounded-[1.6rem] px-6 py-10 md:px-14 md:py-16 grid md:grid-cols-[1.1fr_1fr] gap-8 items-center text-[var(--accent)]">
            <div className="relative z-10 flex flex-col gap-3">
              {availability.open && (
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--accent)]/40 px-3 py-1 font-mono text-[11px] text-[var(--accent)]">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-600 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                  {availability.label}
                </span>
              )}

              {/* Name as a signature: letters write in one by one */}
              <h1 aria-label={name} className="font-hand text-[clamp(2.4rem,10vw,3.75rem)] leading-none -rotate-2">
                {name.split(' ').map((word, w) => (
                  // words never break internally; wrapping only happens between them
                  <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap mr-[0.3em]">
                    {word.split('').map((ch, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={reduced ? false : { opacity: 0, y: 8, rotate: -6 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ delay: 0.2 + (w * 9 + i) * 0.045, duration: 0.35 }}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              <p className="font-display text-2xl md:text-3xl">AI Engineer</p>
              <p className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.02] tracking-tight">
                AI should
                <span className="block min-h-[1.25em]" aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ending}
                      className="relative inline-block font-hand font-normal text-[1.05em] -rotate-2"
                      initial={reduced ? false : { opacity: 0, y: 14, rotate: -6 }}
                      animate={{ opacity: 1, y: 0, rotate: -2 }}
                      exit={{ opacity: 0, y: -12, rotate: 3 }}
                      transition={{ duration: 0.35 }}
                    >
                      {endings[ending]}
                      {/* underline redraws for every new ending */}
                      <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full" aria-hidden="true">
                        <motion.path
                          d="M4 12 Q50 2 100 10 T196 8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={reduced ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.25, duration: 0.5 }}
                        />
                      </svg>
                    </motion.span>
                  </AnimatePresence>
                </span>
              </p>
              <p className="font-display text-base md:text-lg tabular-nums opacity-90">
                Hyderabad • GMT +5:30{time && ` • ${time}`}
              </p>

              <div className="mt-3 flex flex-wrap gap-3">
                <a href="#connect" className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--paper)] hover:bg-[#c63b2b] transition-colors">
                  Let&apos;s work together →
                </a>
                <a href="/resume.pdf" download className="rounded-full border-2 border-[var(--accent)] px-5 py-2 text-sm font-medium hover:bg-[var(--accent)] hover:text-[var(--paper)] transition-colors">
                  Resume ↓
                </a>
              </div>
            </div>

            <div className="relative">
              <DeskBot className="w-full max-w-md mx-auto" />
              <Wiggle className="absolute -top-2 left-2 w-12 cursor-grab">
                <Bulb />
              </Wiggle>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
