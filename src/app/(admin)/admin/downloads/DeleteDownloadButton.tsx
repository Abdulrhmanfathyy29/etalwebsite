'use client'

import { useState } from 'react'
import { Trash2, AlertCircle, X, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function DeleteDownloadButton({ id, name }: { id: string; name: string }) {
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('downloads').delete().eq('id', id)
    
    if (!error) {
      router.refresh()
    }
    
    setLoading(false)
    setShowConfirm(false)
  }

  return (
    <div className="relative inline-flex items-center">
      {/* ── Confirm State (Pill Overlay) ── */}
      {showConfirm && (
        <div className="absolute right-0 flex items-center gap-1 bg-white border border-red-100 shadow-xl shadow-red-500/10 rounded-full px-2 py-1 z-10 animate-in fade-in zoom-in duration-200 origin-right">
          <p className="text-[10px] font-bold text-red-600 px-2 whitespace-nowrap uppercase tracking-tighter">
            Confirm Delete?
          </p>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <Check size={14} strokeWidth={3} />
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>
      )}

      {/* ── Default Trash Icon ── */}
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading || showConfirm}
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300",
          showConfirm 
            ? "opacity-0 scale-50" 
            : "text-gray-300 hover:text-red-500 hover:bg-red-50"
        )}
        title="Delete Item"
      >
        <Trash2 size={16} strokeWidth={1.5} />
      </button>
    </div>
  )
}