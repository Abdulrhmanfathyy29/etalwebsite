'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Globe, ShieldCheck } from 'lucide-react'

const PRODUCT_LINKS = [
  { href: '/products/current-transformers', label: 'Current transformers' },
  { href: '/products/hrc-fuse-links', label: 'HRC fuse links' },
  { href: '/products/fuse-switch-disconnectors', label: 'Fuse switch disconnectors' },
  { href: '/products/busbar-supports', label: 'Busbar supports' },
]

const COMPANY_LINKS = [
  { href: '/about', label: 'About ETAL' },
  { href: '/sectors', label: 'Sectors' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#229264] mt-0 overflow-hidden shadow-xl">
      
      {/* ── 1️⃣ Engineering Background Decoration ── */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative container-etal pt-20 pb-10">
        <div className="grid gap-16 lg:grid-cols-12">
          
          {/* BRAND COLUMN */}
          <div className="space-y-8 lg:col-span-5">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image 
                src="/logooo.png" 
                alt="ETAL Logo" 
                width={160} 
                height={50} 
                className="brightness-0 invert h-12 w-auto object-contain" 
              />
            </Link>

            <p className="max-w-sm text-[15px] leading-relaxed text-white/70 font-medium">
              International manufacturer of electrical protection and measurement components. 
              Precision-engineered in Fayoum, Egypt since 2007.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="mailto:info@etal.com" className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white hover:text-[#229264] transition-all duration-300">
                <Mail size={14} />
                info@etal.com
              </a>
              <a href="tel:+20xxxxxxxxxx" className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white hover:text-[#229264] transition-all duration-300">
                <Phone size={14} />
                +20 xxx xxx xxxx
              </a>
            </div>
            
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/70">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-white/60" />
              </div>
              <p className="leading-relaxed">
                Fayoum Industrial Zone, <br />
                <span className="text-white/40">Al-Qalyubia Governorate, Egypt</span>
              </p>
            </div>
          </div>

          {/* LINKS COLUMNS */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-6 lg:ml-auto">
            <div className="space-y-8">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-3">
                Products Range
              </h3>
              <ul className="space-y-4">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-center gap-3 text-[14px] text-white/70 hover:text-white transition-all">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/20 group-hover:bg-[#EBDC36] group-hover:scale-125 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-3">
                Organization
              </h3>
              <ul className="space-y-4">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-center gap-3 text-[14px] text-white/70 hover:text-white transition-all">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/20 group-hover:bg-[#EBDC36] group-hover:scale-125 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 flex flex-col gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-[11px] font-medium text-white/40 tracking-wide">
              © {year} ETAL Industrial Group
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60">
              <ShieldCheck size={12} className="text-[#EBDC36]" />
              ISO 9001 Certified
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
            <div className="h-px w-8 bg-white/20" />
            <Globe size={14} className="text-white/40" />
            <span>Engineered for protection.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}