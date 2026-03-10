'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User, Lock, ArrowRight } from 'lucide-react'
import { SmokeyBackground } from '@/components/ui/SmokeyBackground'

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <SmokeyBackground color="#4C1D95" color2="#7C3AED" backdropBlurAmount="md" />

      <div className="relative z-10 w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Image
            src="https://www.superdj.ro/static/img/logo.png?v=2"
            alt="Super DJ"
            width={180}
            height={60}
            className="h-12 w-auto mx-auto"
            priority
          />
        </div>

        {/* Login Form */}
        <div className="w-full p-8 space-y-6 bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Bine ai revenit</h2>
            <p className="mt-2 text-sm text-gray-600">Conectează-te pentru a continua</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Input with Animated Label */}
            <div className="relative z-0">
              <input
                type="email"
                id="floating_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-fuchsia-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <User className="inline-block mr-2 -mt-1" size={16} />
                Adresa de email
              </label>
            </div>

            {/* Password Input with Animated Label */}
            <div className="relative z-0">
              <input
                type="password"
                id="floating_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-fuchsia-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <Lock className="inline-block mr-2 -mt-1" size={16} />
                Parola
              </label>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group w-full flex items-center justify-center py-3 px-4 bg-fuchsia-500 hover:bg-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-fuchsia-500 transition-all duration-300"
            >
              {isLoading ? 'Se conectează...' : 'Conectare'}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>

        {/* Demo info */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">Demo: orice parolă funcționează</p>
          <div className="flex justify-center gap-4 text-xs">
            <span className="text-gray-500">
              Admin: <span className="text-gray-700">admin@superdj.ro</span>
            </span>
            <span className="text-gray-500">
              DJ: <span className="text-gray-700">dj@superdj.ro</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
