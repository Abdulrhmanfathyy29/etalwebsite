import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader  from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex overflow-hidden">
      
      {/* ── 1️⃣ Fixed Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 shrink-0">
        <AdminSidebar />
      </aside>

      {/* ── 2️⃣ Main Viewport ── */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Top Header Navigation */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <AdminHeader />
        </header>

        {/* ── 3️⃣ Content Canvas (The Pill Frame) ── */}
        <main className="flex-1 overflow-auto bg-[#fafafa] p-4 lg:p-6">
          {/* In the "Soft Pill" style, we treat the main content as a floating card.
              This creates a premium, app-like feel.
          */}
          <div className="min-h-full bg-white rounded-[2.5rem] lg:rounded-[3.5rem] border border-gray-100 shadow-sm p-6 lg:p-10 relative overflow-hidden">
            
            {/* Subtle background industrial accent */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none select-none">
               <div className="font-headline text-[15rem] leading-none tracking-tighter">ETAL</div>
            </div>

            <div className="relative z-10">
              {children}
            </div>

            {/* Bottom Footer Accent */}
            <div className="mt-20 pt-8 border-t border-gray-50 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300">
               <span>System Core v3.1</span>
               <span>Engineering Technology Industrial Group</span>
            </div>
          </div>
        </main>

      </div>
    </div>
  )
}