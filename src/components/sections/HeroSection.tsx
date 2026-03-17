'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Shield, Cpu, ChevronRight } from 'lucide-react'
import type { Dictionary } from '@/lib/getDictionary'

interface HeroSectionProps {
  dict: Dictionary
  locale: string
}

export default function HeroSection({ dict, locale }: HeroSectionProps) {
  const lp = (path: string) => `/${locale}${path}`
  const h = dict.hero

  const STATS = [
    { value: '2007',    label: h.stat_founded,  sub: h.stat_founded_sub },
    { value: '4,000m²', label: h.stat_factory,   sub: h.stat_factory_sub },
    { value: '50+',     label: h.stat_products,  sub: h.stat_products_sub },
    { value: 'IEC',     label: h.stat_certified, sub: h.stat_certified_sub },
  ]

  const QUICK = [
    { icon: Zap,    label: h.quick_ct_label,  href: lp('/products/current-transformers'),      desc: h.quick_ct_desc },
    { icon: Shield, label: h.quick_hrc_label, href: lp('/products/hrc-fuse-links'),            desc: h.quick_hrc_desc },
    { icon: Cpu,    label: h.quick_fsd_label, href: lp('/products/fuse-switch-disconnectors'), desc: h.quick_fsd_desc },
  ]

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-16 md:py-28">

      {/* ── Atmospheric Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#229264]/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#229264]/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.06]"
             style={{
               backgroundImage: `radial-gradient(#229264 0.5px, transparent 0.5px), linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
               backgroundSize: '24px 24px, 48px 48px, 48px 48px',
               maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)',
             }}
        />
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
                {h.eyebrow}
              </span>
            </div>

            <h1 className="font-headline text-[#131414] leading-[1.05] mb-8 animate-fade-up tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 4.2rem)' }}>
              {h.headline_1} <br />
              <span className="text-[#229264]">{h.headline_2}</span>
            </h1>

            <p className="max-w-lg text-[16px] leading-relaxed text-[#131414]/60 mb-10 animate-fade-up font-medium">
              {h.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-16 animate-fade-up">
              <Link href={lp('/products')} className="group relative flex items-center justify-center gap-3 bg-[#229264] text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-[#1b7550] hover:shadow-2xl hover:shadow-[#229264]/30 transition-all duration-300">
                {h.cta_primary}
                <ArrowRight size={18} className="transition-transform ltr:group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link href={lp('/contact')} className="flex items-center justify-center gap-2 border border-gray-200 bg-white text-[#131414] px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:border-[#229264] hover:text-[#229264] transition-all duration-300">
                {h.cta_secondary}
              </Link>
            </div>

            {/* ── STATS BAR ── */}
            <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-0 border border-gray-100 rounded-[2.5rem] bg-white/70 backdrop-blur-md shadow-xl shadow-black/[0.03] overflow-hidden animate-fade-up">
              {STATS.map((s, i) => (
                <div key={s.label} className={`px-8 py-6 text-center sm:text-start ${i !== STATS.length - 1 ? 'border-b sm:border-b-0 sm:border-e border-gray-100' : ''}`}>
                  <p className="text-2xl font-headline font-bold text-[#131414]">{s.value}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#229264] mt-1">{s.label}</p>
                  <p className="text-[10px] text-[#131414]/40 font-medium">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT CARDS ── */}
          <div className="relative space-y-4 lg:ps-10 animate-fade-up">
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
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#229264] transition-all rtl:rotate-180" />
                </div>
              </Link>
            ))}

            <Link
              href={lp('/products')}
              className="group flex items-center justify-center gap-3 pt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#131414]/30 hover:text-[#229264] transition-all"
            >
              {h.discover_catalog}
              <ArrowRight size={14} className="transition-transform ltr:group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
