import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Product, ProductCategory } from '@/types/database'

type ProductWithCategory = Product & { category: ProductCategory }

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

const STATIC = [
  { slug: 'current-transformers',      cat: 'Measurement',  name: 'Current Transformers',      desc: 'Precision-wound resin CTs for LV panel metering and protection.' },
  { slug: 'hrc-fuse-links',            cat: 'Protection',   name: 'HRC Fuse Links',            desc: 'High rupturing capacity fuse links for fast fault clearance.' },
  { slug: 'fuse-switch-disconnectors', cat: 'Switchgear',   name: 'Fuse Switch Disconnectors', desc: 'Combined fuse and switch for safe LV circuit isolation.' },
  { slug: 'busbar-supports',           cat: 'Switchgear',   name: 'Busbar Supports',           desc: 'Insulated clamps and supports for LV busbar systems.' },
]

export default async function FeaturedProductsSection() {
  const products = await getFeatured()

  return (
    <section className="section-pad bg-white">
      <div className="container-etal space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Product Range"
            title="The complete LV loop."
            subtitle="Four concise families covering measurement, protection and switching."
          />
          <Link href="/products" className="btn-outline text-xs">
            All products
            <ArrowRight size={14} className="arrow-nudge" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.length > 0
            ? products.map((p) => <DynamicCard key={p.id} product={p} />)
            : STATIC.map((p) => <StaticCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>
  )
}

/* ── Dynamic card (from DB) ────────────────────────────── */
function DynamicCard({ product }: { product: ProductWithCategory }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card"
    >
      <div className="product-card-img">
        {product.primary_image ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="number-deco text-8xl">{product.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="product-card-body">
        <span className="mb-1 text-[10px] font-body font-semibold uppercase tracking-[0.18em] text-brand-green">
          {product.category.name}
        </span>
        <h3 className="mb-2 font-headline text-xl leading-none text-brand-dark">
          {product.name}
        </h3>
        <p className="line-clamp-3 flex-1 text-xs leading-relaxed text-brand-gray">
          {product.short_desc}
        </p>
        <div className="mt-4 flex items-center gap-1 text-[11px] font-body font-semibold uppercase tracking-[0.16em] text-brand-green">
          View product
          <ArrowRight size={11} className="arrow-nudge" />
        </div>
      </div>
    </Link>
  )
}

/* ── Static fallback card ──────────────────────────────── */
function StaticCard({ product }: { product: typeof STATIC[0] }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card"
    >
      <div className="product-card-img flex items-center justify-center">
        <span className="number-deco text-[7rem]">{product.name.charAt(0)}</span>
      </div>

      <div className="product-card-body">
        <span className="mb-1 text-[10px] font-body font-semibold uppercase tracking-[0.18em] text-brand-green">
          {product.cat}
        </span>
        <h3 className="mb-2 font-headline text-xl leading-none text-brand-dark">
          {product.name}
        </h3>
        <p className="flex-1 text-xs leading-relaxed text-brand-gray">
          {product.desc}
        </p>
        <div className="mt-4 flex items-center gap-1 text-[11px] font-body font-semibold uppercase tracking-[0.16em] text-brand-green">
          View range
          <ArrowRight size={11} className="arrow-nudge" />
        </div>
      </div>
    </Link>
  )
}
