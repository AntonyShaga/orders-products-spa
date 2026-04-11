import { getDictionary } from '@/shared/i18n/getDictionary'
import type { Locale } from '@/shared/i18n/config'
import { ProductsPage } from '@/widgets/products/ui/ProductsPage'
import { redirect } from 'next/navigation'
import { fetchOrders } from '@/shared/api/server'

export default async function Products({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const orders = await fetchOrders()

  if (orders.error === 'unauthorized') {
    redirect(`/${locale}/login`)
  }

  return (
    <>
      <h2>{dict.sidebar.products}</h2>
      <ProductsPage initialOrders={orders.data || []} />
    </>
  )
}
