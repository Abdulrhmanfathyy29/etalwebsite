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
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark"
          >
            {label}
            {props.required && <span className="ml-1 text-brand-green">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'input-base',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/40',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 font-body text-xs text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
