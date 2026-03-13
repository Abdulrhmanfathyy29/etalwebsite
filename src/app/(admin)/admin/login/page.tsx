/**
 * This stub exists only to ensure that any direct visit to /admin/login
 * (e.g. an old bookmark) is silently forwarded to the real login page.
 *
 * The middleware intercepts unauthenticated /admin/* requests and redirects
 * to /auth/login before this file ever renders, so this is purely a
 * belt-and-braces fallback.
 */
import { redirect } from 'next/navigation'

export default function OldAdminLoginStub() {
  redirect('/auth/login')
}
