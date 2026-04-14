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
  if (!hasLocale) {
    const locale = getLocale(req)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url))
  }

  const rawToken = req.cookies.get('accessToken')?.value

  const hasToken = Boolean(rawToken) && rawToken !== 'undefined' && rawToken !== 'null'

  const segments = pathname.split('/')
  const locale = segments[1]

  const isProtected = ['/orders', '/products'].some((p) => pathname.startsWith(`/${locale}${p}`))

  if (!hasToken && isProtected) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
