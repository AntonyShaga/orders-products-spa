'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './LanguageSwitcher.css'
import { Locale, locales } from '@/shared/i18n/config'

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLocale = pathname.split('/')[1] as Locale
  const cleanPath = pathname.replace(/^\/(en|ru|ua)/, '')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="lang-switcher" ref={dropdownRef}>
      <button className="lang-switcher__trigger" onClick={() => setIsOpen(!isOpen)} type="button">
        <span className="lang-switcher__label">{currentLocale.toUpperCase()}</span>

        <span className={`lang-switcher__arrow ${isOpen ? 'lang-switcher__arrow--open' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <ul className="lang-switcher__menu">
          {locales.map((locale) => (
            <li key={locale} className="lang-switcher__item">
              <Link
                href={`/${locale}${cleanPath}`}
                className={`lang-switcher__link ${
                  currentLocale === locale ? 'lang-switcher__link--active' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {locale.toUpperCase()}

                {currentLocale === locale && <span className="lang-switcher__check">✓</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
