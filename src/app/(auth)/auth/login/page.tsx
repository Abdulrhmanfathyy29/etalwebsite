'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, Loader2, ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react'

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
      setError('Invalid credentials. Please try again.')
      setLoading(false)
      return
    }

    router.refresh()
    router.push('/admin')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#fafafa] overflow-hidden p-6">
      
      {/* ── 1️⃣ Atmospheric Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ 
               backgroundImage: `radial-gradient(#229264 0.5px, transparent 0.5px), linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
               backgroundSize: '24px 24px, 48px 48px, 48px 48px'
             }} 
        />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#229264]/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#229264]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-[420px] z-10">
        
        {/* ── 2️⃣ Branding ── */}
        <div className="mb-10 text-center">
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-[#229264]/20 rounded-full blur-xl group-hover:bg-[#229264]/30 transition-all duration-500" />
            <div className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm text-[#229264]">
              <ShieldCheck size={28} strokeWidth={1.5} />
            </div>
          </div>
          
          <div className="flex justify-center mb-4">
             <Image 
                src="/logooo.png" 
                alt="ETAL" 
                width={120} 
                height={40} 
                className="h-8 w-auto object-contain"
             />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#131414]/30">
            Internal Access Protocol
          </p>
        </div>

        {/* ── 3️⃣ Login Capsule ── */}
        <div className="bg-white rounded-[3rem] border border-gray-100 p-8 md:p-10 shadow-2xl shadow-black/[0.03] transition-all duration-500">
          <div className="mb-8">
            <h1 className="text-2xl font-headline font-bold text-[#131414] tracking-tight">Sign in</h1>
            <p className="text-[13px] text-[#131414]/40 font-medium mt-1">Authorized personnel only.</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-5 py-3.5 rounded-2xl mb-6 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={16} />
              <p className="text-xs font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="ml-1 text-[11px] font-bold uppercase tracking-widest text-[#131414]/40">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#229264] transition-colors">
                   <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-full bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#229264] focus:ring-4 focus:ring-[#229264]/10 outline-none transition-all text-sm font-medium"
                  placeholder="admin@etal.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="ml-1 text-[11px] font-bold uppercase tracking-widest text-[#131414]/40">
                Security Key
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#229264] transition-colors">
                   <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-full bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#229264] focus:ring-4 focus:ring-[#229264]/10 outline-none transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-3 bg-[#131414] hover:bg-[#229264] text-white py-4 px-6 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-xl hover:shadow-[#229264]/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-300">
           <span>ETAL Industrial</span>
           <div className="w-1 h-1 rounded-full bg-gray-200" />
           <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}