'use client'

import { useEffect, useState } from 'react'
import { socketState, connectSocket } from '@/shared/lib/socket/socketStore'

import './Sessions.css'

export const Sessions = ({ label }: { label: string }) => {
  const [state, setState] = useState(socketState.get())

  useEffect(() => {
    connectSocket()

    const unsubscribe = socketState.subscribe(() => {
      setState(socketState.get())
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="sessions">
      <span className="sessions__icon">👥</span>

      <div className="sessions__info">
        <span className="sessions__label">{label}:</span>

        <span className="sessions__count">
          {!state.connected ? '—' : (state.activeSessions ?? '...')}
        </span>
      </div>
    </div>
  )
}
