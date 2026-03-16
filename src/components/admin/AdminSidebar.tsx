'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Download, MessageSquare, Settings, ExternalLink, ShieldCheck, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Console', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Inventory', icon: Package },
  { href: '/admin/downloads', label: 'Assets', icon: Download },
  { href: '/admin/messages', label: 'Inbound', icon: MessageSquare },
  { href: '/admin/settings', label: 'System', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-[#FAFAFA] p-4 h-screen sticky top-0">
      
      {/* ── Main Sidebar Capsule ── */}
      <div className="flex flex-col h-full bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-black/[0.02] overflow-hidden">
        
        {/* Header: Brand Identity */}
        <div className="p-8 pb-6">
          <Link href="/admin" className="group flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#131414] text-white shadow-xl shadow-[#131414]/20 transition-transform group-hover:rotate-12 duration-500">
              <Zap size={24} fill="currentColor" className="text-[#229264]" />
            </div>
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#131414]">
                ETAL <span className="text-[#229264]">Core</span>
              </h2>
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-1">
                Admin OS V3.1
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 space-y-2">
          <div className="px-4 mb-4">
            <div className="h-px w-full bg-gray-50" />
          </div>

          {NAV.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-4 px-6 py-4 rounded-full text-[13px] font-bold uppercase tracking-widest transition-all duration-300',
                  active
                    ? 'bg-[#131414] text-white shadow-lg shadow-black/10'
                    : 'text-[#131414]/40 hover:bg-gray-50 hover:text-[#131414]'
                )}
              >
                <Icon 
                  size={18} 
                  className={cn(
                    'transition-all duration-500',
                    active ? 'text-[#229264] scale-110' : 'text-gray-300 group-hover:text-[#131414]'
                  )} 
                />
                <span className="leading-none">{item.label}</span>
                {active && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#229264] animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer: Utility Actions */}
        <div className="p-6 mt-auto">
          <div className="bg-gray-50 rounded-[2rem] p-4 border border-gray-100/50">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-white border border-gray-200 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40 hover:text-[#229264] hover:border-[#229264]/30 transition-all duration-300 shadow-sm"
            >
              <ExternalLink size={14} />
              Live Site
            </Link>
            
            <div className="mt-4 flex items-center justify-center gap-2">
               <ShieldCheck size={12} className="text-[#229264]" />
               <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">
                 System Encrypted
               </span>
            </div>
          </div>
        </div>

      </div>
    </aside>
  )
}