'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  icon?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, icon, checked, ...props }, ref) => {
    return (
      <label
        className={cn(
          'relative flex items-center gap-4 p-4 rounded-xl cursor-pointer',
          'bg-surface border-2 transition-all duration-200',
          checked
            ? 'border-accent bg-accent/10'
            : 'border-surface-border hover:border-surface-hover hover:bg-surface-hover',
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          checked={checked}
          {...props}
        />
        <div
          className={cn(
            'flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200',
            'flex items-center justify-center',
            checked
              ? 'bg-accent border-accent'
              : 'bg-transparent border-surface-border'
          )}
        >
          {checked && <Check className="w-4 h-4 text-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {icon && <span className="text-xl">{icon}</span>}
            {label && (
              <span className={cn(
                'font-medium transition-colors',
                checked ? 'text-text-primary' : 'text-text-secondary'
              )}>
                {label}
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-text-muted mt-1">{description}</p>
          )}
        </div>
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
