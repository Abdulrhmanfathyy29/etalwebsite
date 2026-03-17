'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'ع' },
] as const

type Locale = 'en' | 'ar'

function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/')[1]
  return segment === 'ar' ? 'ar' : 'en'
}

function switchLocale(pathname: string, targetLocale: Locale): string {
  const currentLocale = getLocaleFromPath(pathname)
  if (currentLocale === targetLocale) return pathname

  // Replace the first path segment (locale) with the target locale.
  // /en/products/slug → /ar/products/slug
  return pathname.replace(/^\/(en|ar)(\/|$)/, `/${targetLocale}$2`)
}

export default function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const currentLocale = getLocaleFromPath(pathname)

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 rounded-lg border border-[#e5e7eb] bg-white p-0.5',
        className
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((locale, idx) => {
        const isActive = currentLocale === locale.code
        return (
          <Link
            key={locale.code}
            href={switchLocale(pathname, locale.code as Locale)}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'min-w-[2rem] rounded-md px-2.5 py-1 text-center text-[11px] font-bold tracking-wide transition-all duration-150',
              isActive
                ? 'bg-brand-green text-white shadow-sm'
                : 'text-brand-gray hover:text-brand-dark',
              // Divider between options
              idx > 0 && !isActive && 'border-s border-[#e5e7eb]'
            )}
          >
            {locale.label}
          </Link>
        )
      })}
    </div>
  )
}
