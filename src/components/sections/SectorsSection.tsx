import Link from 'next/link'
import { ArrowRight, Zap, Factory, Wind, Train, Server, Flame, ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const SECTORS = [
  { slug: 'power-distribution', name: 'Power Distribution', desc: 'Protection for LV/MV distribution networks and switchgear panels.', icon: Zap },
  { slug: 'industrial',         name: 'Industrial',         desc: 'Heavy-duty protection for manufacturing and process automation.',   icon: Factory },
  { slug: 'renewable-energy',   name: 'Renewable Energy',   desc: 'Solutions for solar inverters, wind and BESS systems.',            icon: Wind },
  { slug: 'rail-transport',     name: 'Rail & Transport',   desc: 'Certified protection for rail and transit infrastructure.',         icon: Train },
  { slug: 'data-centres',       name: 'Data Centres',       desc: 'High-reliability protection for critical IT infrastructure.',       icon: Server },
  { slug: 'oil-gas',            name: 'Oil & Gas',          desc: 'Robust protection for hazardous energy environments.',              icon: Flame },
]

export default function SectorsSection() {
  return (
    <section className="section-pad bg-[#fcfcfc] overflow-hidden">
      <div className="container-etal space-y-16">
        
        {/* Header - Soft & Clean */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between px-2">
          <SectionHeader
            eyebrow="Expertise"
            title="Built for demanding applications."
            subtitle="ETAL components are specified across power distribution, industrial, renewable and critical infrastructure projects."
          />
          <Link 
            href="/sectors" 
            className="group flex items-center gap-4 bg-white border border-gray-100 pl-6 pr-2 py-2 rounded-full shadow-sm hover:shadow-md hover:border-[#229264]/30 transition-all duration-300"
          >
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#131414]">View All Sectors</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#229264] text-white transition-transform duration-500 group-hover:rotate-[45deg]">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        </div>

        {/* Grid - Floating Pill Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((s) => {
            const Icon = s.icon
            return (
              <Link
                key={s.slug}
                href={`/sectors/${s.slug}`}
                className="group relative flex flex-col gap-6 p-8 rounded-[2.5rem] border border-gray-100 bg-white transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 overflow-hidden"
              >
                {/* Visual Accent - Corner Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#229264]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon Container - Fully Rounded */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-[#131414]/40 transition-all duration-500 group-hover:bg-[#229264] group-hover:text-white group-hover:shadow-xl group-hover:shadow-[#229264]/20 group-hover:scale-110">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline text-2xl font-bold leading-none text-[#131414] group-hover:text-[#229264] transition-colors">
                      {s.name}
                    </h3>
                    {/* Status Indicator (Pulse) */}
                    <span className="flex h-2 w-2 relative opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#229264] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#229264]"></span>
                    </span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-[#131414]/50 font-medium">
                    {s.desc}
                  </p>
                </div>

                {/* Footer Link - Pill Style */}
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40 group-hover:text-[#229264] transition-colors">
                    Explore Solutions
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#229264]/10 transition-all duration-300">
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-[#229264] transition-all" />
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