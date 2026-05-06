import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { locales, defaultLocale, type Locale } from '@/shared/i18n/config'

function getLocale(req: NextRequest): Locale {
  const accept = req.headers.get('accept-language')
  if (!accept) return defaultLocale

  const match = accept.split(',')[0].split('-')[0] as Locale
  return locales.includes(match) ? match : defaultLocale
}

async function verifyToken(token?: string) {
  if (!token) return false
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

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))

  if (!hasLocale) {
    const locale = getLocale(req)
    return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, req.url))
  }

  const segments = pathname.split('/')
  const locale = segments[1]
  const purePath = '/' + segments.slice(2).join('/')

  const isAuthPage = purePath.startsWith('/login')
  const isProtectedPage = ['/orders', '/products'].some((p) => purePath.startsWith(p))
  const isRoot = purePath === '/' || purePath === ''

  const accessToken = req.cookies.get('accessToken')?.value
  const refreshToken = req.cookies.get('refreshToken')?.value

  let isValidAccess = await verifyToken(accessToken)

  if (!isValidAccess && refreshToken) {
    try {
      const refreshRes = await fetch(`${process.env.INTERNAL_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      })

      if (refreshRes.ok) {
        const setCookie = refreshRes.headers.get('set-cookie')

        if (setCookie) {
          const res = NextResponse.redirect(req.url)
          res.headers.set('set-cookie', setCookie)
          return res
        }
      }
    } catch {}
    isValidAccess = false
  }

  const isAuthenticated = isValidAccess

  if (isRoot) {
    return NextResponse.redirect(
      new URL(`/${locale}${isAuthenticated ? '/orders' : '/login'}`, req.url),
    )
  }

  if (!isAuthenticated && isProtectedPage) {
    const res = NextResponse.redirect(new URL(`/${locale}/login`, req.url))
    res.cookies.delete('accessToken')
    res.cookies.delete('refreshToken')
    return res
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}/orders`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)'],
}
