import Link from 'next/link'
import { ArrowRight, Zap, Factory, Wind, Train, Server, Flame } from 'lucide-react'
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
    <section className="section-pad bg-white">
      <div className="container-etal space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Sectors"
            title="Built for demanding applications."
            subtitle="ETAL components are specified across power distribution, industrial, renewable and critical infrastructure projects."
          />
          <Link href="/sectors" className="btn-outline text-xs">
            All sectors
            <ArrowRight size={14} className="arrow-nudge" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((s) => {
            const Icon = s.icon
            return (
              <Link
                key={s.slug}
                href={`/sectors/${s.slug}`}
                className="card flex flex-col gap-4 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-gray-mid">
                    <Icon size={18} className="text-brand-green" />
                  </div>
                  <h3 className="font-headline text-lg leading-none text-brand-dark">
                    {s.name}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-brand-gray">
                  {s.desc}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-body font-semibold uppercase tracking-[0.16em] text-brand-green">
                  View applications
                  <ArrowRight size={11} className="arrow-nudge" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
