import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// The single path that is always public, even without a session.
const LOGIN_PATH = '/auth/login'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // Guard: env vars might be absent during the very first cold-start or if the
  // .env file has not been configured yet. Return early so the page itself can
  // render an informative error rather than crashing in the Edge runtime.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        // Propagate the updated cookies onto the request object so that
        // subsequent Server Component reads see the refreshed session.
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        // Re-build the response so the Set-Cookie headers reach the browser.
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(
            name,
            value,
            options as Parameters<typeof supabaseResponse.cookies.set>[2]
          )
        )
      },
    },
  })

  // Always use getUser() — it verifies the JWT server-side.
  // getSession() trusts the cookie without verification and must never be used
  // for access control decisions.
  let user = null
  try {
    const { data, error } = await supabase.auth.getUser()
    if (!error && data?.user) {
      user = data.user
    }
  } catch {
    // Network failure or Supabase unreachable. Fail open so the public site
    // stays accessible; the server-side layout guard is the safety net.
  }

  const { pathname } = request.nextUrl

  // ── Login page ────────────────────────────────────────────────────────────
  // The login page lives at /auth/login — completely outside the /admin tree —
  // so it never touches the admin layout and can never cause a redirect loop.
  if (pathname === LOGIN_PATH) {
    if (user) {
      // Already authenticated → skip the login page and go straight to admin.
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
    // Not authenticated → allow through unconditionally.
    return supabaseResponse
  }

  // ── Protected admin routes ────────────────────────────────────────────────
  if (pathname.startsWith('/admin') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = LOGIN_PATH
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
