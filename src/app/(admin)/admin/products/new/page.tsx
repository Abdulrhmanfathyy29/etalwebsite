import { createClient } from '@/lib/supabase/server'
import ProductForm from '../ProductForm'
import { PlusCircle, PackagePlus, ChevronRight, LayoutGrid } from 'lucide-react'

export default async function NewProductPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from('product_categories')
    .select('*')
    .order('sort_order')

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-fade-in">
      
      {/* ── 1️⃣ Premium Header Console ── */}
      <div className="relative mb-12 p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* Subtle Background Glow (Industrial Green) */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#229264]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            {/* Breadcrumb Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <PackagePlus size={12} />
              <span>Catalog</span>
              <ChevronRight size={10} />
              <span className="text-[#229264]">Creation</span>
            </div>

            <div className="space-y-1">
              <h1 className="font-headline font-bold text-[#131414] leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}>
                Add New <span className="text-[#229264]">Product.</span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[#EBDC36] animate-pulse" />
                <p className="text-[14px] font-medium text-[#131414]/40 tracking-tight">
                  Define technical specifications and visual assets.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Info Pill */}
          <div className="shrink-0 flex items-center gap-4 px-6 py-4 rounded-[2rem] bg-[#fcfcfc] border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-[#229264]/10 flex items-center justify-center text-[#229264]">
              <LayoutGrid size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#131414]/30">Availability</p>
              <p className="text-[13px] font-bold text-[#131414]">Global Library Sync</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2️⃣ Product Form Wrapper ── */}
      <div className="relative">
        {/* The form will inherit the global rounded-pill styles we've standardized */}
        <ProductForm categories={categories || []} />
      </div>

      {/* Footer System Branding */}
      <div className="mt-10 px-10 flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-[#131414]/20">
         <div className="h-1.5 w-1.5 rounded-full bg-[#229264]" />
         <span>Asset Protection: Active</span>
         <div className="h-1.5 w-1.5 rounded-full bg-gray-200 ml-auto" />
         <span>System v3.1</span>
      </div>
    </div>
  )
}