import { getDictionary } from '@/shared/i18n/getDictionary'
import type { Locale } from '@/shared/i18n/config'
import { ProductsPage } from '@/widgets/products/ui/ProductsPage'

export default async function Products({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  return <ProductsPage dict={dict.products} locale={locale} />
}
