import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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
  title: 'Shashank Anchuri — AI Engineer',
  description:
    'AI Engineer building intelligent systems across the full stack. RAG pipelines, AIOps, mobile apps, and published ML research.',
  openGraph: {
    title: 'Shashank Anchuri — AI Engineer',
    description:
      'AI Engineer building intelligent systems across the full stack.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shashank Anchuri — AI Engineer',
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
