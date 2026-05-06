import { getDictionary } from '@/shared/i18n/getDictionary'
import { Locale } from '@/shared/i18n/config'

import { SidebarNav } from './SidebarNav'

import './Sidebar.css'
import { getUserAvatarServer } from '@/shared/api/graphql/queries/getUserAvatar.server'
import { AvatarImage } from '@/widgets/profile/AvatarImage'

export async function Sidebar({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale)
  const initialAvatarUrl = await getUserAvatarServer()

  if (!dict?.sidebar) {
    return null
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__avatar-wrapper" title="Avatar upload">
          <div className="sidebar__avatar">
            <AvatarImage initialAvatarUrl={initialAvatarUrl} />
          </div>
        </div>
      </div>

      <SidebarNav locale={locale} dict={dict.sidebar} />
    </aside>
  )
}
