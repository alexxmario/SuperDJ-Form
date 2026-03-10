'use client'

import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { EventDetails } from '@/lib/schemas'
import { EVENT_TYPES } from '@/lib/utils'
import { User, Calendar, Speaker } from 'lucide-react'

interface Step1Props {
  data: EventDetails
  onChange: (data: EventDetails) => void
  disabled?: boolean
}

export function Step1EventDetails({ data, onChange, disabled }: Step1Props) {
  const handleChange = (field: keyof EventDetails, value: string | number | undefined) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary">
          Date Eveniment
        </h2>
        <p className="text-text-secondary">
          Completează informațiile despre evenimentul tău
        </p>
      </div>

      {/* Client Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary flex items-center gap-2">
          <User className="w-5 h-5 text-accent" />
          Informații Client
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Numele Tău"
            placeholder="Ion Popescu"
            value={data.clientName}
            onChange={(e) => handleChange('clientName', e.target.value)}
            disabled={disabled}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="email@example.com"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={disabled}
            required
          />
          <Input
            label="Telefon"
            type="tel"
            placeholder="+40 700 000 000"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            disabled={disabled}
          />
          <Select
            label="Tip Eveniment"
            options={[...EVENT_TYPES]}
            placeholder="Selectează"
            value={data.eventType}
            onChange={(e) => handleChange('eventType', e.target.value)}
            disabled={disabled}
            required
          />
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Detalii Eveniment
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Data Evenimentului <span className="text-accent">*</span>
            </label>
            <input
              type="date"
              value={data.eventDate}
              onChange={(e) => handleChange('eventDate', e.target.value)}
              disabled={disabled}
              className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3.5 text-text-primary transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none hover:border-surface-hover"
            />
          </div>
          <Input
            label="Locația (Adresa)"
            placeholder="Restaurant XYZ, București"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            disabled={disabled}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Ora Biserică
            </label>
            <input
              type="time"
              value={data.churchTime || ''}
              onChange={(e) => handleChange('churchTime', e.target.value)}
              disabled={disabled}
              className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3.5 text-text-primary transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none hover:border-surface-hover"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Ora Locație
            </label>
            <input
              type="time"
              value={data.venueTime || ''}
              onChange={(e) => handleChange('venueTime', e.target.value)}
              disabled={disabled}
              className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3.5 text-text-primary transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none hover:border-surface-hover"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Ora Începere
            </label>
            <input
              type="time"
              value={data.startTime || ''}
              onChange={(e) => handleChange('startTime', e.target.value)}
              disabled={disabled}
              className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3.5 text-text-primary transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none hover:border-surface-hover"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Ora Încheiere
            </label>
            <input
              type="time"
              value={data.endTime || ''}
              onChange={(e) => handleChange('endTime', e.target.value)}
              disabled={disabled}
              className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3.5 text-text-primary transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none hover:border-surface-hover"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-secondary">
            Număr Aproximativ de Invitați
          </label>
          <input
            type="number"
            min="1"
            placeholder="100"
            value={data.guestCount || ''}
            onChange={(e) => handleChange('guestCount', e.target.value ? parseInt(e.target.value) : undefined)}
            disabled={disabled}
            className="max-w-xs w-full bg-surface border border-surface-border rounded-xl px-4 py-3.5 text-text-primary transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none hover:border-surface-hover"
          />
        </div>
      </div>

      {/* Equipment Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary flex items-center gap-2">
          <Speaker className="w-5 h-5 text-accent" />
          Echipament
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Echipament Sunet"
            placeholder="ex: Boxe JBL, mixer..."
            value={data.soundEquipment || ''}
            onChange={(e) => handleChange('soundEquipment', e.target.value)}
            disabled={disabled}
          />
          <Input
            label="Echipament Lumini"
            placeholder="ex: Moving heads, LED..."
            value={data.lightEquipment || ''}
            onChange={(e) => handleChange('lightEquipment', e.target.value)}
            disabled={disabled}
          />
          <Input
            label="Efecte Speciale / Scenotehnică"
            placeholder="ex: Fum, confetti, artificii..."
            value={data.specialEffects || ''}
            onChange={(e) => handleChange('specialEffects', e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}
