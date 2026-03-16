import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, ArrowUpRight, ShieldCheck, Headphones, Globe } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact ETAL',
  description: 'Get in touch with the ETAL team for product enquiries, technical support and sales questions.',
}

export default function ContactPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 overflow-hidden">
      
      {/* ── 1. Header - Fluid Blueprint Style ── */}
      <section className="relative pt-32 pb-24 bg-white rounded-b-[3.5rem] shadow-sm overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#229264_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container-etal relative z-10 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#229264]/5 border border-[#229264]/10">
            <span className="h-2 w-2 rounded-full bg-[#229264] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#229264]">
              Communication Hub
            </span>
          </div>
          
          <h1 className="font-headline font-bold text-[#131414] leading-[1.05]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Get in touch with <span className="text-[#229264]">ETAL Experts.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto lg:mx-0 text-[16px] leading-relaxed text-[#131414]/60 font-medium">
            Our engineering and support teams are standing by to assist with sales inquiries, technical specifications, or global export logistics.
          </p>
        </div>
      </section>

      {/* ── 2. Main Content & Form ── */}
      <div className="container-etal py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column: Contact info (Soft Pill Style) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Reach Us Box */}
            <div className="relative bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-xl shadow-black/[0.02] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#229264]/10" />
              
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-[#229264]/10 flex items-center justify-center text-[#229264]">
                      <Headphones size={20} />
                   </div>
                   <h2 className="font-headline text-2xl font-bold text-[#131414]">Directory</h2>
                </div>
                <span className="text-[10px] font-bold text-[#131414]/20 uppercase tracking-[0.2em]">HQ_01</span>
              </div>
              
              <div className="space-y-8">
                <ContactInfoItem icon={Mail} label="Global Support" value="info@etal.com" href="mailto:info@etal.com" />
                <ContactInfoItem icon={Phone} label="Direct Line" value="+20 xxx xxx xxxx" href="tel:+20xxxxxxxxxx" />
                <ContactInfoItem icon={MapPin} label="Production Facility" value="Fayoum Industrial Zone, Egypt" />
                <ContactInfoItem icon={Clock} label="Operational Hours" value="Sun – Thu, 08:00 – 17:00 EET" />
              </div>
            </div>

            {/* Departments Box (Dark Mode Pill) */}
            <div className="bg-[#131414] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-black/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1.5 w-1.5 bg-[#229264] rounded-full animate-pulse shadow-[0_0_10px_#229264]" />
                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Routing Table
                </h3>
              </div>
              
              <ul className="space-y-6">
                {[
                  { label: 'Sales & Orders', email: 'sales@etal.com' },
                  { label: 'Technical Support', email: 'technical@etal.com' },
                  { label: 'Export Division', email: 'export@etal.com' },
                ].map((dept) => (
                  <li key={dept.label} className="flex flex-col border-b border-white/5 pb-6 last:border-0 last:pb-0 group">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 group-hover:text-[#229264] transition-colors">
                      {dept.label}
                    </span>
                    <a href={`mailto:${dept.email}`} className="text-[15px] font-medium hover:text-[#229264] transition-all flex items-center justify-between">
                      {dept.email} <ArrowUpRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Form (Soft Data Entry) */}
          <div className="lg:col-span-8">
            <div className="mb-10 flex items-center justify-between px-4">
              <div className="space-y-1">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#131414]">
                  Inquiry <span className="text-[#229264]">Dispatch.</span>
                </h2>
                <p className="text-[14px] text-[#131414]/40 font-medium italic">All technical requests are processed via secure channel.</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#229264]/5 border border-[#229264]/10 text-[10px] font-bold text-[#229264] uppercase tracking-widest">
                <ShieldCheck size={14} /> Secure Protocol
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </div>

      {/* ── 3. Map - Geographic Radar (Soft Edges) ── */}
      <section className="container-etal pb-20">
        <div className="relative w-full h-[400px] bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center group">
          {/* Radar Fluid Grid */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#131414_1.5px,transparent_1.5px)] bg-[size:40px_40px]" />
          
          {/* Coordinates Overlay */}
          <div className="absolute top-8 left-8 text-[11px] font-mono font-bold text-[#131414]/20 flex flex-col gap-1 tracking-tighter">
            <span>POSITION: 29.3084° N</span>
            <span>DATA_REF: 30.8428° E</span>
          </div>

          {/* Location Centerpiece */}
          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="relative flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full border border-[#229264] animate-ping opacity-20" />
              <div className="absolute inset-4 rounded-full border border-[#229264]/40 animate-pulse" />
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-50 text-[#229264]">
                <Globe size={28} strokeWidth={1.5} />
              </div>
            </div>
            <h4 className="text-[18px] font-bold text-[#131414] tracking-tight">Fayoum Industrial Zone</h4>
            <p className="text-[11px] font-bold text-[#229264] uppercase tracking-[0.3em] mt-2">Primary Manufacturing Hub</p>
          </div>

          {/* Decorative Corner Accents (Softened) */}
          <div className="absolute bottom-10 right-10 h-10 w-10 border-b-2 border-r-2 border-gray-100 rounded-br-[2rem]" />
          <div className="absolute top-10 right-10 h-10 w-10 border-t-2 border-r-2 border-gray-100 rounded-tr-[2rem]" />
        </div>
      </section>
    </div>
  )
}

// ── 4. Enhanced Contact Info Item (Soft Pill Interaction) ──
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
        <p className="text-[14px] font-bold text-[#131414] truncate">
          {value}
        </p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block w-full">
        {content}
      </a>
    )
  }
  return content
}