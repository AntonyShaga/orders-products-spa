import { filterProducts, mapOrdersToProducts } from './utils'
import { mockOrders } from '@/entities/order/model/__mocks__/orders.mock'

describe('products utils', () => {
  test('mapOrdersToProducts', () => {
    const result = mapOrdersToProducts(mockOrders)

    expect(result).toHaveLength(3)
    expect(result[0].orderTitle).toBe('Order 1')
    expect(result[2].orderTitle).toBe('Order 2')
  })

  test('filterProducts', () => {
    const products = mapOrdersToProducts(mockOrders)
    const filtered = filterProducts(products, 'phone')

    expect(filtered).toHaveLength(2)
    expect(filtered.every((p) => p.type === 'phone')).toBe(true)
  })

  test('filterProducts without type returns all', () => {
    const products = mapOrdersToProducts(mockOrders)
    const filtered = filterProducts(products, null)

    expect(filtered).toHaveLength(3)
  })
})
