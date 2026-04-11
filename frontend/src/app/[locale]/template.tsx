'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hide = setTimeout(() => setVisible(false), 0)
    const show = setTimeout(() => setVisible(true), 300)

    return () => {
      clearTimeout(hide)
      clearTimeout(show)
    }
  }, [pathname])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    >
      {children}
    </div>
  )
}
