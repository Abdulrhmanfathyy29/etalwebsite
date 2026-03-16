import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Zap, Factory, Wind, Train, Server, Flame, ShieldCheck, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Industrial Sectors | ETAL',
  description: 'ETAL electrical protection components are specified and installed across power distribution, industrial, renewable energy, rail, data centre and oil & gas sectors.',
}

const SECTORS = [
  {
    slug: 'power-distribution',
    name: 'Power Distribution',
    desc: 'LV switchgear panels, distribution boards and metering cabinets require accurate, reliable protection throughout the network.',
    products: ['Current Transformers', 'HRC Fuse Links', 'Fuse Switch Disconnectors'],
    icon: Zap,
    color: '#229264'
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    desc: 'Manufacturing and process automation plants demand heavy-duty protection that can withstand continuous operation.',
    products: ['HRC Fuse Links', 'Fuse Switch Disconnectors', 'Busbar Supports'],
    icon: Factory,
    color: '#3b82f6'
  },
  {
    slug: 'renewable-energy',
    name: 'Renewable Energy',
    desc: 'Solar inverter stations, wind generation and battery energy storage systems require specialist protection.',
    products: ['Current Transformers', 'HRC Fuse Links'],
    icon: Wind,
    color: '#10b981'
  },
  {
    slug: 'rail-transport',
    name: 'Rail & Transport',
    desc: 'Certified protection components for traction substations and trackside distribution in rail infrastructure.',
    products: ['Current Transformers', 'Fuse Switch Disconnectors'],
    icon: Train,
    color: '#6366f1'
  },
  {
    slug: 'data-centres',
    name: 'Data Centres',
    desc: 'Uninterrupted power protection for critical IT infrastructure with high-reliability components.',
    products: ['Current Transformers', 'HRC Fuse Links', 'Busbar Supports'],
    icon: Server,
    color: '#f59e0b'
  },
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    desc: 'Robust electrical protection for hazardous and demanding offshore and onshore energy sector environments.',
    products: ['HRC Fuse Links', 'Fuse Switch Disconnectors'],
    icon: Flame,
    color: '#ef4444'
  },
]

export default function SectorsPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 overflow-hidden">
      
      {/* ── 1. Hero / Header Console ── */}
      <section className="relative pt-32 pb-24 bg-white rounded-b-[3.5rem] shadow-sm overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#229264_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container-etal relative z-10 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#229264]/5 border border-[#229264]/10">
            <span className="h-2 w-2 rounded-full bg-[#229264] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#229264]">Application Domains</span>
          </div>
          
          <h1 className="font-headline font-bold text-[#131414] leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Engineering for <span className="text-[#229264]">Every Environment.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto lg:mx-0 text-[16px] leading-relaxed text-[#131414]/60 font-medium">
            ETAL components are specified where failure is not an option. From national power grids to critical data infrastructure, we provide the protection layer that keeps the world powered.
          </p>
        </div>
      </section>

      {/* ── 2. Sectors Grid (Soft Capsules) ── */}
      <section className="py-24">
        <div className="container-etal">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((sector) => {
              const Icon = sector.icon
              return (
                <div
                  key={sector.slug}
                  className="group relative flex flex-col bg-white border border-gray-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-black/[0.03] hover:-translate-y-2 p-10 overflow-hidden"
                >
                  {/* Floating background accent */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" style={{ color: sector.color }}>
                    <Icon size={120} strokeWidth={1} />
                  </div>

                  {/* Header Pillar */}
                  <div className="flex items-center gap-5 mb-8">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 transition-all duration-500 group-hover:bg-[#131414] group-hover:text-white group-hover:rotate-[10deg] shadow-inner">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h2 className="font-headline font-bold text-xl leading-tight text-[#131414] group-hover:text-[#229264] transition-colors">
                      {sector.name}
                    </h2>
                  </div>

                  {/* Description Body */}
                  <p className="text-[15px] leading-relaxed text-[#131414]/50 font-medium flex-1 mb-10">
                    {sector.desc}
                  </p>

                  {/* Core Components (Modular Tags) */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-gray-100" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#131414]/20">Systems</p>
                      <div className="h-px flex-1 bg-gray-100" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sector.products.map((p) => (
                        <span key={p} className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-mono font-bold text-[#131414]/40 group-hover:bg-white group-hover:border-[#229264]/20 group-hover:text-[#229264] transition-all">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action Link */}
                  <div className="mt-10 pt-6 border-t border-gray-50">
                    <Link
                      href="/products"
                      className="group/link flex items-center justify-between w-full"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/30 group-hover/link:text-[#131414] transition-colors">Explore Deployment</span>
                      <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover/link:bg-[#229264] group-hover/link:text-white transition-all">
                        <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Support Terminal (Pill Mode) ── */}
      <section className="container-etal pb-20">
        <div className="relative bg-[#131414] rounded-[3.5rem] p-10 md:p-16 overflow-hidden shadow-2xl shadow-black/20 group">
          
          {/* Industrial Visual Accents */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] bg-[size:32px:32px]" />
          <div className="absolute top-0 right-0 p-16 opacity-5 text-white group-hover:opacity-10 transition-opacity">
            <Cpu size={300} strokeWidth={0.5} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-12">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50">
                <ShieldCheck size={14} className="text-[#229264]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Engineering Consultancy</span>
              </div>
              
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-white leading-tight">
                Not sure which product fits <span className="text-[#229264]">your application?</span>
              </h2>
              
              <p className="text-[16px] leading-relaxed text-white/40 font-medium">
                Our technical team provides bespoke engineering guidance, component sizing, and IEC compliance verification for complex projects.
              </p>
            </div>
            
            <div className="lg:ml-auto">
              <Link 
                href="/contact" 
                className="group flex items-center justify-center gap-4 bg-white text-[#131414] px-10 py-5 rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-[#229264] hover:text-white hover:shadow-2xl hover:shadow-[#229264]/40 transition-all duration-500"
              >
                Consult an Engineer
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Terminal Metadata Footer */}
          <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-4 text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/10">
             <div className="h-1 w-1 rounded-full bg-[#229264] shadow-[0_0_8px_#229264]" />
             <span>Secure Support Link Active</span>
             <div className="ml-auto flex items-center gap-2">
                <span>V_3.1</span>
                <div className="h-1 w-1 rounded-full bg-white/20" />
                <span>2026</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}