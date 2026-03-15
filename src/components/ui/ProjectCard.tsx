'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'

type Props = {
  project: Project
}

export function ProjectCard({ project }: Props) {
  return (
    <motion.article
      className="group relative border border-[#1f1f1f] bg-[#111111] rounded-sm p-6 flex flex-col gap-4"
      whileHover={{
        scale: 1.02,
        filter: 'drop-shadow(0 0 16px rgba(59,130,246,0.35))',
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Featured badge */}
      {project.featured && (
        <span className="absolute top-4 right-4 text-[10px] font-mono text-[#3b82f6] border border-[#3b82f6]/30 px-2 py-0.5 rounded-full">
          Featured
        </span>
      )}

      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-base font-semibold text-[#f5f5f5] pr-16">{project.title}</h3>

        {project.impact && (
          <p className="text-sm italic text-[#888888] line-clamp-2">{project.impact}</p>
        )}

        <p className="text-sm text-[#666666] leading-relaxed">{project.description}</p>
      </div>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-mono text-[#888888] bg-[#080808] border border-[#1f1f1f] px-2 py-0.5 rounded-sm"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 pt-2 border-t border-[#1f1f1f]">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#3b82f6] hover:underline inline-flex items-center gap-1"
        >
          View on GitHub
          <ExternalLink size={12} aria-hidden="true" />
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#888888] hover:text-[#f5f5f5] inline-flex items-center gap-1 transition-colors"
          >
            Live Demo
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  )
}
