import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const AUDIENCES = [
  {
    num:   '01',
    title: 'Consultant',
    role:  'Design Engineers & Specifiers',
    desc:  'Detailed datasheets, CAD drawings and standards documentation to support specification and project design.',
    cta:   'Download Technical Library',
    href:  '/downloads',
    dark:  false,
  },
  {
    num:   '02',
    title: 'Panel Builder',
    role:  'LV Panel Manufacturers',
    desc:  'Compact, certified components with full dimensional data and mounting accessories for LV distribution assemblies.',
    cta:   'View Product Range',
    href:  '/products',
    dark:  true,
  },
  {
    num:   '03',
    title: 'Contractor',
    role:  'Electrical Contractors',
    desc:  'IEC-certified protection gear built for straightforward installation with full traceability and after-sales support.',
    cta:   'Get a Quote',
    href:  '/contact',
    dark:  false,
  },
]

export default function AudienceSection() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">
      <div className="container-etal">
        <SectionHeader
          eyebrow="Who We Serve"
          title="Built for the Whole Chain"
          subtitle="From design desk to installation, ETAL supports every role in the electrical project lifecycle."
          center
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 border border-brand-gray-mid">
          {AUDIENCES.map((item, i) => (
            <div
              key={item.title}
              className="relative flex flex-col border border-brand-gray-mid bg-white p-8"
            >

              {/* Large number */}
              <span className="mb-5 select-none font-headline text-[4rem] leading-none text-brand-gray-mid">
                {item.num}
              </span>

              {/* Role label */}
              <span className="mb-2 text-[10px] font-body font-semibold uppercase tracking-[0.22em] text-brand-green">
                {item.role}
              </span>

              {/* Title */}
              <h3
                className="mb-4 font-headline text-[clamp(1.6rem,3vw,2rem)] leading-none text-brand-dark"
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="mb-8 flex-1 font-body text-sm leading-relaxed text-brand-gray">
                {item.desc}
              </p>

              {/* CTA */}
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 text-sm font-body font-semibold text-brand-green hover:text-brand-dark"
              >
                {item.cta}
                <ArrowRight size={14} className="arrow-nudge" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
