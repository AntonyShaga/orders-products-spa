import { getProductsByType } from './getProductsByType'
import type { OrderItem } from '@/entities/order/model/types'

const makeProduct = (type?: OrderItem['type']): OrderItem =>
  ({
    type,
  }) as OrderItem

describe('getProductsByType', () => {
  test('groups products by type', () => {
    const products: OrderItem[] = [
      makeProduct('phone'),
      makeProduct('phone'),
      makeProduct('laptop'),
    ]

    const result = getProductsByType(products)

    expect(result).toEqual(
      expect.arrayContaining([
        { type: 'phone', count: 2 },
        { type: 'laptop', count: 1 },
      ]),
    )
  })

  test('handles unknown type', () => {
    const products: OrderItem[] = [
      makeProduct(undefined),
      makeProduct(undefined),
      makeProduct('phone'),
    ]

    const result = getProductsByType(products)

    expect(result).toEqual(
      expect.arrayContaining([
        { type: 'Unknown', count: 2 },
        { type: 'phone', count: 1 },
      ]),
    )
  })

  test('returns empty array for empty input', () => {
    expect(getProductsByType([])).toEqual([])
  })
})
