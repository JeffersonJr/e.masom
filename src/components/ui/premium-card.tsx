import * as React from 'react'
import { cn } from '@/lib/utils'

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'glass' | 'gradient' | 'elevated' | 'masonic'
  hover?: boolean
}

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, variant = 'elevated', hover = true, children, ...props }, ref) => {
    const variants = {
      glass: 'glass border-white/20 bg-white/10 backdrop-blur-md',
      gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-xl',
      elevated: 'bg-white border-0 shadow-2xl shadow-premium',
      masonic: 'bg-gradient-to-br from-blue-900/90 to-blue-800/90 border border-yellow-500/30 shadow-masonic'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl overflow-hidden transition-all duration-300',
          variants[variant],
          hover && 'hover:scale-[1.02] hover:shadow-2xl',
          className
        )}
        {...props}
      >
        {variant === 'masonic' && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent pointer-events-none" />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
)
PremiumCard.displayName = 'PremiumCard'

export { PremiumCard }
