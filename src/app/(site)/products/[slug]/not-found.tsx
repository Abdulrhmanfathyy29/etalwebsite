'use client'

import Link from 'next/link'
import { PackageX, Search, ArrowLeft, Terminal, ShieldAlert } from 'lucide-react'

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center relative overflow-hidden p-6">
      
      {/* ── 1️⃣ Atmospheric Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Industrial Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: `radial-gradient(#229264 1px, transparent 1px)`,
               backgroundSize: '32px 32px'
             }} 
        />
        {/* Glowing Orbs */}
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-[#229264]/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-[#229264]/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative w-full max-w-2xl z-10 text-center flex flex-col items-center">
        
        {/* Massive Soft Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(10rem,25vw,20rem)] font-headline font-black text-[#131414]/[0.02] select-none pointer-events-none tracking-tighter leading-none -z-10">
          404
        </div>

        {/* ── 2️⃣ Main Capsule Card ── */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3.5rem] border border-gray-100 p-12 md:p-16 shadow-2xl shadow-black/[0.03] flex flex-col items-center relative overflow-hidden w-full">
          
          {/* Status Indicator Pill */}
          <div className="mb-8 flex items-center gap-3 rounded-full border border-amber-100 bg-amber-50/50 px-5 py-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-700">
              System Exception: Object Null
            </span>
          </div>

          {/* Icon Orb */}
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gray-50 border border-gray-100 text-gray-300 shadow-inner group transition-all duration-500 hover:scale-110 hover:text-[#229264] hover:bg-[#229264]/5 hover:border-[#229264]/20">
            <PackageX size={40} strokeWidth={1.5} className="transition-transform duration-700 group-hover:rotate-12" />
          </div>

          <h1 className="font-headline text-4xl md:text-5xl font-bold text-[#131414] tracking-tight mb-6">
            Component <span className="text-[#229264]">Offline.</span>
          </h1>
          
          <p className="text-[15px] text-[#131414]/50 leading-relaxed max-w-md mx-auto mb-12 font-medium">
            The technical specification or part number you requested is currently unavailable in our live database.
          </p>

          {/* ── 3️⃣ Action Button Pills ── */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link 
              href="/products" 
              className="group flex items-center justify-center gap-3 bg-[#131414] text-white px-10 py-5 rounded-full font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-[#229264] hover:shadow-2xl hover:shadow-[#229264]/20 transition-all duration-500"
            >
              <Search size={18} className="transition-transform group-hover:scale-110" />
              Scan Catalog
            </Link>
            
            <Link 
              href="/" 
              className="group flex items-center justify-center gap-3 bg-white text-[#131414] border border-gray-200 px-10 py-5 rounded-full font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-gray-50 hover:border-gray-300 transition-all duration-500 shadow-sm"
            >
              <ArrowLeft size={18} className="text-gray-300 group-hover:-translate-x-1 transition-all" />
              Return Home
            </Link>
          </div>
          
          {/* Subtle Decorative Corners */}
          <div className="absolute top-10 right-10 opacity-[0.05] text-[#131414]"><ShieldAlert size={60} /></div>
        </div>

        {/* ── 4️⃣ Technical Footer Console ── */}
        <div className="mt-12 flex items-center gap-4 px-6 py-2 rounded-full border border-gray-100 bg-white shadow-sm animate-fade-in">
          <Terminal size={14} className="text-[#229264]" />
          <div className="text-[10px] font-mono font-bold text-[#131414]/30 uppercase tracking-[0.2em] whitespace-nowrap">
            Err: 404 // Lookup: Invalid_Slug // Status: Logged
          </div>
        </div>

      </div>
    </div>
  )
}