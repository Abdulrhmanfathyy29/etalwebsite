import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import DownloadsClient from './DownloadsClient'
import type { DownloadWithCategory, DownloadCategory } from '@/types/database'
import { FileText, Loader2 } from 'lucide-react'

// 1️⃣ System Metadata Definition
export const metadata: Metadata = {
  title: 'Technical Library',
  description: 'Access engineering datasheets, IEC certificates, and CAD drawings for ETAL components.',
}

// 2️⃣ Secure Database Query Function
async function getDownloads() {
  const supabase = await createClient()

  const [{ data: downloads }, { data: categories }] = await Promise.all([
    supabase
      .from('downloads')
      .select('*, category:download_categories(*), product:products(id, name, slug)')
      .eq('is_public', true)
      .order('created_at', { ascending: false }),
    supabase
      .from('download_categories')
      .select('*')
      .order('sort_order'),
  ])

  return {
    downloads: (downloads as DownloadWithCategory[]) || [],
    categories: (categories as DownloadCategory[]) || [],
  }
}

// 3️⃣ Loading Skeleton (Matching the Soft Pill UI)
function DownloadsSkeleton() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] animate-pulse">
      {/* Header Skeleton */}
      <div className="h-[400px] bg-white rounded-b-[3.5rem] border-b border-gray-100 flex items-center">
        <div className="container-etal space-y-6">
          <div className="h-8 w-32 bg-gray-100 rounded-full" />
          <div className="h-16 w-full max-w-xl bg-gray-100 rounded-[2rem]" />
          <div className="h-20 w-full max-w-md bg-gray-100 rounded-full" />
        </div>
      </div>
      
      {/* Cards Skeleton */}
      <div className="container-etal py-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm" />
        ))}
      </div>
    </div>
  )
}

// 4️⃣ Server Component Entry Point
export default async function DownloadsPage() {
  // We wrap the data fetching in a Suspense boundary for a smoother UX
  return (
    <Suspense fallback={<DownloadsSkeleton />}>
      <DownloadsContent />
    </Suspense>
  )
}

async function DownloadsContent() {
  const { downloads, categories } = await getDownloads()
  
  // Delegate all UI rendering to the styled Client Component
  return <DownloadsClient downloads={downloads} categories={categories} />
}