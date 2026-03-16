import { cn } from '@/lib/utils'

type BadgeVariant = 'green' | 'yellow' | 'gray' | 'dark'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

// ── 1. Variant Definition (Soft Pill Palettes) ──
const variantClasses: Record<BadgeVariant, string> = {
  // استخدام شفافية مدروسة مع حدود ناعمة جداً
  green:  'bg-[#229264]/5 text-[#229264] border-[#229264]/10 hover:bg-[#229264]/10 shadow-sm shadow-[#229264]/5',
  yellow: 'bg-amber-500/5 text-amber-600 border-amber-500/10 hover:bg-amber-500/10 shadow-sm shadow-amber-500/5',
  gray:   'bg-gray-100/50 text-gray-500 border-gray-200/50 hover:bg-gray-100 hover:text-gray-700 shadow-sm',
  dark:   'bg-[#131414]/5 text-[#131414] border-[#131414]/10 hover:bg-[#131414]/10 shadow-sm shadow-[#131414]/5',
}

// ── 2. Structural Baseline (The Pill Shape) ──
const BASE_CLASSES = `
  inline-flex items-center justify-center 
  px-4 py-1.5 
  text-[9px] font-bold uppercase tracking-[0.25em] 
  rounded-full border backdrop-blur-md
  transition-all duration-500 select-none
  group cursor-default
`

export default function Badge({ variant = 'green', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'etal-badge-capsule', // كلاس وصفي جديد للتعريف بالهوية
        BASE_CLASSES,
        variantClasses[variant],
        className
      )}
    >
      {/* ── Indicator Dot ── */}
      {/* جعلنا النقطة أكثر حيوية بحيث تتفاعل عند تمرير الماوس */}
      <span 
        className={cn(
          "mr-2 h-1.5 w-1.5 rounded-full bg-current transition-all duration-500 group-hover:scale-125",
          variant === 'green' && "animate-pulse shadow-[0_0_8px_currentColor]"
        )} 
        aria-hidden="true" 
      />
      
      {/* ── Label ── */}
      <span className="relative">
        {children}
      </span>
    </span>
  )
}