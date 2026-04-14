import { Sidebar } from '@/widgets/sidebar/ui/Sidebar'
import { getDictionary } from '@/shared/i18n/getDictionary'
import type { Locale } from '@/shared/i18n/config'
import { TopMenu } from '@/widgets/top-menu/ui/TopMenu'
import { ModalProvider } from '@/providers/modal-provider/ui/ModalProvider'
import React from 'react'
import { cookies } from 'next/dist/server/request/cookies'

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const cookieStore = await cookies()
  const isAuth = Boolean(cookieStore.get('accessToken'))

  return (
    <div className="app__layout">
      <header className="app__header">
        <div className="app__header-content">
          <TopMenu locale={locale as Locale} dict={dict.header} isAuth={isAuth} />
        </div>
      </header>

      <aside className="app__sidebar">
        <Sidebar locale={locale as Locale} />
      </aside>

      <main className="app__content">
        <div className="app__content-inner">
          {children} <ModalProvider dict={dict.modal} />
        </div>
      </main>
    </div>
  )
}
