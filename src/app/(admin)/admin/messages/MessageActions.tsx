'use client'

import { useState } from 'react'
import { Mail, Check, Archive, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function MessageActions({
  id, status, email
}: {
  id: string
  status: string
  email: string
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const update = async (newStatus: string) => {
    setLoading(true)
    const supabase = createClient()
    await supabase.from('contact_messages').update({ status: newStatus }).eq('id', id)
    router.refresh()
    setLoading(false)
  }

  const del = async () => {
    if (!confirm('Delete this message permanently?')) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from('contact_messages').delete().eq('id', id)
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-1 flex-shrink-0">
      <a
        href={`mailto:${email}`}
        onClick={() => update('replied')}
        className="w-8 h-8 flex items-center justify-center text-brand-gray/40 hover:text-brand-green transition-colors"
        title="Reply"
      >
        <Mail size={15} />
      </a>
      {status !== 'read' && (
        <button
          onClick={() => update('read')}
          disabled={loading}
          className="w-8 h-8 flex items-center justify-center text-brand-gray/40 hover:text-blue-500 transition-colors disabled:opacity-50"
          title="Mark as read"
        >
          <Check size={15} />
        </button>
      )}
      <button
        onClick={() => update('archived')}
        disabled={loading}
        className="w-8 h-8 flex items-center justify-center text-brand-gray/40 hover:text-amber-500 transition-colors disabled:opacity-50"
        title="Archive"
      >
        <Archive size={15} />
      </button>
      <button
        onClick={del}
        disabled={loading}
        className="w-8 h-8 flex items-center justify-center text-brand-gray/40 hover:text-red-500 transition-colors disabled:opacity-50"
        title="Delete"
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}
