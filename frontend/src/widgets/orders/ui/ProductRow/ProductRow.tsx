'use client'

import { Product } from '@/entities/order/model/types'
import './ProductRow.css'
import { ProductRowDictionary } from '@/shared'
import { formatDateLong, formatDateShort } from '@/shared/lib/date/formatDate'
import { EllipsisTooltip } from '@/shared/ui/tooltip/EllipsisTooltip'
export interface ProductRowProps {
  product: Product
  orderTitle: string
  statusDict: ProductRowDictionary
  locale: string
}

export const ProductRow = ({ product, orderTitle, statusDict, locale }: ProductRowProps) => {
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
        <EllipsisTooltip
          parts={[product.title]}
          className="ellipsis-wrapper--w-100 product-row__name"
        />
        <div className="product-row__serial">{product.serialNumber}</div>
      </div>

      <div className="product-row__status-text">
        {product.isNew ? statusDict.free : statusDict.repair}
      </div>

      <div className="product-row__date">
        <div className="product-row__date-top">
          {formatDateShort(product.guarantee.start, locale)}
        </div>
        <div className="product-row__date-bottom">
          {formatDateLong(product.guarantee.end, locale)}
        </div>
      </div>

      <div className="product-row__price">
        {product.price?.map((price) => (
          <div key={price.symbol} className="product-row__price-item">
            <span className="product-row__price-value">{price.value}</span>
            <span className="product-row__price-symbol">{price.symbol}</span>
          </div>
        ))}
      </div>

      <div className="product-row__order-title">
        <EllipsisTooltip
          parts={[statusDict.orderLabel, orderTitle]}
          className="ellipsis-wrapper--w-60"
        />
      </div>
      <div className="product-row__delete">
        <button className="product-row__delete-btn">🗑</button>
      </div>
    </div>
  )
}
