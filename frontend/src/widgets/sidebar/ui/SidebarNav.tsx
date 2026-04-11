'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarItems } from '@/config/sidebar'

import './SidebarNav.css'

export function SidebarNav({ locale, dict }: { locale: string; dict: Record<string, string> }) {
  const pathname = usePathname()

  return (
    <nav className="sidebar-nav">
      <ul className="sidebar-nav__list">
        {sidebarItems.map((item) => {
          const href = `/${locale}${item.href}`
          const isActive = pathname === href || pathname.startsWith(href + '/')

          return (
            <li key={item.key} className="sidebar-nav__item">
              <Link
                href={href}
                className={`sidebar-nav__link ${isActive ? 'sidebar-nav__link--active' : ''}`}
              >
                {dict[item.key]}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
