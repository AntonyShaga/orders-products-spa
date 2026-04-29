import { apiClient } from './apiClient'
import { CreateProductPayload, Order, Product } from '@/entities/order/model/types'

export const deleteOrder = (id: string) =>
  apiClient<void>(`/orders/${id}`, {
    method: 'DELETE',
  })
export const getOrders = () => apiClient<Order[]>('/orders')

export const createOrder = () =>
  apiClient<Order>('/orders', {
    method: 'POST',
  })

export const createProduct = (payload: CreateProductPayload) =>
  apiClient<Product>('/orders/product', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
export const deleteProduct = (id: string) =>
  apiClient<void>(`/orders/product/${id}`, {
    method: 'DELETE',
  })
