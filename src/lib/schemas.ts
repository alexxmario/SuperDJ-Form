import { z } from 'zod'

// Step 1: Event Details
export const eventDetailsSchema = z.object({
  clientName: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email: z.string().email('Adresa de email nu este validă'),
  phone: z.string().optional(),
  eventType: z.string().min(1, 'Selectează tipul evenimentului'),
  eventDate: z.string().min(1, 'Selectează data evenimentului'),
  location: z.string().min(2, 'Locația trebuie să aibă cel puțin 2 caractere'),
  churchTime: z.string().optional(),
  venueTime: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  guestCount: z.number().min(1, 'Numărul de invitați trebuie să fie cel puțin 1').optional(),
  // Equipment
  soundEquipment: z.string().optional(),
  lightEquipment: z.string().optional(),
  specialEffects: z.string().optional(),
})

export type EventDetails = z.infer<typeof eventDetailsSchema>

// Step 2: Musical Moments
export const musicalMomentSchema = z.object({
  id: z.string(),
  momentName: z.string(),
  songTitle: z.string().optional(),
  artist: z.string().optional(),
  link: z.string().optional(), // YouTube/Spotify link
})

export const musicalMomentsSchema = z.object({
  moments: z.array(musicalMomentSchema),
})

export type MusicalMoment = z.infer<typeof musicalMomentSchema>
export type MusicalMoments = z.infer<typeof musicalMomentsSchema>

// Step 3: Important Songs
export const songSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string().optional(),
  link: z.string().optional(), // YouTube/Spotify link
})

export const importantSongsSchema = z.object({
  mustHave: z.array(songSchema),
  orientative: z.array(songSchema), // Reference songs
  doNotPlay: z.array(songSchema),
  maneleLive: z.boolean().optional(), // Manele/Live option
})

export type Song = z.infer<typeof songSchema>
export type ImportantSongs = z.infer<typeof importantSongsSchema>

// Step 4: Genre Preferences
export const genrePreferencesSchema = z.object({
  genres: z.array(z.string()),
  folkRegions: z.array(z.string()), // Regional folk music preferences
  genreExamples: z.string().optional(), // Links/examples for genres
})

export type GenrePreferences = z.infer<typeof genrePreferencesSchema>

// Step 5: Event Timeline & Final Details
export const timelineItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  time: z.string().optional(),
  details: z.string().optional(),
})

export const finalDetailsSchema = z.object({
  clientNotes: z.string().optional(), // Precizari finale client
  timeline: z.array(timelineItemSchema).optional(), // Detalii desfasurare eveniment
  additionalInfo: z.string().optional(), // Other details
})

export type TimelineItem = z.infer<typeof timelineItemSchema>
export type FinalDetails = z.infer<typeof finalDetailsSchema>

// Complete Form Data
export const formDataSchema = z.object({
  eventDetails: eventDetailsSchema,
  musicalMoments: musicalMomentsSchema,
  importantSongs: importantSongsSchema,
  genrePreferences: genrePreferencesSchema,
  finalDetails: finalDetailsSchema,
})

export type FormData = z.infer<typeof formDataSchema>

// Default values
export const defaultFormData: FormData = {
  eventDetails: {
    clientName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    location: '',
    churchTime: '',
    venueTime: '',
    startTime: '',
    endTime: '',
    guestCount: undefined,
    soundEquipment: '',
    lightEquipment: '',
    specialEffects: '',
  },
  musicalMoments: {
    moments: [
      { id: 'deschidere', momentName: 'Piesa Deschidere', songTitle: '', artist: '', link: '' },
      { id: 'aruncatul-buchetului', momentName: 'Aruncatul Buchetului', songTitle: '', artist: '', link: '' },
      { id: 'voal', momentName: 'Voal', songTitle: '', artist: '', link: '' },
      { id: 'jartea', momentName: 'Jartea', songTitle: '', artist: '', link: '' },
      { id: 'tort', momentName: 'Tort', songTitle: '', artist: '', link: '' },
      { id: 'primire-invitati', momentName: 'Muzica Primire Invitați', songTitle: '', artist: '', link: '' },
      { id: 'perioada-mesei', momentName: 'Muzica Perioada Mesei', songTitle: '', artist: '', link: '' },
      { id: 'muzica-ambientala', momentName: 'Muzica Ambientală', songTitle: '', artist: '', link: '' },
    ],
  },
  importantSongs: {
    mustHave: [{ id: '1', title: '', artist: '', link: '' }],
    orientative: [{ id: '1', title: '', artist: '', link: '' }],
    doNotPlay: [{ id: '1', title: '', artist: '', link: '' }],
    maneleLive: undefined,
  },
  genrePreferences: {
    genres: [],
    folkRegions: [],
    genreExamples: '',
  },
  finalDetails: {
    clientNotes: '',
    timeline: [
      { id: 'primire-invitati', name: 'Primire Invitați', time: '', details: '' },
      { id: 'aperitiv', name: 'Aperitiv', time: '', details: '' },
      { id: 'peste', name: 'Pește', time: '', details: '' },
      { id: 'sarmale', name: 'Sarmale', time: '', details: '' },
      { id: 'friptura', name: 'Friptură', time: '', details: '' },
      { id: 'tort', name: 'Tort', time: '', details: '' },
      { id: 'animatori', name: 'Animatori', time: '', details: '' },
      { id: 'ursitoare', name: 'Ursitoare', time: '', details: '' },
      { id: 'artisti', name: 'Artiști', time: '', details: '' },
    ],
    additionalInfo: '',
  },
}
