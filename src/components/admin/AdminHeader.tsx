'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function AdminHeader() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <header className="h-14 bg-white border-b border-brand-gray-mid flex items-center
                       justify-between px-6 flex-shrink-0">
      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gray/50">
        ETAL Admin
      </span>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 font-body text-xs font-medium text-brand-gray
                   hover:text-brand-dark transition-colors"
      >
        <LogOut size={14} />
        Sign Out
      </button>
    </header>
  )
}
