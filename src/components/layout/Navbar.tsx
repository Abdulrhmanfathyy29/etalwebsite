'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
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
          'fixed inset-x-0 top-0 z-40 transition-all duration-200',
          scrolled ? 'bg-white/90 backdrop-blur border-b border-brand-gray-mid/60 shadow-sm' : 'bg-white'
        )}
      >
        <div className="container-etal flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-brand-gray-light/60 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white text-sm font-semibold">
              E
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-[0.18em] text-brand-dark uppercase">
                ETAL
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-brand-gray">
                Electrical protection
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-3 md:flex">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative">
                  <button
                    type="button"
                    onClick={() => setProductsOpen((o) => !o)}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors',
                      isActive(link.href)
                        ? 'bg-brand-green/5 text-brand-dark'
                        : 'text-brand-gray hover:bg-brand-gray-light/80 hover:text-brand-dark'
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform',
                        productsOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {productsOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-brand-gray-mid bg-white shadow-[0_16px_40px_rgba(15,23,42,0.1)]">
                      <div className="flex items-center justify-between border-b border-brand-gray-mid/60 px-4 py-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gray">
                          Product families
                        </span>
                        <span className="h-2 w-2 rounded-full bg-brand-yellow" />
                      </div>
                      <ul className="py-2">
                        {PRODUCTS_DROPDOWN.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="flex items-start gap-3 px-4 py-2.5 text-sm text-brand-gray hover:bg-brand-gray-light/70 hover:text-brand-dark transition-colors"
                            >
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-green" />
                              <span className="flex-1">
                                <span className="block font-medium text-brand-dark">
                                  {item.label}
                                </span>
                                <span className="block text-[11px] text-brand-gray">
                                  {item.desc}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-brand-gray-mid/60 px-4 py-2">
                        <Link
                          href="/products"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green hover:text-brand-dark"
                        >
                          All products
                          <ArrowRight size={11} />
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
                    'rounded-full px-3 py-2 text-sm transition-colors',
                    isActive(link.href)
                      ? 'bg-brand-green/5 text-brand-dark'
                      : 'text-brand-gray hover:bg-brand-gray-light/80 hover:text-brand-dark'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}

            <Link href="/contact" className="btn-accent text-xs">
              Request a quote
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-brand-dark hover:bg-brand-gray-light md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/10 backdrop-blur-sm transition-opacity md:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileOpen(false)}
      />
      <nav
        className={cn(
          'fixed inset-x-0 top-16 z-40 origin-top rounded-b-2xl border-b border-brand-gray-mid bg-white shadow-md transition-transform md:hidden',
          mobileOpen ? 'translate-y-0' : '-translate-y-4 pointer-events-none opacity-0'
        )}
      >
        <div className="container-etal py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors',
                    isActive(link.href)
                      ? 'bg-brand-green/5 text-brand-dark'
                      : 'text-brand-gray hover:bg-brand-gray-light/80 hover:text-brand-dark'
                  )}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <span className="text-[10px] uppercase tracking-[0.16em] text-brand-gray">
                      Products
                    </span>
                  )}
                </Link>
                {link.hasDropdown && (
                  <ul className="mt-1 space-y-1 pl-3">
                    {PRODUCTS_DROPDOWN.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-xl px-3 py-2 text-xs text-brand-gray hover:bg-brand-gray-light/70 hover:text-brand-dark"
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
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center text-xs"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
