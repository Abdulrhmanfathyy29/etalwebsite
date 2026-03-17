import Link from 'next/link'
import { ArrowRight, Download, FileText } from 'lucide-react'
import type { Dictionary } from '@/lib/getDictionary'

interface CtaBannerSectionProps {
  dict: Dictionary
  locale: string
}

export default function CtaBannerSection({ dict, locale }: CtaBannerSectionProps) {
  const lp = (path: string) => `/${locale}${path}`
  const c = dict.cta

  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-etal">
        <div className="relative group overflow-hidden rounded-3xl border border-[#229264] bg-[#229264] p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-500">

          <div className="absolute top-0 right-0 p-8 opacity-[0.06] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-700 text-white">
            <FileText size={300} strokeWidth={0.5} />
          </div>

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="space-y-5">
              <div className="inline-flex items-center gap-3">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#EBDC36] animate-pulse"></span>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                  {c.eyebrow}
                </p>
              </div>

              <h2 className="font-headline font-bold text-white leading-[1.1]"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
                {c.headline_1} <br className="hidden md:block" />
                <span className="text-white/60">{c.headline_2}</span>
              </h2>

              <p className="max-w-xl text-[14px] leading-relaxed text-white/80 font-medium">
                {c.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <Link
                href={lp('/downloads')}
                className="group/btn relative flex items-center justify-center gap-3 bg-[#EBDC36] text-[#131414] px-8 py-4 rounded-full font-sans text-[12px] font-bold uppercase tracking-widest transition-all hover:bg-white hover:shadow-[0_4px_20px_rgba(235,220,54,0.3)]"
              >
                <Download size={16} className="transition-transform group-hover/btn:-translate-y-1" />
                {c.download_library}
                <ArrowRight size={16} className="ms-1 transition-transform ltr:group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
              </Link>

              <Link
                href={lp('/contact')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-sans text-[12px] font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-all"
              >
                {c.talk_engineer}
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        <p className="text-center mt-6 text-[10px] font-mono uppercase tracking-[0.25em] text-[#131414]/40">
          {c.no_registration}
        </p>
      </div>
    </section>
  )
}
