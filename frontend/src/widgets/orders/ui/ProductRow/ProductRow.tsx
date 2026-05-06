'use client'

import { Price, OrderItem } from '@/entities/order/model/types'
import './ProductRow.css'
import { ProductRowDictionary } from '@/shared'
import { formatDateLong, formatDateShort } from '@/shared/lib/date/formatDate'
import { EllipsisTooltip } from '@/shared/ui/tooltip/EllipsisTooltip'
import React from 'react'
import { openModal } from '@/providers/modal-provider'
import { ModalType } from '@/providers/modal-provider/config/modalTypes'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import Image from 'next/image'
import TrashIcon from '@/shared/assets/icons/trash.svg'

export interface ProductRowProps {
  product: OrderItem
  orderTitle: string
  statusDict: ProductRowDictionary
  orderId: string
  locale: string
}

export const ProductRow = ({
  product,
  orderTitle,
  statusDict,
  locale,
  orderId,
}: ProductRowProps) => {
  const dispatch = useAppDispatch()

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()

    dispatch(
      openModal({
        type: ModalType.DELETE,
        props: {
          productId: product.id,
          orderId: orderId,
          title: product.title,
          subtitle: product.serialNumber,
          imageUrl: product.photo,
          mode: 'product',
        },
      }),
    )
  }
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
        <Image src={product.photo} alt={product.photo} className="product-row__img" />
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
        {product.prices?.map((price: Price) => (
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
        <button className="product-row__delete-btn" onClick={handleDelete}>
          <Image src={TrashIcon} alt="Delete product" width={16} height={16} />
        </button>
      </div>
    </div>
  )
}
