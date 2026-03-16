import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

// ── 1. Soft Pill Color Palette ──
const variantClasses: Record<Variant, string> = {
  // Primary: الأخضر الرسمي بوهج ناعم
  primary: 'bg-[#229264] text-white border-transparent hover:bg-[#1b7550] hover:shadow-xl hover:shadow-[#229264]/20 shadow-sm',
  // Accent: الأسود الملكي العميق
  accent:  'bg-[#131414] text-white border-transparent hover:bg-black hover:shadow-xl hover:shadow-black/10 shadow-sm',
  // Outline: إطار تقني رفيع يتحول لزجاجي عند التمرير
  outline: 'bg-transparent text-[#131414] border-gray-200 hover:border-[#229264] hover:text-[#229264] hover:bg-[#229264]/5 hover:shadow-lg hover:shadow-black/[0.02]',
  // Ghost: للتنقل الهادئ داخل القوائم
  ghost:   'bg-transparent text-[#131414] border-transparent hover:bg-gray-100/80',
}

// ── 2. Fluid Sizing (Capsule Optimized) ──
const sizeClasses: Record<Size, string> = {
  sm: 'text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2',
  md: 'text-[12px] uppercase tracking-[0.2em] font-bold px-8 py-3.5',
  lg: 'text-[14px] uppercase tracking-[0.25em] font-bold px-10 py-4.5',
}

// ── 3. Structural Baseline (The Soft Pill) ──
const BASE_CLASSES = `
  relative inline-flex items-center justify-center 
  font-sans transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
  border rounded-full select-none overflow-hidden
  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#229264]/20
  disabled:opacity-40 disabled:pointer-events-none disabled:grayscale
  active:scale-[0.96] group
`

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'etal-pill-button', 
        BASE_CLASSES,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* ── Visual Ripple Accent (Decorative Overlay) ── */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* ── Technical Loading State ── */}
      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <svg 
              className="h-5 w-5 animate-spin text-current" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
        </div>
      )}
      
      {/* ── Content Container ── */}
      <span className={cn(
        "flex items-center gap-3 transition-all duration-500",
        loading ? "opacity-0 scale-90" : "opacity-100 scale-100"
      )}>
        {children}
      </span>

      {/* ── Action Line (Subtle Bottom Indicator) ── */}
      <div className={cn(
        "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-white/40 transition-all duration-500 group-hover:w-1/3",
        variant === 'outline' && "bg-[#229264]/40"
      )} />
    </button>
  )
)

Button.displayName = 'Button'
export default Button