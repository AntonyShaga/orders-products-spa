import { cache } from 'react'
import { type RouteKey, ROUTES } from '@/config/routes'
import type { Locale } from './config'
import {
  AuthDictionary,
  Dictionary,
  HeaderDictionary,
  ModalDictionary,
  OrdersDictionary,
  ProductsDictionary,
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

  const safeEntries = entries.filter(Boolean) as [RouteKey, Dictionary][]

  const sidebarMod = await import(`./sidebar/${locale}`)
  const sidebar = sidebarMod.default as SidebarDictionary

  const headerMod = await import(`./header/${locale}`)
  const header = headerMod.default as HeaderDictionary

  const modalMod = await import(`./modals/${locale}`)
  const modal = modalMod.default as ModalDictionary

  const authMod = await import(`./auth/${locale}`)
  const auth = authMod.default as AuthDictionary

  const productsMod = await import(`./products/${locale}`)
  const products = productsMod.default as ProductsDictionary

  const ordersMod = await import(`./orders/${locale}`)
  const orders = ordersMod.default as OrdersDictionary

  return {
    ...Object.fromEntries(safeEntries),
    sidebar,
    header,
    modal,
    auth,
    products,
    orders,
  } satisfies Dictionary
})
