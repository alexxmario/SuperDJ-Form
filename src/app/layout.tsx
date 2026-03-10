import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Super DJ - Formular Eveniment',
  description: 'Configurează preferințele muzicale pentru evenimentul tău',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className="min-h-screen gradient-bg">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
