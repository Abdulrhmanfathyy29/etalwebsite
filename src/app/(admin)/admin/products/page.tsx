import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, Eye, Package, LayoutGrid, Star, Activity } from 'lucide-react'
import DeleteProductButton from './DeleteProductButton'
import type { Product, ProductCategory } from '@/types/database'
import { cn } from '@/lib/utils'

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
    <div className="space-y-10 max-w-6xl mx-auto pb-20">

      {/* ── 1️⃣ Header Console ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#229264]/10 border border-[#229264]/20 text-[#229264] text-[10px] font-bold uppercase tracking-widest">
            <Package size={12} /> Product Catalog
          </div>
          <h1 className="font-headline font-bold text-[#131414] leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}>
            Inventory <span className="text-[#229264]">Control.</span>
          </h1>
          <div className="flex items-center gap-3 text-[12px] text-[#131414]/40 font-bold uppercase tracking-tighter">
            <span>{products.length} Items Listed</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="text-[#229264]">Production Live</span>
          </div>
        </div>
        
        <Link 
          href="/admin/products/new" 
          className="group flex items-center justify-center gap-3 bg-[#131414] text-white px-8 py-4 rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#229264] hover:shadow-2xl hover:shadow-[#229264]/20 transition-all duration-300"
        >
          <Plus size={18} />
          Create New Entry
        </Link>
      </div>

      {/* ── 2️⃣ Data Grid Panel ── */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40">Product Identity</th>
                <th className="hidden md:table-cell px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40">Category</th>
                <th className="hidden lg:table-cell px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40 text-center">Lifecycle</th>
                <th className="hidden lg:table-cell px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40 text-center">Spotlight</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="group hover:bg-[#fcfcfc] transition-colors">
                    {/* Identity */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-2xl bg-gray-50 flex items-center justify-center text-[#131414]/20 group-hover:bg-[#229264]/10 group-hover:text-[#229264] transition-all duration-300">
                          <LayoutGrid size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[14px] text-[#131414] group-hover:text-[#229264] transition-colors truncate">
                            {product.name}
                          </div>
                          <div className="font-mono text-[10px] text-[#131414]/30 mt-0.5 truncate tracking-tighter">
                            /{product.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="hidden md:table-cell px-6 py-5">
                      <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-[10px] font-bold uppercase tracking-widest text-[#131414]/50 group-hover:bg-white transition-colors">
                        {product.category.name}
                      </span>
                    </td>

                    {/* Lifecycle Status */}
                    <td className="hidden lg:table-cell px-6 py-5">
                      <div className="flex justify-center">
                        <span className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all",
                          product.is_active 
                            ? "bg-[#229264]/5 border-[#229264]/20 text-[#229264]" 
                            : "bg-gray-50 border-gray-200 text-gray-400"
                        )}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", product.is_active ? "bg-[#229264] animate-pulse" : "bg-gray-300")} />
                          {product.is_active ? 'Active' : 'Draft'}
                        </span>
                      </div>
                    </td>

                    {/* Featured Status */}
                    <td className="hidden lg:table-cell px-6 py-5">
                      <div className="flex justify-center">
                        {product.is_featured ? (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBDC36]/10 border border-[#EBDC36]/30 text-[#8b7e0a] text-[10px] font-bold uppercase tracking-widest">
                            <Star size={12} fill="currentColor" />
                            <span>Featured</span>
                          </div>
                        ) : (
                          <span className="text-gray-200">—</span>
                        )}
                      </div>
                    </td>

                    {/* Operations */}
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300
                                     hover:text-[#229264] hover:bg-[#229264]/10 transition-all border border-transparent hover:border-[#229264]/20"
                          title="View Live"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300
                                     hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                          title="Edit Blueprint"
                        >
                          <Pencil size={16} />
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-200">
                        <Package size={32} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-[#131414]">No products indexed</p>
                        <p className="text-[13px] text-[#131414]/40">The product database is currently empty.</p>
                      </div>
                      <Link href="/admin/products/new" className="mt-2 text-[12px] font-bold text-[#229264] uppercase tracking-widest hover:underline">
                        Create Your First Entry
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 3️⃣ Footer Analytics ── */}
      <div className="px-8 flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-[#131414]/20">
         <div className="h-1.5 w-1.5 rounded-full bg-[#229264]" />
         <span>Catalog Integrity Verified</span>
         <div className="h-1.5 w-1.5 rounded-full bg-gray-200 ml-auto" />
         <span>Update: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  )
}