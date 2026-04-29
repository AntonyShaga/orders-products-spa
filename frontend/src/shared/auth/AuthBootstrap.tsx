'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { apiClient } from '@/shared/api/client/apiClient'

export function AuthBootstrap() {
  const pathname = usePathname()

  useEffect(() => {
    void apiClient('/auth/me')
  }, [pathname])

  return null
}
