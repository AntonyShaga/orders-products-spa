'use client'

import { formatDateLong, formatDateShort } from '@/widgets/orders/ui/helpers'
import { Product } from '@/entities/order/model/types'
import './ProductRow.css'

export const ProductRow = ({ product, orderTitle }: { product: Product; orderTitle: string }) => {
  return (
    <div className="product-row">
      <div className="product-row__status">
        <div
          className={`product-row__status-dot ${
            product.isNew ? 'product-row__status-dot--new' : 'product-row__status-dot--repair'
          }`}
        />
      </div>

      <div className="product-row__image">
        <img src={product.photo} alt="" className="product-row__img" />
      </div>

      <div className="product-row__info">
        <div className="product-row__name">{product.title}</div>
        <div className="product-row__serial">{product.serialNumber}</div>
      </div>

      <div className="product-row__status-text">{product.isNew ? 'Свободен' : 'В ремонте'}</div>

      <div className="product-row__date">
        <div className="product-row__date-top">{formatDateShort(product.guarantee.start)}</div>
        <div className="product-row__date-bottom">{formatDateLong(product.guarantee.end)}</div>
      </div>

      <div className="product-row__price">
        {product.price?.map((price) => (
          <div key={price.symbol} className="product-row__price-item">
            <span className="product-row__price-value">{price.value}</span>
            <span className="product-row__price-symbol">{price.symbol}</span>
          </div>
        ))}
      </div>

      <div className="product-row__order-title">{orderTitle}</div>

      <div className="product-row__delete">
        <button className="product-row__delete-btn">🗑</button>
      </div>
    </div>
  )
}
