'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { ArrowLeft, Copy, Check, ExternalLink, Sparkles } from 'lucide-react'
import { generateToken, EVENT_TYPES } from '@/lib/utils'

export default function NewEventPage() {
  const router = useRouter()
  const [clientName, setClientName] = useState('')
  const [eventType, setEventType] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [generatedToken, setGeneratedToken] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = async () => {
    if (!clientName || !eventType || !eventDate) {
      alert('Completează toate câmpurile obligatorii')
      return
    }

    setIsCreating(true)

    // Generate unique token
    const token = generateToken(12)

    // Simulate API call - in production this would save to Supabase
    setTimeout(() => {
      setGeneratedToken(token)
      setIsCreating(false)

      // Store in localStorage for demo
      const events = JSON.parse(localStorage.getItem('admin_events') || '[]')
      events.push({
        id: Date.now().toString(),
        token,
        clientName,
        eventType,
        eventDate,
        location: '',
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem('admin_events', JSON.stringify(events))
    }, 1000)
  }

  const copyLink = () => {
    if (!generatedToken) return
    const url = `${window.location.origin}/form/${generatedToken}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getFullLink = () => {
    if (!generatedToken) return ''
    return `${window.location.origin}/form/${generatedToken}`
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi la evenimente
        </Link>
        <h1 className="font-display text-3xl font-bold text-text-primary">
          Eveniment Nou
        </h1>
        <p className="text-text-secondary mt-1">
          Creează un eveniment și generează linkul pentru client
        </p>
      </div>

      {!generatedToken ? (
        /* Create Form */
        <div className="p-6 bg-surface border border-surface-border rounded-2xl space-y-6">
          <Input
            label="Numele Clientului"
            placeholder="ex: Maria & Ion Popescu"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />

          <Select
            label="Tip Eveniment"
            options={[...EVENT_TYPES]}
            placeholder="Selectează tipul"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Data Evenimentului <span className="text-accent">*</span>
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3.5 text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleCreate}
            isLoading={isCreating}
          >
            <Sparkles className="w-5 h-5" />
            Generează Link Client
          </Button>
        </div>
      ) : (
        /* Success - Show Link */
        <div className="space-y-6">
          <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-text-primary">
                Eveniment Creat!
              </h2>
              <p className="text-text-secondary mt-1">
                Link-ul pentru {clientName} a fost generat
              </p>
            </div>
          </div>

          <div className="p-6 bg-surface border border-surface-border rounded-2xl space-y-4">
            <label className="block text-sm font-medium text-text-secondary">
              Link pentru Client
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={getFullLink()}
                readOnly
                className="flex-1 bg-background border border-surface-border rounded-xl px-4 py-3 text-text-primary font-mono text-sm"
              />
              <Button variant="secondary" onClick={copyLink}>
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </Button>
              <Link href={getFullLink()} target="_blank">
                <Button variant="secondary">
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-text-muted">
              Trimite acest link clientului pentru a completa formularul de preferințe muzicale
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                setGeneratedToken(null)
                setClientName('')
                setEventType('')
                setEventDate('')
              }}
            >
              Creează Alt Eveniment
            </Button>
            <Link href="/admin" className="flex-1">
              <Button variant="primary" className="w-full">
                Înapoi la Listă
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
