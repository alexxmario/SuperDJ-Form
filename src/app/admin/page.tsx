'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Plus,
  Music,
  ExternalLink,
  Copy,
  Check,
  User
} from 'lucide-react'
import { formatDate, isEventLocked, generateToken } from '@/lib/utils'
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
  djId?: string
  djName?: string
}

interface DJ {
  id: string
  name: string
  email: string
}

// Demo data
const DEMO_DJS: DJ[] = [
  { id: 'dj1', name: 'Alex Marinescu', email: 'alex@superdj.ro' },
  { id: 'dj2', name: 'Mihai Popa', email: 'mihai@superdj.ro' },
  { id: 'dj3', name: 'Andrei Ionescu', email: 'andrei@superdj.ro' },
]

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
    djId: 'dj1',
    djName: 'Alex Marinescu',
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
    djId: 'dj2',
    djName: 'Mihai Popa',
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

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [djs, setDjs] = useState<DJ[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [showNewEventModal, setShowNewEventModal] = useState(false)

  useEffect(() => {
    // Load demo data
    setTimeout(() => {
      setEvents(DEMO_EVENTS)
      setDjs(DEMO_DJS)
      setIsLoading(false)
    }, 500)
  }, [])

  const filteredEvents = events.filter(event =>
    event.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
  )

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/form/${token}`
    navigator.clipboard.writeText(url)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const assignDJ = (eventId: string, djId: string) => {
    const dj = djs.find(d => d.id === djId)
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, djId, djName: dj?.name }
        : event
    ))
  }

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
            Evenimente
          </h1>
          <p className="text-text-secondary mt-1">
            Gestionează toate evenimentele și atribuie DJs
          </p>
        </div>

        <div className="flex gap-3">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Caută..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
          </div>

          <Link href="/admin/events/new">
            <Button variant="primary">
              <Plus className="w-5 h-5" />
              Eveniment Nou
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Evenimente', value: events.length, icon: Calendar },
          { label: 'Fără DJ', value: events.filter(e => !e.djId).length, icon: User },
          { label: 'Luna Aceasta', value: events.filter(e => {
            const d = new Date(e.eventDate)
            const now = new Date()
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
          }).length, icon: Clock },
          { label: 'DJs Activi', value: djs.length, icon: Users },
        ].map((stat, index) => (
          <div key={index} className="p-4 bg-surface border border-surface-border rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Events Table */}
      <div className="bg-surface border border-surface-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">
                  Eveniment
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">
                  Data
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">
                  DJ Atribuit
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">
                  Link Client
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-text-secondary">
                  Acțiuni
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedEvents.map((event) => {
                const isPast = new Date(event.eventDate) < new Date()

                return (
                  <tr
                    key={event.id}
                    className="border-b border-surface-border last:border-0 hover:bg-surface-hover transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center',
                          isPast ? 'bg-text-muted/10' : 'bg-accent/10'
                        )}>
                          <Music className={cn(
                            'w-5 h-5',
                            isPast ? 'text-text-muted' : 'text-accent'
                          )} />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{event.clientName}</p>
                          <p className="text-sm text-text-muted">
                            {EVENT_TYPE_LABELS[event.eventType]} • {event.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-primary">{formatDate(event.eventDate)}</p>
                      {event.startTime && (
                        <p className="text-sm text-text-muted">{event.startTime}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={event.djId || ''}
                        onChange={(e) => assignDJ(event.id, e.target.value)}
                        className="bg-background border border-surface-border rounded-lg px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
                      >
                        <option value="">Selectează DJ</option>
                        {djs.map(dj => (
                          <option key={dj.id} value={dj.id}>{dj.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => copyLink(event.token)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        {copiedToken === event.token ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Copiat!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copiază Link</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/form/${event.token}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                      >
                        Vezi
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
