import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order } from './types'

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

    setSelectedOrder: (state, action: PayloadAction<string | null>) => {
      state.selectedOrderId = action.payload
    },

    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload)

      if (state.selectedOrderId === action.payload) {
        state.selectedOrderId = null
      }
    },
  },
})

export const { setOrders, setSelectedOrder, removeOrder } = orderSlice.actions

export const orderReducer = orderSlice.reducer
