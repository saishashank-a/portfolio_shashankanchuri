'use client'

import { useEffect, useState, type RefObject } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  bounds?: RefObject<HTMLElement | null>
  rotate?: number
  className?: string
  style?: React.CSSProperties
}

// Anything you can pick up and move. Touch devices get horizontal-only drag that springs back,
// so framer sets touch-action: pan-y and the page still scrolls under a finger.
export function DragCard({ children, bounds, rotate = 0, className = '', style }: Props) {
  const reduced = useReducedMotion()
  const [touch, setTouch] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setTouch(window.matchMedia('(pointer: coarse)').matches), 0)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      drag={reduced ? false : touch ? 'x' : true}
      dragSnapToOrigin={touch}
      dragConstraints={bounds}
      dragElastic={0.15}
      dragMomentum={false}
      initial={{ rotate }}
      whileHover={{ scale: 1.03, rotate: rotate * 0.4, zIndex: 30 }}
      whileDrag={{ scale: 1.06, rotate: 0, zIndex: 40, cursor: 'grabbing' }}
      className={`cursor-grab select-none ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}
