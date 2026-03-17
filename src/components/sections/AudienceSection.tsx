import Link from 'next/link'
import { ChevronRight, Compass, Factory, HardHat } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Dictionary } from '@/lib/getDictionary'

interface AudienceSectionProps {
  dict: Dictionary
  locale: string
}

export default function AudienceSection({ dict, locale }: AudienceSectionProps) {
  const lp = (path: string) => `/${locale}${path}`
  const a = dict.audience

  const AUDIENCES = [
    {
      num:   '01',
      title: a.items.consultant.title,
      role:  a.items.consultant.role,
      desc:  a.items.consultant.desc,
      cta:   a.items.consultant.cta,
      href:  lp('/downloads'),
      icon:  Compass,
    },
    {
      num:   '02',
      title: a.items.panel_builder.title,
      role:  a.items.panel_builder.role,
      desc:  a.items.panel_builder.desc,
      cta:   a.items.panel_builder.cta,
      href:  lp('/products'),
      icon:  Factory,
    },
    {
      num:   '03',
      title: a.items.contractor.title,
      role:  a.items.contractor.role,
      desc:  a.items.contractor.desc,
      cta:   a.items.contractor.cta,
      href:  lp('/contact'),
      icon:  HardHat,
    },
  ]

  return (
    <section className="section-pad bg-[#fcfcfc] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[150%] bg-[radial-gradient(circle_at_top_right,rgba(34,146,100,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="container-etal relative z-10">
        <SectionHeader
          eyebrow={a.eyebrow}
          title={a.title}
          subtitle={a.subtitle}
          center
          className="mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {AUDIENCES.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group relative flex flex-col p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:-translate-y-2 overflow-hidden"
              >
                {/* Phase Indicator & Icon */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-[#229264] group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500 shadow-inner">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-gray-300 group-hover:text-[#229264] transition-colors">
                      {a.phase}
                    </span>
                    <span className="font-headline text-2xl font-bold text-gray-100 group-hover:text-[#229264]/20 transition-colors">
                      {item.num}
                    </span>
                  </div>
                </div>

                {/* Title & Role Badge */}
                <div className="mb-6">
                  <h3 className="font-headline text-3xl font-bold text-[#131414] mb-3 group-hover:text-[#229264] transition-colors">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#229264] bg-[#229264]/5 px-3 py-1.5 rounded-full border border-[#229264]/10">
                    <span className="h-1 w-1 rounded-full bg-[#229264]" />
                    {item.role}
                  </span>
                </div>

                {/* Description */}
                <p className="mb-12 flex-1 text-[15px] leading-relaxed text-[#131414]/50 font-medium">
                  {item.desc}
                </p>

                {/* CTA Button */}
                <Link
                  href={item.href}
                  className="group/btn relative inline-flex items-center justify-center gap-3 bg-gray-50 text-[#131414] px-6 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-[#229264] hover:text-white transition-all duration-300 shadow-sm"
                >
                  {item.cta}
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#229264] group-hover/btn:bg-white/20 group-hover/btn:text-white transition-all">
                    <ChevronRight size={14} className="rtl:rotate-180 group-hover/btn:translate-x-0.5 transition-transform" />
                  </div>
                </Link>

                <div className="absolute bottom-0 start-0 h-1.5 w-0 bg-[#229264] transition-all duration-700 group-hover:w-full" />
              </div>
            )
          })}
        </div>
      </div>

      <div className="hidden lg:block absolute top-[55%] left-1/2 -translate-x-1/2 w-[70%] h-px bg-dashed border-t border-dashed border-gray-100 -z-10" />
    </section>
  )
}
