import * as React from 'react'
import { cn } from '@/lib/utils'
import { Plus, Edit, Trash2, Eye, Download } from 'lucide-react'

interface FloatingActionProps {
  children: React.ReactNode
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

const FloatingAction = React.forwardRef<HTMLDivElement, FloatingActionProps>(
  ({ children, className, position = 'bottom-right', ...props }, ref) => {
    const positions = {
      'bottom-right': 'bottom-8 right-8',
      'bottom-left': 'bottom-8 left-8',
      'top-right': 'top-8 right-8',
      'top-left': 'top-8 left-8'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'fixed z-50 flex flex-col gap-2',
          positions[position],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FloatingAction.displayName = 'FloatingAction'

interface FloatingActionButtonProps {
  onClick?: () => void
  icon?: React.ReactNode
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ onClick, icon, children, variant = 'primary', size = 'md', className, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg hover:shadow-xl border border-gray-200',
      danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
    }

    const sizes = {
      sm: 'w-10 h-10 rounded-lg',
      md: 'w-14 h-14 rounded-xl',
      lg: 'w-16 h-16 rounded-2xl'
    }

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {icon || children}
      </button>
    )
  }
)
FloatingActionButton.displayName = 'FloatingActionButton'

// Predefined action buttons
const AddButton = ({ onClick, className, ...props }: Omit<FloatingActionButtonProps, 'icon' | 'variant'>) => (
  <FloatingActionButton
    onClick={onClick}
    icon={<Plus className="w-6 h-6" />}
    variant="primary"
    className={className}
    {...props}
  />
)

const EditButton = ({ onClick, className, ...props }: Omit<FloatingActionButtonProps, 'icon' | 'variant'>) => (
  <FloatingActionButton
    onClick={onClick}
    icon={<Edit className="w-5 h-5" />}
    variant="secondary"
    size="sm"
    className={className}
    {...props}
  />
)

const DeleteButton = ({ onClick, className, ...props }: Omit<FloatingActionButtonProps, 'icon' | 'variant'>) => (
  <FloatingActionButton
    onClick={onClick}
    icon={<Trash2 className="w-5 h-5" />}
    variant="danger"
    size="sm"
    className={className}
    {...props}
  />
)

const ViewButton = ({ onClick, className, ...props }: Omit<FloatingActionButtonProps, 'icon' | 'variant'>) => (
  <FloatingActionButton
    onClick={onClick}
    icon={<Eye className="w-5 h-5" />}
    variant="secondary"
    size="sm"
    className={className}
    {...props}
  />
)

const DownloadButton = ({ onClick, className, ...props }: Omit<FloatingActionButtonProps, 'icon' | 'variant'>) => (
  <FloatingActionButton
    onClick={onClick}
    icon={<Download className="w-5 h-5" />}
    variant="secondary"
    size="sm"
    className={className}
    {...props}
  />
)

export {
  FloatingAction,
  FloatingActionButton,
  AddButton,
  EditButton,
  DeleteButton,
  ViewButton,
  DownloadButton
}
