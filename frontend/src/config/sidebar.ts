import { ROUTES } from './routes'
import type { RouteKey } from './routes'

export const sidebarItems: {
  key: RouteKey
  href: string
}[] = [
  { key: 'orders', href: ROUTES.orders.path },
  { key: 'products', href: ROUTES.products.path },
]
