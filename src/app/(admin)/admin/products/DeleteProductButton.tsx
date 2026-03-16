'use client'

import { useState } from 'react'
import { Trash2, X, Check, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('products').delete().eq('id', id)
    
    if (!error) {
      router.refresh()
    }
    
    setLoading(false)
    setShowConfirm(false)
  }

  return (
    <div className="relative inline-flex items-center justify-end min-w-[40px]">
      
      {/* ── Confirm State (Animated Pill) ── */}
      {showConfirm && (
        <div className="absolute right-0 flex items-center gap-1.5 bg-white border border-red-100 shadow-xl shadow-red-500/10 rounded-full px-2 py-1.5 z-20 animate-in fade-in zoom-in duration-200 origin-right">
          <div className="flex items-center gap-2 px-2 text-red-600">
            <AlertCircle size={14} strokeWidth={2.5} />
            <p className="text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap">
              Confirm Delete?
            </p>
          </div>
          
          <div className="flex items-center gap-1 border-l border-red-50 pl-1.5">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm disabled:opacity-50"
            >
              <Check size={16} strokeWidth={3} />
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}

      {/* ── Default Trash State ── */}
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading || showConfirm}
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300",
          showConfirm 
            ? "opacity-0 scale-50 pointer-events-none" 
            : "text-gray-300 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100"
        )}
        title="Delete Product"
      >
        <Trash2 size={16} strokeWidth={1.8} />
      </button>

      {/* Loading Overlay for the Item (Optional Visual Cue) */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 border-2 border-[#229264] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}