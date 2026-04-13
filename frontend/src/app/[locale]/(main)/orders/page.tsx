import { getDictionary } from '@/shared/i18n/getDictionary'
import type { Locale } from '@/shared/i18n/config'
import { OrderList } from '@/widgets/orders/ui/OrderList/OrderList'

import { redirect } from 'next/navigation'
import { serverFetch } from '@/shared/api/server'

export default async function IncomingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const dict = await getDictionary(locale as Locale)

  const orders = await serverFetch('/orders')

  if (orders.error === 'unauthorized') {
    redirect(`/${locale}/login`)
  }

  return (
    <>
      <h2>{dict.sidebar.orders}</h2>
      <OrderList initialOrders={orders.data || []} />
    </>
  )
}
