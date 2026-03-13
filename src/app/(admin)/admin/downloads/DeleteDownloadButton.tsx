'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DeleteDownloadButton({ id, name }: { id: string; name: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"?`)) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from('downloads').delete().eq('id', id)
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="w-8 h-8 flex items-center justify-center text-brand-gray/40 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
      title="Delete"
    >
      <Trash2 size={15} />
    </button>
  )
}
