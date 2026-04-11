import { orderReducer, setOrders, setSelectedOrder, removeOrder } from './orderSlice'
import { mockOrders } from './__mocks__/orders.mock'

describe('orderSlice', () => {
  const initialState = {
    orders: [],
    selectedOrderId: null,
  }

  test('setOrders sets orders list', () => {
    const state = orderReducer(initialState, setOrders(mockOrders))

    expect(state.orders).toEqual(mockOrders)
    expect(state.selectedOrderId).toBeNull()
  })

  test('setSelectedOrder sets selected order id', () => {
    const state = orderReducer(initialState, setSelectedOrder('1'))

    expect(state.selectedOrderId).toBe('1')
  })

  test('removeOrder removes order from list', () => {
    const stateWithOrders = {
      orders: mockOrders,
      selectedOrderId: null,
    }

    const state = orderReducer(stateWithOrders, removeOrder('1'))

    expect(state.orders).toHaveLength(1)
    expect(state.orders[0].id).toBe('2')
  })

  test('removeOrder resets selectedOrderId if removed', () => {
    const stateWithSelected = {
      orders: mockOrders,
      selectedOrderId: '1',
    }

    const state = orderReducer(stateWithSelected, removeOrder('1'))

    expect(state.selectedOrderId).toBeNull()
  })
})
