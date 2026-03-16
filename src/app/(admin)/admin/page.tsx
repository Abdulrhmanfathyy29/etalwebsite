import { createClient } from '@/lib/supabase/server'
import { Package, Download, MessageSquare, Eye, ArrowRight, Plus, Upload, Activity, ShieldCheck, Inbox } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
    { label: 'Products',  value: products  ?? 0, icon: Package,       href: '/admin/products',  color: '#229264' },
    { label: 'Downloads', value: downloads ?? 0, icon: Download,      href: '/admin/downloads', color: '#3b82f6' },
    { label: 'Messages',  value: messages  ?? 0, icon: MessageSquare, href: '/admin/messages',  color: '#8b5cf6' },
    { label: 'Unread',    value: unread    ?? 0, icon: Eye,           href: '/admin/messages',  color: '#f59e0b' },
  ]

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20 animate-fade-in">

      {/* ── 1️⃣ Header Console ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#229264]/10 border border-[#229264]/20 text-[#229264] text-[10px] font-bold uppercase tracking-widest">
            <Activity size={12} /> System Overview
          </div>
          <h1 className="font-headline font-bold text-[#131414] leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            Control <span className="text-[#229264]">Center.</span>
          </h1>
          <p className="text-[14px] text-[#131414]/50 font-medium italic">
            Monitoring global technical assets and inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-[11px] font-bold text-gray-400">
           <ShieldCheck size={14} className="text-[#229264]" />
           <span>Secure Session Active</span>
        </div>
      </div>

      {/* ── 2️⃣ Metric Capsules ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <Link 
              key={stat.label} 
              href={stat.href} 
              className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-black/[0.03] hover:-translate-y-2 overflow-hidden"
            >
              {/* Floating background icon */}
              <Icon size={80} strokeWidth={0.5} className="absolute -top-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500 group-hover:scale-110" style={{ color: stat.color }} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-500" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                    <Icon size={22} />
                  </div>
                  <ArrowRight size={16} className="text-gray-200 group-hover:text-[#131414] transition-all group-hover:translate-x-1" />
                </div>
                
                <p className="font-headline text-[2.8rem] leading-none text-[#131414] mb-1 tracking-tighter">
                  {stat.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/30 group-hover:text-[#229264] transition-colors">
                  {stat.label}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-10">
        
        {/* ── 3️⃣ Command Shortcuts ── */}
        <div className="space-y-6">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#131414]/30 px-4">Fast Deployment</h3>
          <div className="grid gap-4">
            {[
              { href: '/admin/products/new',     label: 'Add Product',   desc: 'New Technical Blueprint', icon: Plus },
              { href: '/admin/downloads/upload', label: 'Upload Asset',   desc: 'Technical Documentation',  icon: Upload },
              { href: '/admin/messages',          label: 'Inquiries',     desc: `${unread ?? 0} Pending Actions`, icon: Inbox },
            ].map(({ href, label, desc, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-gray-100 transition-all duration-500 hover:border-[#229264]/30 hover:shadow-xl hover:shadow-[#229264]/5"
              >
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#229264] group-hover:text-white transition-all duration-500 shadow-inner">
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-[#131414] group-hover:text-[#229264] transition-colors leading-tight">
                    {label}
                  </p>
                  <p className="text-[11px] text-[#131414]/40 mt-1 font-medium">{desc}</p>
                </div>
                <ArrowRight size={14} className="text-gray-200 group-hover:text-[#229264] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── 4️⃣ Activity Stream (Recent Messages) ── */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
            <div className="flex items-center gap-3">
               <div className="h-8 w-8 rounded-full bg-[#229264]/10 flex items-center justify-center text-[#229264]">
                  <MessageSquare size={16} />
               </div>
               <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#131414]/40">Live Inquiries</h3>
            </div>
            <Link
              href="/admin/messages"
              className="px-4 py-2 rounded-full bg-[#131414] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#229264] transition-all"
            >
              Archive
            </Link>
          </div>

          <div className="flex-1 divide-y divide-gray-50">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg: any) => (
                <Link
                  key={msg.id}
                  href={`/admin/messages`}
                  className="flex items-center gap-5 px-8 py-6 hover:bg-[#fcfcfc] transition-all group relative"
                >
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full shrink-0 animate-pulse",
                    msg.status === 'unread' ? 'bg-[#229264]' : 'bg-gray-200'
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-[14px] text-[#131414] group-hover:text-[#229264] transition-colors truncate">
                        {msg.name}
                      </p>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                        {msg.company ? `· ${msg.company}` : ''}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#131414]/40 font-medium truncate">{msg.subject}</p>
                  </div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                    {new Date(msg.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-gray-50 flex items-center justify-center text-gray-200">
                   <Inbox size={24} />
                </div>
                <p className="text-[13px] text-gray-400 font-medium">Inbox is empty</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer System Branding */}
      <div className="px-8 flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-[#131414]/20">
         <div className="h-1.5 w-1.5 rounded-full bg-[#229264]" />
         <span>Asset Security Active</span>
         <div className="h-1.5 w-1.5 rounded-full bg-gray-200 ml-auto" />
         <span>V_3.1.0_PRO</span>
      </div>
    </div>
  )
}