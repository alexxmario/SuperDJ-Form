'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Calendar, Users, LogOut, User, Plus, Settings, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DJSession {
  email: string
  name: string
  isAdmin: boolean
  id: string
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [session, setSession] = useState<DJSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dj_session')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (!parsed.isAdmin) {
          router.push('/dashboard')
          return
        }
        setSession(parsed)
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

  const navItems = [
    { href: '/admin', label: 'Evenimente', icon: Calendar },
    { href: '/admin/djs', label: 'DJs', icon: Users },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-4">
              <Image
                src="https://www.superdj.ro/static/img/logo.png?v=2"
                alt="Super DJ"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-6 w-px bg-gray-200" />
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ee1e45]/10 border border-[#ee1e45]/20">
                  <Shield className="w-3.5 h-3.5 text-[#ee1e45]" />
                  <span className="text-xs font-semibold text-[#ee1e45]">Admin</span>
                </div>
              </div>
            </Link>

            {/* Nav */}
            <nav className="hidden sm:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    pathname === item.href
                      ? 'bg-[#ee1e45]/10 text-[#ee1e45] border border-[#ee1e45]/20'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ee1e45] to-[#8fb23e] flex items-center justify-center">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{session.name}</p>
                  <p className="text-xs text-[#ee1e45] font-medium">Administrator</p>
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
