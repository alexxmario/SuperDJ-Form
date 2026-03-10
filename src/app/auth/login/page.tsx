'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Redirect to homepage (which is now the login page)
export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/')
  }, [router])

  return null
}
