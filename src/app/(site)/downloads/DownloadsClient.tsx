'use client'

import { useState, useMemo } from 'react'
import { Download, Search, FileText, BookOpen, Award, PenLine, Book, Database, Filter } from 'lucide-react'
import { formatFileSize, cn } from '@/lib/utils'
import type { DownloadWithCategory, DownloadCategory } from '@/types/database'

const FILE_TYPE_ICONS: Record<string, React.ElementType> = {
  datasheet:   FileText,
  catalog:     BookOpen,
  certificate: Award,
  drawing:     PenLine,
  manual:      Book,
  other:       FileText,
}

const FILE_TYPE_COLORS: Record<string, string> = {
  datasheet:   'text-[#229264] bg-[#229264]/5 border-[#229264]/10',
  catalog:     'text-blue-600 bg-blue-50 border-blue-100',
  certificate: 'text-amber-600 bg-amber-50 border-amber-100',
  drawing:     'text-purple-600 bg-purple-50 border-purple-100',
  manual:      'text-orange-600 bg-orange-50 border-orange-100',
  other:       'text-gray-500 bg-gray-50 border-gray-100',
}

interface Props {
  downloads: DownloadWithCategory[]
  categories: DownloadCategory[]
}

export default function DownloadsClient({ downloads, categories }: Props) {
  const [search, setSearch]         = useState('')
  const [activeType, setActiveType] = useState<string>('all')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const fileTypes = useMemo(() => {
    const types = [...new Set(downloads.map((d) => d.file_type))]
    return types
  }, [downloads])

  const filtered = useMemo(() => {
    return downloads.filter((d) => {
      const matchSearch =
        !search ||
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.description?.toLowerCase().includes(search.toLowerCase()) ||
        d.product?.name.toLowerCase().includes(search.toLowerCase())

      const matchType     = activeType === 'all'     || d.file_type === activeType
      const matchCategory = activeCategory === 'all' || d.category_id === activeCategory

      return matchSearch && matchType && matchCategory
    })
  }, [downloads, search, activeType, activeCategory])

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-20">
      
      {/* ── 1. Hero / Engineering Header ── */}
      <section className="relative pt-32 pb-20 bg-white rounded-b-[3.5rem] shadow-sm overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#229264_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container-etal relative z-10 space-y-12">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#229264]/5 border border-[#229264]/10">
              <span className="h-2 w-2 rounded-full bg-[#229264] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#229264]">Technical Library</span>
            </div>
            
            <h1 className="font-headline font-bold text-[#131414] leading-[1.05]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Precision <span className="text-[#229264]">Documentation.</span>
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-[16px] leading-relaxed text-[#131414]/60 font-medium">
              Access engineering datasheets, IEC type-test certificates, and CAD drawings for ETAL components. Ready for deployment in your projects.
            </p>
          </div>

          {/* ── 2. Filter Console (Soft Pill Style) ── */}
          <div className="bg-[#fcfcfc] p-4 rounded-[3rem] border border-gray-100 shadow-xl shadow-black/[0.02]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              
              {/* Pill Search Input */}
              <div className="relative flex-1 group">
                <Search
                  size={18}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#229264] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Search assets by keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-gray-100 bg-white pl-14 pr-6 py-4 text-[14px] font-medium text-[#131414] outline-none transition-all focus:ring-4 focus:ring-[#229264]/10 focus:border-[#229264] placeholder:text-gray-300"
                />
              </div>

              {/* Pill Tabs Container */}
              <div className="flex flex-wrap items-center gap-2 lg:pl-4 lg:border-l border-gray-200">
                <div className="flex items-center gap-2 mr-2 text-gray-300">
                  <Filter size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Type</span>
                </div>
                <FilterBtn active={activeType === 'all'} onClick={() => setActiveType('all')}>
                  All Assets
                </FilterBtn>
                {fileTypes.map((type) => (
                  <FilterBtn
                    key={type}
                    active={activeType === type}
                    onClick={() => setActiveType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}s
                  </FilterBtn>
                ))}
              </div>
            </div>

            {/* Sub-Filters (Categories) */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-50 px-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mr-2">Category:</span>
                <FilterBtn
                  active={activeCategory === 'all'}
                  onClick={() => setActiveCategory('all')}
                  small
                >
                  Global
                </FilterBtn>
                {categories.map((cat) => (
                  <FilterBtn
                    key={cat.id}
                    active={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    small
                  >
                    {cat.name}
                  </FilterBtn>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. Data Output (Soft Cards) ── */}
      <section className="py-20">
        <div className="container-etal">
          
          <div className="mb-10 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#229264] animate-pulse" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#131414]/30">
                {filtered.length} Objects Indexed
              </p>
            </div>
            <div className="h-px flex-1 mx-8 bg-gray-100 hidden md:block" />
            <Database size={16} className="text-gray-200" />
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((doc) => (
                <DownloadCard key={doc.id} doc={doc} />
              ))}
            </div>
          ) : (
            /* Empty State Capsule */
            <div className="py-32 text-center rounded-[3rem] border border-dashed border-gray-200 bg-white shadow-inner">
              <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 text-gray-200">
                <FileText size={40} strokeWidth={1} />
              </div>
              <p className="mb-2 font-headline text-2xl font-bold text-[#131414]">QUERY_ZERO_RESULTS</p>
              <p className="text-[14px] text-[#131414]/40 max-w-sm mx-auto font-medium leading-relaxed px-6">
                No technical assets match your active filter parameters. Try adjusting the search or category global filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// ── 4. Industrial Pill Filter Button ──
function FilterBtn({
  active,
  onClick,
  children,
  small = false,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 font-bold transition-all duration-300 whitespace-nowrap rounded-full border select-none',
        small ? 'px-4 py-2 text-[10px] uppercase tracking-widest' : 'px-6 py-2.5 text-[12px] uppercase tracking-widest',
        active
          ? 'bg-[#131414] border-[#131414] text-white shadow-lg shadow-black/10 scale-105'
          : 'bg-white border-gray-100 text-[#131414]/40 hover:border-[#229264]/30 hover:bg-gray-50 hover:text-[#229264]'
      )}
    >
      {children}
    </button>
  )
}

// ── 5. Technical Asset Card (Pill Style) ──
function DownloadCard({ doc }: { doc: DownloadWithCategory }) {
  const Icon = FILE_TYPE_ICONS[doc.file_type] || FileText
  const colorClass = FILE_TYPE_COLORS[doc.file_type] || FILE_TYPE_COLORS.other

  return (
    <a
      href={doc.file_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col p-8 bg-white border border-gray-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-[#229264]/5 hover:-translate-y-2 overflow-hidden"
    >
      <div className="flex items-start justify-between mb-8">
        {/* Icon with Soft Background */}
        <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-500', colorClass)}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        
        {/* Download Action Pill */}
        <div className="h-10 w-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-[#229264] group-hover:text-white transition-all duration-500 shadow-sm">
          <Download size={16} />
        </div>
      </div>

      <div className="space-y-2 flex-1">
        <h3 className="font-bold text-[16px] text-[#131414] group-hover:text-[#229264] transition-colors leading-tight">
          {doc.title}
        </h3>
        {doc.product && (
          <p className="text-[13px] text-[#131414]/40 font-medium">
            {doc.product.name}
          </p>
        )}
      </div>

      {/* Meta Footer */}
      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-50 text-[#131414]/30 rounded-full group-hover:bg-[#229264]/5 group-hover:text-[#229264] transition-colors">
          {doc.file_type}
        </span>
        {doc.file_size_bytes && (
          <span className="font-mono text-[11px] font-bold text-gray-300">
            {formatFileSize(doc.file_size_bytes)}
          </span>
        )}
      </div>

      {/* Subtle background glow on hover */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#229264]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}