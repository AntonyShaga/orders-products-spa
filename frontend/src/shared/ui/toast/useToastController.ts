import { useEffect, useRef, useState } from 'react'
import { eventBus } from '@/shared/lib/eventBus'

type ToastType = 'success' | 'error' | 'info'

export type ToastItem = {
  id: string
  message: string
  type: ToastType
  visible: boolean
}

const LIFE = 2000
const FADE = 400

/**
 * Manages toast lifecycle:
 * - listens for toast events
 * - handles auto-hide and removal
 * - exposes pause, resume and manual close controls
 */
export const useToastController = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const activeId = toasts[0]?.id

  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const removeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /**
   * Starts hide and remove timers for a toast
   */
  const startTimers = (id: string, delay: number = LIFE) => {
    fadeTimer.current = setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)))
    }, delay)

    removeTimer.current = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, delay + FADE)
  }

  /**
   * Subscribes to toast events
   */
  useEffect(() => {
    const handler = (payload: { message: string; type: ToastType }) => {
      setToasts((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          message: payload.message,
          type: payload.type,
          visible: true,
        },
      ])
    }

    eventBus.on('TOAST_SHOW', handler)
    return () => eventBus.off('TOAST_SHOW', handler)
  }, [])

  /**
   * Controls lifecycle for the active (first) toast only
   */
  useEffect(() => {
    if (!activeId) return

    clearTimeout(fadeTimer.current!)
    clearTimeout(removeTimer.current!)

    startTimers(activeId)

    return () => {
      clearTimeout(fadeTimer.current!)
      clearTimeout(removeTimer.current!)
    }
  }, [activeId])

  const pause = () => {
    clearTimeout(fadeTimer.current!)
    clearTimeout(removeTimer.current!)
  }

  const resume = () => {
    if (!activeId) return
    startTimers(activeId)
  }

  const close = (id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)))

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, FADE)
  }

  return { toasts, pause, resume, close }
}
