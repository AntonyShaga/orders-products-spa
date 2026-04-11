export const ROUTES = {
  orders: { path: '/orders' },
  products: { path: '/products' },
} as const

export type RouteKey = keyof typeof ROUTES
