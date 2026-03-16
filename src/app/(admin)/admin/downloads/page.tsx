import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, ExternalLink, FileText, DownloadCloud, Database } from 'lucide-react'
import { formatFileSize } from '@/lib/utils'
import DeleteDownloadButton from './DeleteDownloadButton'
import { cn } from '@/lib/utils'

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
    <div className="space-y-10 max-w-6xl mx-auto pb-20">

      {/* ── 1️⃣ Header Console ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#229264]/10 border border-[#229264]/20 text-[#229264] text-[10px] font-bold uppercase tracking-widest">
            <Database size={12} /> System Assets
          </div>
          <h1 className="font-headline font-bold text-[#131414] leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Technical <span className="text-[#229264]">Library.</span>
          </h1>
          <div className="flex items-center gap-3 text-[12px] text-[#131414]/40 font-bold uppercase tracking-tighter">
            <span>{downloads.length} Assets Indexed</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="text-[#229264]">Storage Active</span>
          </div>
        </div>
        
        <Link 
          href="/admin/downloads/upload" 
          className="group flex items-center justify-center gap-3 bg-[#131414] text-white px-8 py-4 rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#229264] hover:shadow-2xl hover:shadow-[#229264]/20 transition-all duration-300"
        >
          <Plus size={18} />
          Upload New Asset
        </Link>
      </div>

      {/* ── 2️⃣ Data Grid Panel ── */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40">File Metadata</th>
                <th className="hidden md:table-cell px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40 text-center">Classification</th>
                <th className="hidden lg:table-cell px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40">Linked Product</th>
                <th className="hidden lg:table-cell px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40">Metrics</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40 text-right">Operation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {downloads.length > 0 ? (
                downloads.map((dl: any) => (
                  <tr key={dl.id} className="group hover:bg-[#fcfcfc] transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-2xl bg-gray-50 flex items-center justify-center text-[#131414]/30 group-hover:bg-[#229264]/10 group-hover:text-[#229264] transition-all duration-300">
                          <FileText size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[14px] text-[#131414] group-hover:text-[#229264] transition-colors truncate">{dl.title}</div>
                          <div className="font-mono text-[10px] text-[#131414]/30 mt-0.5 truncate">{dl.file_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-[10px] font-bold uppercase tracking-widest text-[#131414]/50 group-hover:border-[#229264]/20 group-hover:bg-[#229264]/5 group-hover:text-[#229264] transition-all">
                        {dl.file_type}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-5">
                      <div className="text-[13px] font-medium text-[#131414]/60">
                        {dl.product?.name || <span className="text-gray-200">—</span>}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#131414]/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                          {formatFileSize(dl.file_size_bytes)}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#229264]">
                           <DownloadCloud size={10} />
                           {dl.download_count} Hits
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={dl.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300
                                     hover:text-[#229264] hover:bg-[#229264]/10 transition-all border border-transparent hover:border-[#229264]/20"
                          title="Open Asset"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <DeleteDownloadButton id={dl.id} name={dl.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-200">
                        <FileText size={32} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-[#131414]">No Assets Found</p>
                        <p className="text-[13px] text-[#131414]/40">Your technical library is currently empty.</p>
                      </div>
                      <Link href="/admin/downloads/upload" className="mt-2 text-[12px] font-bold text-[#229264] uppercase tracking-widest hover:underline">
                        Upload Your First File
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-8 flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-[#131414]/20">
         <div className="h-1.5 w-1.5 rounded-full bg-[#229264]" />
         <span>Asset Security: Encrypted Storage</span>
         <div className="h-1.5 w-1.5 rounded-full bg-gray-200 ml-auto" />
         <span>Last Sync: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  )
}