import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'

export default function CtaBannerSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-etal">
        <div className="card flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Download library</p>
            <h2 className="font-headline text-[clamp(1.8rem,3vw,2.2rem)] leading-none text-brand-dark">
              Technical documentation on demand.
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-brand-gray">
              Datasheets, catalogs, CAD drawings and certificates for the complete ETAL range,
              ready to download without registration.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/downloads" className="btn-accent">
              <Download size={15} />
              Download library
              <ArrowRight size={14} className="arrow-nudge" />
            </Link>
            <Link href="/contact" className="btn-outline text-xs">
              Talk to an engineer
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
