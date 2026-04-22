'use client'

import { ProductRow } from '@/widgets/orders/ui/ProductRow/ProductRow'
import { Order } from '@/entities/order/model/types'

import './OrderDetails.css'
import { OrderDetailsDictionary } from '@/shared'

interface OrderDetailsProps {
  order: Order
  isOpen?: boolean
  onClose?: () => void
  dictOrderDetails: OrderDetailsDictionary
  locale: string
}

export default function OrderDetails({
  order,
  isOpen,
  onClose,
  dictOrderDetails,
  locale,
}: OrderDetailsProps) {
  const { title, products } = order

  return (
    <div className={`order-details ${isOpen ? 'order-details--open' : ''}`}>
      <div className="order-details__content">
        {onClose && (
          <button className="order-details__close" onClick={onClose}>
            ×
          </button>
        )}

        <div className="order-details__header">
          <h2 className="order-details__title">{`${dictOrderDetails.orderLabel} ${title}`}</h2>

          <button className="order-details__add-btn">
            <span className="order-details__plus">+</span>
            {dictOrderDetails.addProduct}
          </button>
        </div>

        <div className="order-details__table" role="table">
          {products.length === 0 ? (
            <div className="order-details__empty">{dictOrderDetails.empty}</div>
          ) : (
            products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                orderTitle={title}
                statusDict={dictOrderDetails.status}
                locale={locale}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
