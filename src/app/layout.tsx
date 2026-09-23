import type { Metadata } from 'next'
import { Inter, Geist_Mono, Gochi_Hand, Fraunces } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/ui/Cursor'
import { TileBorder } from '@/components/ui/TileBorder'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  adjustFontFallback: true,
})

const hand = Gochi_Hand({
  variable: '--font-hand',
  weight: '400',
  subsets: ['latin'],
})

const serif = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
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
      <body className={`${inter.variable} ${geistMono.variable} ${hand.variable} ${serif.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen overflow-x-clip">
            <Cursor />
            <TileBorder />
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
