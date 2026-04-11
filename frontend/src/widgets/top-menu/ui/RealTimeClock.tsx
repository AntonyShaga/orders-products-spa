'use client'

import { useEffect, useState } from 'react'
import { Locale } from '@/shared/i18n/config'

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

  const date = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(time)
    .replace('.', '')

  const clock = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(time)

  return (
    <div className="clock">
      <div className="clock__date">
        <span className="clock__label">{labelToday}</span>
        <span>{date}</span>
      </div>

      <div className="clock__time">
        <span className="clock__icon">🕒</span>
        <span>{clock}</span>
      </div>
    </div>
  )
}
