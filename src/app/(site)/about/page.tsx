import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Award, Factory, Calendar, Globe, History, ShieldCheck } from 'lucide-react'
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
  { name: 'ISO 9001', desc: 'Quality Management' },
  { name: 'IEC 60044-1', desc: 'Current Transformer' },
  { name: 'BS EN 60269', desc: 'HRC Fuse Links' },
  { name: 'IEC 60282', desc: 'HV Fuse Standards' },
  { name: 'S.A.E', desc: 'Egyptian Quality' },
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
    <div className="bg-[#fcfcfc] pb-20 overflow-hidden">
      
      {/* ── 1. Hero / Intro Section ── */}
      <section className="relative pt-32 pb-24 bg-white rounded-b-[3.5rem] shadow-sm overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#229264_0.8px,transparent_0.8px)] bg-[size:32px_32px]" />
        
        <div className="container-etal relative z-10 grid gap-16 lg:grid-cols-[1fr,1.1fr] lg:items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#229264]/5 border border-[#229264]/10">
              <span className="h-2 w-2 rounded-full bg-[#229264] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#229264]">Company Profile</span>
            </div>
            
            <h1 className="font-headline font-bold text-[#131414] leading-[1.05]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Electrical protection components from <span className="text-[#229264]">Fayoum, Egypt.</span>
            </h1>
            
            <p className="max-w-xl text-[16px] leading-relaxed text-[#131414]/60 font-medium">
              Since 2007, ETAL has manufactured high-precision components for the global low-voltage loop, powering infrastructure and industry with Egyptian excellence.
            </p>
          </div>

          {/* Stats Pill Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: '2007', l: 'Year founded', icon: History },
              { v: '4,000m²', l: 'ISO-Certified Facility', icon: Factory },
              { v: 'IEC / BS', l: 'Intl. Standards', icon: ShieldCheck },
              { v: 'Global', l: 'Export Reach', icon: Globe },
            ].map((s) => (
              <div key={s.l} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#229264]/20 transition-all duration-500 group">
                <div className="mb-4 text-[#229264]/40 group-hover:text-[#229264] transition-colors">
                  <s.icon size={24} strokeWidth={1.5} />
                </div>
                <p className="font-headline text-2xl md:text-3xl font-bold text-[#131414] mb-1">{s.v}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#131414]/40">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Values Matrix ── */}
      <section className="py-24">
        <div className="container-etal">
          <SectionHeader
            eyebrow="Our DNA"
            title="Engineering. Quality. Reliability."
            center
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="group relative flex flex-col p-10 bg-white rounded-[2.5rem] border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-[#229264]/5 hover:-translate-y-2">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-[#131414]/40 group-hover:bg-[#229264] group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-[#131414] mb-4 group-hover:text-[#229264] transition-colors">{v.title}</h3>
                  <p className="text-[14px] text-[#131414]/50 leading-relaxed font-medium">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Story - Fluid Layout ── */}
      <section className="py-24 bg-white rounded-[3.5rem] shadow-sm border border-gray-100 mx-4 lg:mx-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <Factory size={400} />
        </div>
        
        <div className="container-etal">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,0.8fr] gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <SectionHeader
                eyebrow="The Story"
                title="From Workshop to World-Class Manufacturer"
                subtitle="Founded in 2007 with a single precision-wound current transformer and a commitment to unwavering quality."
              />
              <div className="space-y-6 text-[16px] text-[#131414]/60 leading-relaxed font-medium">
                <p>
                  Today, ETAL operates from a state-of-the-art 4,000m² facility, housing winding halls, resin casting, and environmental test labs that ensure every component survives the most demanding industrial environments.
                </p>
                <div className="p-6 rounded-3xl bg-gray-50 border-l-4 border-[#229264] italic">
                  "Our mission is to build the invisible components that keep the visible world safe."
                </div>
              </div>
              <Link href="/contact" className="group inline-flex items-center justify-center gap-3 bg-[#131414] text-white px-10 py-5 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-[#229264] transition-all duration-500">
                Partner with ETAL 
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative aspect-square rounded-[3rem] bg-[#f8f9fa] border border-gray-100 overflow-hidden flex items-center justify-center group shadow-inner">
               <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#229264_1px,transparent_1px),linear-gradient(90deg,#229264_1px,transparent_1px)] bg-[size:24px_24px]" />
               <div className="relative z-10 text-center space-y-4">
                 <div className="mx-auto h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-md">
                   <Factory size={28} className="text-[#229264]" />
                 </div>
                 <div className="px-6">
                   <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#131414]/30">Production Hub</p>
                   <p className="text-[15px] font-bold text-[#131414]/60">Industrial Zone, Fayoum, Egypt</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Timeline - Fluid Path ── */}
      <section className="py-24">
        <div className="container-etal max-w-4xl">
          <SectionHeader
            eyebrow="Growth"
            title="17 Years of Engineering Milestones"
            center
            className="mb-20"
          />
          
          <div className="relative space-y-4">
            {TIMELINE.map((item, index) => (
              <div key={item.year} className="group relative bg-white p-8 rounded-[2rem] border border-gray-50 hover:border-[#229264]/20 hover:bg-white transition-all duration-500 hover:shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="shrink-0 h-16 w-16 rounded-2xl bg-gray-50 flex items-center justify-center font-headline text-xl font-bold text-[#229264] group-hover:bg-[#229264] group-hover:text-white transition-all duration-500">
                    {item.year}
                  </div>
                  <p className="text-[15px] text-[#131414]/60 font-medium leading-relaxed">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Certifications - Badge Grid ── */}
      <section className="py-24 bg-white rounded-t-[3.5rem] border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="container-etal">
          <SectionHeader
            eyebrow="Compliance"
            title="Global Technical Standards"
            center
            className="mb-16"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="group flex items-center gap-4 px-8 py-5 bg-[#fcfcfc] border border-gray-100 rounded-full hover:border-[#229264] transition-all duration-500 hover:shadow-lg"
              >
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#229264] shadow-sm group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#131414] leading-none mb-1">{cert.name}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#131414]/40">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}