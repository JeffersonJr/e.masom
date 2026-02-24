import * as React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  lines?: number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', width, height, lines = 1, ...props }, ref) => {
    const variantStyles = {
      text: 'h-4 rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-none',
      rounded: 'rounded-lg'
    }

    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={cn('space-y-2', className)} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'loading-skeleton h-4 rounded',
                i === lines - 1 ? 'w-3/4' : 'w-full'
              )}
              style={{
                width: i === lines - 1 ? '75%' : width,
                height: height || '1rem'
              }}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('loading-skeleton', variantStyles[variant], className)}
        style={{
          width,
          height
        }}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

interface CardSkeletonProps {
  showAvatar?: boolean
  showTitle?: boolean
  showText?: boolean
  lines?: number
}

const CardSkeleton = ({ 
  showAvatar = false, 
  showTitle = true, 
  showText = true, 
  lines = 3 
}: CardSkeletonProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
      {showAvatar && (
        <div className="flex items-center space-x-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1">
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={16} />
          </div>
        </div>
      )}
      
      {showTitle && (
        <Skeleton variant="text" width="80%" height={24} />
      )}
      
      {showText && (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton 
              key={i} 
              variant="text" 
              width={i === lines - 1 ? '70%' : '100%'} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface TableSkeletonProps {
  rows?: number
  columns?: number
}

const TableSkeleton = ({ rows = 5, columns = 4 }: TableSkeletonProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} variant="text" height={20} />
          ))}
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} variant="text" height={16} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Skeleton, CardSkeleton, TableSkeleton }
