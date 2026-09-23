// Fixed coral tile strips down both edges. Each tile is hoverable and shows a handwritten
// fact; the strip drifts upward and pauses while hovered so the label can be read.
const stroke = { fill: 'none', stroke: '#1b1a18', strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

const glyphs = [
  <path key="s" d="M20 6 Q21 18 34 20 Q21 22 20 34 Q19 22 6 20 Q19 18 20 6Z" {...stroke} />,
  <path key="b" d="M15 10 L7 20 L15 30 M25 10 L33 20 L25 30" {...stroke} />,
  <g key="c" {...stroke}><rect x="11" y="11" width="18" height="18" rx="2" /><path d="M15 7v4M20 7v4M25 7v4M15 29v4M20 29v4M25 29v4M7 15h4M7 20h4M7 25h4M29 15h4M29 20h4M29 25h4" /></g>,
  <path key="p" d="M10 8 L30 20 L21 22 L26 32 L22 34 L17 24 L10 30 Z" {...stroke} />,
]

// TODO(you): little facts that show on hover. 11 labels over 4 glyphs keeps pairings varied.
const labels = [
  'coffee > chai (mostly)', 'night owl', 'Hyderabad born', 'evals before vibes', 'RAG enjoyer',
  'shipped on a Friday once', 'cricket on Sundays', 'reads papers for fun', 'tabs, not spaces',
  'rubber duck debugger', 'one more feature…',
]

const TILES = 24 // × 48px = 1152px per copy; two copies loop seamlessly past any viewport height

function Column({ side }: { side: 'left' | 'right' }) {
  const tiles = Array.from({ length: TILES }, (_, i) => i)
  return (
    <div className={`group/strip fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} z-40 hidden md:block h-full w-12`}>
      <div className="tile-strip flex flex-col group-hover/strip:[animation-play-state:paused]">
        {[0, 1].map((copy) =>
          tiles.map((i) => (
            <div key={`${copy}-${i}`} className="group/tile relative h-12 w-12 p-1" aria-hidden={copy === 1}>
              <svg viewBox="0 0 40 40" className="h-10 w-10 rounded-md bg-[#e35342] transition-transform duration-200 group-hover/tile:scale-110 group-hover/tile:-rotate-6">
                {glyphs[(i + (side === 'right' ? 2 : 0)) % glyphs.length]}
              </svg>
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-hand text-base text-[#e35342] opacity-0 transition-opacity duration-200 group-hover/tile:opacity-100 ${
                  side === 'left' ? 'left-14' : 'right-14'
                }`}
              >
                {labels[(i * 3 + (side === 'right' ? 5 : 0)) % labels.length]}
              </span>
            </div>
          )),
        )}
      </div>
    </div>
  )
}

export function TileBorder() {
  return (
    <>
      <Column side="left" />
      <Column side="right" />
    </>
  )
}
