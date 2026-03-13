import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Zap, Factory, Wind, Train, Server, Flame } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Sectors',
  description: 'ETAL electrical protection components are specified and installed across power distribution, industrial, renewable energy, rail, data centre and oil & gas sectors.',
}

const SECTORS = [
  {
    slug: 'power-distribution',
    name: 'Power Distribution',
    desc: 'LV switchgear panels, distribution boards and metering cabinets require accurate, reliable protection throughout the network.',
    products: ['Current Transformers', 'HRC Fuse Links', 'Fuse Switch Disconnectors'],
    icon: Zap,
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    desc: 'Manufacturing and process automation plants demand heavy-duty protection that can withstand continuous operation.',
    products: ['HRC Fuse Links', 'Fuse Switch Disconnectors', 'Busbar Supports'],
    icon: Factory,
  },
  {
    slug: 'renewable-energy',
    name: 'Renewable Energy',
    desc: 'Solar inverter stations, wind generation and battery energy storage systems require specialist protection.',
    products: ['Current Transformers', 'HRC Fuse Links'],
    icon: Wind,
  },
  {
    slug: 'rail-transport',
    name: 'Rail & Transport',
    desc: 'Certified protection components for traction substations and trackside distribution in rail infrastructure.',
    products: ['Current Transformers', 'Fuse Switch Disconnectors'],
    icon: Train,
  },
  {
    slug: 'data-centres',
    name: 'Data Centres',
    desc: 'Uninterrupted power protection for critical IT infrastructure with high-reliability components.',
    products: ['Current Transformers', 'HRC Fuse Links', 'Busbar Supports'],
    icon: Server,
  },
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    desc: 'Robust electrical protection for hazardous and demanding offshore and onshore energy sector environments.',
    products: ['HRC Fuse Links', 'Fuse Switch Disconnectors'],
    icon: Flame,
  },
]

export default function SectorsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="section-pad pb-10">
        <div className="container-etal space-y-4">
          <p className="eyebrow">Industries</p>
          <h1 className="font-headline text-[clamp(2.1rem,3.5vw,2.6rem)] leading-tight text-brand-dark">
            Sectors we serve.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-brand-gray">
            ETAL components are specified in power distribution, industrial, renewable and critical
            infrastructure applications where reliable protection is essential.
          </p>
        </div>
      </section>

      {/* Sectors grid */}
      <section className="section-pad pt-0">
        <div className="container-etal">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((sector) => {
              const Icon = sector.icon
              return (
                <div
                  key={sector.slug}
                  className="card group flex flex-col gap-4 p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </div>
                    <h2 className="font-headline text-lg leading-none text-brand-dark group-hover:text-brand-green transition-colors">
                      {sector.name}
                    </h2>
                  </div>

                  <p className="text-sm leading-relaxed text-brand-gray">
                    {sector.desc}
                  </p>

                  <div className="mt-3 border-t border-brand-gray-mid pt-3">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gray">
                      Relevant products
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {sector.products.map((p) => (
                        <span key={p} className="badge-gray text-[10px]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/products"
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-green hover:text-brand-dark"
                  >
                    View products
                    <ArrowRight size={11} className="arrow-nudge" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad pt-0">
        <div className="container-etal">
          <div className="card flex flex-col items-start gap-4 px-6 py-5 text-left md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-headline text-[clamp(1.6rem,3vw,2rem)] leading-tight text-brand-dark">
                Not sure which product fits your application?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-gray">
                Share your project brief and our technical team will suggest suitable components and
                supporting documentation.
              </p>
            </div>
            <Link href="/contact" className="btn-primary text-xs">
              Talk to an engineer
              <ArrowRight size={12} className="arrow-nudge" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
