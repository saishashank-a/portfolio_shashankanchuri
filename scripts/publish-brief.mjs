#!/usr/bin/env node
/**
 * Morning Debrief → Portfolio publisher
 *
 * Reads the day's domain outputs (output/*.md), assembles them into structured
 * markdown, writes src/data/debrief.json in the Portfolio repo, commits + pushes
 * so Vercel redeploys, then sends an email via Resend.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { execFileSync } from 'child_process'
import { Resend } from 'resend'

const __dirname = dirname(fileURLToPath(import.meta.url))
// In GitHub Actions: both roots are the repo root (GITHUB_WORKSPACE).
// Locally (debrief/ sibling repo layout): DEBRIEF_ROOT = debrief/, PORTFOLIO_ROOT = ../Portfolio.
const IS_CI = !!process.env.GITHUB_WORKSPACE
const REPO_ROOT = IS_CI ? process.env.GITHUB_WORKSPACE : null
const DEBRIEF_ROOT = REPO_ROOT ?? resolve(__dirname, '..')
const PORTFOLIO_ROOT = REPO_ROOT ?? resolve(DEBRIEF_ROOT, '../Portfolio')
const OUTPUT_JSON = join(PORTFOLIO_ROOT, 'src/data/debrief.json')

// ─── Config ─────────────────────────────────────────────────────────────────
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_4fPg532j_PZtXxg34tu1EMx5k7Jny7ug1'
const FROM_ADDR = 'Morning Debrief <debrief@shashankanchuri.space>'
const DEBRIEF_URL = 'https://shashankanchuri.space/debrief'

// Separate audience from the blog NotifyForm — create this in Resend UI and paste ID here.
// Until set, falls back to hardcoded recipients below.
const DEBRIEF_AUDIENCE_ID = process.env.DEBRIEF_AUDIENCE_ID || ''
const FALLBACK_RECIPIENTS = (process.env.DEBRIEF_RECIPIENTS || 'shashankanchuri@gmail.com')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

const DOMAINS = [
  { slug: 'geopolitics', emoji: '🌎', title: 'Geopolitics' },
  { slug: 'ai', emoji: '🧠', title: 'Artificial Intelligence' },
  { slug: 'india', emoji: '🇮🇳', title: 'India' },
  { slug: 'markets', emoji: '📈', title: 'Markets' },
  { slug: 'stocks', emoji: '💹', title: 'Stocks' },
  { slug: 'tech', emoji: '🏗', title: 'Tech & Startups' },
  { slug: 'health', emoji: '🩹', title: 'Health & Science' },
  { slug: 'culture', emoji: '🎤', title: 'Culture & World' },
]

// ─── Parse a domain file into structured stories ─────────────────────────────
function parseDomain(raw) {
  const stories = []
  const chunks = raw.split(/^##\s*STORY\s*\d+/m).slice(1)

  for (const chunk of chunks) {
    if (/STORY\s*\d+\s*SKIPPED/i.test(chunk)) continue

    // Strip markdown bold so **HEADLINE:** and HEADLINE: parse the same
    const clean = chunk.replace(/\*\*([A-Z][A-Z\s]*?):\*\*/g, '$1:')

    const pick = (label) => {
      const re = new RegExp(
        `^${label}:\\s*([\\s\\S]*?)(?=^(?:HEADLINE|OPENING|WHY IT MATTERS|ACTION|SOURCES):|$)`,
        'im'
      )
      const m = clean.match(re)
      return m ? m[1].trim() : ''
    }

    const headline = pick('HEADLINE')
    const opening = pick('OPENING')
    const whyItMatters = pick('WHY IT MATTERS')
    const action = pick('ACTION')
    const sources = pick('SOURCES')

    if (!headline) continue
    stories.push({ headline, opening, whyItMatters, action, sources })
  }
  return stories
}

// ─── Render stories to markdown ──────────────────────────────────────────────
function shortDomain(url) {
  try {
    return new URL(url.trim()).hostname.replace(/^www\./, '')
  } catch {
    return url.trim()
  }
}

function renderSources(sources) {
  if (!sources) return ''
  const urls = sources.split('|').map((s) => s.trim()).filter(Boolean)
  const links = urls.map((u) => `[${shortDomain(u)}](${u})`).join(' · ')
  return `\n\n*Sources: ${links}*`
}

function renderStory(story) {
  return [
    `### ${story.headline}`,
    '',
    story.opening,
    '',
    `**Why it matters.** ${story.whyItMatters}`,
    '',
    `**Action.** ${story.action}${renderSources(story.sources)}`,
  ].join('\n')
}

function renderDomain(domain, stories) {
  if (stories.length === 0) return ''
  const body = stories.map(renderStory).join('\n\n---\n\n')
  return `## ${domain.emoji} ${domain.title}\n\n${body}`
}

function assembleMarkdown() {
  const sections = []
  let renderedCount = 0

  for (const domain of DOMAINS) {
    const path = join(DEBRIEF_ROOT, 'output', `${domain.slug}.md`)
    if (!existsSync(path)) continue
    const raw = readFileSync(path, 'utf8')
    if (raw.trim().length < 100) continue
    const stories = parseDomain(raw)
    const section = renderDomain(domain, stories)
    if (section) {
      sections.push(section)
      renderedCount++
    }
  }

  if (renderedCount === 0) {
    throw new Error('No domain sections produced — refusing to publish empty brief.')
  }

  return { markdown: sections.join('\n\n'), renderedCount }
}

