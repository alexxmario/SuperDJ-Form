'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowRight,
  Music,
  FileText
} from 'lucide-react'
import { formatDate, isEventLocked } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Event {
  id: string
  token: string
  clientName: string
  eventType: string
  eventDate: string
  location: string
  guestCount?: number
  startTime?: string
}

// Demo events for testing
const DEMO_EVENTS: Event[] = [
  {
    id: '1',
    token: 'demo-abc123',
    clientName: 'Maria & Ion Popescu',
    eventType: 'nunta',
    eventDate: '2024-06-15',
    location: 'Casa Lux, București',
    guestCount: 150,
    startTime: '18:00',
  },
  {
    id: '2',
    token: 'demo-def456',
    clientName: 'Compania XYZ',
    eventType: 'corporate',
    eventDate: '2024-05-20',
    location: 'Hotel Marriott, București',
    guestCount: 200,
    startTime: '19:00',
  },
  {
    id: '3',
    token: 'demo-ghi789',
    clientName: 'Familia Ionescu',
    eventType: 'botez',
    eventDate: '2024-04-10',
    location: 'Restaurant Pescarus',
    guestCount: 80,
    startTime: '13:00',
  },
]

const EVENT_TYPE_LABELS: Record<string, string> = {
  nunta: 'Nuntă',
  botez: 'Botez',
  aniversare: 'Aniversare',
  corporate: 'Corporate',
  petrecere: 'Petrecere',
  majorat: 'Majorat',
  altul: 'Altul',
}

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load demo events - in production this would fetch from Supabase
    setTimeout(() => {
      setEvents(DEMO_EVENTS)
      setIsLoading(false)
    }, 500)
  }, [])

  const filteredEvents = events.filter(event =>
    event.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-surface animate-pulse rounded" />
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-surface animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-primary">
            Evenimentele Mele
          </h1>
          <p className="text-text-secondary mt-1">
            {events.length} {events.length === 1 ? 'eveniment' : 'evenimente'} atribuite
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xs w-full">
          <input
            type="text"
            placeholder="Caută eveniment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Events Grid */}
      {sortedEvents.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto rounded-full bg-surface flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">
            {searchQuery ? 'Niciun rezultat' : 'Niciun eveniment'}
          </h3>
          <p className="text-text-secondary">
            {searchQuery
              ? 'Încearcă să cauți altceva'
              : 'Nu ai evenimente atribuite momentan'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedEvents.map((event, index) => {
            const locked = isEventLocked(event.eventDate)
            const isPast = new Date(event.eventDate) < new Date()

            return (
              <Link
                key={event.id}
                href={`/dashboard/event/${event.id}`}
                className={cn(
                  'group block p-6 bg-surface border border-surface-border rounded-2xl',
                  'hover:border-accent/30 hover:bg-surface-hover transition-all duration-300',
                  'animate-fade-in'
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Event Type Badge */}
                  <div className="flex-shrink-0">
                    <div className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center',
                      isPast ? 'bg-text-muted/10' : 'bg-accent/10'
                    )}>
                      <Music className={cn(
                        'w-6 h-6',
                        isPast ? 'text-text-muted' : 'text-accent'
                      )} />
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-text-primary truncate">
                          {event.clientName}
                        </h3>
                        <span className={cn(
                          'inline-block px-2 py-0.5 rounded text-xs font-medium mt-1',
                          isPast
                            ? 'bg-text-muted/10 text-text-muted'
                            : 'bg-accent/10 text-accent'
                        )}>
                          {EVENT_TYPE_LABELS[event.eventType] || event.eventType}
                        </span>
                      </div>

                      {/* Status */}
                      {locked && !isPast && (
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-lg">
                          Blocat
                        </span>
                      )}
                      {isPast && (
                        <span className="px-2 py-1 bg-text-muted/10 text-text-muted text-xs rounded-lg">
                          Finalizat
                        </span>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Calendar className="w-4 h-4 text-text-muted" />
                        <span>{formatDate(event.eventDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <MapPin className="w-4 h-4 text-text-muted" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      {event.guestCount && (
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <Users className="w-4 h-4 text-text-muted" />
                          <span>{event.guestCount} invitați</span>
                        </div>
                      )}
                      {event.startTime && (
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <Clock className="w-4 h-4 text-text-muted" />
                          <span>{event.startTime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden sm:block flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
