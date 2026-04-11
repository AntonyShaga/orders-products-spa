'use client'

import { toggleTheme } from '@/shared/lib/theme/theme'
import './ThemeToggle.css'

export const ThemeToggle = () => {
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <span className="theme-toggle__thumb">
        <span className="theme-toggle__icon theme-toggle__icon--sun">☀️</span>
        <span className="theme-toggle__icon theme-toggle__icon--moon">🌙</span>
      </span>
    </button>
  )
}
