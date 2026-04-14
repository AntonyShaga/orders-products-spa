import { getDictionary } from '@/shared/i18n/getDictionary'
import type { Locale } from '@/shared/i18n/config'
import { TopMenu } from '@/widgets/top-menu/ui/TopMenu'
import React from 'react'
import { cookies } from 'next/headers'

export default async function AuthLayout({
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
    <div className="app__layout--auth">
      <header className="app__header--auth">
        <div className="app__header-content--auth">
          <TopMenu locale={locale as Locale} dict={dict.header} isAuth={isAuth} />
        </div>
      </header>

      <main className="app__content--auth">
        <div className="auth__center">{children}</div>
      </main>
    </div>
  )
}
