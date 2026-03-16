'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
        >
          <span className="text-[var(--accent)]">Shashank</span> Anchuri
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop social icons + theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://github.com/saishashank-a"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/sai-shashank-anchuri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
          >
            <Linkedin size={18} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] px-6 pb-6"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-sm text-[var(--secondary)] hover:text-[var(--fg)] transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-2 border-t border-[var(--border)]">
                <ThemeToggle />
                <a
                  href="https://github.com/saishashank-a"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/sai-shashank-anchuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="text-[var(--secondary)] hover:text-[var(--fg)] transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
