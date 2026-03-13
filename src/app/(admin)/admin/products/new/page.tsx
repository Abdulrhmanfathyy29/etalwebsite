import { createClient } from '@/lib/supabase/server'
import ProductForm from '../ProductForm'

export default async function NewProductPage() {
  const supabase = await createClient()
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
          Add Product
        </h1>
        <p className="font-body text-xs text-brand-gray mt-1.5">
          Fill in the details below to create a new product listing.
        </p>
      </div>
      <ProductForm categories={categories || []} />
    </div>
  )
}
