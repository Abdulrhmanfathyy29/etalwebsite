'use client'

import { useEffect } from 'react'

/**
 * Sets lang and dir on <html> based on the current locale.
 * Must be a client component because document is not available server-side.
 * Renders nothing — purely a side-effect component.
 */
export default function LocaleAttributes({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  return null
}
