import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const SUPPORTED_LOCALES = ['en', 'ar'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

/** Routes that are outside locale-prefixed navigation (admin, auth, api). */
const SKIP_LOCALE_RE = /^\/(admin|auth|api)(\/|$)/

/** Detect whether the pathname already starts with a supported locale segment. */
function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split('/')[1]
  return SUPPORTED_LOCALES.includes(segment as Locale) ? (segment as Locale) : null
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Static assets / Next internals ────────────────────────────────────────
  // These are excluded by the `config.matcher` below, but guard here too.

  // ── Admin / Auth / API — locale-agnostic, only Supabase session ──────────
  if (SKIP_LOCALE_RE.test(pathname)) {
    return updateSession(request)
  }

  // ── Locale routing for public site pages ──────────────────────────────────
  const locale = getLocaleFromPath(pathname)

  if (!locale) {
    // No locale prefix — redirect to /en{pathname}
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  // Valid locale present — run Supabase session refresh and continue.
  return updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *  - _next/static  (static files)
     *  - _next/image   (image optimisation)
     *  - favicon.ico   (favicon)
     *  - Common static asset extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
  ],
}
