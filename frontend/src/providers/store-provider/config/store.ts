import { configureStore } from '@reduxjs/toolkit'
import { modalReducer } from '@/providers/modal-provider'
import { orderReducer } from '@/entities/order/model/orderSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: modalReducer,
      orders: orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export const store = makeStore()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
