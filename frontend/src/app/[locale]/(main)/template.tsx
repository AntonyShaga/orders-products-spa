'use client'

import React, { useEffect, useState } from 'react'
import { Loader } from '@/shared/ui/loader/Loader'
import '@/shared/ui/loader/Loader.css'

export default function Template({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300)
    return () => clearTimeout(t)
  }, [])

  if (!show) {
    return <Loader />
  }

  return <div className="loader--fade-content">{children}</div>
}
