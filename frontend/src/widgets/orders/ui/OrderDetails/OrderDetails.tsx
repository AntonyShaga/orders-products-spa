'use client'

import { useEffect, useState } from 'react'
import { ProductRow } from '@/widgets/orders/ui/ProductRow/ProductRow'
import { Order } from '@/entities/order/model/types'

import './OrderDetails.css'

interface OrderDetailsProps {
  order: Order
  isOpen?: boolean
  onClose?: () => void
  onExited?: () => void
}

export const OrderDetails = ({ order, isOpen, onClose, onExited }: OrderDetailsProps) => {
  const [visible, setVisible] = useState(false)

  const { title, products } = order

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true))
      return
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(false)

    const timer = setTimeout(() => {
      onExited?.()
    }, 300)

    return () => clearTimeout(timer)
  }, [isOpen])

  const panelClass = visible ? 'order-details--open' : 'order-details--closing'

  return (
    <div className={`order-details ${panelClass}`}>
      <div className="order-details__content">
        {onClose && (
          <button className="order-details__close" onClick={onClose}>
            ×
          </button>
        )}

        <div className="order-details__header">
          <h2 className="order-details__title">{title}</h2>

          <button className="order-details__add-btn">
            <span className="order-details__plus">+</span>
            Добавить продукт
          </button>
        </div>

        <div className="order-details__table" role="table">
          {products.length === 0 ? (
            <div className="order-details__empty">No products</div>
          ) : (
            products.map((product) => (
              <ProductRow key={product.id} product={product} orderTitle={title} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
