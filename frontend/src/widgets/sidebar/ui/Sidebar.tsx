import { getDictionary } from '@/shared/i18n/getDictionary'
import { Locale } from '@/shared/i18n/config'

import { SidebarNav } from './SidebarNav'

import './Sidebar.css'
import { AvatarUploadButton } from '@/widgets/profile/AvatarUploadButton'
import { getUserAvatarServer } from '@/shared/api/graphql/queries/getUserAvatar.server'
import AvatarPlaceholderIcon from '@/shared/assets/icons/avatar-placeholder.svg'
import Image from 'next/image'

export async function Sidebar({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale)
  const avatarUrl = await getUserAvatarServer()

  if (!dict?.sidebar) {
    return null
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__avatar-wrapper" title="Avatar upload">
          <div className="sidebar__avatar">
            <Image
              unoptimized
              src={avatarUrl || AvatarPlaceholderIcon}
              alt="User"
              width={120}
              height={120}
            />
          </div>

          <AvatarUploadButton />
        </div>
      </div>

      <SidebarNav locale={locale} dict={dict.sidebar} />
    </aside>
  )
}
