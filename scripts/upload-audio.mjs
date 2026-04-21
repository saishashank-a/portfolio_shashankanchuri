import { put } from '@vercel/blob'
import { readFileSync } from 'fs'

// load .env.local manually
const env = readFileSync('.env.local', 'utf8')
for (const line of env.split('\n')) {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (!match) continue
  const key = match[1].trim()
  const val = match[2].trim().replace(/^["']|["']$/g, '')
  process.env[key] = val
}

const files = [
  'public/audio/anthropic-four-day-sprint-podcast.m4a',
  'public/audio/anthropic-mythos-podcast.m4a',
  'public/audio/nvidia-ising-podcast.m4a',
  'public/audio/openai-grew-up-podcast.m4a',
  'public/audio/openai-spud-podcast.m4a',
]

for (const file of files) {
  const name = file.split('/').pop()
  console.log(`Uploading ${name}...`)
  const blob = await put(name, readFileSync(file), {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
  console.log(`✓ ${name}\n  ${blob.url}\n`)
}
