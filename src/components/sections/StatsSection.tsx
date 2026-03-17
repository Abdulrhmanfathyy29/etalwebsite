'use client'

import { ShieldCheck } from 'lucide-react'
import type { Dictionary } from '@/lib/getDictionary'

const CERTS = ['IEC 60044‑1', 'BS EN 60269', 'IEC 60282', 'S.A.E', 'ISO 9001']

interface StatsSectionProps {
  dict: Dictionary
}

export default function StatsSection({ dict }: StatsSectionProps) {
  const s = dict.stats

  const STATS = [
    { value: '2007',     label: s.year_founded },
    { value: '4,000m²',  label: s.factory_floor },
    { value: 'ISO 9001', label: s.quality_system },
    { value: '50+',      label: s.product_lines },
  ]

  return (
    <section className="section-pad bg-[#229264] relative overflow-hidden">

      {/* ── Atmospheric Background ── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-etal space-y-12 relative z-10">

        {/* ── Stats Grid ── */}
        <div className="relative grid gap-4 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative flex flex-col p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2 overflow-hidden"
            >
              <span className="absolute top-4 end-8 select-none font-headline text-[5rem] leading-none text-white/[0.03] group-hover:text-white/[0.07] transition-all duration-500 group-hover:scale-110 pointer-events-none">
                0{i + 1}
              </span>

              <div className="relative z-10 space-y-3 mt-8">
                <div className="relative inline-block">
                  <p className="font-headline text-5xl text-white leading-none tracking-tighter drop-shadow-md">
                    {stat.value}
                  </p>
                  <span className="absolute -bottom-2 start-0 w-8 h-1 bg-[#EBDC36] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/60 group-hover:text-white transition-colors">
                    {stat.label}
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white/10 rounded-full blur-xl group-hover:bg-[#EBDC36]/20 transition-all" />
            </div>
          ))}
        </div>

        {/* ── Certs Panel ── */}
        <div className="group relative flex flex-col gap-8 p-10 rounded-[3rem] border border-white/15 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md shadow-2xl">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#229264] shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#EBDC36]">
                  {s.quality_assurance}
                </p>
                <h3 className="font-headline text-2xl md:text-3xl text-white leading-none">
                  {s.certified_standards}
                </h3>
              </div>
            </div>
            <div className="hidden md:block h-px flex-1 mx-10 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {CERTS.map((c) => (
              <span key={c} className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 font-mono text-[12px] font-medium text-white shadow-sm hover:border-[#EBDC36]/50 hover:bg-white/10 transition-all duration-300 cursor-default">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EBDC36] opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EBDC36]"></span>
                </div>
                {c}
              </span>
            ))}
          </div>

          <div className="absolute bottom-6 end-10 text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] pointer-events-none">
            Compliance_Verified_2026
          </div>
        </div>
      </div>
    </section>
  )
}
