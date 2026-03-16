import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Download, CheckCircle2, ArrowRight, FileText, ChevronRight, ShieldCheck, Zap, Activity } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import type { ProductWithDetails } from '@/types/database'
import { cn } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

// ── 1. جلب بيانات المنتج من السيرفر ──
async function getProduct(slug: string): Promise<ProductWithDetails | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select(`
      *,
      category:product_categories(*),
      specs:product_specs(*),
      downloads(*),
      sectors:product_sectors(sector:sectors(*))
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!data) return null

  return {
    ...data,
    sectors: (data.sectors as any[]).map((ps) => ps.sector),
  } as unknown as ProductWithDetails
}

// ── 2. جلب المنتجات ذات الصلة ──
async function getRelated(categoryId: string, currentId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('id, name, slug, short_desc, primary_image, category:product_categories(name)')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', currentId)
    .limit(3)
  return data || []
}

// ── 3. توليد الـ Metadata للسيو ──
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const p = await getProduct(slug)
  if (!p) return { title: 'Product Not Found' }
  return {
    title: p.meta_title || p.name,
    description: p.meta_description || p.short_desc || undefined,
    openGraph: {
      title: p.name,
      images: p.primary_image ? [{ url: p.primary_image }] : [],
    },
  }
}

// ── 4. المكون الرئيسي (Server Component) ──
export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const related = await getRelated(product.category_id, product.id)

  const specGroups = product.specs.reduce<Record<string, typeof product.specs>>(
    (acc, spec) => {
      const g = spec.spec_group || 'Specifications'
      if (!acc[g]) acc[g] = []
      acc[g].push(spec)
      return acc
    },
    {}
  )

  const hasSpecs = Object.keys(specGroups).length > 0

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 overflow-hidden">

      {/* Breadcrumb Path */}
      <div className="sticky top-16 md:top-20 z-30 px-4 md:px-10 py-4">
        <nav className="flex items-center gap-2 w-fit px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm font-bold text-[10px] uppercase tracking-widest text-[#131414]/40">
          <Link href="/" className="hover:text-[#229264] transition-colors">Home</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <Link href="/products" className="hover:text-[#229264] transition-colors">Catalog</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <span className="text-[#229264] truncate max-w-[150px]">{product.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="container-etal pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,0.9fr] gap-12 lg:gap-20 items-start">
          
          <div className="space-y-6">
            <div className="relative aspect-square rounded-[3.5rem] bg-white border border-gray-100 shadow-xl shadow-black/[0.02] flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#229264_1px,transparent_1px)] bg-[size:32px_32px]" />
              {product.primary_image && (
                <Image
                  src={product.primary_image}
                  alt={product.name}
                  fill priority
                  className="object-contain p-16 group-hover:scale-110 transition-transform duration-1000 ease-out z-10"
                />
              )}
              <div className="absolute top-10 left-10 z-20">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-[10px] font-bold text-[#229264] uppercase tracking-widest">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#229264] animate-pulse" />
                  Technical Asset
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#229264]/10 text-[#229264] text-[10px] font-bold uppercase tracking-widest mb-6">
                <Zap size={12} /> {product.category.name}
              </div>
              <h1 className="font-headline font-bold text-[#131414] leading-[1.05] mb-6 tracking-tight text-4xl md:text-6xl">
                {product.name}
              </h1>
              <p className="text-[16px] text-[#131414]/60 font-medium leading-relaxed italic border-l-2 border-[#229264]/20 pl-6">
                {product.description}
              </p>
            </div>

            {/* Features Pill Block */}
            {product.features?.length > 0 && (
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/30 mb-6 flex items-center gap-3">
                  <Activity size={16} /> Key Capabilities
                </h2>
                <div className="grid gap-4">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 transition-all group">
                      <div className="h-6 w-6 rounded-full bg-[#229264]/10 flex items-center justify-center text-[#229264] shrink-0 group-hover:bg-[#229264] transition-colors">
                        <CheckCircle2 size={14} strokeWidth={3} />
                      </div>
                      <span className="text-[14px] font-bold text-[#131414]/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-gray-50">
              <a href={product.datasheet_url || '#'} target="_blank" rel="noopener noreferrer"
                 className="flex-1 flex items-center justify-center gap-3 bg-[#131414] text-white px-10 py-5 rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#229264] hover:shadow-2xl hover:shadow-[#229264]/20 transition-all duration-500 group">
                <Download size={18} /> Technical Datasheet
              </a>
              <Link href="/contact" 
                    className="flex-1 flex items-center justify-center gap-3 bg-white text-[#131414] border border-gray-200 px-10 py-5 rounded-full font-bold text-[13px] uppercase tracking-widest hover:border-[#229264] hover:text-[#229264] transition-all shadow-sm">
                Request Quote <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Grid */}
      {hasSpecs && (
        <section className="py-24 bg-white rounded-[3.5rem] border-y border-gray-100 mx-4 lg:mx-10 relative overflow-hidden">
          <div className="container-etal">
            <h2 className="font-headline font-bold text-[#131414] text-3xl md:text-5xl tracking-tight text-center mb-16">
              Technical Data <span className="text-[#229264]">Sheets.</span>
            </h2>
            <div className="grid gap-10 lg:grid-cols-2">
              {Object.entries(specGroups).map(([group, specs]) => (
                <div key={group} className="bg-[#fcfcfc] rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                  <div className="px-8 py-5 border-b border-gray-100 bg-white flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#131414]/30">{group}</span>
                    <Badge variant="gray">IEEE_REF</Badge>
                  </div>
                  <div className="p-4 space-y-2">
                    {specs.sort((a, b) => a.sort_order - b.sort_order).map((spec) => (
                      <div key={spec.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all group">
                        <span className="text-[14px] font-bold text-[#131414]/60 group-hover:text-[#131414] transition-colors">{spec.spec_key}</span>
                        <div className="flex items-center gap-2">
                           <span className="font-mono text-[14px] font-bold text-[#131414]">{spec.spec_value}</span>
                           {spec.spec_unit && <span className="text-[11px] font-bold text-[#229264] opacity-40">{spec.spec_unit}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}