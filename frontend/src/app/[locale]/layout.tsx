import { StoreProvider } from '@/providers/store-provider/ui/StoreProvider'
import { serverFetch } from '@/shared/api/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const orders = await serverFetch('/orders')

  if (orders.error === 'unauthorized') {
    redirect(`/${locale}/login`)
  }

  return <StoreProvider initialOrders={orders.data || []}>{children}</StoreProvider>
}
