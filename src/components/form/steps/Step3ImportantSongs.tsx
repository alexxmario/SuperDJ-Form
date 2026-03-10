'use client'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ImportantSongs, Song } from '@/lib/schemas'
import { Heart, Ban, Plus, Trash2, Compass, ExternalLink, Mic } from 'lucide-react'
import { nanoid } from 'nanoid'
import { cn } from '@/lib/utils'

interface Step3Props {
  data: ImportantSongs
  onChange: (data: ImportantSongs) => void
  disabled?: boolean
}

export function Step3ImportantSongs({ data, onChange, disabled }: Step3Props) {
  const handleSongChange = (
    listType: 'mustHave' | 'orientative' | 'doNotPlay',
    id: string,
    field: keyof Song,
    value: string
  ) => {
    const updatedList = data[listType].map(song =>
      song.id === id ? { ...song, [field]: value } : song
    )
    onChange({ ...data, [listType]: updatedList })
  }

  const addSong = (listType: 'mustHave' | 'orientative' | 'doNotPlay') => {
    onChange({
      ...data,
      [listType]: [...data[listType], { id: nanoid(), title: '', artist: '', link: '' }]
    })
  }

  const removeSong = (listType: 'mustHave' | 'orientative' | 'doNotPlay', id: string) => {
    if (data[listType].length > 1) {
      onChange({
        ...data,
        [listType]: data[listType].filter(song => song.id !== id)
      })
    }
  }

  const toggleManeleLive = () => {
    onChange({
      ...data,
      maneleLive: data.maneleLive === undefined ? true : data.maneleLive === true ? false : undefined
    })
  }

  const renderSongList = (
    listType: 'mustHave' | 'orientative' | 'doNotPlay',
    title: string,
    icon: React.ReactNode,
    colorClass: string,
    borderColorClass: string
  ) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', colorClass)}>
          {icon}
        </div>
        <h3 className={cn('text-lg font-semibold', borderColorClass.replace('border-', 'text-').replace('/30', ''))}>
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {data[listType].map((song, index) => (
          <div
            key={song.id}
            className="group flex gap-3 items-start animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex-1 grid gap-3 sm:grid-cols-3">
              <Input
                placeholder="Titlul piesei"
                value={song.title}
                onChange={(e) => handleSongChange(listType, song.id, 'title', e.target.value)}
                disabled={disabled}
              />
              <Input
                placeholder="Artist"
                value={song.artist || ''}
                onChange={(e) => handleSongChange(listType, song.id, 'artist', e.target.value)}
                disabled={disabled}
              />
              <div className="relative">
                <input
                  type="url"
                  placeholder="Link YouTube/Spotify"
                  value={song.link || ''}
                  onChange={(e) => handleSongChange(listType, song.id, 'link', e.target.value)}
                  disabled={disabled}
                  className="w-full bg-surface border border-surface-border rounded-xl px-4 pr-10 py-3.5 text-text-primary placeholder-text-muted transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none hover:border-surface-hover"
                />
                {song.link && (
                  <a
                    href={song.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-accent transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            {data[listType].length > 1 && !disabled && (
              <button
                onClick={() => removeSong(listType, song.id)}
                className="mt-2 p-2 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {!disabled && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => addSong(listType)}
          className={cn('border-dashed', borderColorClass, borderColorClass.replace('border-', 'text-').replace('/30', ''))}
        >
          <Plus className="w-4 h-4" />
          Adaugă Piesă
        </Button>
      )}
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary">
          Piese Importante
        </h2>
        <p className="text-text-secondary">
          Specifică melodiile obligatorii, piesele orientative și cele interzise.
          Poți adăuga link-uri de pe YouTube, Spotify sau alte platforme.
        </p>
      </div>

      {/* Must Have Section */}
      {renderSongList(
        'mustHave',
        'Must Have - Obligatoriu de cântat',
        <Heart className="w-4 h-4 text-green-400" />,
        'bg-green-500/20',
        'border-green-500/30'
      )}

      {/* Divider */}
      <div className="border-t border-surface-border" />

      {/* Orientative Songs Section */}
      {renderSongList(
        'orientative',
        'Piese Orientative - Pentru a înțelege stilul',
        <Compass className="w-4 h-4 text-blue-400" />,
        'bg-blue-500/20',
        'border-blue-500/30'
      )}

      {/* Divider */}
      <div className="border-t border-surface-border" />

      {/* Do Not Play Section */}
      {renderSongList(
        'doNotPlay',
        'Do Not Play - Nu se cântă',
        <Ban className="w-4 h-4 text-red-400" />,
        'bg-red-500/20',
        'border-red-500/30'
      )}

      {/* Divider */}
      <div className="border-t border-surface-border" />

      {/* Manele/Live Option */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Mic className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-purple-400">
            Manele / Live
          </h3>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onChange({ ...data, maneleLive: true })}
            disabled={disabled}
            className={cn(
              'flex-1 p-4 rounded-xl border-2 transition-all text-center font-medium',
              data.maneleLive === true
                ? 'bg-green-500/10 border-green-500 text-green-400'
                : 'bg-surface border-surface-border text-text-secondary hover:border-surface-hover'
            )}
          >
            Da
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...data, maneleLive: false })}
            disabled={disabled}
            className={cn(
              'flex-1 p-4 rounded-xl border-2 transition-all text-center font-medium',
              data.maneleLive === false
                ? 'bg-red-500/10 border-red-500 text-red-400'
                : 'bg-surface border-surface-border text-text-secondary hover:border-surface-hover'
            )}
          >
            Nu
          </button>
        </div>
        <p className="text-sm text-text-muted">
          Indicați dacă doriți manele sau muzică live la eveniment.
        </p>
      </div>
    </div>
  )
}
