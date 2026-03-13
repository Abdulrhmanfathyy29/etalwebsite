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
    <div className={cn(center && 'text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-3',
            center && 'justify-center text-center'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-none text-brand-dark">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-3 max-w-2xl text-sm leading-relaxed text-brand-gray',
            center && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
