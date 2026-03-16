'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Loader2, X, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function UploadDownloadPage() {
  const router = useRouter()
  const [file,        setFile]        = useState<File | null>(null)
  const [title,       setTitle]       = useState('')
  const [description, setDescription] = useState('')
  const [fileType,    setFileType]    = useState('datasheet')
  const [isPublic,    setIsPublic]    = useState(true)
  const [uploading,   setUploading]   = useState(false)
  const [error,       setError]       = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    if (!title) setTitle(f.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) { setError('Please select a file.'); return }

    setUploading(true)
    setError(null)

    const supabase = createClient()

    const filePath = `${Date.now()}-${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('downloads')
      .upload(filePath, file, { contentType: file.type })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('downloads')
      .getPublicUrl(filePath)

    const { error: dbError } = await (supabase as any)
      .from('downloads')
      .insert([
        {
          title,
          description: description || null,
          file_type:   fileType as any,
          file_url:    publicUrl,
          file_name:   file.name,
          file_size_bytes: file.size,
          mime_type:   file.type,
          is_public:   isPublic,
        }
      ])

    if (dbError) {
      setError(dbError.message)
      setUploading(false)
      return
    }

    router.push('/admin/downloads')
    router.refresh()
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      
      {/* ── Header Section ── */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#229264]/10 border border-[#229264]/20 text-[#229264] text-[10px] font-bold uppercase tracking-widest">
            <Upload size={12} /> Resource Manager
          </div>
          <h1 className="font-headline font-bold text-[#131414] leading-tight" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Upload <span className="text-[#229264]">Technical File.</span>
          </h1>
          <p className="text-[14px] text-[#131414]/50 font-medium">
            Deploy new documents to the ETAL global download library.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-3xl font-medium text-sm mb-8 animate-fade-in">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* ── File Upload Zone ── */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#229264]/10 group-hover:bg-[#229264]/40 transition-colors" />
          
          <div className="flex items-center gap-3 mb-6">
             <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-[#229264]">
                <FileText size={20} />
             </div>
             <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40">Source Document</h3>
          </div>

          {file ? (
            <div className="flex items-center gap-5 p-6 rounded-3xl border border-[#229264]/20 bg-[#229264]/5 animate-fade-up">
              <div className="h-12 w-12 rounded-2xl bg-[#229264] flex items-center justify-center text-white shadow-lg shadow-[#229264]/20">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[15px] text-[#131414] truncate">{file.name}</p>
                <p className="text-[12px] text-[#131414]/40 mt-0.5 font-medium">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type.split('/')[1]?.toUpperCase()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-4 p-16 rounded-[2rem] border-2 border-dashed border-gray-100 cursor-pointer hover:border-[#229264]/40 hover:bg-[#229264]/5 transition-all duration-300 group/label">
              <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover/label:scale-110 group-hover/label:text-[#229264] transition-all duration-500">
                <Upload size={32} />
              </div>
              <div className="text-center">
                <p className="text-[15px] font-bold text-[#131414]">Click to upload or drag & drop</p>
                <p className="text-[12px] text-[#131414]/40 mt-1 font-medium">PDF, DWG, ZIP, XLSX (Max 50MB)</p>
              </div>
              <input
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept=".pdf,.dwg,.dxf,.zip,.xlsx"
              />
            </label>
          )}
        </div>

        {/* ── Metadata Form ── */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <div className="grid gap-8">
            
            {/* Title */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40 ml-1">
                Document Title <span className="text-[#229264]">*</span>
              </label>
              <input
                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4 text-[14px] font-medium text-[#131414] focus:outline-none focus:ring-4 focus:ring-[#229264]/10 focus:border-[#229264] transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. ECT-3.5 Technical Datasheet"
              />
            </div>

            {/* Type & Visibility Row */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40 ml-1">
                  Classification
                </label>
                <select
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4 text-[14px] font-medium text-[#131414] focus:outline-none focus:ring-4 focus:ring-[#229264]/10 focus:border-[#229264] transition-all appearance-none cursor-pointer"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                >
                  <option value="datasheet">Technical Datasheet</option>
                  <option value="catalog">Product Catalog</option>
                  <option value="certificate">IEC Certificate</option>
                  <option value="drawing">Engineering Drawing</option>
                  <option value="manual">Installation Manual</option>
                  <option value="other">Other Resource</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40 ml-1">
                  Privacy Settings
                </label>
                <div 
                  onClick={() => setIsPublic(!isPublic)}
                  className={cn(
                    "flex items-center justify-between px-6 py-4 rounded-2xl border cursor-pointer transition-all",
                    isPublic ? "border-[#229264]/30 bg-[#229264]/5" : "border-gray-100 bg-gray-50/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("h-4 w-4 rounded-full border-2 transition-all flex items-center justify-center", isPublic ? "border-[#229264] bg-[#229264]" : "border-gray-300")}>
                      {isPublic && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-[13px] font-bold text-[#131414]">Publicly Visible</span>
                  </div>
                  <span className="text-[11px] text-[#131414]/30 font-bold uppercase">Library</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40 ml-1">
                Contextual Description
              </label>
              <textarea
                className="w-full rounded-[2rem] border border-gray-100 bg-gray-50/50 px-6 py-4 text-[14px] font-medium text-[#131414] focus:outline-none focus:ring-4 focus:ring-[#229264]/10 focus:border-[#229264] transition-all resize-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly explain what this file is for (optional)..."
              />
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            type="submit" 
            disabled={uploading || !file} 
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#131414] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#229264] hover:shadow-2xl hover:shadow-[#229264]/20 transition-all duration-300 disabled:opacity-50 disabled:bg-gray-400"
          >
            {uploading ? (
              <><Loader2 size={18} className="animate-spin" /> Finalizing Database...</>
            ) : (
              <><Upload size={18} /> Deploy to Library</>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto px-10 py-5 rounded-full border border-gray-200 text-[#131414]/60 font-bold uppercase tracking-widest hover:bg-gray-50 hover:text-[#131414] transition-all"
          >
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  )
}