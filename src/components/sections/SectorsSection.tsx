import Link from 'next/link'
import { ArrowRight, Zap, Factory, Wind, Train, Server, Flame, ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Dictionary } from '@/lib/getDictionary'

interface SectorsSectionProps {
  dict: Dictionary
  locale: string
}

export default function SectorsSection({ dict, locale }: SectorsSectionProps) {
  const lp = (path: string) => `/${locale}${path}`
  const s = dict.sectors

  const SECTORS = [
    { slug: 'power-distribution', name: s.items.power_distribution.name, desc: s.items.power_distribution.desc, icon: Zap },
    { slug: 'industrial',         name: s.items.industrial.name,         desc: s.items.industrial.desc,         icon: Factory },
    { slug: 'renewable-energy',   name: s.items.renewable_energy.name,   desc: s.items.renewable_energy.desc,   icon: Wind },
    { slug: 'rail-transport',     name: s.items.rail_transport.name,     desc: s.items.rail_transport.desc,     icon: Train },
    { slug: 'data-centres',       name: s.items.data_centres.name,       desc: s.items.data_centres.desc,       icon: Server },
    { slug: 'oil-gas',            name: s.items.oil_gas.name,            desc: s.items.oil_gas.desc,            icon: Flame },
  ]

  return (
    <section className="section-pad bg-[#fcfcfc] overflow-hidden">
      <div className="container-etal space-y-16">

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between px-2">
          <SectionHeader
            eyebrow={s.eyebrow}
            title={s.title}
            subtitle={s.subtitle}
          />
          <Link
            href={lp('/sectors')}
            className="group flex items-center gap-4 bg-white border border-gray-100 ps-6 pe-2 py-2 rounded-full shadow-sm hover:shadow-md hover:border-[#229264]/30 transition-all duration-300"
          >
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#131414]">{s.view_all}</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#229264] text-white transition-transform duration-500 group-hover:rotate-[45deg]">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector) => {
            const Icon = sector.icon
            return (
              <Link
                key={sector.slug}
                href={lp(`/sectors/${sector.slug}`)}
                className="group relative flex flex-col gap-6 p-8 rounded-[2.5rem] border border-gray-100 bg-white transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#229264]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-[#131414]/40 transition-all duration-500 group-hover:bg-[#229264] group-hover:text-white group-hover:shadow-xl group-hover:shadow-[#229264]/20 group-hover:scale-110">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline text-2xl font-bold leading-none text-[#131414] group-hover:text-[#229264] transition-colors">
                      {sector.name}
                    </h3>
                    <span className="flex h-2 w-2 relative opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#229264] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#229264]"></span>
                    </span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-[#131414]/50 font-medium">
                    {sector.desc}
                  </p>
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40 group-hover:text-[#229264] transition-colors">
                    {s.explore_solutions}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#229264]/10 transition-all duration-300">
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-[#229264] transition-all rtl:rotate-180" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
