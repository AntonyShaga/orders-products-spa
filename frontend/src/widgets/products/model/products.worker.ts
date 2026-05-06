import { mapOrdersToProducts, filterProducts } from './utils'
import type { Order } from '@/entities/order/model/types'

type WorkerInput = {
  orders: Order[]
  selectedType: string | null
}

type WorkerOutput = ReturnType<typeof mapOrdersToProducts>

self.onmessage = (e: MessageEvent<WorkerInput>) => {
  const { orders, selectedType } = e.data

  const products = mapOrdersToProducts(orders)
  const filtered = filterProducts(products, selectedType)

  ;(self as DedicatedWorkerGlobalScope).postMessage(filtered as WorkerOutput)
}

export {}
