'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'

import { mapOrdersToProducts } from '@/widgets/products/model/utils'
import { getProductsByType } from '@/shared/lib/getProductsByType'
import { usePagination } from '@/shared/lib/hooks/usePagination'

import { ProductsToolbar } from './ProductsToolbar'
import { ProductsTable } from './ProductsTable'

import './ProductsPage.css'
import type { ProductsDictionary } from '@/shared'
import { createProductsWorker } from '@/widgets/products/model/workerUrl'

type ProductsPageState = {
  dict: ProductsDictionary
  locale: string
}

export const ProductsPage = ({ locale, dict }: ProductsPageState) => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<ReturnType<typeof mapOrdersToProducts>>(
    [],
  )

  // Web Worker is used to offload heavy filtering from the main thread
  // (demonstration of parallel processing, not required for small datasets)
  const workerRef = useRef<Worker | null>(null)

  const { orders } = useSelector((state: RootState) => state.orders)

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = createProductsWorker()
    }

    const worker = workerRef.current

    worker.postMessage({ orders, selectedType })

    worker.onmessage = (e) => {
      setFilteredProducts(e.data)
    }
  }, [orders, selectedType])

  useEffect(() => {
    return () => {
      workerRef.current?.terminate()
      workerRef.current = null
    }
  }, [])

  const { page, setPage, total, pageSize, paginatedData } = usePagination(filteredProducts, 5)

  const chartProducts = useMemo(() => mapOrdersToProducts(orders), [orders])
  const chartData = useMemo(() => getProductsByType(chartProducts), [chartProducts])

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
