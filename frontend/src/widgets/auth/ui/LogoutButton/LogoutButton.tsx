'use client'

import { useRouter, useParams } from 'next/navigation'
import './LogoutButton.css'
import { logout } from '@/shared/api/client'

export const LogoutButton = () => {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()

  const handleLogout = async () => {
    await logout()
    router.push(`/${locale}/login`)
  }

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  )
}
