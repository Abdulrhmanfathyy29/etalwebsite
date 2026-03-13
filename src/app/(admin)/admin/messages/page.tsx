import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import MessageActions from './MessageActions'

interface Props {
  searchParams: Promise<{ status?: string }>
}

const STATUS_OPTIONS = [
  { value: 'all',     label: 'All' },
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
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <div className="pb-6 border-b border-brand-gray-mid">
        <p className="eyebrow mb-2">Admin</p>
        <h1 className="font-headline text-[clamp(1.8rem,4vw,2.5rem)] leading-none text-brand-dark">
          Messages
        </h1>
        <p className="text-xs text-brand-gray mt-1.5">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Status filter — pill tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_OPTIONS.map((opt) => (
          <a
            key={opt.value}
            href={`/admin/messages?status=${opt.value}`}
            className={`font-body text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-150
              ${status === opt.value
                ? 'bg-brand-green text-white border-brand-green shadow-[0_2px_8px_rgba(34,146,100,0.25)]'
                : 'bg-white border-[#e5e7eb] text-brand-gray hover:border-brand-green/60 hover:text-brand-dark'}`}
          >
            {opt.label}
          </a>
        ))}
      </div>

      {/* Messages list */}
      <div className="panel overflow-hidden">
        <div className="divide-y divide-[#f3f4f6]">
          {messages.length > 0 ? (
            messages.map((msg: any) => (
              <div
                key={msg.id}
                className={`p-6 transition-colors hover:bg-[#fafafa] ${
                  msg.status === 'unread' ? 'border-l-2 border-brand-green' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                      {msg.status === 'unread' && (
                        <span className="w-2 h-2 bg-brand-green rounded-full shrink-0" />
                      )}
                      <h3 className="font-body font-semibold text-brand-dark text-sm">{msg.name}</h3>
                      {msg.company && (
                        <span className="font-body text-xs text-brand-gray">· {msg.company}</span>
                      )}
                      {msg.country && (
                        <span className="font-body text-xs text-brand-gray hidden sm:inline">· {msg.country}</span>
                      )}
                    </div>
                    <p className="font-body font-medium text-sm text-brand-dark mb-1">{msg.subject}</p>
                    <p className="font-body text-sm text-brand-gray leading-relaxed line-clamp-2">{msg.message}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <a href={`mailto:${msg.email}`} className="font-body text-xs text-brand-green hover:underline">
                        {msg.email}
                      </a>
                      {msg.phone && (
                        <span className="font-body text-xs text-brand-gray">{msg.phone}</span>
                      )}
                      <span className="font-body text-xs text-brand-gray">{formatDate(msg.created_at)}</span>
                    </div>
                  </div>
                  <MessageActions id={msg.id} status={msg.status} email={msg.email} />
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center font-body text-sm text-brand-gray">
              No messages found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
