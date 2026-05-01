import { StoreProvider } from '@/providers/store-provider/ui/StoreProvider'
import { serverFetch } from '@/shared/api/server'
import React from 'react'
import { AuthBootstrap } from '@/shared/auth/AuthBootstrap'
import { Toast } from '@/shared/ui/toast/Toast'

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const orders = await serverFetch('/orders')
  const productTypes = await serverFetch('/product-types')

  return (
    <StoreProvider initialOrders={orders.data || []} initialProductTypes={productTypes.data || []}>
      <Toast />
      <AuthBootstrap />
      {children}
    </StoreProvider>
  )
}
