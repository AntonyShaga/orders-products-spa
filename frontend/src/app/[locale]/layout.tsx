import { StoreProvider } from '@/providers/store-provider/ui/StoreProvider'
import { serverFetch } from '@/shared/api/server'
import React from 'react'

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const orders = await serverFetch('/orders')

  return <StoreProvider initialOrders={orders.data || []}>{children}</StoreProvider>
}
