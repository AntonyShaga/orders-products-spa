import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { locales, defaultLocale, type Locale } from '@/shared/i18n/config'

function getLocale(req: NextRequest): Locale {
  const accept = req.headers.get('accept-language')
  if (!accept) return defaultLocale

  const match = accept.split(',')[0].split('-')[0] as Locale
  return locales.includes(match) ? match : defaultLocale
}

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  const hasLocale = locales.some((l) => {
    return pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  })

  if (!hasLocale) {
    const locale = getLocale(req)
    return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, req.url))
  }

  const segments = pathname.split('/')
  const locale = segments[1]
  const purePath = '/' + segments.slice(2).join('/')

  const isAuthPage = purePath === '/login' || purePath === '/login/'
  const isProtectedPage = ['/orders', '/products'].some((p) => purePath.startsWith(p))
  const isRoot = purePath === '/' || purePath === ''

  const token = req.cookies.get('accessToken')?.value
  const isValidToken = token ? await verifyToken(token) : false

  if (isRoot) {
    if (isValidToken) {
      return NextResponse.redirect(new URL(`/${locale}/orders`, req.url))
    } else {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
    }
  }

  if (!isValidToken && isProtectedPage) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
  }

  if (isValidToken && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}/orders`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)'],
}
