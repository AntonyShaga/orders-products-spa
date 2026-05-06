import { Order } from '@/entities/order/model/types'
/**
 * Transforms orders into a flat list of products.
 *
 * - Flattens nested `order → products` structure
 * - Enriches each product with its parent order title
 *
 * Used to simplify rendering and filtering on the Products page.
 */
export const mapOrdersToProducts = (orders: Order[]) => {
  return orders.flatMap((order) =>
    order.items.map((item) => ({
      ...item,
      orderTitle: order.title,
    })),
  )
}
/**
 * Filters products by selected type.
 *
 * - Returns all products if no type is selected
 * - Otherwise returns only products matching the given type
 */
export const filterProducts = (
  products: ReturnType<typeof mapOrdersToProducts>,
  type: string | null,
) => {
  if (!type) return products
  return products.filter((p) => p.type === type)
}
