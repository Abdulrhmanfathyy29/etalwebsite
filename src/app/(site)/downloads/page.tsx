import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import DownloadsClient from './DownloadsClient'
import type { DownloadWithCategory, DownloadCategory } from '@/types/database'

export const metadata: Metadata = {
  title: 'Downloads',
  description: 'Download datasheets, catalogs, certificates and technical drawings for all ETAL electrical protection products.',
}

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

export default async function DownloadsPage() {
  const { downloads, categories } = await getDownloads()
  return <DownloadsClient downloads={downloads} categories={categories} />
}
