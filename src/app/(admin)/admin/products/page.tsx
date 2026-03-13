import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, Eye } from 'lucide-react'
import DeleteProductButton from './DeleteProductButton'
import type { Product, ProductCategory } from '@/types/database'

type ProductWithCategory = Product & { category: ProductCategory }

async function getProducts(): Promise<ProductWithCategory[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, category:product_categories(*)')
    .order('sort_order')

  return (data as ProductWithCategory[]) || []
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-brand-gray-mid">
        <div>
          <p className="eyebrow mb-2">Admin</p>
          <h1 className="font-headline text-[clamp(1.8rem,4vw,2.5rem)] leading-none text-brand-dark">
            Products
          </h1>
          <p className="text-xs text-brand-gray mt-1.5">
            {products.length} product{products.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary text-sm">
          <Plus size={15} /> Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="panel overflow-hidden">
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th className="hidden md:table-cell">Category</th>
              <th className="hidden lg:table-cell">Status</th>
              <th className="hidden lg:table-cell">Featured</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="font-body font-semibold text-sm text-brand-dark">{product.name}</div>
                    <div className="font-body text-xs text-brand-gray mt-0.5">/{product.slug}</div>
                  </td>

                  <td className="hidden md:table-cell">
                    <span className="badge-gray">{product.category.name}</span>
                  </td>

                  <td className="hidden lg:table-cell">
                    <span className={`badge ${product.is_active ? 'badge-green' : 'badge-gray'}`}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td className="hidden lg:table-cell">
                    {product.is_featured && (
                      <span className="badge badge-yellow">Featured</span>
                    )}
                  </td>

                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-gray/40
                                   hover:text-brand-green hover:bg-brand-green/[0.08] transition-colors"
                        title="View on site"
                      >
                        <Eye size={14} />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-gray/40
                                   hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      <DeleteProductButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="!text-center !py-16 font-body text-sm text-brand-gray">
                  No products yet.{' '}
                  <Link href="/admin/products/new" className="text-brand-green hover:underline">
                    Add your first product
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
