import { apiClient } from './apiClient'

export const deleteOrder = (id: string) =>
  apiClient<void>(`/orders/${id}`, {
    method: 'DELETE',
  })
