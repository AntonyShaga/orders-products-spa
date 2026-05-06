'use client'

import { mapOrdersToProducts } from '@/widgets/products/model/utils'
import './ProductsTable.css'
import { ProductsTableDictionary } from '@/shared'
import { mapProductTypeLabel } from '@/widgets/products/model/mapProductTypes'
import { formatDateLong, formatDateShort } from '@/shared/lib/date/formatDate'
import { Loader } from '@/shared/ui/loader/Loader'

type Props = {
  products: ReturnType<typeof mapOrdersToProducts>
  dictProductsTable: ProductsTableDictionary
  locale: string
  isLoading: boolean
}

export const ProductsTable = ({ products, dictProductsTable, locale, isLoading }: Props) => {
  const {
    type,
    guarantee,
    name,
    price,
    status,
    orderLabel,
    empty,
    statusRepair,
    statusFree,
    productTypes,
  } = dictProductsTable

  const safeProducts = products ?? []

  return (
    <div className="products__table table-responsive">
      <table className="table table-hover align-middle">
        <thead className="products__head table-light text-center">
          <tr>
            <th>{name}</th>
            <th>{type}</th>
            <th>{guarantee}</th>
            <th>{price}</th>
            <th>{orderLabel}</th>
            <th>{status}</th>
          </tr>
        </thead>

        <tbody className="products__body">
          {isLoading && (
            <tr>
              <td colSpan={6}>
                <Loader />
              </td>
            </tr>
          )}

          {!isLoading && safeProducts.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                {empty}
              </td>
            </tr>
          )}

          {!isLoading &&
            safeProducts.map((p) => (
              <tr key={p.id} className="products__row">
                <td className="products__name text-center">
                  <div>{p.title}</div>
                  <small className="products__muted">{p.serialNumber}</small>
                </td>

                <td className="text-center">{mapProductTypeLabel(p.type, productTypes)}</td>

                <td className="products__guarantee text-center">
                  <div>{formatDateShort(p.guarantee.start, locale)}</div>
                  <small className="products__muted">
                    {formatDateLong(p.guarantee.end, locale)}
                  </small>
                </td>

                <td className="products__price text-center">
                  {p.prices?.map((price) => (
                    <div key={price.symbol}>
                      {price.value} {price.symbol}
                    </div>
                  ))}
                </td>

                <td className="text-center">{`${dictProductsTable.orderLabel}  ${p.orderTitle}`}</td>

                <td className="products__status text-center">
                  <span className={`badge ${p.isNew ? 'bg-success' : 'bg-secondary'}`}>
                    {p.isNew ? statusFree : statusRepair}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
