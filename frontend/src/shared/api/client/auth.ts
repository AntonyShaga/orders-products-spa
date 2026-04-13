import { apiClient } from './apiClient'

export const login = (email: string, password: string) =>
  apiClient<void>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const register = (email: string, password: string) =>
  apiClient<void>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const logout = () =>
  apiClient<void>('/auth/logout', {
    method: 'POST',
  })
