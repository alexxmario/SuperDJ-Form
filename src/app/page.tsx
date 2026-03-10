'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LogIn } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if already logged in
  useEffect(() => {
    const stored = localStorage.getItem('dj_session')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.isAdmin) {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    setTimeout(() => {
      if (email && password) {
        const isAdmin = email.toLowerCase() === 'admin@superdj.ro'
        localStorage.setItem('dj_session', JSON.stringify({
          email,
          name: isAdmin ? 'Administrator' : email.split('@')[0],
          isAdmin,
          id: 'demo-' + Date.now(),
        }))

        if (isAdmin) {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
      } else {
        setError('Completează toate câmpurile')
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.06),transparent_50%)]" />

      <div className="relative w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Image
            src="https://www.superdj.ro/static/img/logo.png?v=2"
            alt="Super DJ"
            width={180}
            height={60}
            className="h-12 w-auto mx-auto brightness-0 invert"
            priority
          />
        </div>

        {/* Login Form */}
        <div className="bg-surface/50 backdrop-blur-xl border border-surface-border rounded-2xl p-6 space-y-6">
          <div className="text-center">
            <h1 className="font-display text-xl font-semibold text-text-primary">
              Conectare
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Accesează dashboard-ul tău
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="email@superdj.ro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Parolă"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-sm text-red-400 text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              <LogIn className="w-5 h-5" />
              Conectare
            </Button>
          </form>
        </div>

        {/* Demo info */}
        <div className="text-center space-y-2">
          <p className="text-xs text-text-muted">Demo: orice parolă funcționează</p>
          <div className="flex justify-center gap-4 text-xs">
            <span className="text-text-muted">
              Admin: <span className="text-text-secondary">admin@superdj.ro</span>
            </span>
            <span className="text-text-muted">
              DJ: <span className="text-text-secondary">dj@superdj.ro</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
