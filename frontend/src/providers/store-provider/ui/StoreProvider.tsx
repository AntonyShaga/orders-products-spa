'use client'

import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../config/store'
import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Order } from '@/entities/order/model/types'

export const StoreProvider = ({
  children,
  initialOrders,
}: {
  children: ReactNode
  initialOrders: Order[]
}) => {
  const [store] = useState<AppStore>(() =>
    makeStore({
      modal: {
        type: null,
        props: null,
      },
      orders: {
        orders: initialOrders,
        selectedOrderId: null,
      },
    }),
  )

  return <Provider store={store}>{children}</Provider>
}
