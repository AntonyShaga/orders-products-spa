import { mapProductTypes, mapProductTypeLabel } from './mapProductTypes'
import { ProductType } from '@/entities/product-types/model/productTypeSlice'

describe('mapProductTypes', () => {
  const dict = {
    phone: 'Phone',
    laptop: 'Laptop',
    monitor: 'Monitor',
  }

  const productTypes: ProductType[] = [
    { key: 'phone', icon: '' },
    { key: 'laptop', icon: '' },
  ]

  it('maps productTypes to labels', () => {
    const result = mapProductTypes(productTypes, dict)

    expect(result).toEqual([
      { value: 'phone', label: 'Phone' },
      { value: 'laptop', label: 'Laptop' },
    ])
  })

  it('falls back to key if label not found', () => {
    const result = mapProductTypes([{ key: 'unknown', icon: '' } as unknown as ProductType], dict)

    expect(result).toEqual([{ value: 'unknown', label: 'unknown' }])
  })

  it('handles empty array', () => {
    const result = mapProductTypes([], dict)

    expect(result).toEqual([])
  })
})

describe('mapProductTypeLabel', () => {
  const dict = {
    phone: 'Phone',
    laptop: 'Laptop',
    monitor: 'Monitor',
  }

  it('maps single type correctly', () => {
    expect(mapProductTypeLabel('phone', dict)).toBe('Phone')
  })

  it('falls back if type not found', () => {
    expect(mapProductTypeLabel('unknown', dict)).toBe('unknown')
  })
})
