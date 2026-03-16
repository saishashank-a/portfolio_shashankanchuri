import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  adjustFontFallback: true,
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'portfolio-ShashankAnchuri',
  description:
    'AI Engineer building intelligent systems across the full stack. RAG pipelines, AIOps, mobile apps, and published ML research.',
  openGraph: {
    title: 'portfolio-ShashankAnchuri',
    description:
      'AI Engineer building intelligent systems across the full stack.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'portfolio-ShashankAnchuri',
    description:
      'AI Engineer building intelligent systems across the full stack.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
