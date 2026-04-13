'use client'

import { useMemo, useState } from 'react'
import { formatDateLong, formatDateShort } from '@/widgets/orders/ui/helpers'

import {
  filterProducts,
  getProductTypes,
  mapOrdersToProducts,
} from '@/widgets/products/model/utils'
import './Products.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'

export const ProductsPage = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const { orders } = useSelector((state: RootState) => state.orders)
  const products = useMemo(() => mapOrdersToProducts(orders), [orders])
  const types = useMemo(() => getProductTypes(products), [products])
  const filteredProducts = useMemo(
    () => filterProducts(products, selectedType),
    [products, selectedType],
  )

  return (
    <div className="products container mt-4">
      <div className="products__toolbar mb-3">
        <select
          suppressHydrationWarning
          className="products__select  w-auto"
          value={selectedType ?? ''}
          onChange={(e) => setSelectedType(e.target.value || null)}
        >
          <option value="">All</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="products__table table-responsive">
        <table className="table table-hover align-middle">
          <thead className="products__head table-light">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Guarantee</th>
              <th>Price</th>
              <th>Order</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className="products__body">
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No products
                </td>
              </tr>
            )}
            {filteredProducts.map((p) => {
              return (
                <tr key={p.id} className="products__row">
                  <td className="products__name">
                    <div>{p.title}</div>
                    <small className="text-muted">{p.serialNumber}</small>
                  </td>

                  <td>{p.type}</td>

                  <td className="products__guarantee">
                    <div>{formatDateShort(p.guarantee.start)}</div>
                    <small className="text-muted">{formatDateLong(p.guarantee.end)}</small>
                  </td>

                  <td className="products__price">
                    {p.price?.map((price) => (
                      <div key={price.symbol}>
                        {price.value} {price.symbol}
                      </div>
                    ))}
                  </td>

                  <td>{p.orderTitle}</td>

                  <td className="products__status">
                    <span className={`badge ${p.isNew ? 'bg-success' : 'bg-secondary'}`}>
                      {p.isNew ? 'Free' : 'In repair'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
