'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-text-secondary">
            {label}
            {props.required && <span className="text-accent ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full bg-surface border border-surface-border rounded-xl px-4 py-3.5',
            'text-text-primary placeholder-text-muted',
            'transition-all duration-200 resize-none',
            'focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none',
            'hover:border-surface-hover',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400 animate-fade-in">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
