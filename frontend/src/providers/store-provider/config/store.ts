import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { modalReducer } from '@/providers/modal-provider'
import { orderReducer } from '@/entities/order/model/orderSlice'

const rootReducer = combineReducers({
  modal: modalReducer,
  orders: orderReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
