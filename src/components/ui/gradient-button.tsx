import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'masonic'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  glow?: boolean
  children: React.ReactNode
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = false, children, ...props }, ref) => {
    const variants = {
      primary: 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
      secondary: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
      success: 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
      danger: 'from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700',
      warning: 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
      masonic: 'from-blue-900 to-blue-800 hover:from-blue-950 hover:to-blue-900'
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl'
    }

    return (
      <Button
        ref={ref}
        className={cn(
          'relative overflow-hidden bg-gradient-to-r text-white font-semibold rounded-xl border-0 transition-all duration-300 transform hover:scale-105 active:scale-95',
          variants[variant],
          sizes[size],
          glow && 'shadow-lg hover:shadow-xl',
          glow && variant === 'primary' && 'shadow-blue-500/50',
          glow && variant === 'success' && 'shadow-green-500/50',
          glow && variant === 'danger' && 'shadow-red-500/50',
          glow && variant === 'warning' && 'shadow-yellow-500/50',
          glow && variant === 'masonic' && 'shadow-blue-900/50',
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </Button>
    )
  }
)
GradientButton.displayName = 'GradientButton'

interface MasonicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'blue' | 'gold' | 'combined'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const MasonicButton = React.forwardRef<HTMLButtonElement, MasonicButtonProps>(
  ({ className, variant = 'combined', size = 'md', children, ...props }, ref) => {
    const variants = {
      blue: 'bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-950 hover:to-blue-800',
      gold: 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600',
      combined: 'bg-gradient-to-r from-blue-900 via-blue-800 to-yellow-600 hover:from-blue-950 hover:via-blue-900 hover:to-yellow-700'
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl'
    }

    return (
      <button
        ref={ref}
        className={cn(
          'relative text-white font-bold rounded-xl border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl',
          variants[variant],
          variant === 'blue' && 'border-blue-700',
          variant === 'gold' && 'border-yellow-500',
          variant === 'combined' && 'border-blue-800',
          sizes[size],
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-xl" />
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)
MasonicButton.displayName = 'MasonicButton'

export { GradientButton, MasonicButton }
