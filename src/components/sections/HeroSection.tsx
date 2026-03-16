'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Cpu, ChevronRight } from 'lucide-react'

const STATS = [
  { value: '2007', label: 'Founded', sub: 'Fayoum, Egypt' },
  { value: '4,000m²', label: 'Factory', sub: 'ISO-certified' },
  { value: '50+', label: 'Products', sub: '4 Families' },
  { value: 'IEC', label: 'Certified', sub: 'Global Standards' },
]

const QUICK = [
  { icon: Zap, label: 'Current Transformers', href: '/products/current-transformers', desc: 'High-precision metering' },
  { icon: Shield, label: 'HRC Fuse Links', href: '/products/hrc-fuse-links', desc: 'Reliable circuit protection' },
  { icon: Cpu, label: 'Fuse Switch Disconnectors', href: '/products/fuse-switch-disconnectors', desc: 'Heavy-duty switching' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-16 md:py-28">
      
      {/* ── 1️⃣ Atmospheric Background & Engineering Grid ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Gradient Glow */}
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#229264]/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#229264]/5 blur-[120px] rounded-full" />

        {/* Engineering Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.06]" 
             style={{ 
               backgroundImage: `radial-gradient(#229264 0.5px, transparent 0.5px), linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
               backgroundSize: '24px 24px, 48px 48px, 48px 48px',
               maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)'
             }} 
        />
        
        {/* Visual Presence Shapes */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[1px] border-[#229264]/5 opacity-30 animate-pulse" />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-[1px] border-[#229264]/10 opacity-20" />
      </div>

      <div className="relative container-etal">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          
          {/* ── LEFT CONTENT ── */}
          <div className="z-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#229264]/5 border border-[#229264]/10 mb-8 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#229264] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#229264]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#229264]">
                Engineering Excellence Since 2007
              </span>
            </div>

            <h1 className="font-headline text-[#131414] leading-[1.05] mb-8 animate-fade-up tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 4.2rem)' }}>
              Precision protection <br />
              <span className="text-[#229264]">for the low-voltage loop.</span>
            </h1>

            <p className="max-w-lg text-[16px] leading-relaxed text-[#131414]/60 mb-10 animate-fade-up font-medium">
              ETAL designs and manufactures IEC-certified electrical components in Egypt, 
              powering critical infrastructure for panel builders and global utilities.
            </p>

            <div className="flex flex-wrap gap-4 mb-16 animate-fade-up">
              <Link href="/products" className="group relative flex items-center justify-center gap-3 bg-[#229264] text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-[#1b7550] hover:shadow-2xl hover:shadow-[#229264]/30 transition-all duration-300">
                Explore Products
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="flex items-center justify-center gap-2 border border-gray-200 bg-white text-[#131414] px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:border-[#229264] hover:text-[#229264] transition-all duration-300">
                Technical Support
              </Link>
            </div>

            {/* ── STATS BAR (Pill Style) ── */}
            <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-0 border border-gray-100 rounded-[2.5rem] bg-white/70 backdrop-blur-md shadow-xl shadow-black/[0.03] overflow-hidden animate-fade-up">
              {STATS.map((s, i) => (
                <div key={s.label} className={`px-8 py-6 text-center sm:text-left ${i !== STATS.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-gray-100' : ''}`}>
                  <p className="text-2xl font-headline font-bold text-[#131414]">{s.value}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#229264] mt-1">{s.label}</p>
                  <p className="text-[10px] text-[#131414]/40 font-medium">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT CARDS (Soft Rounded) ── */}
          <div className="relative space-y-4 lg:pl-10 animate-fade-up">
            {QUICK.map(({ icon: Icon, label, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-5 p-5 rounded-[2rem] border border-gray-100 bg-white/90 backdrop-blur-xl
                           hover:border-[#229264]/30 hover:shadow-2xl hover:shadow-[#229264]/10 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 group-hover:bg-[#229264] transition-all duration-500">
                  <Icon size={22} className="text-[#131414]/40 group-hover:text-white transition-colors duration-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-[#131414] group-hover:text-[#229264] transition-colors leading-tight">
                    {label}
                  </p>
                  <p className="text-[12px] text-[#131414]/40 mt-1 font-medium">{desc}</p>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#229264]/10 transition-colors">
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#229264] transition-all" />
                </div>
              </Link>
            ))}

            <Link
              href="/products"
              className="group flex items-center justify-center gap-3 pt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#131414]/30 hover:text-[#229264] transition-all"
            >
              Discover Full Catalog
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}