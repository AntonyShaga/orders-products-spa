import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale, type Locale } from '@/shared/i18n/config'

function getLocale(req: NextRequest): Locale {
  const accept = req.headers.get('accept-language')
  if (!accept) return defaultLocale

  const match = accept.split(',')[0].split('-')[0] as Locale

  return locales.includes(match) ? match : defaultLocale
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const hasLocale = locales.some((l) => pathname.startsWith(`/${l}`))
  if (hasLocale) return

  const locale = getLocale(req)

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url))
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
