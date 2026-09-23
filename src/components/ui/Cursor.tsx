'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Coral dot that trails the pointer and grows over anything clickable. Mouse-only.
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    const sync = () => setEnabled(mq.matches)
    const t = setTimeout(sync, 0)
    mq.addEventListener('change', sync)

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHovering(!!(e.target as Element).closest('a, button, [role="button"], .cursor-grab'))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      clearTimeout(t)
      mq.removeEventListener('change', sync)
      window.removeEventListener('pointermove', move)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-[var(--accent)]"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hovering ? 44 : 12, height: hovering ? 44 : 12, opacity: hovering ? 0.5 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  )
}
