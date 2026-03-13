'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, Loader2, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState<string | null>(null)
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email:    email.trim(),
      password,
    })

    if (authError) {
      // Never leak whether the email or the password was wrong.
      setError('Invalid credentials. Please try again.')
      setLoading(false)
      return
    }

    // router.refresh() re-runs server components so the layout picks up the
    // new session cookie before we navigate.
    router.refresh()
    router.push('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm px-4">
        {/* Logotype */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
            <ShieldCheck size={22} />
          </div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark">
            ETAL Admin
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-brand-gray-mid/60 bg-white p-6 shadow-sm">
          <h1 className="mb-1 text-base font-semibold text-brand-dark">Sign in</h1>
          <p className="mb-6 text-xs text-brand-gray">
            Use your admin credentials to access the dashboard.
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 mb-5 font-body text-sm">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-brand-gray"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-admin w-full"
                placeholder="admin@etal.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-brand-gray"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-admin w-full"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 mt-1 justify-center"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center font-body text-[11px] text-white/20 mt-6">
          ETAL © {new Date().getFullYear()} · Restricted access
        </p>
      </div>
    </div>
  )
}
