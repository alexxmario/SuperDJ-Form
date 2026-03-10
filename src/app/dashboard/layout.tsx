'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Calendar, LogOut, User, Home } from 'lucide-react'

interface DJSession {
  email: string
  name: string
  isAdmin: boolean
  id: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [session, setSession] = useState<DJSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dj_session')
      if (stored) {
        const parsed = JSON.parse(stored)
        setSession(parsed)
        // If admin, redirect to admin panel
        if (parsed.isAdmin) {
          router.push('/admin')
          return
        }
      } else {
        router.push('/')
        return
      }
    } catch (e) {
      console.error('Session error:', e)
      router.push('/')
      return
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('dj_session')
    router.push('/auth/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-surface-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-4">
              <Image
                src="https://www.superdj.ro/static/img/logo.png?v=2"
                alt="Super DJ"
                width={120}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
              <div className="h-6 w-px bg-surface-border hidden sm:block" />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-text-primary">Dashboard DJ</p>
                <p className="text-xs text-text-muted">Evenimentele tale</p>
              </div>
            </Link>

            {/* Nav */}
            <nav className="hidden sm:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Evenimentele Mele
              </Link>
            </nav>

            {/* User */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-surface/50 rounded-xl border border-surface-border/50">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-accent" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-text-primary">{session.name}</p>
                  <p className="text-xs text-text-muted">{session.email}</p>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Deconectare</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
