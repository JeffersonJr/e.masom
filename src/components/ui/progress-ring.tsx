import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
  children?: React.ReactNode
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const ProgressRing = React.forwardRef<SVGSVGElement, ProgressRingProps>(
  ({ 
    progress, 
    size = 120, 
    strokeWidth = 8, 
    className, 
    children,
    color = 'primary'
  }, ref) => {
    const normalizedRadius = (size - strokeWidth * 2) / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset = circumference - (progress / 100) * circumference

    const colors = {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444'
    }

    return (
      <div className={cn('relative inline-flex items-center justify-center', className)}>
        <svg
          height={size}
          width={size}
          ref={ref}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <circle
            stroke={colors[color]}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ 
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.5s ease-in-out'
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        {children && (
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    )
  }
)
ProgressRing.displayName = 'ProgressRing'

export { ProgressRing }
