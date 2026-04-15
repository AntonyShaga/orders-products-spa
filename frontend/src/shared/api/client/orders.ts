import { apiClient } from './apiClient'
import { Order } from '@/entities/order/model/types'

export const deleteOrder = (id: string) =>
  apiClient<void>(`/orders/${id}`, {
    method: 'DELETE',
  })
export const getOrders = () => apiClient<Order[]>('/orders')
