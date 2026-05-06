'use client'

import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../config/store'
import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Order } from '@/entities/order/model/types'
import { ProductType } from '@/entities/product-types/model/productTypeSlice'

export const StoreProvider = ({
  children,
  initialOrders,
  initialProductTypes,
}: {
  children: ReactNode
  initialOrders: Order[]
  initialProductTypes: ProductType[]
}) => {
  const [store] = useState<AppStore>(() =>
    makeStore({
      modal: [],
      orders: {
        orders: initialOrders ?? [],
        selectedOrderId: null,
      },
      productTypes: initialProductTypes ?? [],
    }),
  )

  return <Provider store={store}>{children}</Provider>
}
