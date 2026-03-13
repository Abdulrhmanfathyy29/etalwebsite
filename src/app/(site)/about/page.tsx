import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Award, Factory, Calendar, Globe } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'About ETAL',
  description: 'ETAL has been engineering electrical protection components since 2007 from a 4,000m² ISO-certified facility in Fayoum, Egypt.',
}

const TIMELINE = [
  { year: '2007', event: 'ETAL founded in Fayoum, Egypt. Initial production of current transformers.' },
  { year: '2010', event: 'Expanded product range to include HRC fuse links. First export contracts secured.' },
  { year: '2013', event: 'ISO 9001 certification achieved. Factory floor expanded to 2,000m².' },
  { year: '2016', event: 'Launch of fuse switch disconnector range. S.A.E vendor approval received.' },
  { year: '2019', event: 'Factory expands to 4,000m². Busbar support product family introduced.' },
  { year: '2023', event: 'IEC 60044-1 and BS EN 60269 certification renewed. New R&D laboratory.' },
  { year: '2024', event: 'Digital product library launched. Export markets expanded across MENA.' },
]

const CERTIFICATIONS = [
  { name: 'ISO 9001', desc: 'Quality Management System' },
  { name: 'IEC 60044-1', desc: 'Current Transformer Standard' },
  { name: 'BS EN 60269', desc: 'HRC Fuse Links Standard' },
  { name: 'IEC 60282', desc: 'HV Fuse Standards' },
  { name: 'S.A.E', desc: 'Egyptian Standards & Quality' },
]

const VALUES = [
  {
    icon: Award,
    title: 'Precision Manufacturing',
    desc: 'Every component is manufactured to tight tolerances with 100% factory testing before dispatch.',
  },
  {
    icon: Factory,
    title: '4,000m² Facility',
    desc: 'Our Fayoum plant houses winding, casting, testing and assembly under one roof.',
  },
  {
    icon: Globe,
    title: 'IEC Certified',
    desc: 'All products are certified to relevant IEC, BS EN and Egyptian national standards.',
  },
  {
    icon: Calendar,
    title: '17 Years Experience',
    desc: 'Established 2007, supplying panel builders, contractors and utilities across the region.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="section-pad bg-white">
        <div className="container-etal grid gap-10 md:grid-cols-[1.7fr,1.3fr] md:items-start">
          <div className="space-y-5">
            <p className="eyebrow">Our story</p>
            <h1 className="font-headline text-[clamp(2.2rem,3.5vw,2.7rem)] leading-tight text-brand-dark">
              Electrical protection components from Fayoum, Egypt.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-brand-gray">
              Since 2007, ETAL has manufactured current transformers, HRC fuse links, fuse switch
              disconnectors and busbar supports for panel builders, OEMs and utilities across the region.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-brand-gray">
            {[
              { v: '2007', l: 'Year founded' },
              { v: '4,000m²', l: 'ISO‑certified facility' },
              { v: 'IEC / BS EN', l: 'International standards' },
              { v: 'Fayoum', l: 'Industrial zone, Egypt' },
            ].map((s) => (
              <div key={s.l} className="card p-4">
                <p className="font-headline text-xl text-brand-dark">{s.v}</p>
                <p className="mt-1 text-xs text-brand-gray">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-[#f8f9fa]">
        <div className="container-etal">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Engineering. Quality. Reliability."
            center
            className="mb-14"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="card flex flex-col gap-4 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-headline text-lg leading-none text-brand-dark">{v.title}</h3>
                  <p className="font-body text-sm text-brand-gray leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad bg-brand-gray-light">
        <div className="container-etal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Company History"
                title="From Workshop to World-Class Manufacturer"
                subtitle="ETAL was founded in 2007 with a single product — a panel-mount current transformer — and a commitment to manufacturing electrical protection components that engineers could trust."
              />
              <div className="mt-6 space-y-4 font-body text-brand-gray leading-relaxed">
                <p>
                  Over the following decade, the product range expanded to include HRC fuse links, fuse switch disconnectors, and the full range of LV busbar supports — creating a complete ecosystem of protection components for the low voltage loop.
                </p>
                <p>
                  Today, ETAL operates from a 4,000m² manufacturing facility in the Fayoum Industrial Zone, with dedicated winding halls, resin casting, environmental test laboratories, and a fully equipped quality control department.
                </p>
              </div>
              <Link href="/contact" className="btn-primary text-sm mt-8 inline-flex">
                Work With Us <ArrowRight size={16} />
              </Link>
            </div>

            {/* Factory image placeholder */}
            <div className="card flex aspect-[4/3] items-center justify-center">
              <div className="text-center space-y-2">
                <Factory size={40} className="mx-auto text-brand-green/60" />
                <p className="text-sm text-brand-gray">Fayoum Industrial Zone, Egypt</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-white">
        <div className="container-etal space-y-8">
          <SectionHeader
            eyebrow="Timeline"
            title="17 years of steady growth."
            subtitle="Key moments in the development of ETAL’s product range and manufacturing capability."
          />
          <div className="space-y-4">
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className="flex items-start gap-4 rounded-xl border border-brand-gray-mid/70 bg-white px-4 py-3 hover:border-brand-green/70 hover:bg-brand-green/2 transition-colors"
              >
                <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                  {item.year}
                </span>
                <p className="text-sm text-brand-gray">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-pad bg-white">
        <div className="container-etal">
          <SectionHeader
            eyebrow="Quality Assurance"
            title="Certified. Tested. Trusted."
            center
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="card p-5 text-center"
              >
                <div className="mb-2 text-sm font-semibold text-brand-dark">{cert.name}</div>
                <div className="text-xs text-brand-gray">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
