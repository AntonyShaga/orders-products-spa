import { apiClient } from './apiClient'
import { CreateOrderItemPayload, Order, OrderItem } from '@/entities/order/model/types'

export const deleteOrder = (id: string) =>
  apiClient<void>(`/orders/${id}`, {
    method: 'DELETE',
  })
export const getOrders = () => apiClient<Order[]>('/orders')

export const createOrder = () =>
  apiClient<Order>('/orders', {
    method: 'POST',
  })

export const createProduct = (payload: CreateOrderItemPayload) =>
  apiClient<OrderItem>('/orders/product', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
export const deleteProduct = (id: string) =>
  apiClient<void>(`/orders/product/${id}`, {
    method: 'DELETE',
  })
