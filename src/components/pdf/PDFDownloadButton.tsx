'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Download, Loader2 } from 'lucide-react'
import { FormData } from '@/lib/schemas'

interface PDFDownloadButtonProps {
  formData: FormData
  fileName?: string
  className?: string
}

export function PDFDownloadButton({ formData, fileName, className }: PDFDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false)
  const [PDFComponents, setPDFComponents] = useState<{
    PDFDownloadLink: any
    EventPDF: any
  } | null>(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Dynamic import on client side only
    Promise.all([
      import('@react-pdf/renderer'),
      import('./EventPDF')
    ]).then(([pdfRenderer, eventPdf]) => {
      setPDFComponents({
        PDFDownloadLink: pdfRenderer.PDFDownloadLink,
        EventPDF: eventPdf.EventPDF
      })
    }).catch(err => {
      console.error('Failed to load PDF components:', err)
      setLoadError(true)
    })
  }, [])

  const defaultFileName = `${formData.eventDetails.clientName || 'eveniment'}-preferinte-muzicale.pdf`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-\.]/g, '')

  // Show error if loading failed
  if (loadError) {
    return (
      <Button variant="secondary" className={className} disabled>
        <Download className="w-4 h-4" />
        PDF indisponibil
      </Button>
    )
  }

  // Show loading button while PDF components are loading
  if (!isClient || !PDFComponents) {
    return (
      <Button variant="primary" className={className} disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
        Se încarcă...
      </Button>
    )
  }

  const { PDFDownloadLink, EventPDF } = PDFComponents

  return (
    <PDFDownloadLink
      document={<EventPDF formData={formData} />}
      fileName={fileName || defaultFileName}
    >
      {({ loading, error }: { loading: boolean; error: any }) => (
        <Button
          variant="primary"
          className={className}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Se generează...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Export PDF
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  )
}
