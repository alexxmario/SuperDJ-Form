'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { PDFDownloadButton } from '@/components/pdf/PDFDownloadButton'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Mail,
  Phone,
  Music,
  Heart,
  Ban,
  FileText,
  Download,
  ExternalLink,
  MessageSquare
} from 'lucide-react'
import { formatDate, isEventLocked, MUSIC_GENRES, EVENT_TYPES } from '@/lib/utils'
import { FormData, defaultFormData } from '@/lib/schemas'
import { cn } from '@/lib/utils'

interface EventData {
  id: string
  token: string
  clientName: string
  eventType: string
  eventDate: string
  location: string
  guestCount?: number
  startTime?: string
  endTime?: string
  email?: string
  phone?: string
  formData?: FormData
}

// Demo event with full data
const DEMO_EVENT: EventData = {
  id: '1',
  token: 'demo-abc123',
  clientName: 'Maria & Ion Popescu',
  eventType: 'nunta',
  eventDate: '2024-06-15',
  location: 'Casa Lux, București',
  guestCount: 150,
  startTime: '18:00',
  endTime: '04:00',
  email: 'maria.popescu@email.com',
  phone: '+40 722 123 456',
  formData: {
    eventDetails: {
      clientName: 'Maria & Ion Popescu',
      email: 'maria.popescu@email.com',
      phone: '+40 722 123 456',
      eventType: 'nunta',
      eventDate: '2024-06-15',
      location: 'Casa Lux, București',
      churchTime: '14:00',
      venueTime: '17:00',
      startTime: '18:00',
      endTime: '04:00',
      guestCount: 150,
      soundEquipment: 'JBL VRX',
      lightEquipment: 'Moving heads, LED bars',
      specialEffects: 'Fum greu, confetti',
    },
    musicalMoments: {
      moments: [
        { id: 'deschidere', momentName: 'Piesa Deschidere', songTitle: 'Perfect', artist: 'Ed Sheeran', link: '' },
        { id: 'aruncatul-buchetului', momentName: 'Aruncatul Buchetului', songTitle: 'Single Ladies', artist: 'Beyoncé', link: '' },
        { id: 'voal', momentName: 'Voal', songTitle: 'Thinking Out Loud', artist: 'Ed Sheeran', link: '' },
        { id: 'tort', momentName: 'Tort', songTitle: 'Sugar', artist: 'Maroon 5', link: '' },
      ],
    },
    importantSongs: {
      mustHave: [
        { id: '1', title: 'Shallow', artist: 'Lady Gaga & Bradley Cooper', link: '' },
        { id: '2', title: 'Uptown Funk', artist: 'Bruno Mars', link: '' },
        { id: '3', title: 'Happy', artist: 'Pharrell Williams', link: '' },
      ],
      orientative: [
        { id: '1', title: 'Shape of You', artist: 'Ed Sheeran', link: '' },
        { id: '2', title: 'Blinding Lights', artist: 'The Weeknd', link: '' },
      ],
      doNotPlay: [
        { id: '1', title: 'Orice manea', artist: '', link: '' },
        { id: '2', title: 'Despacito', artist: 'Luis Fonsi', link: '' },
      ],
      maneleLive: false,
    },
    genrePreferences: {
      genres: ['pop', 'rock', 'dance', 'disco', 'latino'],
      folkRegions: [],
      genreExamples: '',
    },
    finalDetails: {
      clientNotes: 'Vă rugăm să mențineți un volum moderat până la ora 22:00 deoarece avem invitați în vârstă. După miezul nopții putem ridica energia. Mirele dorește o dedicație specială pentru mama lui pe melodia "Mama" de Il Volo la ora 23:00.',
      timeline: [],
      additionalInfo: '',
    },
  },
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<EventData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load demo event - in production this would fetch from Supabase
    setTimeout(() => {
      setEvent(DEMO_EVENT)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-surface animate-pulse rounded" />
        <div className="h-64 bg-surface animate-pulse rounded-2xl" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium text-text-primary mb-2">
          Eveniment negăsit
        </h3>
        <Link href="/dashboard">
          <Button variant="secondary">Înapoi la listă</Button>
        </Link>
      </div>
    )
  }

  const formData = event.formData || defaultFormData
  const locked = isEventLocked(event.eventDate)

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la evenimente
          </Link>
          <h1 className="font-display text-3xl font-bold text-text-primary">
            {event.clientName}
          </h1>
          <p className="text-text-secondary mt-1">
            {EVENT_TYPES.find(t => t.value === event.eventType)?.label || event.eventType}
          </p>
        </div>

        <div className="flex gap-3">
          <Link href={`/form/${event.token}`} target="_blank">
            <Button variant="secondary" size="sm">
              <ExternalLink className="w-4 h-4" />
              Vezi Formularul
            </Button>
          </Link>
          <PDFDownloadButton formData={formData} />
        </div>
      </div>

      {/* Event Info Card */}
      <div className="p-6 bg-surface border border-surface-border rounded-2xl">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-4">
          Informații Eveniment
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Data</p>
              <p className="font-medium text-text-primary">{formatDate(event.eventDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Ora</p>
              <p className="font-medium text-text-primary">
                {event.startTime} - {event.endTime}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Locație</p>
              <p className="font-medium text-text-primary">{event.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Invitați</p>
              <p className="font-medium text-text-primary">{event.guestCount || '-'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Email</p>
              <p className="font-medium text-text-primary">{event.email || '-'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Telefon</p>
              <p className="font-medium text-text-primary">{event.phone || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Musical Moments */}
      <div className="p-6 bg-surface border border-surface-border rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Music className="w-4 h-4 text-accent" />
          </div>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Momente Muzicale
          </h2>
        </div>
        <div className="space-y-3">
          {formData.musicalMoments.moments.filter(m => m.momentName).map((moment, index) => (
            <div
              key={moment.id}
              className="flex items-center justify-between p-4 bg-background rounded-xl"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-medium text-accent">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-text-primary">{moment.momentName}</p>
                  {moment.songTitle && (
                    <p className="text-sm text-text-secondary">
                      {moment.songTitle} {moment.artist && `- ${moment.artist}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Songs */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Must Have */}
        <div className="p-6 bg-surface border border-surface-border rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Heart className="w-4 h-4 text-green-400" />
            </div>
            <h2 className="font-display text-lg font-semibold text-green-400">
              Must Have
            </h2>
          </div>
          <div className="space-y-2">
            {formData.importantSongs.mustHave.filter(s => s.title).map((song) => (
              <div
                key={song.id}
                className="p-3 bg-background rounded-lg"
              >
                <p className="font-medium text-text-primary">{song.title}</p>
                {song.artist && (
                  <p className="text-sm text-text-secondary">{song.artist}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Do Not Play */}
        <div className="p-6 bg-surface border border-surface-border rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Ban className="w-4 h-4 text-red-400" />
            </div>
            <h2 className="font-display text-lg font-semibold text-red-400">
              Do Not Play
            </h2>
          </div>
          <div className="space-y-2">
            {formData.importantSongs.doNotPlay.filter(s => s.title).map((song) => (
              <div
                key={song.id}
                className="p-3 bg-background rounded-lg"
              >
                <p className="font-medium text-text-primary">{song.title}</p>
                {song.artist && (
                  <p className="text-sm text-text-secondary">{song.artist}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Genre Preferences */}
      <div className="p-6 bg-surface border border-surface-border rounded-2xl">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-4">
          Genuri Preferate
        </h2>
        <div className="flex flex-wrap gap-2">
          {formData.genrePreferences.genres.map((genreId) => {
            const genre = MUSIC_GENRES.find(g => g.id === genreId)
            if (!genre) return null
            return (
              <span
                key={genreId}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium"
              >
                <span>{genre.icon}</span>
                {genre.label}
              </span>
            )
          })}
        </div>
      </div>

      {/* Client Notes */}
      {formData.finalDetails.clientNotes && (
        <div className="p-6 bg-surface border border-surface-border rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-accent" />
            </div>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Precizări Client
            </h2>
          </div>
          <p className="text-text-secondary whitespace-pre-wrap leading-relaxed">
            {formData.finalDetails.clientNotes}
          </p>
        </div>
      )}
    </div>
  )
}
