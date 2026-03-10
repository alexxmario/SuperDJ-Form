'use client'

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import { FormData } from '@/lib/schemas'
import { MUSIC_GENRES, EVENT_TYPES } from '@/lib/utils'

// Register fonts with error handling
try {
  Font.register({
    family: 'Outfit',
    fonts: [
      { src: 'https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1O4a0EwItq6fNIg.ttf', fontWeight: 400 },
      { src: 'https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4e0EwItq6fNIg.ttf', fontWeight: 600 },
      { src: 'https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1NYe0EwItq6fNIg.ttf', fontWeight: 700 },
    ],
  })
} catch (e) {
  console.warn('Font registration failed:', e)
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Outfit',
    fontSize: 10,
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '2px solid #dc2626',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: '#dc2626',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 700,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 10,
    color: '#666666',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#dc2626',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1px solid #e5e5e5',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '48%',
    marginBottom: 8,
  },
  label: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 11,
    color: '#1a1a1a',
  },
  momentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  momentNumber: {
    width: 20,
    height: 20,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  momentNumberText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 600,
  },
  momentContent: {
    flex: 1,
  },
  momentName: {
    fontSize: 11,
    fontWeight: 600,
    color: '#1a1a1a',
  },
  momentSong: {
    fontSize: 9,
    color: '#666666',
    marginTop: 2,
  },
  songItem: {
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    marginBottom: 6,
  },
  songTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: '#1a1a1a',
  },
  songArtist: {
    fontSize: 9,
    color: '#666666',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  genreTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  genreText: {
    fontSize: 9,
    color: '#dc2626',
  },
  observations: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#dc2626',
  },
  observationsText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  columnTitle: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 8,
  },
  mustHaveTitle: {
    color: '#16a34a',
  },
  doNotPlayTitle: {
    color: '#dc2626',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTop: '1px solid #e5e5e5',
  },
  footerText: {
    fontSize: 8,
    color: '#999999',
  },
})

interface EventPDFProps {
  formData: FormData
  eventId?: string
}

export function EventPDF({ formData, eventId }: EventPDFProps) {
  const eventType = EVENT_TYPES.find(t => t.value === formData.eventDetails.eventType)?.label || formData.eventDetails.eventType

  const formatDate = (date: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>DJ</Text>
            </View>
            <View>
              <Text style={styles.companyName}>Super DJ</Text>
              <Text style={styles.subtitle}>Formular Preferințe Muzicale</Text>
            </View>
          </View>
          <View>
            <Text style={styles.subtitle}>Generat: {new Date().toLocaleDateString('ro-RO')}</Text>
          </View>
        </View>

        {/* Client Name */}
        <Text style={styles.title}>{formData.eventDetails.clientName || 'Client'}</Text>

        {/* Event Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informații Eveniment</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Tip Eveniment</Text>
              <Text style={styles.value}>{eventType}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Data</Text>
              <Text style={styles.value}>{formatDate(formData.eventDetails.eventDate)}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Locație</Text>
              <Text style={styles.value}>{formData.eventDetails.location || '-'}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Ora</Text>
              <Text style={styles.value}>
                {formData.eventDetails.startTime || '-'} - {formData.eventDetails.endTime || '-'}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Număr Invitați</Text>
              <Text style={styles.value}>{formData.eventDetails.guestCount || '-'}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Contact</Text>
              <Text style={styles.value}>{formData.eventDetails.phone || formData.eventDetails.email || '-'}</Text>
            </View>
          </View>
        </View>

        {/* Musical Moments Section */}
        {formData.musicalMoments.moments.some(m => m.momentName) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Momente Muzicale</Text>
            {formData.musicalMoments.moments
              .filter(m => m.momentName)
              .map((moment, index) => (
                <View key={moment.id} style={styles.momentItem}>
                  <View style={styles.momentNumber}>
                    <Text style={styles.momentNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.momentContent}>
                    <Text style={styles.momentName}>{moment.momentName}</Text>
                    {(moment.songTitle || moment.artist) && (
                      <Text style={styles.momentSong}>
                        {moment.songTitle}{moment.artist ? ` - ${moment.artist}` : ''}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
          </View>
        )}

        {/* Important Songs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Piese Importante</Text>
          <View style={styles.twoColumns}>
            {/* Must Have */}
            <View style={styles.column}>
              <Text style={[styles.columnTitle, styles.mustHaveTitle]}>✓ Must Have</Text>
              {formData.importantSongs.mustHave
                .filter(s => s.title)
                .map((song) => (
                  <View key={song.id} style={styles.songItem}>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    {song.artist && <Text style={styles.songArtist}>{song.artist}</Text>}
                  </View>
                ))}
            </View>

            {/* Do Not Play */}
            <View style={styles.column}>
              <Text style={[styles.columnTitle, styles.doNotPlayTitle]}>✗ Do Not Play</Text>
              {formData.importantSongs.doNotPlay
                .filter(s => s.title)
                .map((song) => (
                  <View key={song.id} style={styles.songItem}>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    {song.artist && <Text style={styles.songArtist}>{song.artist}</Text>}
                  </View>
                ))}
            </View>
          </View>
        </View>

        {/* Genre Preferences Section */}
        {formData.genrePreferences.genres.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Genuri Preferate</Text>
            <View style={styles.genreContainer}>
              {formData.genrePreferences.genres.map((genreId) => {
                const genre = MUSIC_GENRES.find(g => g.id === genreId)
                if (!genre) return null
                return (
                  <View key={genreId} style={styles.genreTag}>
                    <Text style={styles.genreText}>{genre.icon} {genre.label}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        )}

        {/* Client Notes Section */}
        {formData.finalDetails.clientNotes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Precizări Client</Text>
            <View style={styles.observations}>
              <Text style={styles.observationsText}>{formData.finalDetails.clientNotes}</Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Super DJ - Formular Preferințe Muzicale</Text>
          <Text style={styles.footerText}>www.superdj.ro</Text>
        </View>
      </Page>
    </Document>
  )
}
