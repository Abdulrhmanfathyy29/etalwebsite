import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Box, Zap, LayoutGrid, Database } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import SectionHeader from '@/components/ui/SectionHeader'
import type { ProductCategory, Product } from '@/types/database'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Engineering Catalog | ETAL',
  description: 'Browse the ETAL range of current transformers, HRC fuse links, fuse switch disconnectors and busbar supports.',
}

type CategoryWithProducts = ProductCategory & { products: Product[] }

async function getCategoriesWithProducts(): Promise<CategoryWithProducts[]> {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from('product_categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  if (!categories?.length) return []

  const results = await Promise.all(
    categories.map(async (cat) => {
      const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', cat.id)
        .eq('is_active', true)
        .order('sort_order')
        .limit(8)

      return { ...cat, products: products || [] }
    })
  )

  return results
}

export default async function ProductsPage() {
  const categories = await getCategoriesWithProducts()
  const displayCategories = categories.length > 0 ? categories : STATIC_CATEGORIES

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 overflow-hidden">
      
      {/* ── 1. Hero / Directory Header ── */}
      <section className="relative pt-32 pb-20 bg-white rounded-b-[3.5rem] shadow-sm overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#229264_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container-etal relative z-10 space-y-12">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#229264]/5 border border-[#229264]/10">
              <span className="h-2 w-2 rounded-full bg-[#229264] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#229264]">Engineering Catalog</span>
            </div>
            
            <h1 className="font-headline font-bold text-[#131414] leading-[1.05]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Precision for the <span className="text-[#229264]">Low‑Voltage Loop.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto lg:mx-0 text-[16px] leading-relaxed text-[#131414]/60 font-medium">
              Explore our core component families, engineered to meet stringent international standards and rigorous industrial environments.
            </p>
          </div>

          {/* Pill Navigation Console */}
          <div className="bg-[#fcfcfc] p-3 rounded-full border border-gray-100 shadow-xl shadow-black/[0.02] w-fit mx-auto lg:mx-0 overflow-hidden">
            <div className="flex flex-wrap justify-center gap-2">
              {displayCategories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-full border border-transparent hover:border-[#229264]/20 hover:bg-white hover:text-[#229264] transition-all duration-300 whitespace-nowrap"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Category Sections ── */}
      <div className="flex flex-col gap-24 pt-24">
        {categories.length > 0
          ? categories.map((cat, i) => (
              <CategorySection key={cat.id} category={cat} />
            ))
          : STATIC_CATEGORIES.map((cat, i) => (
              <StaticCategorySection key={cat.slug} category={cat} />
            ))}
      </div>
    </div>
  )
}

function CategorySection({ category }: { category: CategoryWithProducts }) {
  return (
    <section id={category.slug} className="scroll-mt-32">
      <div className="container-etal">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between px-4">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-[#229264]">
                <Zap size={18} fill="currentColor" className="opacity-20" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em]">System Category</span>
             </div>
             <h2 className="font-headline font-bold text-[#131414] text-3xl md:text-5xl tracking-tight">
                {category.name}
             </h2>
             {category.description && (
               <p className="max-w-xl text-[14px] text-[#131414]/50 font-medium leading-relaxed">
                 {category.description}
               </p>
             )}
          </div>
          
          <Link 
            href={`/products/${category.slug}`} 
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white border border-gray-100 shadow-sm text-[11px] font-bold uppercase tracking-widest text-[#131414] hover:text-[#229264] hover:border-[#229264]/30 transition-all duration-300"
          >
            Full Collection
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {category.products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-[3rem] border border-dashed border-gray-200 bg-white">
             <Database size={32} className="mx-auto mb-4 text-gray-200" />
             <p className="text-[12px] font-bold uppercase tracking-widest text-[#131414]/30">[ QUERY_NULL: PENDING_SYNC ]</p>
          </div>
        )}
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col bg-white border border-gray-100 rounded-[2.5rem] p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-[#229264]/5 hover:-translate-y-2 overflow-hidden"
    >
      {/* Visual Hub */}
      <div className="relative aspect-square rounded-[2rem] bg-[#fcfcfc] border border-gray-50 flex items-center justify-center overflow-hidden mb-6">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#229264_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {product.primary_image ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            className="object-contain p-10 transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-2 z-10"
          />
        ) : (
          <div className="relative z-10 text-gray-100">
            <LayoutGrid size={64} strokeWidth={1} />
          </div>
        )}

        <span className="absolute -bottom-6 -right-4 select-none font-headline text-[12rem] leading-none text-[#131414]/[0.02] pointer-events-none">
          {product.name.charAt(0)}
        </span>
      </div>

      {/* Body Content */}
      <div className="px-4 pb-4 space-y-3">
        <h3 className="font-bold text-xl leading-tight text-[#131414] group-hover:text-[#229264] transition-colors">
          {product.name}
        </h3>
        
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#131414]/40 font-medium">
          {product.short_desc}
        </p>
        
        <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#131414]/30 group-hover:text-[#229264] transition-colors">
          <span>Technical Specs</span>
          <ArrowRight size={14} className="transition-all -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  )
}

const STATIC_CATEGORIES = [
  { slug: 'current-transformers', name: 'Current Transformers', description: 'Precision measurement units.', products: [] },
  { slug: 'hrc-fuse-links', name: 'HRC Fuse Links', description: 'Fault clearance standards.', products: [] },
  { slug: 'fuse-switch-disconnectors', name: 'Switch Disconnectors', description: 'Isolation components.', products: [] },
  { slug: 'busbar-supports', name: 'Busbar Supports', description: 'Reinforced spacing units.', products: [] },
]

function StaticCategorySection({ category }: { category: typeof STATIC_CATEGORIES[0] }) {
  return (
    <section id={category.slug} className="scroll-mt-32">
      <div className="container-etal">
        <div className="mb-12 px-4 border-b border-gray-100 pb-8">
           <h2 className="font-headline font-bold text-[#131414] text-3xl md:text-5xl opacity-20 tracking-tight">
              {category.name}
           </h2>
        </div>
        <div className="py-32 text-center rounded-[3rem] border border-dashed border-gray-200 bg-[#fcfcfc] shadow-inner">
           <Database size={40} strokeWidth={1} className="mx-auto mb-4 text-gray-200" />
           <p className="text-[13px] font-medium text-[#131414]/30">Catalog synchronization in progress...</p>
        </div>
      </div>
    </section>
  )
}