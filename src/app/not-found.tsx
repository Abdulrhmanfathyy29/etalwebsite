import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#131414] flex items-center justify-center relative overflow-hidden z-0">
      
      {/* 1️⃣ Engineering Blueprint Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,146,100,0.05)_0%,transparent_60%)] z-[-1]" />
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:48px_48px] z-[-1]" />
      
      {/* 2️⃣ Top Indicator Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#229264] to-transparent opacity-50" />

      {/* 3️⃣ CAD Corner Crosshairs */}
      <div className="absolute top-8 left-8 text-white/10 text-xs font-mono pointer-events-none">+</div>
      <div className="absolute top-8 right-8 text-white/10 text-xs font-mono pointer-events-none">+</div>
      <div className="absolute bottom-8 left-8 text-white/10 text-xs font-mono pointer-events-none">+</div>
      <div className="absolute bottom-8 right-8 text-white/10 text-xs font-mono pointer-events-none">+</div>

      <div className="relative text-center px-6 w-full max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Massive 404 Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(12rem,25vw,24rem)] font-headline font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none z-[-1]">
          404
        </div>

        {/* Content Box */}
        <div className="relative z-10 flex flex-col items-center mt-12">
          
          {/* Status Badge */}
          <div className="mb-8 flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
              System Error 404
            </span>
          </div>

          <h1 className="font-headline text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Route Unreachable.
          </h1>
          
          <div className="h-[1px] w-12 bg-[#229264]/50 mb-6" />

          <p className="font-sans text-[15px] text-white/50 leading-relaxed max-w-md mx-auto mb-10 font-light">
            The technical specification or page you are attempting to access is unavailable, has been relocated, or does not exist in our current directory.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link 
              href="/" 
              className="group relative flex items-center justify-center gap-3 bg-[#229264] text-white px-8 py-3.5 text-[12px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#1b7550] hover:shadow-[0_4px_20px_rgba(34,146,100,0.3)] transition-all duration-300"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Return to Home
            </Link>
            
            <Link 
              href="/products" 
              className="group relative flex items-center justify-center gap-3 bg-transparent text-white border border-white/20 px-8 py-3.5 text-[12px] font-bold uppercase tracking-widest rounded-sm hover:border-white/60 hover:bg-white/5 transition-all duration-300"
            >
              <Search size={16} className="text-white/50 group-hover:text-white transition-colors" />
              Browse Catalog
            </Link>
          </div>
          
        </div>

        {/* Technical Footer Note */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/20 uppercase tracking-widest whitespace-nowrap">
          ERR_CODE: PAGE_NOT_FOUND // STATUS: OFFLINE
        </div>

      </div>
    </div>
  )
}