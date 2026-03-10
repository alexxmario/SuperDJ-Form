'use client'

import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'
import { FinalDetails, TimelineItem } from '@/lib/schemas'
import { MessageSquare, Clock, Lightbulb, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Step5Props {
  data: FinalDetails
  onChange: (data: FinalDetails) => void
  disabled?: boolean
}

export function Step5FinalDetails({ data, onChange, disabled }: Step5Props) {
  const [showTimeline, setShowTimeline] = useState(false)

  const handleTimelineChange = (id: string, field: keyof TimelineItem, value: string) => {
    const updatedTimeline = (data.timeline || []).map(item =>
      item.id === id ? { ...item, [field]: value } : item
    )
    onChange({ ...data, timeline: updatedTimeline })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary">
          Desfășurare & Precizări Finale
        </h2>
        <p className="text-text-secondary">
          Adaugă detaliile finale și programul evenimentului
        </p>
      </div>

      {/* Client Notes */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Precizări Finale Client
          </h3>
        </div>

        <Textarea
          placeholder="Scrie aici orice detalii importante pentru DJ: solicitări speciale, dedicații, restricții de volum, momente când muzica trebuie oprită, sau alte informații relevante..."
          value={data.clientNotes || ''}
          onChange={(e) => onChange({ ...data, clientNotes: e.target.value })}
          disabled={disabled}
          rows={6}
          className="text-base leading-relaxed"
        />

        <p className="text-xs text-text-muted text-right">
          {data.clientNotes?.length || 0} caractere
        </p>
      </div>

      {/* Event Timeline (Optional) */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setShowTimeline(!showTimeline)}
          className="w-full flex items-center justify-between p-4 bg-surface border border-surface-border rounded-xl hover:bg-surface-hover transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-text-primary">
                Detalii Desfășurare Eveniment
              </h3>
              <p className="text-sm text-text-muted">
                Opțional - Programul cu servirea mesei și momente speciale
              </p>
            </div>
          </div>
          {showTimeline ? (
            <ChevronUp className="w-5 h-5 text-text-muted" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-muted" />
          )}
        </button>

        {showTimeline && (
          <div className="space-y-3 animate-fade-in">
            {data.timeline?.map((item, index) => (
              <div
                key={item.id}
                className="p-4 bg-surface border border-surface-border rounded-xl space-y-3 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Clock className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="font-medium text-text-primary">{item.name}</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-secondary">
                      Ora
                    </label>
                    <input
                      type="time"
                      value={item.time || ''}
                      onChange={(e) => handleTimelineChange(item.id, 'time', e.target.value)}
                      disabled={disabled}
                      className="w-full bg-background border border-surface-border rounded-xl px-4 py-3 text-text-primary transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                    />
                  </div>
                  <Input
                    label="Detalii"
                    placeholder="Note suplimentare..."
                    value={item.details || ''}
                    onChange={(e) => handleTimelineChange(item.id, 'details', e.target.value)}
                    disabled={disabled}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Informații Suplimentare
          </h3>
        </div>

        <Textarea
          placeholder="Alte informații care ar putea fi utile: prezența artiștilor live, animatori, ursitoare, fotografi, etc..."
          value={data.additionalInfo || ''}
          onChange={(e) => onChange({ ...data, additionalInfo: e.target.value })}
          disabled={disabled}
          rows={4}
        />
      </div>

      {/* Suggestions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-text-secondary">
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm font-medium">Sugestii de informații utile:</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            'Există un program specific al evenimentului?',
            'Sunt momente când muzica trebuie oprită?',
            'Există restricții de volum la locație?',
            'Aveți dedicații pentru anumiți invitați?',
            'Vor fi artiști live sau formații?',
            'Doriți un anumit stil pentru final?',
          ].map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-3 bg-surface rounded-lg border border-surface-border"
            >
              <span className="text-accent text-lg">•</span>
              <span className="text-sm text-text-secondary">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Message */}
      <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl text-center space-y-3">
        <div className="w-12 h-12 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
          <span className="text-2xl">🎉</span>
        </div>
        <h3 className="text-lg font-display font-semibold text-text-primary">
          Aproape gata!
        </h3>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          După ce finalizezi formularul, DJ-ul tău va avea toate informațiile necesare
          pentru a crea atmosfera perfectă la evenimentul tău.
        </p>
        <p className="text-xs text-text-muted italic">
          "Vă mulțumim pentru timpul acordat completării acestui formular. Informațiile
          oferite ne vor ajuta să asigurăm că totul se desfășoară perfect în ziua cea mare."
        </p>
      </div>
    </div>
  )
}
