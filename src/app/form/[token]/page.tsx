'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { FormWizard } from '@/components/form/FormWizard'
import { FormData, defaultFormData } from '@/lib/schemas'
import { Loader2 } from 'lucide-react'

export default function FormPage() {
  const params = useParams()
  const token = params.token as string

  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [eventDate, setEventDate] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    // For demo purposes, load from localStorage
    // In production, this would fetch from Supabase
    const saved = localStorage.getItem(`form_${token}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFormData(parsed.formData || defaultFormData)
        setEventDate(parsed.eventDate)
      } catch (e) {
        console.error('Failed to parse saved data:', e)
      }
    }
    setIsLoading(false)
  }, [token])

  const handleSave = async (data: FormData) => {
    if (!token) return

    // Save to localStorage for demo
    // In production, this would save to Supabase
    localStorage.setItem(`form_${token}`, JSON.stringify({
      formData: data,
      eventDate: data.eventDetails.eventDate || eventDate,
      lastUpdated: new Date().toISOString(),
    }))

    // Update local eventDate if changed
    if (data.eventDetails.eventDate) {
      setEventDate(data.eventDetails.eventDate)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
          <p className="text-text-secondary">Se încarcă formularul...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-display font-semibold text-text-primary">
            Link Invalid
          </h1>
          <p className="text-text-secondary">
            {error}
          </p>
        </div>
      </div>
    )
  }

  if (!token) {
    return null
  }

  return (
    <FormWizard
      token={token}
      initialData={formData}
      eventDate={eventDate}
      onSave={handleSave}
    />
  )
}
