import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

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
    <footer className="bg-brand-green text-white">
      <div className="container-etal py-10">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-brand-green">
                E
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                ETAL
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/80">
              Electrical protection components manufactured to international standards from our 4,000m²
              facility in Fayoum, Egypt.
            </p>
            <div className="space-y-2 text-sm text-white/80">
              <a href="mailto:info@etal.com" className="flex items-center gap-2 hover:text-white">
                <Mail size={14} className="text-brand-yellow" />
                info@etal.com
              </a>
              <a href="tel:+20xxxxxxxxxx" className="flex items-center gap-2 hover:text-white">
                <Phone size={14} className="text-brand-yellow" />
                +20 xxx xxx xxxx
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-brand-yellow" />
                <span>Fayoum Industrial Zone, Egypt</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Products
            </h3>
            <ul className="space-y-1 text-sm text-white/80">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Company
            </h3>
            <ul className="space-y-1 text-sm text-white/80">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/20 pt-4 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} ETAL. All rights reserved.</span>
          <span>Electrical protection, engineered right.</span>
        </div>
      </div>
    </footer>
  )
}