// ─── Git (execFileSync — no shell, no injection surface) ─────────────────────
function git(args) {
  return execFileSync('git', args, { cwd: PORTFOLIO_ROOT, encoding: 'utf8' }).trim()
}

function gitPush(dateStr) {
  git(['add', 'src/data/debrief.json'])
  const staged = git(['diff', '--cached', '--stat'])
  if (!staged) {
    console.log('No changes to debrief.json — skipping commit.')
    return false
  }
  git(['commit', '-m', `chore: daily debrief ${dateStr}`])
  git(['push', 'origin', 'main'])
  return true
}

// ─── Send Resend email ───────────────────────────────────────────────────────
async function sendEmail({ dateLabel, markdown }) {
  const resend = new Resend(RESEND_API_KEY)

  let recipients = FALLBACK_RECIPIENTS
  if (DEBRIEF_AUDIENCE_ID) {
    const { data, error } = await resend.contacts.list({ audienceId: DEBRIEF_AUDIENCE_ID })
    if (error) throw new Error(`Failed to fetch contacts: ${JSON.stringify(error)}`)
    recipients = data.data.filter((c) => !c.unsubscribed).map((c) => c.email)
  }

  if (recipients.length === 0) {
    console.log('No recipients — skipping email.')
    return
  }

  const subject = `☀ Morning Debrief — ${dateLabel}`
  const html = buildEmailHtml({ dateLabel, markdown })

  for (const to of recipients) {
    const { error } = await resend.emails.send({
      from: FROM_ADDR,
      to,
      subject,
      headers: { 'List-Unsubscribe': '<mailto:unsubscribe@shashankanchuri.space>' },
      html,
    })
    if (error) console.error(`✗ Failed to send to ${to}:`, error)
    else console.log(`✓ Sent to ${to}`)
  }
}

function buildEmailHtml({ dateLabel, markdown }) {
  const firstHeadlineMatch = markdown.match(/^###\s+(.+)$/m)
  const teaserHeadline = firstHeadlineMatch ? firstHeadlineMatch[1] : "Today's Briefing"

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border-radius:8px;padding:40px;max-width:560px;width:100%;">
        <tr><td>
          <p style="margin:0 0 8px;font-size:12px;color:#666;font-family:monospace;text-transform:uppercase;letter-spacing:2px;">Morning Debrief · ${dateLabel}</p>
          <h1 style="margin:0 0 16px;font-size:22px;color:#f5f5f5;font-weight:600;line-height:1.3;">Today's briefing is live.</h1>
          <p style="margin:0 0 8px;font-size:15px;color:#aaa;line-height:1.7;">Top story:</p>
          <p style="margin:0 0 28px;font-size:16px;color:#f5f5f5;font-weight:500;line-height:1.5;">${teaserHeadline}</p>
          <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
            <tr><td style="background:#FF6B00;border-radius:6px;">
              <a href="${DEBRIEF_URL}" style="display:inline-block;padding:13px 28px;color:#fff;text-decoration:none;font-size:14px;font-weight:600;">Read the full debrief →</a>
            </td></tr>
          </table>
          <p style="margin:0;font-size:12px;color:#666;line-height:1.5;">Compiled fresh this morning · Geopolitics · AI · India · Markets · Tech · more</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const DRY_RUN = process.argv.includes('--dry-run')
  const now = new Date()
  const dateISO = now.toISOString().slice(0, 10)
  const dateLabel = now.toLocaleDateString('en-US', {
    timeZone: 'Asia/Kolkata',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  console.log(`[publish-brief] Assembling markdown for ${dateISO}...`)
  const { markdown, renderedCount } = assembleMarkdown()
  console.log(`[publish-brief] ${renderedCount} domains rendered.`)

  const payload = {
    date: dateLabel,
    generatedAt: now.toISOString(),
    content: markdown,
  }
  writeFileSync(OUTPUT_JSON, JSON.stringify(payload, null, 2) + '\n')
  console.log(`[publish-brief] Wrote ${OUTPUT_JSON}`)

  const archivePath = join(DEBRIEF_ROOT, 'briefings', `briefing-${dateISO}.md`)
  mkdirSync(join(DEBRIEF_ROOT, 'briefings'), { recursive: true })
  writeFileSync(archivePath, `# Morning Debrief — ${dateLabel}\n\n${markdown}\n`)
  console.log(`[publish-brief] Archived to ${archivePath}`)

  if (DRY_RUN) {
    console.log('[publish-brief] DRY RUN — skipping git push and email.')
    console.log('[publish-brief] Done.')
    return
  }

  const pushed = gitPush(dateISO)
  if (pushed) console.log('[publish-brief] Pushed to portfolio — Vercel will redeploy.')

  await sendEmail({ dateLabel, markdown })
  console.log('[publish-brief] Done.')
}

main().catch((err) => {
  console.error('[publish-brief] FATAL:', err)
  process.exit(1)
})
