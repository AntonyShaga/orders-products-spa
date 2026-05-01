'use client'

import { useEffect, useState } from 'react'
import { Locale } from '@/shared/i18n/config'
import { formatDateLong, formatTime } from '@/shared/lib/date/formatDate'

import './RealTimeClock.css'

interface Props {
  locale: Locale
  labelToday: string
}

export const RealTimeClock = ({ locale, labelToday }: Props) => {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    const tick = () => setTime(new Date())
    const timer = setInterval(tick, 1000)
    tick()
    return () => clearInterval(timer)
  }, [])

  if (!time) return null

  return (
    <div className="clock">
      <div className="clock__date">
        <span className="clock__label">{labelToday}</span>
        <span>{formatDateLong(time.toISOString(), locale)}</span>
      </div>

      <div className="clock__time">
        <span className="clock__icon">🕒</span>
        <span>{formatTime(time, locale)}</span>
      </div>
    </div>
  )
}
