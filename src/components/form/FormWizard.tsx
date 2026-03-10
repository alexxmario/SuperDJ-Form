'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { StepIndicator } from './StepIndicator'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ArrowRight, Check, Lock, Save } from 'lucide-react'
import { cn, isEventLocked, getDaysUntilLock } from '@/lib/utils'
import { FormData, defaultFormData } from '@/lib/schemas'

// Form Steps
import { Step1EventDetails } from './steps/Step1EventDetails'
import { Step2MusicalMoments } from './steps/Step2MusicalMoments'
import { Step3ImportantSongs } from './steps/Step3ImportantSongs'
import { Step4GenrePreferences } from './steps/Step4GenrePreferences'
import { Step5FinalDetails } from './steps/Step5FinalDetails'

const STEPS = [
  { number: 1, title: 'Date Eveniment' },
  { number: 2, title: 'Momente' },
  { number: 3, title: 'Piese' },
  { number: 4, title: 'Genuri' },
  { number: 5, title: 'Desfășurare' },
]

interface FormWizardProps {
  token: string
  initialData?: FormData
  eventDate?: string
  onSave?: (data: FormData) => Promise<void>
}

export function FormWizard({ token, initialData, eventDate, onSave }: FormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [formData, setFormData] = useState<FormData>(initialData || defaultFormData)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const isLocked = eventDate ? isEventLocked(eventDate) : false
  const daysUntilLock = eventDate ? getDaysUntilLock(eventDate) : null

  const updateFormData = useCallback((step: keyof FormData, data: FormData[keyof FormData]) => {
    setFormData(prev => ({
      ...prev,
      [step]: data,
    }))
  }, [])

  const handleNext = useCallback(async () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep])
    }

    // Auto-save on step change
    if (onSave && !isLocked) {
      setIsSaving(true)
      try {
        await onSave(formData)
        setLastSaved(new Date())
      } catch (error) {
        console.error('Save error:', error)
      } finally {
        setIsSaving(false)
      }
    }

    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1)
    }
  }, [currentStep, completedSteps, onSave, formData, isLocked])

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  const handleSubmit = useCallback(async () => {
    if (!completedSteps.includes(5)) {
      setCompletedSteps(prev => [...prev, 5])
    }

    if (onSave && !isLocked) {
      setIsSaving(true)
      try {
        await onSave(formData)
        setLastSaved(new Date())
      } catch (error) {
        console.error('Save error:', error)
      } finally {
        setIsSaving(false)
      }
    }
  }, [completedSteps, onSave, formData, isLocked])

  const renderStep = () => {
    const props = { disabled: isLocked }

    switch (currentStep) {
      case 1:
        return (
          <Step1EventDetails
            data={formData.eventDetails}
            onChange={(data) => updateFormData('eventDetails', data)}
            {...props}
          />
        )
      case 2:
        return (
          <Step2MusicalMoments
            data={formData.musicalMoments}
            onChange={(data) => updateFormData('musicalMoments', data)}
            {...props}
          />
        )
      case 3:
        return (
          <Step3ImportantSongs
            data={formData.importantSongs}
            onChange={(data) => updateFormData('importantSongs', data)}
            {...props}
          />
        )
      case 4:
        return (
          <Step4GenrePreferences
            data={formData.genrePreferences}
            onChange={(data) => updateFormData('genrePreferences', data)}
            {...props}
          />
        )
      case 5:
        return (
          <Step5FinalDetails
            data={formData.finalDetails}
            onChange={(data) => updateFormData('finalDetails', data)}
            {...props}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-surface-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Logo & Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Image
                src="https://www.superdj.ro/static/img/logo.png?v=2"
                alt="Super DJ"
                width={120}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
              <div className="h-8 w-px bg-surface-border" />
              <div>
                <p className="text-sm font-medium text-text-primary">Formular Eveniment</p>
                <p className="text-xs text-text-muted">Completează preferințele muzicale</p>
              </div>
            </div>

            {/* Status indicators */}
            <div className="flex items-center gap-3">
              {isLocked ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-amber-400 font-medium">Blocat</span>
                </div>
              ) : daysUntilLock !== null && daysUntilLock <= 14 ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-surface-border">
                  <span className="text-xs text-text-muted">Se blochează în {daysUntilLock} zile</span>
                </div>
              ) : null}

              {lastSaved && (
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Save className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lastSaved.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}
            </div>
          </div>

          {/* Step Indicator */}
          <StepIndicator
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>
      </header>

      {/* Form Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12">
        <div className="animate-fade-in">
          {renderStep()}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 bg-background/90 backdrop-blur-xl border-t border-surface-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={cn(currentStep === 1 && 'invisible')}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Înapoi</span>
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted hidden sm:inline">
                Pasul {currentStep} din 5
              </span>
            </div>

            {currentStep < 5 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                isLoading={isSaving}
                disabled={isLocked}
              >
                <span>Continuă</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                isLoading={isSaving}
                disabled={isLocked}
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-emerald-500/20"
              >
                <Check className="w-5 h-5" />
                <span>Finalizează</span>
              </Button>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
