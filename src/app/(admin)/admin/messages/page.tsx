import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import MessageActions from './MessageActions'
import Link from 'next/link'
import { Inbox, Mail, Building2, Globe2, Calendar } from 'lucide-react'

interface Props {
  searchParams: Promise<{ status?: string }>
}

const STATUS_OPTIONS = [
  { value: 'all',     label: 'All Activity' },
  { value: 'unread',  label: 'Unread' },
  { value: 'read',    label: 'Read' },
  { value: 'replied', label: 'Replied' },
]

async function getMessages(status: string) {
  const supabase = await createClient()
  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (status !== 'all') query = query.eq('status', status)

  const { data } = await query
  return data || []
}

export default async function MessagesPage({ searchParams }: Props) {
  const { status = 'all' } = await searchParams
  const messages = await getMessages(status)

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20">

      {/* ── 1️⃣ Header Section ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#229264]/10 border border-[#229264]/20 text-[#229264] text-[10px] font-bold uppercase tracking-widest">
            <Inbox size={12} /> Communication Hub
          </div>
          <h1 className="font-headline font-bold text-[#131414] leading-tight" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Inbox <span className="text-[#229264]">Manager.</span>
          </h1>
          <p className="text-[14px] text-[#131414]/50 font-medium">
            Manage customer inquiries and technical support requests.
          </p>
        </div>
      </div>

      {/* ── 2️⃣ Filter Tabs (Pill Navigation) ── */}
      <div className="flex gap-2 flex-wrap bg-white p-2 rounded-full border border-gray-100 shadow-sm w-fit">
        {STATUS_OPTIONS.map((opt) => (
          <Link
            key={opt.value}
            href={`/admin/messages?status=${opt.value}`}
            className={`px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all duration-300
              ${status === opt.value
                ? 'bg-[#229264] text-white shadow-lg shadow-[#229264]/20'
                : 'text-[#131414]/40 hover:text-[#131414] hover:bg-gray-50'}`}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      {/* ── 3️⃣ Messages Feed (Pill Container) ── */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {messages.length > 0 ? (
            messages.map((msg: any) => (
              <div
                key={msg.id}
                className={`relative p-8 transition-all duration-300 hover:bg-[#fcfcfc] group ${
                  msg.status === 'unread' ? 'bg-[#229264]/[0.02]' : ''
                }`}
              >
                {/* Visual Accent for Unread */}
                {msg.status === 'unread' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#229264] shadow-[4px_0_15px_rgba(34,146,100,0.2)]" />
                )}

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1 min-w-0 space-y-4">
                    
                    {/* User Info Bar */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 text-[#131414]/30 group-hover:bg-[#229264]/10 group-hover:text-[#229264] transition-colors">
                        <Mail size={18} />
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-[#131414] text-[15px]">{msg.name}</h3>
                        {msg.company && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[11px] font-bold text-[#131414]/40">
                            <Building2 size={10} /> {msg.company}
                          </span>
                        )}
                        {msg.country && (
                          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[11px] font-bold text-[#131414]/40">
                            <Globe2 size={10} /> {msg.country}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="pl-0 lg:pl-14">
                      <h4 className="font-bold text-[16px] text-[#131414] mb-2">{msg.subject}</h4>
                      <p className="text-[14px] text-[#131414]/60 leading-relaxed font-medium line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                        {msg.message}
                      </p>
                    </div>

                    {/* Meta Footer */}
                    <div className="pl-0 lg:pl-14 flex flex-wrap items-center gap-6 pt-2">
                      <a href={`mailto:${msg.email}`} className="text-[12px] font-bold text-[#229264] hover:underline flex items-center gap-1.5">
                        {msg.email}
                      </a>
                      {msg.phone && (
                        <span className="text-[12px] text-[#131414]/40 font-medium flex items-center gap-1.5">
                           {msg.phone}
                        </span>
                      )}
                      <span className="text-[12px] text-[#131414]/30 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar size={12} /> {formatDate(msg.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Actions (Pill Toolbar) */}
                  <div className="flex justify-end pt-4 lg:pt-0">
                    <MessageActions id={msg.id} status={msg.status} email={msg.email} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center">
              <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 text-gray-200">
                <Inbox size={40} />
              </div>
              <p className="font-bold text-[#131414] text-lg">No inquiries found</p>
              <p className="text-[13px] text-[#131414]/40 mt-1">Your message database is currently clear.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-8 flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-[#131414]/20">
         <div className="h-1.5 w-1.5 rounded-full bg-[#229264]" />
         <span>Sync Status: Real-time</span>
         <div className="h-1.5 w-1.5 rounded-full bg-gray-200 ml-auto" />
         <span>End of Transmission</span>
      </div>
    </div>
  )
}