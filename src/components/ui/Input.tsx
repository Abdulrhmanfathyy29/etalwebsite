import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || props.name

    return (
      <div className="w-full group/field">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2.5 ml-4 block text-[10px] font-bold uppercase tracking-[0.25em] text-[#131414]/40 group-focus-within/field:text-[#229264] transition-colors duration-300"
          >
            {label}
            {props.required && <span className="ml-1 text-[#c10100] animate-pulse">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'peer appearance-none', 
              // ── Soft Pill Structure ──
              'flex h-12 w-full rounded-full border bg-gray-50/50 px-6 py-2 text-[14px] font-medium text-[#131414] transition-all duration-500',
              'placeholder:text-gray-300',
              // ── States ──
              'hover:bg-gray-100/50 hover:border-gray-200',
              'focus:bg-white focus:border-[#229264] focus:outline-none focus:ring-4 focus:ring-[#229264]/10 shadow-sm focus:shadow-xl focus:shadow-[#229264]/5',
              'disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-gray-100 disabled:grayscale',
              // ── Error Management ──
              error
                ? 'border-[#c10100] focus:border-[#c10100] focus:ring-[#c10100]/10 text-[#c10100] placeholder:text-[#c10100]/30'
                : 'border-gray-100',
              className
            )}
            {...props}
          />
          
          {/* ── Subtle Status Ring (Decorative) ── */}
          <div className={cn(
            "absolute inset-0 rounded-full pointer-events-none opacity-0 transition-opacity duration-500 peer-focus:opacity-100",
            "ring-1 ring-[#229264]/20 ring-offset-0",
            error && "ring-[#c10100]/20"
          )} />
        </div>

        {error && (
          <p className="mt-2.5 ml-4 flex items-center gap-2 text-[11px] font-bold tracking-wide text-[#c10100] animate-in fade-in slide-in-from-top-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" height="14" 
              viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              className="shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="uppercase tracking-widest leading-none pt-0.5">{error}</span>
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input