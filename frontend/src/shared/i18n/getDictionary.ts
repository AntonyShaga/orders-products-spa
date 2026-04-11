import { cache } from 'react'
import { ROUTES, type RouteKey } from '@/config/routes'
import type { Locale } from './config'
import type {
  AuthDictionary,
  Dictionary,
  HeaderDictionary,
  ModalDictionary,
  PageDictionary,
  SidebarDictionary,
} from './types'

const routeKeys = Object.keys(ROUTES) as RouteKey[]

export const getDictionary = cache(async (locale: Locale): Promise<Dictionary> => {
  const entries = await Promise.all(
    routeKeys.map(async (key) => {
      try {
        const mod = await import(`./${key}/${locale}`)
        return [key, mod.default] as const
      } catch {
        return null
      }
    }),
  )

  const safeEntries = entries.filter(Boolean) as [RouteKey, PageDictionary][]

  const sidebarMod = await import(`./sidebar/${locale}`)
  const sidebar = sidebarMod.default as SidebarDictionary

  const headerMod = await import(`./header/${locale}`)
  const header = headerMod.default as HeaderDictionary

  const modalMod = await import(`./modals/${locale}`)
  const modal = modalMod.default as ModalDictionary

  const authMod = await import(`./auth/${locale}`)
  const auth = authMod.default as AuthDictionary
  return {
    ...Object.fromEntries(safeEntries),
    sidebar,
    header,
    modal,
    auth,
  } satisfies Dictionary
})
