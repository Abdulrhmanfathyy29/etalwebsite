import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, ArrowUpRight, ShieldCheck, Headphones, Globe } from 'lucide-react'
import { getDictionary } from '@/lib/getDictionary'
import ContactForm from './ContactForm'

type Locale = 'en' | 'ar'

export const metadata: Metadata = {
  title: 'Contact ETAL',
  description: 'Get in touch with the ETAL team for product enquiries, technical support and sales questions.',
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const c = dict.contact

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 overflow-hidden">

      {/* ── 1. Header ── */}
      <section className="relative pt-32 pb-24 bg-white rounded-b-[3.5rem] shadow-sm overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#229264_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="container-etal relative z-10 space-y-8 text-center lg:text-start">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#229264]/5 border border-[#229264]/10">
            <span className="h-2 w-2 rounded-full bg-[#229264] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#229264]">
              {c.eyebrow}
            </span>
          </div>

          <h1 className="font-headline font-bold text-[#131414] leading-[1.05]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {c.headline_1} <span className="text-[#229264]">{c.headline_2}</span>
          </h1>

          <p className="max-w-2xl mx-auto lg:mx-0 text-[16px] leading-relaxed text-[#131414]/60 font-medium">
            {c.description}
          </p>
        </div>
      </section>

      {/* ── 2. Main Content & Form ── */}
      <div className="container-etal py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left: Contact info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="relative bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-xl shadow-black/[0.02] overflow-hidden">
              <div className="absolute top-0 start-0 w-full h-2 bg-[#229264]/10" />

              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#229264]/10 flex items-center justify-center text-[#229264]">
                    <Headphones size={20} />
                  </div>
                  <h2 className="font-headline text-2xl font-bold text-[#131414]">{c.directory}</h2>
                </div>
                <span className="text-[10px] font-bold text-[#131414]/20 uppercase tracking-[0.2em]">{c.ref_code}</span>
              </div>

              <div className="space-y-8">
                <ContactInfoItem icon={Mail}   label={c.global_support}      value="info@etal.com"                  href="mailto:info@etal.com" />
                <ContactInfoItem icon={Phone}  label={c.direct_line}         value="+20 xxx xxx xxxx"               href="tel:+20xxxxxxxxxx" />
                <ContactInfoItem icon={MapPin} label={c.production_facility} value={c.location_value} />
                <ContactInfoItem icon={Clock}  label={c.operational_hours}   value={c.hours_value} />
              </div>
            </div>

            {/* Departments Box */}
            <div className="bg-[#131414] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-black/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1.5 w-1.5 bg-[#229264] rounded-full animate-pulse shadow-[0_0_10px_#229264]" />
                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
                  {c.routing_table}
                </h3>
              </div>

              <ul className="space-y-6">
                {[
                  { label: c.sales_orders,      email: 'sales@etal.com' },
                  { label: c.technical_support, email: 'technical@etal.com' },
                  { label: c.export_division,   email: 'export@etal.com' },
                ].map((dept) => (
                  <li key={dept.label} className="flex flex-col border-b border-white/5 pb-6 last:border-0 last:pb-0 group">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 group-hover:text-[#229264] transition-colors">
                      {dept.label}
                    </span>
                    <a href={`mailto:${dept.email}`} className="text-[15px] font-medium hover:text-[#229264] transition-all flex items-center justify-between">
                      {dept.email}
                      <ArrowUpRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all rtl:rotate-180" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8">
            <div className="mb-10 flex items-center justify-between px-4">
              <div className="space-y-1">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#131414]">
                  {c.inquiry_headline_1} <span className="text-[#229264]">{c.inquiry_headline_2}</span>
                </h2>
                <p className="text-[14px] text-[#131414]/40 font-medium italic">{c.form_notice}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#229264]/5 border border-[#229264]/10 text-[10px] font-bold text-[#229264] uppercase tracking-widest">
                <ShieldCheck size={14} /> {c.secure_protocol}
              </div>
            </div>

            <ContactForm dict={dict} />
          </div>
        </div>
      </div>

      {/* ── 3. Map ── */}
      <section className="container-etal pb-20">
        <div className="relative w-full h-[400px] bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center group">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#131414_1.5px,transparent_1.5px)] bg-[size:40px_40px]" />

          <div className="absolute top-8 start-8 text-[11px] font-mono font-bold text-[#131414]/20 flex flex-col gap-1 tracking-tighter">
            <span>POSITION: 29.3084° N</span>
            <span>DATA_REF: 30.8428° E</span>
          </div>

          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="relative flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full border border-[#229264] animate-ping opacity-20" />
              <div className="absolute inset-4 rounded-full border border-[#229264]/40 animate-pulse" />
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-50 text-[#229264]">
                <Globe size={28} strokeWidth={1.5} />
              </div>
            </div>
            <h4 className="text-[18px] font-bold text-[#131414] tracking-tight">{c.location_name}</h4>
            <p className="text-[11px] font-bold text-[#229264] uppercase tracking-[0.3em] mt-2">{c.location_subtitle}</p>
          </div>

          <div className="absolute bottom-10 end-10 h-10 w-10 border-b-2 border-e-2 border-gray-100 rounded-br-[2rem]" />
          <div className="absolute top-10 end-10 h-10 w-10 border-t-2 border-e-2 border-gray-100 rounded-tr-[2rem]" />
        </div>
      </section>
    </div>
  )
}

function ContactInfoItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="group flex items-center gap-5 p-2 -m-2 rounded-full hover:bg-gray-50 transition-all duration-300">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-50 border border-gray-100 transition-all duration-500 group-hover:bg-[#229264] group-hover:text-white group-hover:scale-110 shadow-sm">
        <Icon size={20} strokeWidth={1.5} className="group-hover:rotate-[15deg] transition-transform" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#131414]/30 mb-0.5 group-hover:text-[#229264] transition-colors">
          {label}
        </p>
        <p className="text-[14px] font-bold text-[#131414] truncate">{value}</p>
      </div>
    </div>
  )

  if (href) return <a href={href} className="block w-full">{content}</a>
  return content
}
