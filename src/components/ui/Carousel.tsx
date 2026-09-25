'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Slide = { key: string; label: string; node: ReactNode }

// Studioloop-style filmstrip: one item centred and full-size, neighbours peek in at the sides,
// scaled down and faded. Move with the side buttons, ← → keys, or a swipe.
export function Carousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0)
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  // how much of this carousel is on screen; the arrow keys go to whichever carousel shows the most
  const visibility = useRef(0)
  const n = slides.length
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n])

  useEffect(() => {
    const el = root.current
    if (!el) return
    // one observer: keep the ratio locally and publish it on the element for the other carousels to read
    const io = new IntersectionObserver(
      ([entry]) => {
        visibility.current = entry.intersectionRatio
        el.dataset.carousel = String(entry.intersectionRatio)
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    io.observe(el)
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      if (visibility.current === 0) return
      // typing in a field shouldn't page the carousel
      if ((e.target as HTMLElement)?.closest('input, textarea, select, [contenteditable]')) return
      // yield to another carousel that's more in view
      const others = [...document.querySelectorAll<HTMLElement>('[data-carousel]')].filter((c) => c !== el)
      const best = Math.max(0, ...others.map((c) => Number(c.dataset.carousel)))
      if (best > visibility.current) return
      go(e.key === 'ArrowLeft' ? -1 : 1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      io.disconnect()
      window.removeEventListener('keydown', onKey)
    }
  }, [go])

  return (
    <>
      {/* phones: cards roll by on their own at full size; hold to pause. Second copy makes the loop seamless. */}
      <div className="marquee md:hidden overflow-x-clip py-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]" role="region" aria-label="Work">
        <div className="marquee-track items-center" style={{ '--marquee-duration': `${n * 4}s` } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1} inert={copy === 1}>
              {slides.map((s) => (
                <div key={s.key} className="shrink-0 pr-8">{s.node}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div ref={root} data-carousel="0" className="relative max-md:hidden" role="region" aria-roledescription="carousel" aria-label="Work">
        <div className="relative h-[26rem] overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          {slides.map((s, idx) => {
            // signed distance from the active slide, wrapped so the strip loops
            let d = idx - i
            if (d > n / 2) d -= n
            if (d < -n / 2) d += n
            const visible = Math.abs(d) <= 2
            return (
              <motion.div
                key={s.key}
                className="absolute left-1/2 top-1/2 flex items-center justify-center"
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${n}: ${s.label}`}
                aria-hidden={d !== 0}
                initial={false}
                animate={{
                  x: `calc(-50% + ${d * 340}px)`,
                  y: '-50%',
                  scale: d === 0 ? 1 : 0.78,
                  opacity: !visible ? 0 : d === 0 ? 1 : 0.45,
                  rotate: d * 3,
                  zIndex: 10 - Math.abs(d),
                }}
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}
                style={{ pointerEvents: d === 0 ? 'auto' : 'none' }}
                drag={d === 0 && !reduced ? 'x' : false}
                dragSnapToOrigin
                dragElastic={0.3}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60 || info.velocity.x < -400) go(1)
                  else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
                }}
              >
                <div onClick={() => d !== 0 && setI(idx)} className={d === 0 ? '' : 'cursor-pointer'}>
                  {s.node}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* side buttons */}
        {[
          { dir: -1, Icon: ChevronLeft, cls: 'left-2', label: 'Previous' },
          { dir: 1, Icon: ChevronRight, cls: 'right-2', label: 'Next' },
        ].map(({ dir, Icon, cls, label }) => (
          <button
            key={dir}
            type="button"
            onClick={() => go(dir)}
            aria-label={label}
            className={`absolute top-1/2 ${cls} z-20 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full border-2 border-[var(--accent)] bg-[var(--mat)] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--paper)]`}
          >
            <Icon size={20} />
          </button>
        ))}

        {/* handwritten counter + dots */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="font-hand text-lg text-[var(--paper)]/80 tabular-nums" aria-live="polite">
            {i + 1} / {n}
          </span>
          <div className="flex gap-1.5" aria-hidden="true">
            {slides.map((s, idx) => (
              <button
                key={s.key}
                type="button"
                tabIndex={-1}
                onClick={() => setI(idx)}
                className={`h-2 rounded-full transition-all ${idx === i ? 'w-6 bg-[var(--accent)]' : 'w-2 bg-[var(--paper)]/30 hover:bg-[var(--paper)]/60'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
