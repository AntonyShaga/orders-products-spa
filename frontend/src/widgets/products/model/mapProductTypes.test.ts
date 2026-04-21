import { mapProductTypes, mapProductTypeLabel } from './mapProductTypes'
import { ProductsToolbarDictionary } from '@/shared'

describe('mapProductTypes', () => {
  const dict: ProductsToolbarDictionary = {
    chartTitle: '',
    filterAll: '',
    productTypes: {
      phone: 'Phone',
      laptop: 'Laptop',
      monitor: 'Monitor',
    },
  }

  it('maps types to labels', () => {
    const result = mapProductTypes(['phones', 'laptops'], dict)

    expect(result).toEqual([
      { value: 'phones', label: 'Phone' },
      { value: 'laptops', label: 'Laptop' },
    ])
  })

  it('falls back to original type if not found', () => {
    const result = mapProductTypes(['unknown'], dict)

    expect(result).toEqual([{ value: 'unknown', label: 'unknown' }])
  })

  it('handles empty array', () => {
    const result = mapProductTypes([], dict)

    expect(result).toEqual([])
  })
})

describe('mapProductTypeLabel', () => {
  const productTypes = {
    phone: 'Phone',
    laptop: 'Laptop',
    monitor: 'Monitor',
  }

  it('maps single type correctly', () => {
    expect(mapProductTypeLabel('phones', productTypes)).toBe('Phone')
  })

  it('falls back if type not found', () => {
    expect(mapProductTypeLabel('unknown', productTypes)).toBe('unknown')
  })

  it('handles already singular type', () => {
    expect(mapProductTypeLabel('phone', productTypes)).toBe('Phone')
  })
})
