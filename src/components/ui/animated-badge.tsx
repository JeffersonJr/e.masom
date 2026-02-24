import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface AnimatedBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  glow?: boolean
}

const AnimatedBadge = React.forwardRef<HTMLDivElement, AnimatedBadgeProps>(
  ({ className, variant = 'default', size = 'md', pulse = false, glow = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-blue-100 text-blue-800 border-blue-200',
      success: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      danger: 'bg-red-100 text-red-800 border-red-200',
      info: 'bg-purple-100 text-purple-800 border-purple-200'
    }

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-full border transition-all duration-300',
          variants[variant],
          sizes[size],
          pulse && 'animate-pulse',
          glow && 'shadow-lg',
          glow && variant === 'success' && 'shadow-green-500/50',
          glow && variant === 'danger' && 'shadow-red-500/50',
          glow && variant === 'warning' && 'shadow-yellow-500/50',
          glow && variant === 'info' && 'shadow-purple-500/50',
          glow && variant === 'default' && 'shadow-blue-500/50',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AnimatedBadge.displayName = 'AnimatedBadge'

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy' | 'away'
  showText?: boolean
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

const StatusBadge = ({ status, showText = true, text, size = 'md' }: StatusBadgeProps) => {
  const statusConfig = {
    online: {
      color: 'bg-green-500',
      textColor: 'text-green-800',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200',
      label: 'Online'
    },
    offline: {
      color: 'bg-gray-500',
      textColor: 'text-gray-800',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-200',
      label: 'Offline'
    },
    busy: {
      color: 'bg-red-500',
      textColor: 'text-red-800',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-200',
      label: 'Ocupado'
    },
    away: {
      color: 'bg-yellow-500',
      textColor: 'text-yellow-800',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-200',
      label: 'Ausente'
    }
  }

  const config = statusConfig[status]
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={cn('relative', sizes[size])}>
        <div className={cn('w-full h-full rounded-full', config.color)} />
        <div className={cn('absolute inset-0 rounded-full animate-ping', config.color, 'opacity-75')} />
      </div>
      {showText && (
        <span className={cn('text-sm font-medium', config.textColor)}>
          {text || config.label}
        </span>
      )}
    </div>
  )
}

export { AnimatedBadge, StatusBadge }
