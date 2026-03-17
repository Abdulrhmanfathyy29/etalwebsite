import { Poppins, Cairo } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LocaleAttributes from '@/components/LocaleAttributes'
import { getDictionary } from '@/lib/getDictionary'
import type { Metadata, Viewport } from 'next'
import '../globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
})

type Locale = 'en' | 'ar'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'ETAL | Electrical Protection Equipment', template: '%s | ETAL' },
  description: 'ETAL manufactures precision electrical protection components — current transformers, HRC fuse links, fuse switch disconnectors and busbar supports — for industrial and power distribution applications.',
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#229264',
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isArabic = locale === 'ar'

  return (
    <div
      className={cn(
        poppins.variable,
        cairo.variable,
        'relative min-h-screen flex flex-col bg-[#FAFAFA] selection:bg-[#229264]/20 selection:text-[#229264]'
      )}
      style={{
        '--font-primary': `var(${isArabic ? '--font-cairo' : '--font-poppins'})`,
        fontFamily: 'var(--font-primary)',
      } as React.CSSProperties}
    >
      {/* Sets lang= and dir= on <html> after hydration */}
      <LocaleAttributes locale={locale} />

      {/* Atmospheric background grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#131414_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white via-transparent to-transparent opacity-60" />
      </div>

      <header className="relative z-50">
        <Navbar dict={dict} locale={locale} />
      </header>

      <main className="relative z-10 flex-1 flex flex-col w-full max-w-[1920px] mx-auto overflow-x-hidden">
        <div className="flex-1 w-full animate-in fade-in duration-700">
          {children}
        </div>
      </main>

      <footer className="relative z-10 mt-auto bg-white rounded-t-[3.5rem] border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <Footer dict={dict} locale={locale} />
      </footer>

      <div className="fixed bottom-10 start-10 hidden xl:block pointer-events-none opacity-10">
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-[#131414]">
          Engineering Excellence // {new Date().getFullYear()}
        </span>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}
