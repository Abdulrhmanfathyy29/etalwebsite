import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Box, ArrowUpRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Product, ProductCategory } from '@/types/database'
import type { Dictionary } from '@/lib/getDictionary'

type ProductWithCategory = Product & { category: ProductCategory }

interface FeaturedProductsSectionProps {
  dict: Dictionary
  locale: string
}

async function getFeatured(): Promise<ProductWithCategory[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, category:product_categories(*)')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('sort_order')
    .limit(4)
  return (data as ProductWithCategory[]) || []
}

export default async function FeaturedProductsSection({ dict, locale }: FeaturedProductsSectionProps) {
  const products = await getFeatured()
  const lp = (path: string) => `/${locale}${path}`
  const f = dict.featured

  const STATIC = [
    { slug: 'current-transformers',      cat: f.static.ct.cat,  name: f.static.ct.name,  desc: f.static.ct.desc },
    { slug: 'hrc-fuse-links',            cat: f.static.hrc.cat, name: f.static.hrc.name, desc: f.static.hrc.desc },
    { slug: 'fuse-switch-disconnectors', cat: f.static.fsd.cat, name: f.static.fsd.name, desc: f.static.fsd.desc },
    { slug: 'busbar-supports',           cat: f.static.bs.cat,  name: f.static.bs.name,  desc: f.static.bs.desc },
  ]

  return (
    <section className="section-pad bg-[#fcfcfc] overflow-hidden">
      <div className="container-etal space-y-12">

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between px-2">
          <SectionHeader
            eyebrow={f.eyebrow}
            title={f.title}
            subtitle={f.subtitle}
          />
          <Link href={lp('/products')} className="group flex items-center gap-4 bg-white border border-gray-100 ps-6 pe-2 py-2 rounded-full shadow-sm hover:shadow-md hover:border-[#229264]/30 transition-all duration-300">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#131414]">{f.all_products}</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#229264] text-white transition-transform duration-500 group-hover:rotate-[45deg]">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.length > 0
            ? products.map((p) => <DynamicCard key={p.id} product={p} locale={locale} viewSpecs={f.view_specifications} />)
            : STATIC.map((p) => <StaticCard key={p.slug} product={p} locale={locale} viewRange={f.view_range} />)}
        </div>
      </div>
    </section>
  )
}

/* ── Common Card Wrapper Classes ── */
const CARD_CLASSES = `
  group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-gray-100
  bg-white p-3 transition-all duration-500 hover:-translate-y-2
  hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:border-[#229264]/20
`

/* ── Dynamic card (from DB) ── */
function DynamicCard({ product, locale, viewSpecs }: { product: ProductWithCategory; locale: string; viewSpecs: string }) {
  const lp = (path: string) => `/${locale}${path}`
  return (
    <Link href={lp(`/products/${product.slug}`)} className={CARD_CLASSES}>
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#f8f9fa] flex items-center justify-center p-8 transition-colors duration-500 group-hover:bg-[#229264]/5">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#229264_1px,transparent_1px)] [background-size:20px_20px]" />
        {product.primary_image ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            className="object-contain p-10 transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="relative z-10 opacity-20"><Box size={50} strokeWidth={1} /></div>
        )}
        <div className="absolute top-4 end-4 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm">
          <ArrowUpRight size={14} className="text-[#229264]" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pb-8">
        <div className="mb-4 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#229264]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#229264]">
            {product.category.name}
          </span>
        </div>
        <h3 className="mb-3 font-headline text-xl font-bold leading-tight text-[#131414] group-hover:text-[#229264] transition-colors">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#131414]/50 font-medium">
          {product.short_desc}
        </p>
        <div className="mt-8 flex items-center justify-between group/btn">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40 transition-colors group-hover:text-[#229264]">
            {viewSpecs}
          </span>
          <div className="h-8 w-8 rounded-full border border-gray-100 flex items-center justify-center transition-all duration-300 group-hover:bg-[#229264] group-hover:text-white">
            <ArrowRight size={14} className="rtl:rotate-180" />
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ── Static fallback card ── */
function StaticCard({ product, locale, viewRange }: { product: { slug: string; cat: string; name: string; desc: string }; locale: string; viewRange: string }) {
  const lp = (path: string) => `/${locale}${path}`
  return (
    <Link href={lp(`/products/${product.slug}`)} className={CARD_CLASSES}>
      <div className="relative aspect-square rounded-[2rem] bg-[#f8f9fa] flex items-center justify-center overflow-hidden">
        <span className="relative z-10 font-headline text-[10rem] text-[#131414]/[0.02] group-hover:text-[#229264]/5 transition-colors">
          {product.name.charAt(0)}
        </span>
        <Box size={40} strokeWidth={1} className="absolute text-brand-dark/5" />
      </div>

      <div className="flex flex-1 flex-col p-6 pb-8">
        <div className="mb-4 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#229264]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#229264]">
            {product.cat}
          </span>
        </div>
        <h3 className="mb-3 font-headline text-xl font-bold text-[#131414]">{product.name}</h3>
        <p className="line-clamp-2 text-[13px] text-[#131414]/50 font-medium">{product.desc}</p>

        <div className="mt-8 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#229264]">
            {viewRange}
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center">
            <ArrowRight size={14} className="text-[#229264] rtl:rotate-180" />
          </div>
        </div>
      </div>
    </Link>
  )
}
