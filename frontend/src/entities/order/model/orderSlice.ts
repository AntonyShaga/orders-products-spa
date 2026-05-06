import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order, OrderItem } from './types'

interface OrderState {
  orders: Order[]
  selectedOrderId: string | null
}

const initialState: OrderState = {
  orders: [],
  selectedOrderId: null,
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload
    },

    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload)
    },

    addProductToOrder: (state, action: PayloadAction<OrderItem>) => {
      const product = action.payload

      const order = state.orders.find((o) => o.id === product.orderId)

      if (order) {
        order.items.push(product)
      }
    },

    setSelectedOrder: (state, action: PayloadAction<string | null>) => {
      state.selectedOrderId = action.payload
    },

    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload)

      if (state.selectedOrderId === action.payload) {
        state.selectedOrderId = null
      }
    },

    removeProductFromOrder: (
      state,
      action: PayloadAction<{ orderId: string; productId: string }>,
    ) => {
      const { orderId, productId } = action.payload

      const order = state.orders.find((o) => o.id === orderId)

      if (!order) return

      order.items = order.items.filter((p) => p.id !== productId)
    },
  },
})

export const {
  setOrders,
  addOrder,
  addProductToOrder,
  setSelectedOrder,
  removeOrder,
  removeProductFromOrder,
} = orderSlice.actions

export const orderReducer = orderSlice.reducer
