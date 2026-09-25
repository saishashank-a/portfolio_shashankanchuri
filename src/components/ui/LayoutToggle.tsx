'use client'

import { useEffect, useState } from 'react'
import { LayoutGrid, GalleryHorizontal } from 'lucide-react'

export type Mode = 'scatter' | 'strip'

// Per-visitor layout preference, keyed per section; phones default to 'strip'. Read after hydration so server and client HTML match.
export function useLayoutMode(storageKey: string): [Mode, (m: Mode) => void] {
  const [mode, setMode] = useState<Mode>('scatter')
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const saved = localStorage.getItem(storageKey)
        if (saved === 'strip' || saved === 'scatter') return setMode(saved)
      } catch {}
      // phones default to the carousel: scattered stacks every card in one tall column
      if (window.matchMedia('(max-width: 767px)').matches) setMode('strip')
    }, 0)
    return () => clearTimeout(t)
  }, [storageKey])
  const pick = (m: Mode) => {
    setMode(m)
    try {
      localStorage.setItem(storageKey, m)
    } catch {}
  }
  return [mode, pick]
}

// scattered / carousel pill switch
export function LayoutToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div role="group" aria-label="Layout" className="flex rounded-full border-2 border-[var(--accent)] p-1 font-hand text-base">
      {(
        [
          ['scatter', LayoutGrid, 'scattered'],
          ['strip', GalleryHorizontal, 'carousel'],
        ] as const
      ).map(([m, Icon, label]) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          aria-pressed={mode === m}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
            mode === m ? 'bg-[var(--accent)] text-[var(--paper)]' : 'text-[var(--accent)] hover:bg-[var(--accent)]/15'
          }`}
        >
          <Icon size={15} /> {label}
        </button>
      ))}
    </div>
  )
}
