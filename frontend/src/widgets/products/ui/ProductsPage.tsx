'use client'

import { useMemo, useState } from 'react'
import { filterProducts, mapOrdersToProducts } from '@/widgets/products/model/utils'

import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'

import { getProductsByType } from '@/shared/lib/getProductsByType'

import { ProductsToolbar } from './ProductsToolbar'
import { ProductsTable } from './ProductsTable'

import './ProductsPage.css'
import type { ProductsDictionary } from '@/shared'
import { usePagination } from '@/shared/lib/hooks/usePagination'
interface ProductsPageState {
  dict: ProductsDictionary
  locale: string
}

export const ProductsPage = ({ locale, dict }: ProductsPageState) => {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const { orders } = useSelector((state: RootState) => state.orders)

  const products = useMemo(() => mapOrdersToProducts(orders), [orders])

  const filteredProducts = useMemo(
    () => filterProducts(products, selectedType),
    [products, selectedType],
  )

  const { page, setPage, total, pageSize, paginatedData } = usePagination(filteredProducts, 5)

  const chartData = useMemo(() => getProductsByType(products), [products])

  return (
    <div className="products container">
      <ProductsToolbar
        dictToolbar={dict.toolbar}
        dictProduct={dict.page}
        chartData={chartData}
        selectedType={selectedType}
        onChange={(value) => {
          setSelectedType(value)
          setPage(0)
        }}
        page={page}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      <ProductsTable dictProductsTable={dict.table} products={paginatedData} locale={locale} />
    </div>
  )
}
