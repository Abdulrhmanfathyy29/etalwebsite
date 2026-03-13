'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react'

const STATS = [
  { value: '2007', label: 'Founded', sub: 'Fayoum, Egypt' },
  { value: '4,000m²', label: 'Factory', sub: 'ISO-certified plant' },
  { value: '50+', label: 'Products', sub: 'Across 4 families' },
  { value: 'IEC', label: 'Certified', sub: 'International standards' },
]

const QUICK = [
  { icon: Zap,    label: 'Current Transformers',      href: '/products/current-transformers' },
  { icon: Shield, label: 'HRC Fuse Links',            href: '/products/hrc-fuse-links' },
  { icon: Cpu,    label: 'Fuse Switch Disconnectors', href: '/products/fuse-switch-disconnectors' },
]

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background video overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-[0.04]"
          autoPlay muted loop playsInline
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Soft gradient: lighter on left where text is */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative container-etal py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">

          {/* Left: headline + CTAs */}
          <div className="space-y-7">
            <p className="eyebrow animate-fade-up" style={{ animationDelay: '0.05s' }}>
              Electrical protection · Since 2007 · Fayoum, Egypt
            </p>

            <h1
              className="font-headline text-brand-dark leading-[1.05] animate-fade-up"
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4rem)',
                animationDelay: '0.15s',
              }}
            >
              Precision protection
              <br />
              for the low‑voltage loop.
            </h1>

            <p
              className="max-w-lg text-[15px] leading-relaxed text-brand-gray animate-fade-up"
              style={{ animationDelay: '0.25s' }}
            >
              ETAL manufactures current transformers, HRC fuse links, fuse switch disconnectors
              and busbar supports — built to IEC standards for panel builders, OEMs and utilities.
            </p>

            <div
              className="flex flex-wrap gap-3 animate-fade-up"
              style={{ animationDelay: '0.35s' }}
            >
              <Link href="/products" className="btn-primary text-sm px-7 py-3">
                Explore products
                <ArrowRight size={15} className="arrow-nudge" />
              </Link>
              <Link href="/contact" className="btn-outline text-sm px-7 py-3">
                Talk to an engineer
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="flex flex-wrap gap-8 pt-6 border-t border-[#e8eaed] animate-fade-up"
              style={{ animationDelay: '0.45s' }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-headline text-2xl text-brand-dark leading-none">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gray mt-1">{s.label}</p>
                  <p className="text-[10px] text-brand-gray/60 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: quick-access product cards */}
          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {QUICK.map(({ icon: Icon, label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 p-5 rounded-2xl border border-[#e8eaed] bg-white
                           shadow-[0_1px_3px_rgba(15,23,42,0.04)]
                           hover:border-brand-green/50 hover:shadow-[0_8px_24px_rgba(34,146,100,0.08)]
                           transition-all duration-200 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                                bg-brand-green/[0.08] group-hover:bg-brand-green/15 transition-colors">
                  <Icon size={18} className="text-brand-green" />
                </div>
                <span className="font-body text-sm font-medium text-brand-dark group-hover:text-brand-green transition-colors">
                  {label}
                </span>
                <ArrowRight size={14} className="ml-auto text-brand-gray/30 group-hover:text-brand-green arrow-nudge" />
              </Link>
            ))}

            <Link
              href="/products"
              className="flex items-center justify-center gap-1 py-3 text-[11px] font-semibold
                         uppercase tracking-[0.18em] text-brand-green hover:text-brand-green-dark transition-colors"
            >
              View all products <ArrowRight size={11} className="arrow-nudge" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
