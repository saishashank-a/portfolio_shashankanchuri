'use client'

import { useState } from 'react'

const POST_URL = 'https://shashankanchuri.space/blog/anthropic-mythos-glasswing-double-play'
const POST_TITLE = 'Capability × Capacity: Anthropic\'s Double Play That Defines the Next Phase of AI'

export function ShareBar() {
  const [copied, setCopied] = useState(false)

  async function handleNativeShare() {
    if (navigator.share) {
      await navigator.share({ title: POST_TITLE, url: POST_URL })
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(POST_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(POST_TITLE)}&url=${encodeURIComponent(POST_URL)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(POST_URL)}`

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-mono text-[var(--secondary)] uppercase tracking-wider">Share</span>

      <button onClick={handleCopy} className="share-btn" aria-label="Copy link">
        {copied ? (
          <>
            <CheckIcon /> Copied
          </>
        ) : (
          <>
            <LinkIcon /> Copy link
          </>
        )}
      </button>

      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on X">
        <XIcon /> X
      </a>

      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on LinkedIn">
        <LinkedInIcon /> LinkedIn
      </a>

      {typeof navigator !== 'undefined' && !!navigator.share && (
        <button onClick={handleNativeShare} className="share-btn" aria-label="Share">
          <ShareIcon /> More
        </button>
      )}
    </div>
  )
}

function LinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 1200 1227" fill="currentColor">
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}
