'use client'

import { useState, useMemo } from 'react'
import { Download, Search, FileText, BookOpen, Award, PenLine, Book } from 'lucide-react'
import { formatFileSize } from '@/lib/utils'
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
  datasheet:   'text-brand-green bg-brand-green/10',
  catalog:     'text-blue-600 bg-blue-50',
  certificate: 'text-brand-yellow bg-brand-yellow/10 text-brand-dark',
  drawing:     'text-purple-600 bg-purple-50',
  manual:      'text-orange-500 bg-orange-50',
  other:       'text-brand-gray bg-brand-gray-light',
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
    <div className="min-h-screen bg-white">
      <section className="section-pad pb-6">
        <div className="container-etal space-y-6">
          <div className="space-y-3">
            <p className="eyebrow">Download library</p>
            <h1 className="font-headline text-[clamp(2rem,4vw,2.6rem)] leading-none text-brand-dark">
              Technical documents for the ETAL range.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-brand-gray">
              Datasheets, catalogs, certificates and drawings for panel builders, consultants
              and contractors.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t border-brand-gray-mid/60 pt-6 md:flex-row">
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray"
              />
              <input
                type="text"
                placeholder="Search by title, product or description…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterBtn active={activeType === 'all'} onClick={() => setActiveType('all')}>
                All types
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

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <FilterBtn
                active={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
                small
              >
                All categories
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
      </section>

      <section className="pb-20">
        <div className="container-etal">
          <p className="mb-4 text-sm text-brand-gray">
            {filtered.length} document{filtered.length !== 1 ? 's' : ''} found
          </p>
          {filtered.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((doc) => (
                <DownloadCard key={doc.id} doc={doc} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Download size={32} className="mx-auto mb-3 text-brand-gray-mid" />
              <p className="mb-1 font-headline text-2xl text-brand-dark">No documents found</p>
              <p className="text-sm text-brand-gray">
                {downloads.length === 0
                  ? 'Documents will appear here once added via the admin dashboard.'
                  : 'Try adjusting your search text or filters.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

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
      className={`
        shrink-0 font-body font-semibold transition-all duration-150 whitespace-nowrap rounded-full
        ${small ? 'px-3 py-1 text-[11px]' : 'px-4 py-2 text-xs'}
        ${active
          ? 'bg-brand-green text-white shadow-[0_2px_8px_rgba(34,146,100,0.25)]'
          : 'border border-[#e5e7eb] bg-white text-brand-gray hover:border-brand-green/60 hover:text-brand-dark'}
      `}
    >
      {children}
    </button>
  )
}

function DownloadCard({ doc }: { doc: DownloadWithCategory }) {
  const Icon = FILE_TYPE_ICONS[doc.file_type] || FileText
  const colorClass = FILE_TYPE_COLORS[doc.file_type] || FILE_TYPE_COLORS.other

  return (
    <a
      href={doc.file_url}
      target="_blank"
      rel="noopener noreferrer"
      className="download-card group"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
        <Icon size={20} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-sm text-brand-dark group-hover:text-brand-green transition-colors leading-snug line-clamp-2">
          {doc.title}
        </p>
        {doc.product && (
          <p className="font-body text-xs text-brand-gray mt-1">
            {doc.product.name}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2">
          <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-brand-gray/60">
            {doc.file_type}
          </span>
          {doc.file_size_bytes && (
            <>
              <span className="text-brand-gray-mid">·</span>
              <span className="font-body text-[10px] text-brand-gray/60">
                {formatFileSize(doc.file_size_bytes)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Download arrow */}
      <div className="flex-shrink-0 self-center">
        <Download size={16} className="text-brand-gray-mid group-hover:text-brand-green transition-colors" />
      </div>
    </a>
  )
}
