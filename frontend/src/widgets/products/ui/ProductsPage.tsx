'use client'

import { useMemo, useState } from 'react'
import {
  filterProducts,
  getProductTypes,
  mapOrdersToProducts,
} from '@/widgets/products/model/utils'

import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'

import { getProductsByType } from '@/shared/lib/getProductsByType'

import { ProductsToolbar } from './ProductsToolbar'
import { ProductsTable } from './ProductsTable'

import './ProductsPage.css'
import type { ProductsDictionary } from '@/shared'
interface ProductsPageState {
  dict: ProductsDictionary
  locale: string
}

export const ProductsPage = ({ locale, dict }: ProductsPageState) => {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const { orders } = useSelector((state: RootState) => state.orders)

  const products = useMemo(() => mapOrdersToProducts(orders), [orders])

  const types = useMemo(() => getProductTypes(products), [products])

  const filteredProducts = useMemo(
    () => filterProducts(products, selectedType),
    [products, selectedType],
  )

  const pageSize = 5
  const [page, setPage] = useState(0)

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(page * pageSize, (page + 1) * pageSize)
  }, [filteredProducts, page])

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
        types={types}
        page={page}
        total={filteredProducts.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      <ProductsTable dictProductsTable={dict.table} products={paginatedProducts} locale={locale} />
    </div>
  )
}
