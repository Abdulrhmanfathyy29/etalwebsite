'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Download, MessageSquare, Settings, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/downloads', label: 'Downloads', icon: Download },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <aside className="hidden min-h-screen w-60 shrink-0 border-r border-brand-gray-mid/60 bg-white lg:flex lg:flex-col">
      <div className="border-b border-brand-gray-mid/60 px-5 py-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/5 px-3 py-1">
          <span className="h-6 w-6 rounded-full bg-brand-green text-xs font-semibold text-white flex items-center justify-center">
            E
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-dark">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-brand-green/5 text-brand-dark'
                  : 'text-brand-gray hover:bg-brand-gray-light/80 hover:text-brand-dark'
              )}
            >
              <Icon size={16} className={active ? 'text-brand-green' : 'text-brand-gray'} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-brand-gray-mid/60 px-4 py-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-brand-gray hover:bg-brand-gray-light/80 hover:text-brand-dark"
        >
          <ExternalLink size={13} />
          View website
        </Link>
      </div>
    </aside>
  )
}
