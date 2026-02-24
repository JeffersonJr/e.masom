import * as React from 'react'
import { cn } from '@/lib/utils'

interface MasonryGridProps {
  children: React.ReactNode
  columns?: number
  gap?: string
  className?: string
}

const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ children, columns = 3, gap = '1rem', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('grid w-full', className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MasonryGrid.displayName = 'MasonryGrid'

interface MasonryItemProps {
  children: React.ReactNode
  className?: string
  span?: number
}

const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>(
  ({ children, className, span = 1, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('break-inside-avoid', className)}
        style={{
          gridColumn: `span ${span}`,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MasonryItem.displayName = 'MasonryItem'

export { MasonryGrid, MasonryItem }
