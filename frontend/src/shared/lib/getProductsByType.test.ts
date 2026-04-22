import { getProductsByType } from './getProductsByType'
import type { Product } from '@/entities/order/model/types'

const makeProduct = (type?: Product['type']): Product =>
  ({
    type,
  }) as Product

describe('getProductsByType', () => {
  test('groups products by type', () => {
    const products: Product[] = [makeProduct('phone'), makeProduct('phone'), makeProduct('laptop')]

    const result = getProductsByType(products)

    expect(result).toEqual(
      expect.arrayContaining([
        { type: 'phone', count: 2 },
        { type: 'laptop', count: 1 },
      ]),
    )
  })

  test('handles unknown type', () => {
    const products: Product[] = [
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
