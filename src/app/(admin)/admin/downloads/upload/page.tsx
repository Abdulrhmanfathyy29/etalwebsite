'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Loader2, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

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
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-brand-gray-mid">
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-green mb-1.5">
          Downloads
        </p>
        <h1 className="font-headline text-brand-dark leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Upload File
        </h1>
        <p className="font-body text-xs text-brand-gray mt-1.5">
          Add a new document to the download library.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700
                        px-4 py-3 font-body text-sm mb-6">
          <X size={14} className="flex-shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File drop zone */}
        <div className="form-card">
          <div className="form-card-header">File</div>
          <div className="form-card-body">
            {file ? (
              <div className="flex items-center gap-3 p-4 border border-brand-green bg-brand-green/5">
                <Upload size={18} className="text-brand-green flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-sm text-brand-dark truncate">{file.name}</p>
                  <p className="font-body text-xs text-brand-gray mt-0.5">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-brand-gray/40 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-3 p-12
                                border-2 border-dashed border-brand-gray-mid cursor-pointer
                                hover:border-brand-green hover:bg-brand-green/[0.02] transition-colors">
                <Upload size={28} className="text-brand-gray-mid" />
                <div className="text-center">
                  <p className="font-body text-sm font-medium text-brand-dark">
                    Click to upload or drag & drop
                  </p>
                  <p className="font-body text-xs text-brand-gray mt-1">
                    PDF, DWG, ZIP up to 50MB
                  </p>
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
        </div>

        {/* Metadata */}
        <div className="form-card">
          <div className="form-card-header">File Details</div>
          <div className="form-card-body space-y-5">
            {/* Title */}
            <div>
              <label className="block mb-1.5 font-body text-xs font-semibold uppercase tracking-widest text-brand-dark">
                Title <span className="text-brand-green">*</span>
              </label>
              <input
                className="input-admin w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="ECT-3.5 Datasheet"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1.5 font-body text-xs font-semibold uppercase tracking-widest text-brand-dark">
                Description
              </label>
              <textarea
                className="input-admin w-full resize-none"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description…"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block mb-1.5 font-body text-xs font-semibold uppercase tracking-widest text-brand-dark">
                File Type
              </label>
              <select
                className="input-admin w-full"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
              >
                <option value="datasheet">Datasheet</option>
                <option value="catalog">Catalog</option>
                <option value="certificate">Certificate</option>
                <option value="drawing">Drawing</option>
                <option value="manual">Manual</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Visibility */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4 accent-brand-green"
              />
              <div>
                <span className="font-body text-sm font-medium text-brand-dark">Publicly visible</span>
                <span className="font-body text-xs text-brand-gray ml-2">
                  Shown in the public download library
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pb-8">
          <button type="submit" disabled={uploading} className="btn-primary text-sm px-8 py-3">
            {uploading ? (
              <><Loader2 size={16} className="animate-spin" /> Uploading…</>
            ) : (
              <><Upload size={15} /> Upload File</>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="font-body text-sm text-brand-gray hover:text-brand-dark transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
