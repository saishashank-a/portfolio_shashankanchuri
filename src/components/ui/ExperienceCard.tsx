'use client'

import { useState } from 'react'
import type { ExperienceItem } from '@/data/experience'

// A role as a lanyard badge. Hover (or tap) flips it to the highlights.
export function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="group w-64 h-80 [perspective:1000px]" onClick={() => setFlipped((v) => !v)}>
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-[#faf6ee] text-[#1f1d1a] p-5 flex flex-col shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)]">
          <div className="mx-auto h-3 w-16 rounded-full bg-[#1f1d1a]/15" />
          <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#e35342]">{item.period}</span>
          <h3 className="mt-2 font-display text-3xl font-semibold leading-tight">{item.company}</h3>
          <p className="mt-2 text-sm text-black/60">{item.role}</p>
          <div className="mt-auto flex items-end justify-between">
            <span className="font-hand text-lg text-[#e35342]">{item.location}</span>
            <span className="font-mono text-[10px] text-black/40">hover ↻</span>
          </div>
        </div>
        {/* back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-[#e35342] text-[#f2e3cf] p-5 flex flex-col gap-3 overflow-hidden">
          <span className="font-hand text-xl">what I did</span>
          <ul className="flex flex-col gap-2 text-[13px] leading-snug">
            {item.bullets.slice(0, 3).map((b) => (
              <li key={b} className="before:content-['✳'] before:mr-1.5">{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
