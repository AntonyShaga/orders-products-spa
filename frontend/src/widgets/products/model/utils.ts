import { Order } from '@/entities/order/model/types'

export const mapOrdersToProducts = (orders: Order[]) => {
  return orders.flatMap((order) =>
    order.products.map((product) => ({
      ...product,
      orderTitle: order.title,
    })),
  )
}

export const getProductTypes = (products: ReturnType<typeof mapOrdersToProducts>) => {
  return Array.from(new Set(products.map((p) => p.type)))
}

export const filterProducts = (
  products: ReturnType<typeof mapOrdersToProducts>,
  type: string | null,
) => {
  if (!type) return products
  return products.filter((p) => p.type === type)
}
