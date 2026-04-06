'use client'

import { useRef, useState, useEffect } from 'react'

export function AudioPlayer({ src, title = 'TurboQuant: How Google just made AI 6x cheaper' }: { src: string; title?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100 || 0)
    }
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => setPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * audio.duration
  }

  function fmt(s: number) {
    if (!isFinite(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] rounded-sm p-4 my-8">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-4">
        {/* Play/pause button */}
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause podcast' : 'Play podcast'}
          className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0 hover:bg-[var(--accent-hover)] transition-colors"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
              <rect x="2" y="1" width="4" height="12" rx="1" />
              <rect x="8" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
              <path d="M3 1.5L12 7L3 12.5V1.5Z" />
            </svg>
          )}
        </button>

        {/* Label */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-mono text-[var(--accent)] mb-1">NotebookLM Podcast</p>
          <p className="text-sm text-[var(--fg)] truncate">{title}</p>
        </div>

        {/* Time */}
        <span className="text-xs font-mono text-[var(--secondary)] shrink-0 tabular-nums">
          {fmt(currentTime)} / {fmt(duration)}
        </span>
      </div>

      {/* Progress bar */}
      <div
        role="slider"
        aria-label="Seek"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className="mt-3 h-1.5 bg-[var(--border)] rounded-full cursor-pointer relative"
        onClick={seek}
        onKeyDown={(e) => {
          const audio = audioRef.current
          if (!audio) return
          if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.currentTime + 10, audio.duration)
          if (e.key === 'ArrowLeft') audio.currentTime = Math.max(audio.currentTime - 10, 0)
        }}
      >
        <div
          className="h-full bg-[var(--accent)] rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
