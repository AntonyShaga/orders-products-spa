import { getDictionary } from '@/shared/i18n/getDictionary'
import { Locale } from '@/shared/i18n/config'
import { SidebarNav } from './SidebarNav'

import './Sidebar.css'

export async function Sidebar({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale)

  if (!dict?.sidebar) return null

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__avatar-wrapper">
          <div className="sidebar__avatar">
            <img src="/avatar-placeholder.jpg" alt="User" />
          </div>

          <button className="sidebar__settings-btn">⚙️</button>
        </div>
      </div>

      <SidebarNav locale={locale} dict={dict.sidebar} />
    </aside>
  )
}
