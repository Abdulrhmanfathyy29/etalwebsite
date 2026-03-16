'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, ShieldCheck, User, ChevronRight } from 'lucide-react'

export default function AdminHeader() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <div className="px-6 py-4 sticky top-0 z-50">
      {/* ── Floating Header Capsule ── */}
      <header className="h-16 bg-white/70 backdrop-blur-xl border border-gray-100 rounded-full flex items-center justify-between px-8 shadow-2xl shadow-black/[0.02]">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#229264]/10 text-[#229264]">
            <ShieldCheck size={20} strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[11px] uppercase tracking-[0.25em] text-[#131414] leading-none mb-1">
              ETAL <span className="text-[#229264]">Admin</span>
            </span>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-300 uppercase tracking-widest">
              <span className="h-1 w-1 rounded-full bg-[#229264] animate-pulse" />
              Secure Environment
            </div>
          </div>
        </div>

        {/* Right: User Actions */}
        <div className="flex items-center gap-2">
          {/* Active Session Pill (Visual Only) */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mr-2 group cursor-default">
             <div className="h-5 w-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-[#229264] transition-colors">
                <User size={12} />
             </div>
             <span className="text-[10px] font-bold text-[#131414]/40 uppercase tracking-widest">Operator Mode</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#131414] text-white font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-red-600 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 active:scale-95 group"
          >
            <span>Sign Out</span>
            <LogOut size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </header>

      {/* Decorative Gradient Line (Bottom Accent) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#229264]/20 to-transparent" />
    </div>
  )
}