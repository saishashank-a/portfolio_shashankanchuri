import { put } from '@vercel/blob'
import { readFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf8')
for (const line of env.split('\n')) {
  const m = line.match(/^([^=]+)=(.*)$/)
  if (!m) continue
  process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '')
}

const file = process.argv[2]
if (!file) {
  console.error('usage: node scripts/upload-one.mjs <path>')
  process.exit(1)
}
const blob = await put(file.split('/').pop(), readFileSync(file), {
  access: 'public',
  token: process.env.BLOB_READ_WRITE_TOKEN,
  allowOverwrite: true,
})
console.log(blob.url)
