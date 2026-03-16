'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image' // تم إضافة استدعاء Image
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PRODUCTS_DROPDOWN = [
  { href: '/products/current-transformers', label: 'Current transformers', desc: 'Measurement & protection CTs' },
  { href: '/products/hrc-fuse-links', label: 'HRC fuse links', desc: 'High rupturing capacity fuses' },
  { href: '/products/fuse-switch-disconnectors', label: 'Fuse switch disconnectors', desc: 'Combined fuse & isolation' },
  { href: '/products/busbar-supports', label: 'Busbar supports', desc: 'LV busbar insulation' },
]

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products', hasDropdown: true },
  { href: '/sectors', label: 'Sectors' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProductsOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled 
            ? 'bg-white/85 backdrop-blur-md border-b border-gray-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]' 
            : 'bg-white border-b border-transparent'
        )}
      >
        <div className="container-etal flex h-20 items-center justify-between gap-4">
          
          {/* 1️⃣ Elevated Image Logo */}
          <Link href="/" className="group flex items-center transition-opacity hover:opacity-80">
            {/* ضع اللوجو الخاص بك في مجلد public واسمه logo.png */}
            <Image 
              src="/logo.png" 
              alt="ETAL Logo" 
              width={140} 
              height={40} 
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative">
                  <button
                    type="button"
                    onClick={() => setProductsOpen((o) => !o)}
                    className={cn(
                      'group relative inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-bold tracking-wide transition-colors',
                      isActive(link.href) || productsOpen
                        ? 'text-brand-green'
                        : 'text-brand-gray hover:text-brand-dark hover:bg-gray-50'
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform duration-300',
                        productsOpen ? 'rotate-180 text-brand-green' : 'opacity-50 group-hover:opacity-100'
                      )}
                    />
                    {(isActive(link.href) || productsOpen) && (
                      <span className="absolute bottom-1 left-1/2 w-4 -translate-x-1/2 h-[2px] rounded-t-full bg-brand-green" />
                    )}
                  </button>
                  
                  {/* 2️⃣ Premium Dropdown Panel */}
                  {productsOpen && (
                    <div className="absolute top-full right-0 mt-4 w-[320px] rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden origin-top-right animate-in fade-in zoom-in-95 duration-200">
                      
                      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-5 py-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">
                          Product families
                        </span>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-40"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                        </span>
                      </div>
                      
                      <ul className="p-2 space-y-1">
                        {PRODUCTS_DROPDOWN.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="group flex items-start gap-3 rounded-xl px-3 py-3 text-sm transition-all hover:bg-gray-50"
                            >
                              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-gray-100 bg-white shadow-sm transition-all group-hover:border-brand-green/30 group-hover:bg-brand-green/5">
                                <ArrowUpRight size={12} className="text-gray-300 transition-all group-hover:text-brand-green" />
                              </div>
                              <span className="flex-1">
                                <span className="block text-[13px] font-bold text-brand-dark group-hover:text-brand-green transition-colors">
                                  {item.label}
                                </span>
                                <span className="block text-[11px] text-brand-gray/80 mt-0.5 leading-tight">
                                  {item.desc}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="border-t border-gray-100 bg-gray-50/50 p-3">
                        <Link
                          href="/products"
                          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-brand-dark border border-gray-200 hover:border-brand-green hover:text-brand-green transition-all"
                        >
                          View All Products
                          <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative rounded-lg px-4 py-2 text-[13px] font-bold tracking-wide transition-colors',
                    isActive(link.href)
                      ? 'text-brand-green'
                      : 'text-brand-gray hover:text-brand-dark hover:bg-gray-50'
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-1 left-1/2 w-4 -translate-x-1/2 h-[2px] rounded-t-full bg-brand-green" />
                  )}
                </Link>
              )
            )}

            {/* 3️⃣ Refined CTA Button (Updated Colors) */}
            <Link 
              href="/contact" 
              className="ml-4 px-6 py-2.5 rounded-xl bg-[#229264] text-white text-[12px] font-bold tracking-wide hover:bg-[#EBDC36] hover:text-brand-dark hover:shadow-lg hover:shadow-[#EBDC36]/30 transition-all duration-300"
            >
              Request a quote
            </Link>
          </nav>

          {/* 4️⃣ Enhanced Mobile Toggle */}
          <button
            type="button"
            className={cn(
              "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all md:hidden",
              mobileOpen 
                ? "border-brand-green bg-brand-green/10 text-brand-green" 
                : "border-gray-200 bg-gray-50 text-brand-dark hover:bg-gray-100"
            )}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-brand-dark/20 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileOpen(false)}
      />
      
      {/* Mobile Menu Panel */}
      <nav
        className={cn(
          'fixed inset-x-0 top-20 z-50 origin-top rounded-b-3xl border-b border-gray-100 bg-white shadow-2xl transition-all duration-300 md:hidden',
          mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 pointer-events-none opacity-0'
        )}
      >
        <div className="container-etal py-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-bold transition-colors',
                    isActive(link.href)
                      ? 'bg-brand-green/10 text-brand-green'
                      : 'text-brand-gray hover:bg-gray-50 hover:text-brand-dark'
                  )}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                      Catalog
                    </span>
                  )}
                </Link>
                {link.hasDropdown && (
                  <ul className="mt-2 mb-4 space-y-1 pl-4 border-l-2 border-gray-100 ml-4">
                    {PRODUCTS_DROPDOWN.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-3 py-2 text-[13px] font-medium text-brand-gray hover:bg-gray-50 hover:text-brand-green transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            {/* Mobile CTA Button (Updated Colors) */}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#229264] px-4 py-3.5 text-[13px] font-bold text-white hover:bg-[#EBDC36] hover:text-brand-dark transition-colors"
            >
              Request a quote
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}