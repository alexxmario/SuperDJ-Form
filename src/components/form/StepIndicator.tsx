'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  number: number
  title: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  completedSteps: number[]
}

export function StepIndicator({ steps, currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile: Compact view */}
      <div className="sm:hidden flex items-center justify-between px-2">
        <span className="text-sm text-text-secondary">
          Pas {currentStep} din {steps.length}
        </span>
        <span className="text-sm font-semibold text-accent">
          {steps[currentStep - 1]?.title}
        </span>
      </div>

      {/* Desktop: Full stepper */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-surface-border" />

        {/* Progress line filled */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-accent to-accent-light transition-all duration-500 ease-out"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
          }}
        />

        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.number)
          const isCurrent = step.number === currentStep
          const isPending = !isCompleted && !isCurrent

          return (
            <div
              key={step.number}
              className="relative flex flex-col items-center z-10"
            >
              {/* Step circle */}
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  'text-sm font-bold transition-all duration-300',
                  isCompleted && 'bg-gradient-to-br from-accent to-accent-light text-black shadow-glow-sm',
                  isCurrent && 'bg-gradient-to-br from-accent to-accent-light text-black shadow-glow ring-4 ring-accent/20 scale-110',
                  isPending && 'bg-surface border border-surface-border text-text-muted'
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>

              {/* Step title */}
              <span
                className={cn(
                  'absolute -bottom-7 whitespace-nowrap text-xs font-medium',
                  'transition-colors duration-200',
                  (isCompleted || isCurrent) ? 'text-text-primary' : 'text-text-muted'
                )}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>

      {/* Mobile progress bar */}
      <div className="sm:hidden mt-3">
        <div className="h-1.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
