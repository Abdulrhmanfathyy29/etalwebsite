import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductForm from '../../ProductForm'
import { Edit3, Package, ChevronRight, Settings2 } from 'lucide-react'

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
    <div className="max-w-5xl mx-auto pb-20 animate-fade-in">
      
      {/* ── 1️⃣ Premium Header Console ── */}
      <div className="relative mb-12 p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#229264]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            {/* Breadcrumb Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <Package size={12} />
              <span>Inventory</span>
              <ChevronRight size={10} />
              <span className="text-[#229264]">Editor</span>
            </div>

            <div className="space-y-1">
              <h1 className="font-headline font-bold text-[#131414] leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}>
                Edit <span className="text-[#229264]">Component.</span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[#EBDC36] animate-pulse" />
                <p className="text-[14px] font-mono font-bold text-[#131414]/40 tracking-tighter">
                  ID: {id.slice(0, 8).toUpperCase()} // {(product as any).name}
                </p>
              </div>
            </div>
          </div>

          {/* Status Indicator Pill */}
          <div className="shrink-0 flex items-center gap-4 px-6 py-4 rounded-[2rem] bg-[#fcfcfc] border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-[#229264]/10 flex items-center justify-center text-[#229264]">
              <Settings2 size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#131414]/30">System Mode</p>
              <p className="text-[13px] font-bold text-[#131414]">Write Permissions Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2️⃣ Product Form Container ── */}
      <div className="relative">
        {/* We keep the form as is, it will inherit the global rounded-pill styles we've built */}
        <ProductForm categories={categories || []} product={product as any} />
      </div>

      {/* Footer System Log */}
      <div className="mt-10 px-10 flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-[#131414]/20">
         <div className="h-1.5 w-1.5 rounded-full bg-[#229264]" />
         <span>Security: SSL Encrypted Entry</span>
         <div className="h-1.5 w-1.5 rounded-full bg-gray-200 ml-auto" />
         <span>Session Active</span>
      </div>
    </div>
  )
}