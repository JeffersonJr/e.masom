import * as React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'subtle' | 'strong'
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white/10 backdrop-blur-md border-white/20',
      subtle: 'bg-white/5 backdrop-blur-sm border-white/10',
      strong: 'bg-white/20 backdrop-blur-lg border-white/30'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-xl border shadow-xl transition-all duration-300 hover:shadow-2xl',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
)
GlassCard.displayName = 'GlassCard'

export { GlassCard }
