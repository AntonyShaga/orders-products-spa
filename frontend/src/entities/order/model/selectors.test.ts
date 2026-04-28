import { getPriceBySymbol, selectOrderTotal } from './selectors'
import { RootState } from '@/providers/store-provider'
import { Order } from '@/entities/order/model/types'
import { mockOrders } from './__mocks__/orders.mock'

const createMockState = (partial: Partial<RootState> = {}): RootState => ({
  orders: {
    orders: [],
    selectedOrderId: null,
  },
  modal: [],
  productTypes: [],
  ...partial,
})

describe('order selectors', () => {
  test('getPriceBySymbol returns correct value', () => {
    const prices = mockOrders[0].products[0].price

    expect(getPriceBySymbol(prices, 'USD')).toBe(100)
    expect(getPriceBySymbol(prices, 'UAH')).toBe(4000)
  })

  test('getPriceBySymbol returns 0 if not found', () => {
    const prices = [{ value: 100, symbol: 'USD' }]

    expect(getPriceBySymbol(prices, 'UAH')).toBe(0)
  })

  test('getPriceBySymbol returns 0 if prices undefined', () => {
    expect(getPriceBySymbol(undefined, 'USD')).toBe(0)
  })

  test('selectOrderTotal calculates totals correctly', () => {
    const mockState = createMockState({
      orders: {
        orders: mockOrders,
        selectedOrderId: null,
      },
    })

    const result = selectOrderTotal(mockState, '1')

    expect(result).toEqual({
      USD: 300,
      UAH: 12000,
    })
  })

  test('selectOrderTotal returns zeros if order not found', () => {
    const mockState = createMockState()

    const result = selectOrderTotal(mockState, 'unknown')

    expect(result).toEqual({
      USD: 0,
      UAH: 0,
    })
  })
})
