'use client'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { MusicalMoments, MusicalMoment } from '@/lib/schemas'
import { Music, Plus, Trash2, ExternalLink } from 'lucide-react'
import { nanoid } from 'nanoid'

interface Step2Props {
  data: MusicalMoments
  onChange: (data: MusicalMoments) => void
  disabled?: boolean
}

export function Step2MusicalMoments({ data, onChange, disabled }: Step2Props) {
  const handleMomentChange = (id: string, field: keyof MusicalMoment, value: string) => {
    const updatedMoments = data.moments.map(moment =>
      moment.id === id ? { ...moment, [field]: value } : moment
    )
    onChange({ moments: updatedMoments })
  }

  const addMoment = () => {
    onChange({
      moments: [
        ...data.moments,
        { id: nanoid(), momentName: '', songTitle: '', artist: '', link: '' }
      ]
    })
  }

  const removeMoment = (id: string) => {
    // Don't allow removing predefined moments, only custom ones
    const predefinedIds = ['deschidere', 'aruncatul-buchetului', 'voal', 'jartea', 'tort', 'primire-invitati', 'perioada-mesei', 'muzica-ambientala']
    if (predefinedIds.includes(id)) return

    onChange({
      moments: data.moments.filter(moment => moment.id !== id)
    })
  }

  const isPredefined = (id: string) => {
    const predefinedIds = ['deschidere', 'aruncatul-buchetului', 'voal', 'jartea', 'tort', 'primire-invitati', 'perioada-mesei', 'muzica-ambientala']
    return predefinedIds.includes(id)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary">
          Momente Muzicale
        </h2>
        <p className="text-text-secondary">
          Completează melodiile pentru momentele importante ale evenimentului.
          Poți adăuga link-uri YouTube sau Spotify.
        </p>
      </div>

      {/* Moments List */}
      <div className="space-y-4">
        {data.moments.map((moment, index) => (
          <div
            key={moment.id}
            className="group relative p-5 bg-surface border border-surface-border rounded-2xl space-y-4 animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Moment Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Music className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-accent">
                  {moment.momentName || `Moment ${index + 1}`}
                </span>
              </div>

              {!isPredefined(moment.id) && !disabled && (
                <button
                  onClick={() => removeMoment(moment.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Moment Fields */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {!isPredefined(moment.id) && (
                <Input
                  label="Momentul"
                  placeholder="Ex: Dans cu nașii"
                  value={moment.momentName}
                  onChange={(e) => handleMomentChange(moment.id, 'momentName', e.target.value)}
                  disabled={disabled}
                />
              )}
              <Input
                label="Melodia"
                placeholder="Numele piesei"
                value={moment.songTitle || ''}
                onChange={(e) => handleMomentChange(moment.id, 'songTitle', e.target.value)}
                disabled={disabled}
              />
              <Input
                label="Artistul"
                placeholder="Numele artistului"
                value={moment.artist || ''}
                onChange={(e) => handleMomentChange(moment.id, 'artist', e.target.value)}
                disabled={disabled}
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-secondary">
                  Link (YouTube/Spotify)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={moment.link || ''}
                    onChange={(e) => handleMomentChange(moment.id, 'link', e.target.value)}
                    disabled={disabled}
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 pr-10 py-3.5 text-text-primary placeholder-text-muted transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none hover:border-surface-hover"
                  />
                  {moment.link && (
                    <a
                      href={moment.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      {!disabled && (
        <Button
          variant="secondary"
          onClick={addMoment}
          className="w-full border-dashed hover:border-accent/50"
        >
          <Plus className="w-5 h-5" />
          Adaugă Moment Muzical Personalizat
        </Button>
      )}

      {/* Tips */}
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl">
        <p className="text-sm text-text-secondary">
          <span className="font-medium text-accent">Sfat:</span> Poți adăuga link-uri de pe
          YouTube, Spotify sau alte platforme pentru a ne ajuta să identificăm exact melodia dorită.
        </p>
      </div>
    </div>
  )
}
