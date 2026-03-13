import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, ExternalLink } from 'lucide-react'
import { formatFileSize } from '@/lib/utils'
import DeleteDownloadButton from './DeleteDownloadButton'

async function getDownloads() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('downloads')
    .select('*, category:download_categories(name), product:products(name)')
    .order('created_at', { ascending: false })

  return data || []
}

export default async function AdminDownloadsPage() {
  const downloads = await getDownloads()

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-brand-gray-mid">
        <div>
          <p className="eyebrow mb-2">Admin</p>
          <h1 className="font-headline text-[clamp(1.8rem,4vw,2.5rem)] leading-none text-brand-dark">
            Downloads
          </h1>
          <p className="text-xs text-brand-gray mt-1.5">
            {downloads.length} file{downloads.length !== 1 ? 's' : ''} in library
          </p>
        </div>
        <Link href="/admin/downloads/upload" className="btn-primary text-sm">
          <Plus size={15} /> Upload File
        </Link>
      </div>

      {/* Table */}
      <div className="panel overflow-hidden">
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>File</th>
              <th className="hidden md:table-cell">Type</th>
              <th className="hidden lg:table-cell">Product</th>
              <th className="hidden lg:table-cell">Size</th>
              <th className="hidden lg:table-cell">Downloads</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {downloads.length > 0 ? (
              downloads.map((dl: any) => (
                <tr key={dl.id}>
                  <td>
                    <div className="font-body font-semibold text-sm text-brand-dark">{dl.title}</div>
                    <div className="font-body text-xs text-brand-gray mt-0.5">{dl.file_name}</div>
                  </td>
                  <td className="hidden md:table-cell">
                    <span className="badge-gray capitalize">{dl.file_type}</span>
                  </td>
                  <td className="hidden lg:table-cell font-body text-xs text-brand-gray">
                    {dl.product?.name || '—'}
                  </td>
                  <td className="hidden lg:table-cell font-body text-xs text-brand-gray">
                    {formatFileSize(dl.file_size_bytes)}
                  </td>
                  <td className="hidden lg:table-cell font-body text-xs text-brand-gray">
                    {dl.download_count}
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={dl.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-gray/40
                                   hover:text-brand-green hover:bg-brand-green/[0.08] transition-colors"
                        title="Open file"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <DeleteDownloadButton id={dl.id} name={dl.title} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="!text-center !py-16 font-body text-sm text-brand-gray">
                  No files uploaded yet.{' '}
                  <Link href="/admin/downloads/upload" className="text-brand-green hover:underline">
                    Upload your first file
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
