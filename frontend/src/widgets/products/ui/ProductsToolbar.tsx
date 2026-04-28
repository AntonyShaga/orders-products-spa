'use client'

import { ProductsBarChart } from '@/widgets/charts/ProductsBarChart'
import './ProductsToolbar.css'
import { ProductsPageDictionary, ProductsToolbarDictionary } from '@/shared'
import { mapProductTypes } from '@/widgets/products/model/mapProductTypes'
import { Pagination } from '@/shared/ui/pagination/Pagination'
import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'

type Props = {
  dictToolbar: ProductsToolbarDictionary
  dictProduct: ProductsPageDictionary
  chartData: { type: string; count: number }[]
  selectedType: string | null
  onChange: (value: string | null) => void
  page: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

export const ProductsToolbar = ({
  dictToolbar,
  dictProduct,
  chartData,
  selectedType,
  onChange,
  page,
  total,
  pageSize,
  onPageChange,
}: Props) => {
  const productTypes = useSelector((state: RootState) => state.productTypes)
  const options = mapProductTypes(productTypes, dictToolbar.productTypes)

  return (
    <div className="products__toolbar">
      <div className="products__left">
        <h2 className="products__title">{dictProduct.title}</h2>

        <select
          suppressHydrationWarning
          className="products__select"
          value={selectedType ?? ''}
          onChange={(e) => onChange(e.target.value || null)}
        >
          <option value="">{dictToolbar.filterAll}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Pagination page={page} total={total} pageSize={pageSize} onPageChange={onPageChange} />
      </div>

      <div className="products-chart">
        <h3 className="products-chart__title">{dictToolbar.chartTitle}</h3>

        <div className="chart-wrapper">
          <ProductsBarChart data={chartData} />
        </div>
      </div>
    </div>
  )
}
