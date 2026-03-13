import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'ETAL | Electrical Protection Equipment',
    template: '%s | ETAL',
  },
  description:
    'ETAL manufactures precision electrical protection components — current transformers, HRC fuse links, fuse switch disconnectors and busbar supports — for industrial and power distribution applications.',
  keywords: [
    'current transformers', 'HRC fuse links', 'fuse switch disconnectors',
    'busbar supports', 'electrical protection', 'LV protection', 'IEC 60044',
    'ETAL', 'electrical manufacturer', 'Egypt',
  ],
  authors: [{ name: 'ETAL' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'ETAL',
    title: 'ETAL | Electrical Protection Equipment',
    description: 'Engineering precision protection for every point on the LV loop.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ETAL | Electrical Protection Equipment',
    description: 'Engineering precision protection for every point on the LV loop.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#229264',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
