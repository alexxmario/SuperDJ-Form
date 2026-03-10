import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateToken(length: number = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatTime(time: string): string {
  return time.slice(0, 5)
}

export function isEventLocked(eventDate: Date | string): boolean {
  const event = new Date(eventDate)
  const now = new Date()
  const lockDate = new Date(event)
  lockDate.setDate(lockDate.getDate() - 7)
  return now >= lockDate
}

export function getDaysUntilLock(eventDate: Date | string): number {
  const event = new Date(eventDate)
  const now = new Date()
  const lockDate = new Date(event)
  lockDate.setDate(lockDate.getDate() - 7)
  const diffTime = lockDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

export const EVENT_TYPES = [
  { value: 'nunta', label: 'Nuntă' },
  { value: 'cununie', label: 'Cununie' },
  { value: 'botez', label: 'Botez' },
  { value: 'mot-turta', label: 'Mot / Turtă' },
  { value: 'majorat', label: 'Majorat' },
  { value: 'aniversare', label: 'Aniversare' },
  { value: 'corporate', label: 'Eveniment Corporate' },
  { value: 'petrecere', label: 'Petrecere Privată' },
  { value: 'altul', label: 'Altul' },
] as const

// Predefined musical moments for the form
export const PREDEFINED_MOMENTS = [
  { id: 'deschidere', label: 'Piesa Deschidere' },
  { id: 'aruncatul-buchetului', label: 'Aruncatul Buchetului' },
  { id: 'voal', label: 'Voal' },
  { id: 'jartea', label: 'Jartea' },
  { id: 'tort', label: 'Tort' },
  { id: 'primire-invitati', label: 'Muzica Primire Invitați' },
  { id: 'perioada-mesei', label: 'Muzica Perioada Mesei' },
  { id: 'muzica-ambientala', label: 'Muzica Ambientală' },
] as const

export const MUSIC_GENRES = [
  { id: 'manele', label: 'Manele', icon: '🎺' },
  { id: 'lautareasca', label: 'Lăutărească', icon: '🎻' },
  { id: 'pop', label: 'Pop', icon: '🎤' },
  { id: 'pop-rock', label: 'Pop Rock', icon: '🎸' },
  { id: 'rock', label: 'Rock', icon: '🤘' },
  { id: 'rock-n-roll', label: 'Rock & Roll', icon: '🎸' },
  { id: 'dance', label: 'Dance', icon: '🎧' },
  { id: 'disco', label: 'Disco', icon: '🕺' },
  { id: 'hip-hop', label: 'Hip-Hop', icon: '🎤' },
  { id: 'rap', label: 'Rap', icon: '🎙️' },
  { id: 'trap', label: 'Trap', icon: '🔊' },
  { id: 'rnb', label: 'R&B', icon: '🎵' },
  { id: 'latino', label: 'Latino', icon: '💃' },
  { id: 'reggaeton', label: 'Reggaeton', icon: '🌴' },
  { id: 'jazz', label: 'Jazz', icon: '🎷' },
  { id: 'blues', label: 'Blues', icon: '🎺' },
  { id: 'country', label: 'Country', icon: '🤠' },
  { id: 'vals', label: 'Vals', icon: '💫' },
  { id: 'etno', label: 'Etno', icon: '🌍' },
  { id: 'greceasca', label: 'Grecească', icon: '🇬🇷' },
  { id: 'folk', label: 'Folk', icon: '🎸' },
  { id: 'slagare', label: 'Șlagăre', icon: '📻' },
  { id: 'electronica', label: 'Muzică Electronică', icon: '🎹' },
] as const

// Regional folk music options
export const FOLK_REGIONS = [
  { id: 'olteneasca', label: 'Oltenească' },
  { id: 'munteneasca', label: 'Muntenească' },
  { id: 'moldoveneasca', label: 'Moldovenească' },
  { id: 'dobrogeana', label: 'Dobrogeană' },
  { id: 'ardeleneasca', label: 'Ardeleană' },
  { id: 'banateana', label: 'Bănățeană' },
] as const

// Event timeline items
export const TIMELINE_ITEMS = [
  { id: 'primire-invitati', label: 'Primire Invitați' },
  { id: 'aperitiv', label: 'Aperitiv' },
  { id: 'peste', label: 'Pește' },
  { id: 'sarmale', label: 'Sarmale' },
  { id: 'friptura', label: 'Friptură' },
  { id: 'tort', label: 'Tort' },
  { id: 'animatori', label: 'Animatori' },
  { id: 'ursitoare', label: 'Ursitoare' },
  { id: 'artisti', label: 'Artiști' },
] as const
