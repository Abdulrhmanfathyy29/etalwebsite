import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col relative', center ? 'items-center text-center' : 'items-start text-left', className)}>
      
      {/* ── 1. Floating Eyebrow Capsule ── */}
      {eyebrow && (
        <div className={cn(
          "inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-100 bg-white shadow-sm mb-6 transition-all duration-500 hover:shadow-md",
          center ? "mx-auto" : ""
        )}>
          {/* Status Indicator Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#229264] opacity-20"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#229264]"></span>
          </span>
          
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#131414]/40">
            {eyebrow}
          </span>
        </div>
      )}

      {/* ── 2. Fluid Headline ── */}
      <h2 className="font-headline font-bold text-[#131414] leading-[1.05] tracking-tight" 
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
        {title}
      </h2>

      {/* ── 3. Technical Subtitle (Pill Border) ── */}
      {subtitle && (
        <div className={cn(
          "mt-6 max-w-2xl relative",
          center && "mx-auto"
        )}>
          <p className="text-[16px] leading-relaxed text-[#131414]/50 font-medium italic">
            {subtitle}
          </p>
          
          {/* Subtle Accent Line - Only if not centered to create an anchor point */}
          {!center && (
            <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#229264]/40 via-[#229264]/10 to-transparent hidden md:block rounded-full" />
          )}
        </div>
      )}

      {/* ── 4. Background Glow Accent (Optional) ── */}
      {center && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#229264]/5 blur-[80px] rounded-full pointer-events-none -z-10" />
      )}
    </div>
  )
}