'use client'

import { motion } from 'framer-motion'

// Hand-drawn-style line doodles. Stroke uses currentColor so the parent sets the ink.
type DoodleProps = { className?: string }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function Coffee({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 100" className={className} aria-hidden="true">
      <g {...stroke}>
        {/* mug body + handle */}
        <path d="M14 40 Q12 92 40 92 Q68 92 66 40 Z" />
        <path d="M14 40 Q40 46 66 40" />
        <path d="M66 52 q16 -2 16 12 q0 14 -18 14" />
        {/* steam */}
        <path d="M30 30 q-5 -8 0 -14 q5 -6 0 -12" />
        <path d="M42 28 q-5 -8 0 -14 q5 -6 0 -12" />
        <path d="M54 30 q-4 -6 0 -11" />
      </g>
    </svg>
  )
}

export function Duck({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 110 90" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M22 52 Q18 80 52 82 Q92 84 96 58 Q98 46 86 48 Q78 50 70 52 Q72 30 58 24 Q42 20 38 34 Q36 44 44 50 Q30 50 22 52 Z" />
        <path d="M38 34 Q28 34 24 40 Q32 42 38 40" />
        <circle cx="50" cy="32" r="1.8" fill="currentColor" />
        <path d="M54 62 Q66 70 78 62" />
      </g>
    </svg>
  )
}

export function Plane({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M8 40 L110 10 L70 72 L56 48 Z" />
        <path d="M56 48 L110 10" />
        <path d="M56 48 L52 66 L64 58" />
        <path d="M6 62 q10 -4 16 2 q6 6 14 0" strokeDasharray="3 5" />
      </g>
    </svg>
  )
}

export function Bulb({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 100" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M28 66 Q12 54 14 36 Q18 14 40 12 Q62 14 66 36 Q68 54 52 66 Z" />
        <path d="M30 74 H50 M31 81 H49 M35 88 H45" />
        <path d="M34 60 L36 40 L40 48 L44 40 L46 60" />
        <path d="M6 20 l6 4 M74 20 l-6 4 M40 2 v5" />
      </g>
    </svg>
  )
}

export function Sparkle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 2 Q22 18 38 20 Q22 22 20 38 Q18 22 2 20 Q18 18 20 2 Z" {...stroke} />
    </svg>
  )
}

export function CurlyArrow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 70" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M6 14 Q40 4 52 28 Q60 46 44 48 Q30 48 40 34 Q56 18 84 40 Q96 50 108 58" />
        <path d="M96 60 L109 59 L104 47" />
      </g>
    </svg>
  )
}

// Hero illustration: a small robot typing at a laptop, plants on the desk
export function DeskBot({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 360 300" className={className} aria-hidden="true">
      <g {...stroke} strokeWidth={2.4}>
        {/* antenna + head */}
        <path d="M150 38 V20" />
        <circle cx="150" cy="15" r="6" />
        <rect x="112" y="38" width="76" height="58" rx="16" />
        <circle cx="136" cy="64" r="6" />
        <circle cx="164" cy="64" r="6" />
        <path d="M138 82 Q150 90 162 82" />
        <path d="M112 62 H102 M188 62 H198" />
        {/* body */}
        <path d="M122 96 Q116 150 120 176 H180 Q184 150 178 96" />
        <path d="M136 120 H164 M136 132 H156" />
        {/* arms reaching to keyboard */}
        <path d="M122 118 Q96 150 110 188" />
        <path d="M178 118 Q206 150 192 188" />
        {/* laptop */}
        <path d="M70 188 H232 L252 212 H50 Z" />
        <path d="M98 196 H206 M92 204 H212" strokeDasharray="4 6" />
        {/* desk */}
        <path d="M10 214 H350" />
        <path d="M30 214 V290 M330 214 V290" />
        {/* plant */}
        <path d="M292 214 L286 178 H318 L312 214" />
        <path d="M302 178 Q296 150 278 140 M302 178 Q306 146 326 134 M302 178 Q300 158 304 126" />
        <path d="M278 140 q-8 6 -2 14 q8 -2 2 -14 M326 134 q8 8 2 16 q-8 -4 -2 -16 M304 126 q-6 -10 0 -18 q6 8 0 18" />
        {/* mug */}
        <path d="M262 214 V188 H284 V214" />
        <path d="M284 194 q10 0 10 8 q0 8 -10 8" />
        <path d="M268 180 q-4 -6 0 -12 M278 180 q-4 -6 0 -12" />
        {/* thought bubble */}
        <path d="M214 34 Q214 12 244 12 H300 Q324 12 324 34 Q324 56 300 56 H246 L232 70 L234 56 Q214 54 214 34 Z" />
        <path d="M236 30 L244 38 L236 46 M252 46 H272" />
      </g>
    </svg>
  )
}

// Doodle portrait: short textured hair, beard, easy smile. `wink` closes one eye for hover states.
export function Face({ className, wink = false }: DoodleProps & { wink?: boolean }) {
  return (
    <svg viewBox="0 0 100 110" className={className} aria-hidden="true">
      <g {...stroke} strokeWidth={2.6}>
        {/* head + ears */}
        <path d="M30 40 Q28 82 50 86 Q72 82 70 40 Q66 18 50 18 Q34 18 30 40 Z" />
        <path d="M30 52 q-6 -2 -6 6 q0 7 6 6 M70 52 q6 -2 6 6 q0 7 -6 6" />
        {/* hair: short, textured */}
        <path d="M28 44 Q24 18 50 12 Q76 18 72 44" />
        <path d="M34 30 q4 -8 10 -4 M44 24 q5 -7 11 -2 M56 24 q6 -6 10 2 M30 40 q2 -6 6 -6" />
        {/* eyes */}
        {wink ? (
          <>
            <circle cx="41" cy="50" r="2.2" fill="currentColor" />
            <path d="M54 50 q5 -4 10 0" />
          </>
        ) : (
          <>
            <circle cx="41" cy="50" r="2.2" fill="currentColor" />
            <circle cx="59" cy="50" r="2.2" fill="currentColor" />
          </>
        )}
        {/* brows + nose */}
        <path d="M36 43 q5 -3 10 -1 M54 42 q5 -2 10 1 M50 52 q-3 6 1 9" />
        {/* beard along the jaw + smile */}
        <path d="M32 62 Q36 82 50 84 Q64 82 68 62" strokeDasharray="1 3" />
        <path d="M40 68 Q50 78 60 68" />
        {wink && <path d="M60 68 q4 -2 5 -5" />}
        {/* collar */}
        <path d="M36 92 L50 98 L64 92 M20 108 Q30 90 40 90 M80 108 Q70 90 60 90" />
      </g>
    </svg>
  )
}

// Wraps a doodle so it wobbles on hover and can be flicked around
export function Wiggle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      drag
      dragSnapToOrigin
      whileHover={{ rotate: [0, -8, 7, -4, 0], transition: { duration: 0.6 } }}
      whileDrag={{ scale: 1.1 }}
    >
      {children}
    </motion.div>
  )
}
