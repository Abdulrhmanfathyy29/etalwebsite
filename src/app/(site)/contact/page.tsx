import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the ETAL team for product enquiries, technical support and sales questions.',
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="section-pad pb-10">
        <div className="container-etal space-y-4">
          <p className="eyebrow">Get in touch</p>
          <h1 className="font-headline text-[clamp(2.1rem,3.5vw,2.6rem)] leading-tight text-brand-dark">
            Contact the ETAL team.
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-brand-gray">
            Sales enquiries, technical specifications or general questions – we usually respond within
            one business day.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container-etal pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

          {/* Contact info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6 space-y-6">
              <h2 className="font-headline text-lg text-brand-dark">Reach us</h2>
              <div className="space-y-5">
                <ContactInfoItem icon={Mail} label="Email" value="info@etal.com" href="mailto:info@etal.com" />
                <ContactInfoItem icon={Phone} label="Phone" value="+20 xxx xxx xxxx" href="tel:+20xxxxxxxxxx" />
                <ContactInfoItem
                  icon={MapPin}
                  label="Address"
                  value="Fayoum Industrial Zone, Fayoum, Egypt"
                />
                <ContactInfoItem
                  icon={Clock}
                  label="Business Hours"
                  value="Sunday – Thursday, 08:00 – 17:00 EET"
                />
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gray mb-4">
                Departments
              </h3>
              <ul className="space-y-2 font-body text-sm text-brand-gray">
                <li><span className="font-medium text-brand-dark">Sales:</span> sales@etal.com</li>
                <li><span className="font-medium text-brand-dark">Technical:</span> technical@etal.com</li>
                <li><span className="font-medium text-brand-dark">Export:</span> export@etal.com</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 card p-8">
            <h2 className="font-headline text-xl text-brand-dark mb-6">
              Send an enquiry
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <section className="pb-16">
        <div className="container-etal">
          <div className="card flex h-64 items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-2 text-brand-green/70" />
              <p className="text-sm text-brand-gray">Fayoum Industrial Zone, Egypt</p>
            </div>
          </div>
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
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-green/10 shrink-0">
        <Icon size={18} className="text-brand-green" />
      </div>
      <div>
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-brand-gray mb-0.5">
          {label}
        </p>
        <p className="font-body text-sm text-brand-dark">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    )
  }
  return content
}
