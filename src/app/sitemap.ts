import type { MetadataRoute } from 'next'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const BASE = 'https://shashankanchuri.space'

export default function sitemap(): MetadataRoute.Sitemap {
  // ponytail: blog posts are route folders, so the filesystem is the source of truth
  const posts = readdirSync(join(process.cwd(), 'src/app/blog'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => ({ url: `${BASE}/blog/${d.name}`, changeFrequency: 'monthly' as const, priority: 0.6 }))

  return [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/debrief`, changeFrequency: 'daily', priority: 0.5 },
    ...posts,
  ]
}
