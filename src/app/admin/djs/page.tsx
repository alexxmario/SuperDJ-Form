'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Users,
  Plus,
  Mail,
  Calendar,
  Trash2,
  X,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DJ {
  id: string
  name: string
  email: string
  eventCount: number
  createdAt: string
}

// Demo data
const DEMO_DJS: DJ[] = [
  { id: 'dj1', name: 'Alex Marinescu', email: 'alex@superdj.ro', eventCount: 12, createdAt: '2024-01-15' },
  { id: 'dj2', name: 'Mihai Popa', email: 'mihai@superdj.ro', eventCount: 8, createdAt: '2024-02-01' },
  { id: 'dj3', name: 'Andrei Ionescu', email: 'andrei@superdj.ro', eventCount: 5, createdAt: '2024-02-20' },
]

export default function AdminDJsPage() {
  const [djs, setDjs] = useState<DJ[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newDJName, setNewDJName] = useState('')
  const [newDJEmail, setNewDJEmail] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setDjs(DEMO_DJS)
      setIsLoading(false)
    }, 500)
  }, [])

  const handleAddDJ = () => {
    if (!newDJName || !newDJEmail) {
      alert('Completează toate câmpurile')
      return
    }

    const newDJ: DJ = {
      id: 'dj' + Date.now(),
      name: newDJName,
      email: newDJEmail,
      eventCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setDjs([...djs, newDJ])
    setShowAddModal(false)
    setNewDJName('')
    setNewDJEmail('')
  }

  const handleDeleteDJ = (id: string) => {
    if (confirm('Ești sigur că vrei să ștergi acest DJ?')) {
      setDjs(djs.filter(dj => dj.id !== id))
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-surface animate-pulse rounded" />
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-surface animate-pulse rounded-2xl" />
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
            DJ-i
          </h1>
          <p className="text-text-secondary mt-1">
            Gestionează conturile DJ-ilor
          </p>
        </div>

        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <Plus className="w-5 h-5" />
          Adaugă DJ
        </Button>
      </div>

      {/* DJ List */}
      <div className="grid gap-4">
        {djs.map((dj, index) => (
          <div
            key={dj.id}
            className="group p-6 bg-surface border border-surface-border rounded-2xl hover:border-accent/30 transition-all animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {dj.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                      <Mail className="w-4 h-4 text-text-muted" />
                      {dj.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                      <Calendar className="w-4 h-4 text-text-muted" />
                      {dj.eventCount} evenimente
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteDJ(dj.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add DJ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-background border border-surface-border rounded-2xl p-6 w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-text-primary">
                Adaugă DJ Nou
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-text-muted hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Nume"
                placeholder="Nume complet"
                value={newDJName}
                onChange={(e) => setNewDJName(e.target.value)}
                icon={<User className="w-5 h-5" />}
              />
              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
                value={newDJEmail}
                onChange={(e) => setNewDJEmail(e.target.value)}
                icon={<Mail className="w-5 h-5" />}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowAddModal(false)}
              >
                Anulează
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleAddDJ}
              >
                Adaugă DJ
              </Button>
            </div>

            <p className="text-xs text-text-muted text-center mt-4">
              DJ-ul va primi un email cu instrucțiuni de conectare
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
