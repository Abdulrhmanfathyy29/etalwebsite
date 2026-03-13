import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import SectionHeader from '@/components/ui/SectionHeader'
import type { ProductCategory, Product } from '@/types/database'

export const metadata: Metadata = {
  title: 'Products',
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
    <div className="bg-white">
      {/* Page header */}
      <section className="section-pad pb-8">
        <div className="container-etal space-y-4">
          <p className="eyebrow">Product range</p>
          <h1 className="font-headline text-[clamp(2.1rem,3.5vw,2.6rem)] leading-tight text-brand-dark">
            Products for the low‑voltage loop.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-brand-gray">
            Four concise families covering measurement, protection and switching, built to
            international standards.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {displayCategories.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="rounded-full border border-brand-gray-mid px-3 py-1 text-xs text-brand-gray hover:border-brand-green hover:text-brand-dark transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <div>
        {categories.length > 0
          ? categories.map((cat, i) => (
              <CategorySection key={cat.id} category={cat} alternate={i % 2 !== 0} />
            ))
          : STATIC_CATEGORIES.map((cat, i) => (
              <StaticCategorySection key={cat.slug} category={cat} alternate={i % 2 !== 0} />
            ))}
      </div>
    </div>
  )
}

function CategorySection({ category, alternate }: { category: CategoryWithProducts; alternate: boolean }) {
  return (
    <section
      id={category.slug}
      className={`section-pad ${alternate ? 'bg-brand-gray-light' : 'bg-white'}`}
    >
      <div className="container-etal">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Category"
            title={category.name}
            subtitle={category.description || undefined}
          />
          <Link href={`/products/${category.slug}`} className="btn-outline text-xs">
            View all {category.name}
            <ArrowRight size={14} className="arrow-nudge" />
          </Link>
        </div>

        {category.products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-gray-mid p-10 text-center text-sm text-brand-gray">
            No products in this category yet.
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
      className="product-card group"
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
          <div className="flex h-full w-full items-center justify-center">
            <span className="number-deco text-8xl">{product.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="product-card-body">
        <h3 className="mb-2 font-headline text-lg leading-none text-brand-dark group-hover:text-brand-green transition-colors">
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

const STATIC_CATEGORIES = [
  {
    slug: 'current-transformers',
    name: 'Current Transformers',
    description: 'Precision-wound resin-encapsulated CTs for measurement and protection in LV distribution.',
    products: [] as Product[],
  },
  {
    slug: 'hrc-fuse-links',
    name: 'HRC Fuse Links',
    description: 'High Rupturing Capacity fuse links for fast, reliable fault clearance in industrial circuits.',
    products: [] as Product[],
  },
  {
    slug: 'fuse-switch-disconnectors',
    name: 'Fuse Switch Disconnectors',
    description: 'Combined fuse and switch disconnectors for safe, efficient LV circuit isolation.',
    products: [] as Product[],
  },
  {
    slug: 'busbar-supports',
    name: 'Busbar Supports',
    description: 'Insulated supports and clamps for safe LV busbar installation and spacing.',
    products: [] as Product[],
  },
]

function StaticCategorySection({
  category,
  alternate,
}: {
  category: typeof STATIC_CATEGORIES[0]
  alternate: boolean
}) {
  return (
    <section id={category.slug} className={`section-pad ${alternate ? 'bg-brand-gray-light' : 'bg-white'}`}>
      <div className="container-etal">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="Category"
            title={category.name}
            subtitle={category.description}
          />
          <Link href={`/products/${category.slug}`} className="btn-outline flex-shrink-0 text-sm">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="border border-dashed border-brand-gray-mid p-12 text-center
                        text-brand-gray font-body text-sm">
          Products will appear here once added via the admin dashboard.
        </div>
      </div>
    </section>
  )
}
