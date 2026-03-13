import { cn } from '@/lib/utils'

type BadgeVariant = 'green' | 'yellow' | 'gray' | 'dark'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'badge-green',
  yellow: 'badge-yellow',
  gray: 'badge-gray',
  dark: 'badge-dark',
}

export default function Badge({ variant = 'green', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
