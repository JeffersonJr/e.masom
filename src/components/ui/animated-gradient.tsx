import * as React from 'react'
import { cn } from '@/lib/utils'

interface AnimatedGradientProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'accent'
  speed?: 'slow' | 'medium' | 'fast'
}

const AnimatedGradient = React.forwardRef<HTMLDivElement, AnimatedGradientProps>(
  ({ children, className, variant = 'primary', speed = 'medium', ...props }, ref) => {
    const gradients = {
      primary: 'from-blue-600 via-purple-600 to-pink-600',
      secondary: 'from-green-400 via-blue-500 to-purple-600',
      accent: 'from-yellow-400 via-red-500 to-pink-500'
    }

    const speeds = {
      slow: 'animate-gradient-slow',
      medium: 'animate-gradient',
      fast: 'animate-gradient-fast'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-xl',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            gradients[variant],
            speeds[speed],
            'opacity-90'
          )}
        />
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
)
AnimatedGradient.displayName = 'AnimatedGradient'

export { AnimatedGradient }
