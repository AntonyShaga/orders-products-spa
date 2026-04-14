import { Locale } from '@/shared/i18n/config'
import { HeaderDictionary } from '@/shared/i18n/types'
import { RealTimeClock } from './RealTimeClock'
import { LanguageSwitcher } from '@/widgets/language-switcher/ui/LanguageSwitcher'
import { Sessions } from '@/widgets/sessions/ui/Sessions'
import { ThemeToggle } from '@/widgets/top-menu/ui/ThemeToggle'

import './TopMenu.css'
import { LogoutButton } from '@/widgets/auth/ui/LogoutButton/LogoutButton'

interface Props {
  locale: Locale
  dict: HeaderDictionary
  isAuth: boolean
}

export const TopMenu = ({ locale, dict, isAuth }: Props) => {
  return (
    <header className="top-menu">
      <div className="top-menu__left">
        <div className="top-menu__logo">
          <div className="top-menu__logo-icon">🛡️</div>
          <span className="top-menu__logo-text">{dict.logo}</span>
        </div>
        {isAuth && (
          <div className="top-menu__search">
            <input type="text" placeholder={dict.search} className="top-menu__search-input" />
          </div>
        )}
      </div>

      <div className="top-menu__right">
        {isAuth && (
          <>
            <RealTimeClock locale={locale} labelToday={dict.today} />
            <Sessions label={dict.sessions} />
          </>
        )}
        <ThemeToggle />
        <LanguageSwitcher />
        {isAuth && <LogoutButton />}
      </div>
    </header>
  )
}
