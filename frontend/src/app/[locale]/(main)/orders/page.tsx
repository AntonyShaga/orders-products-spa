import { getDictionary } from '@/shared/i18n/getDictionary'
import type { Locale } from '@/shared/i18n/config'
import { OrderList } from '@/widgets/orders/ui/OrderList/OrderList'

export default async function IncomingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <OrderList locale={locale} dict={dict.orders} />
    </>
  )
}
