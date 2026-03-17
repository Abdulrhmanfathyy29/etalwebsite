export type Locale = 'en' | 'ar'

export type Dictionary = typeof import('../../dictionaries/en.json')

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('../../dictionaries/en.json').then((m) => m.default),
  ar: () => import('../../dictionaries/ar.json').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries.en
  return loader()
}
