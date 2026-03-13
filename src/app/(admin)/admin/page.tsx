import { createClient } from '@/lib/supabase/server'
import { Package, Download, MessageSquare, Eye, ArrowRight, Plus, Upload } from 'lucide-react'
import Link from 'next/link'

async function getDashboardStats() {
  const supabase = await createClient()

  const [
    { count: products },
    { count: downloads },
    { count: messages },
    { count: unread },
    { data: recentMessages },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('downloads').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  return { products, downloads, messages, unread, recentMessages: recentMessages || [] }
}

export default async function AdminDashboard() {
  const { products, downloads, messages, unread, recentMessages } = await getDashboardStats()

  const STATS = [
    { label: 'Products',  value: products  ?? 0, icon: Package,       href: '/admin/products',  iconBg: 'bg-brand-green/10', iconColor: 'text-brand-green' },
    { label: 'Downloads', value: downloads ?? 0, icon: Download,      href: '/admin/downloads', iconBg: 'bg-blue-50',        iconColor: 'text-blue-500' },
    { label: 'Messages',  value: messages  ?? 0, icon: MessageSquare, href: '/admin/messages',  iconBg: 'bg-violet-50',      iconColor: 'text-violet-500' },
    { label: 'Unread',    value: unread    ?? 0, icon: Eye,           href: '/admin/messages',  iconBg: 'bg-amber-50',       iconColor: 'text-amber-500' },
  ]

  return (
    <div className="space-y-8 max-w-5xl">

      {/* Page header */}
      <div className="pb-6 border-b border-brand-gray-mid">
        <p className="eyebrow mb-2">Admin</p>
        <h1 className="font-headline text-[clamp(1.8rem,4vw,2.5rem)] leading-none text-brand-dark">
          Dashboard
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href} className="stat-card group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${stat.iconBg}`}>
                <Icon size={18} className={stat.iconColor} />
              </div>
              <p className="font-headline text-[2.2rem] leading-none text-brand-dark mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gray">
                {stat.label}
              </p>
              <ArrowRight
                size={13}
                className="absolute top-5 right-5 text-brand-gray/20 group-hover:text-brand-green transition-colors"
              />
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/admin/products/new',     label: 'Add Product',   desc: 'Create a new product listing', icon: Plus },
          { href: '/admin/downloads/upload', label: 'Upload File',   desc: 'Add to the download library',  icon: Upload },
          { href: '/admin/messages',          label: 'View Messages', desc: `${unread ?? 0} unread enquiries`, icon: MessageSquare },
        ].map(({ href, label, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 p-5 rounded-2xl border border-[#e5e7eb] bg-white
                       shadow-[0_1px_3px_rgba(15,23,42,0.04)]
                       hover:border-brand-green/40 hover:shadow-[0_4px_16px_rgba(34,146,100,0.08)]
                       transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-full bg-brand-green/[0.08] flex items-center justify-center shrink-0
                            group-hover:bg-brand-green/15 transition-colors">
              <Icon size={16} className="text-brand-green" />
            </div>
            <div className="min-w-0">
              <p className="font-body font-semibold text-sm text-brand-dark group-hover:text-brand-green transition-colors">
                {label}
              </p>
              <p className="font-body text-xs text-brand-gray mt-0.5">{desc}</p>
            </div>
            <ArrowRight size={13} className="ml-auto text-brand-gray/20 group-hover:text-brand-green transition-colors shrink-0" />
          </Link>
        ))}
      </div>

      {/* Recent messages */}
      <div className="panel overflow-hidden">
        <div className="panel-header">
          <span>Recent Messages</span>
          <Link
            href="/admin/messages"
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-green hover:text-brand-dark transition-colors"
          >
            View all
          </Link>
        </div>

        {recentMessages.length > 0 ? (
          <div className="divide-y divide-[#f3f4f6]">
            {recentMessages.map((msg: any) => (
              <Link
                key={msg.id}
                href={`/admin/messages/${msg.id}`}
                className="flex items-start gap-4 px-6 py-4 hover:bg-[#fafafa] transition-colors group"
              >
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  msg.status === 'unread' ? 'bg-brand-green' : 'bg-brand-gray-mid'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-body font-semibold text-sm text-brand-dark group-hover:text-brand-green transition-colors truncate">
                      {msg.name}
                    </p>
                    {msg.company && (
                      <span className="font-body text-xs text-brand-gray shrink-0">· {msg.company}</span>
                    )}
                  </div>
                  <p className="font-body text-xs text-brand-gray mt-0.5 truncate">{msg.subject}</p>
                </div>
                <span className="font-body text-[10px] text-brand-gray shrink-0 mt-0.5">
                  {new Date(msg.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="panel-body py-12 text-center font-body text-sm text-brand-gray">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  )
}
