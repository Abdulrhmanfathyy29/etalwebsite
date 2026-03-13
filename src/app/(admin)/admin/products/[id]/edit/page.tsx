import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductForm from '../../ProductForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*, specs:product_specs(*)')
    .eq('id', id)
    .single()

  if (!product) notFound()

  const { data: categories } = await supabase
    .from('product_categories')
    .select('*')
    .order('sort_order')

  return (
    <div>
      <div className="mb-8 pb-6 border-b border-brand-gray-mid">
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-green mb-1.5">
          Products
        </p>
        <h1 className="font-headline text-brand-dark leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Edit Product
        </h1>
        <p className="font-body text-xs text-brand-gray mt-1.5">{(product as any).name}</p>
      </div>
      <ProductForm categories={categories || []} product={product as any} />
    </div>
  )
}
