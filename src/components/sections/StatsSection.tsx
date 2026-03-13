const STATS = [
  { value: '2007', label: 'Year founded' },
  { value: '4,000m²', label: 'Factory floor' },
  { value: 'ISO 9001', label: 'Quality system' },
  { value: '50+', label: 'Product lines' },
]

const CERTS = ['IEC 60044‑1', 'BS EN 60269', 'IEC 60282', 'S.A.E', 'ISO 9001']

export default function StatsSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-etal space-y-8">
        <div className="grid gap-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="space-y-1">
              <p className="font-headline text-3xl text-brand-dark">{s.value}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gray">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-brand-gray-mid pt-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gray">
            Certified to
          </span>
          {CERTS.map((c) => (
            <span key={c} className="badge badge-gray text-[10px]">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
