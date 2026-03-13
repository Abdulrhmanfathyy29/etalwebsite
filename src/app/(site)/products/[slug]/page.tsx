import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Download, CheckCircle2, ArrowRight, FileText, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import Badge from '@/components/ui/Badge'
import type { ProductWithDetails } from '@/types/database'

interface Props {
  params: Promise<{ slug: string }>
}

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getProduct(slug)
  if (!p) return { title: 'Product Not Found' }
  return {
    title: p.meta_title || p.name,
    description: p.meta_description || p.short_desc || undefined,
    openGraph: { title: p.name, description: p.short_desc || undefined,
      images: p.primary_image ? [{ url: p.primary_image }] : [] },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const related = await getRelated(product.category_id, product.id)

  /* Group specs by their spec_group field */
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
    <div className="bg-white min-h-screen">

      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <div className="border-b border-brand-gray-mid/60 bg-white">
        <div className="container-etal py-4">
          <nav className="flex items-center gap-1.5 font-body text-xs text-brand-gray">
            {[
              { href: '/',         label: 'Home' },
              { href: '/products', label: 'Products' },
              { href: `/products/${product.category.slug}`, label: product.category.name },
            ].map((bc) => (
              <span key={bc.href} className="flex items-center gap-1.5">
                <Link href={bc.href} className="hover:text-brand-green transition-colors">
                  {bc.label}
                </Link>
                <ChevronRight size={11} />
              </span>
            ))}
            <span className="font-medium text-brand-dark">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Product hero ────────────────────────────────────── */}
      <div className="container-etal py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* Left: Image stack */}
          <div>
            <div className="relative aspect-square border border-brand-gray-mid bg-brand-gray-light
                            rounded-2xl flex items-center justify-center overflow-hidden group
                            shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-green" />

              {product.primary_image ? (
                <Image
                  src={product.primary_image}
                  alt={product.name}
                  fill priority
                  className="object-contain p-10 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <span className="number-deco" style={{ fontSize: '10rem' }}>
                  {product.name.charAt(0)}
                </span>
              )}

              {/* Category chip */}
              <div className="absolute top-4 left-4">
                <Badge variant="green">{product.category.name}</Badge>
              </div>
            </div>

            {/* Gallery thumbnails */}
            {product.image_gallery?.length > 0 && (
              <div className="flex gap-2.5 mt-3">
                {product.image_gallery.slice(0, 5).map((img, i) => (
                  <div key={i}
                       className="relative w-[72px] h-[72px] rounded-xl border border-brand-gray-mid
                                  hover:border-brand-green transition-colors overflow-hidden">
                    <Image src={img} alt="" fill
                           className="object-contain p-1.5"
                           sizes="72px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-px bg-brand-green" />
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-brand-green">
                {product.category.name}
              </span>
            </div>

            <h1
              className="font-headline text-brand-dark leading-none mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              {product.name}
            </h1>

            <p className="font-body text-brand-gray text-[15px] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Features */}
            {product.features?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-body text-[11px] font-semibold uppercase tracking-widest
                               text-brand-dark border-b border-brand-gray-mid pb-2 mb-4">
                  Key Features
                </h2>
                <ul className="space-y-2.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-sm text-brand-gray">
                      <CheckCircle2 size={15} className="text-brand-green flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Standards */}
            {product.standards?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="font-body text-[11px] text-brand-gray self-center mr-1">Standards:</span>
                {product.standards.map((s) => (
                  <Badge key={s} variant="gray">{s}</Badge>
                ))}
              </div>
            )}

            {/* Certifications */}
            {product.certifications?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="font-body text-[11px] text-brand-gray self-center mr-1">Certified:</span>
                {product.certifications.map((c) => (
                  <Badge key={c} variant="green">{c}</Badge>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-brand-gray-mid">
              {product.datasheet_url ? (
                <a href={product.datasheet_url} target="_blank" rel="noopener noreferrer"
                   className="btn-primary text-sm px-6 py-3">
                  <Download size={15} /> Download Datasheet
                </a>
              ) : null}
              <Link href="/contact" className="btn-outline text-sm px-6 py-3">
                Request a Quote <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Technical Specifications ─────────────────────────── */}
      {hasSpecs && (
        <section className="border-y border-brand-gray-mid bg-brand-gray-light/50">
          <div className="container-etal py-10">
            <h2 className="mb-6 font-headline text-[clamp(1.8rem,3vw,2.2rem)] leading-none text-brand-dark">
              Technical specifications
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {Object.entries(specGroups).map(([group, specs]) => (
                <div key={group} className="overflow-hidden rounded-2xl border border-brand-gray-mid bg-white">
                  <div className="border-b border-brand-gray-mid/70 bg-brand-green/5 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-dark">
                    {group}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                      <tbody>
                        {specs
                          .sort((a, b) => a.sort_order - b.sort_order)
                          .map((spec) => (
                            <tr key={spec.id} className="border-b border-brand-gray-mid/70 last:border-0">
                              <th className="w-1/2 px-5 py-3 font-medium text-brand-dark">
                                {spec.spec_key}
                              </th>
                              <td className="px-5 py-3 text-brand-gray">
                                {spec.spec_value}
                                {spec.spec_unit && (
                                  <span className="ml-1.5 text-xs text-brand-gray/70">
                                    {spec.spec_unit}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Downloads ────────────────────────────────────────── */}
      {product.downloads?.length > 0 && (
        <div className="container-etal py-14">
          <h2 className="font-headline text-brand-dark leading-none mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Downloads
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.downloads.map((doc) => (
              <a key={doc.id} href={doc.file_url} target="_blank" rel="noopener noreferrer"
                 className="download-card group">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center
                                shrink-0 group-hover:bg-brand-green/20 transition-colors">
                  <FileText size={17} className="text-brand-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-sm text-brand-dark
                                group-hover:text-brand-green transition-colors truncate">
                    {doc.title}
                  </p>
                  <p className="font-body text-[11px] text-brand-gray uppercase tracking-wider mt-0.5">
                    {doc.file_type}
                  </p>
                </div>
                <Download size={14} className="text-brand-gray-mid group-hover:text-brand-green
                                               transition-colors flex-shrink-0 self-center" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Related products ─────────────────────────────────── */}
      {related.length > 0 && (
        <div className="border-t border-brand-gray-mid bg-white">
          <div className="container-etal py-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-headline text-[clamp(1.6rem,3vw,2.1rem)] leading-none text-brand-dark">
                Related products
              </h2>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-[11px] font-body font-semibold uppercase tracking-[0.16em] text-brand-green"
              >
                All products
                <ArrowRight size={11} className="arrow-nudge" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p: any) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="card block p-5"
                >
                  <span className="mb-1 block text-[10px] font-body font-semibold uppercase tracking-[0.18em] text-brand-green">
                    {p.category?.name}
                  </span>
                  <h3 className="mb-1 font-headline text-lg leading-none text-brand-dark">
                    {p.name}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-brand-gray">
                    {p.short_desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
