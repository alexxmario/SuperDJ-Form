'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type = 'text', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-text-secondary">
            {label}
            {props.required && <span className="text-accent ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full bg-surface border border-surface-border rounded-xl py-3.5',
              'text-text-primary placeholder-text-muted',
              'transition-all duration-200',
              'focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none',
              'hover:border-surface-hover',
              icon ? 'pl-14 pr-4' : 'px-4',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400 animate-fade-in">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
