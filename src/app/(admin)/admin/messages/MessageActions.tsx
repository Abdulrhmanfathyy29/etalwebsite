'use client'

import { useState } from 'react'
import { Mail, Check, Archive, Trash2, X, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function MessageActions({
  id, status, email
}: {
  id: string
  status: string
  email: string
}) {
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const router = useRouter()

  const update = async (newStatus: string) => {
    setLoading(true)
    const supabase = createClient()
    await supabase.from('contact_messages').update({ status: newStatus }).eq('id', id)
    router.refresh()
    setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('contact_messages').delete().eq('id', id)
    if (!error) {
      router.refresh()
    }
    setLoading(false)
    setShowDeleteConfirm(false)
  }

  return (
    <div className="relative flex items-center justify-end min-w-[140px]">
      {/* ── Action Toolbar (Pill Style) ── */}
      <div className={cn(
        "flex items-center gap-1 bg-gray-50/50 border border-gray-100 rounded-full px-1.5 py-1 transition-all duration-300",
        showDeleteConfirm ? "opacity-0 invisible scale-90" : "opacity-100 visible scale-100"
      )}>
        {/* Reply Button */}
        <a
          href={`mailto:${email}`}
          onClick={() => update('replied')}
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-[#229264] hover:bg-[#229264]/10 transition-all"
          title="Reply via Email"
        >
          <Mail size={16} strokeWidth={2} />
        </a>

        {/* Mark as Read Button */}
        {status !== 'read' && (
          <button
            onClick={() => update('read')}
            disabled={loading}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all disabled:opacity-30"
            title="Mark as Read"
          >
            <Check size={18} strokeWidth={2.5} />
          </button>
        )}

        {/* Archive Button */}
        <button
          onClick={() => update('archived')}
          disabled={loading}
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-all disabled:opacity-30"
          title="Archive Message"
        >
          <Archive size={16} strokeWidth={2} />
        </button>

        {/* Initial Delete Button */}
        <button
          onClick={() => setShowDeleteConfirm(true)}
          disabled={loading}
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-30"
          title="Delete Message"
        >
          <Trash2 size={16} strokeWidth={2} />
        </button>
      </div>

      {/* ── Inline Delete Confirmation ── */}
      {showDeleteConfirm && (
        <div className="absolute right-0 flex items-center gap-1 bg-white border border-red-100 shadow-xl shadow-red-500/10 rounded-full px-2 py-1 z-10 animate-in fade-in zoom-in duration-200 origin-right">
          <p className="text-[9px] font-bold text-red-600 px-2 uppercase tracking-tighter">
            Confirm Delete?
          </p>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
          >
            <CheckCircle2 size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  )
}