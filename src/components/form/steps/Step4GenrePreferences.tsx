'use client'

import { GenrePreferences } from '@/lib/schemas'
import { MUSIC_GENRES, FOLK_REGIONS, cn } from '@/lib/utils'
import { Check, Info, Music, MapPin, Link } from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'

interface Step4Props {
  data: GenrePreferences
  onChange: (data: GenrePreferences) => void
  disabled?: boolean
}

export function Step4GenrePreferences({ data, onChange, disabled }: Step4Props) {
  const toggleGenre = (genreId: string) => {
    if (disabled) return

    const newGenres = data.genres.includes(genreId)
      ? data.genres.filter(g => g !== genreId)
      : [...data.genres, genreId]

    onChange({ ...data, genres: newGenres })
  }

  const toggleFolkRegion = (regionId: string) => {
    if (disabled) return

    const newRegions = data.folkRegions.includes(regionId)
      ? data.folkRegions.filter(r => r !== regionId)
      : [...data.folkRegions, regionId]

    onChange({ ...data, folkRegions: newRegions })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary">
          Genuri Muzicale
        </h2>
        <p className="text-text-secondary">
          Selectează genurile muzicale preferate pentru evenimentul tău
        </p>
      </div>

      {/* General Genres Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Music className="w-4 h-4 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Genuri Generale
          </h3>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {MUSIC_GENRES.map((genre, index) => {
            const isSelected = data.genres.includes(genre.id)

            return (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                disabled={disabled}
                className={cn(
                  'relative p-3 rounded-xl border-2 transition-all duration-200',
                  'flex items-center gap-2 text-left',
                  'animate-fade-in',
                  isSelected
                    ? 'bg-accent/10 border-accent'
                    : 'bg-surface border-surface-border hover:border-surface-hover hover:bg-surface-hover',
                  disabled && 'cursor-not-allowed opacity-60'
                )}
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                {/* Checkbox indicator */}
                <div
                  className={cn(
                    'flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-200',
                    'flex items-center justify-center',
                    isSelected
                      ? 'bg-accent border-accent'
                      : 'bg-transparent border-surface-border'
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>

                {/* Genre info */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base flex-shrink-0">{genre.icon}</span>
                  <span
                    className={cn(
                      'text-sm font-medium truncate transition-colors',
                      isSelected ? 'text-text-primary' : 'text-text-secondary'
                    )}
                  >
                    {genre.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Folk Regions Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Muzică Populară - Regiuni
          </h3>
        </div>

        <p className="text-sm text-text-muted">
          Selectează regiunile pentru muzică populară românească (dacă este cazul)
        </p>

        {/* Folk Regions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {FOLK_REGIONS.map((region, index) => {
            const isSelected = data.folkRegions.includes(region.id)

            return (
              <button
                key={region.id}
                onClick={() => toggleFolkRegion(region.id)}
                disabled={disabled}
                className={cn(
                  'relative p-3 rounded-xl border-2 transition-all duration-200',
                  'flex items-center gap-2 text-left',
                  'animate-fade-in',
                  isSelected
                    ? 'bg-green-500/10 border-green-500'
                    : 'bg-surface border-surface-border hover:border-surface-hover hover:bg-surface-hover',
                  disabled && 'cursor-not-allowed opacity-60'
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Checkbox indicator */}
                <div
                  className={cn(
                    'flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-200',
                    'flex items-center justify-center',
                    isSelected
                      ? 'bg-green-500 border-green-500'
                      : 'bg-transparent border-surface-border'
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>

                <span
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isSelected ? 'text-text-primary' : 'text-text-secondary'
                  )}
                >
                  {region.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Examples/Links Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Link className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Exemple / Link-uri Playlist
          </h3>
        </div>

        <Textarea
          placeholder="Adaugă link-uri către playlist-uri YouTube, Spotify sau alte exemple care să ne ajute să înțelegem stilul dorit..."
          value={data.genreExamples || ''}
          onChange={(e) => onChange({ ...data, genreExamples: e.target.value })}
          disabled={disabled}
          rows={4}
        />
      </div>

      {/* Selected count */}
      <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-lg font-bold text-accent">{data.genres.length + data.folkRegions.length}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {data.genres.length} genuri, {data.folkRegions.length} regiuni selectate
            </p>
            <p className="text-xs text-text-muted">
              Poți selecta mai multe opțiuni
            </p>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="flex gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-text-secondary">
          <span className="font-medium text-blue-400">Notă:</span> Selectează genurile și regiunile
          care se potrivesc cel mai bine gusturilor invitaților tăi. Link-urile către playlist-uri
          ne ajută să înțelegem mai bine stilul dorit.
        </p>
      </div>
    </div>
  )
}
