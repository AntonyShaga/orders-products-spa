'use client'

import { Order } from '@/entities/order/model/types'
import { openModal } from '@/providers/modal-provider'
import { ModalType } from '@/providers/modal-provider/config/modalTypes'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import TrashIcon from '@/shared/assets/icons/trash.svg'
import './OrderCard.css'
import Image from 'next/image'
import { formatDateLong, formatDateShort } from '@/shared/lib/date/formatDate'
import { OrderCardDictionary } from '@/shared'
import { getPlural } from '@/shared/pluralize/getPlural'

interface OrderCardProps {
  order: Order
  isSelected: boolean
  isCompact: boolean
  total: { USD: number; UAH: number }
  onSelect: () => void
  onBack?: () => void
  locale: string
  dictOrderCard: OrderCardDictionary
}

export const OrderCard = ({
  order,
  isSelected,
  isCompact,
  total,
  onSelect,
  onBack,
  locale,
  dictOrderCard,
}: OrderCardProps) => {
  const dispatch = useAppDispatch()

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()

    dispatch(
      openModal({
        type: ModalType.DELETE,
        props: {
          id: order.id,
          title: order.title,
        },
      }),
    )
  }

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isCompact) {
      onBack?.()
    }
  }

  return (
    <div
      className={`order-card ${isSelected ? 'order-card--active' : ''} ${
        isCompact ? 'order-card--compact' : ''
      }`}
      onClick={onSelect}
    >
      {!isCompact && (
        <div className="order-card__title">{`${dictOrderCard.orderLabel} ${order.title}`}</div>
      )}

      <div className="order-card__icon-box">
        <div className="order-card__icon-circle">≡</div>
      </div>

      <div className="order-card__count">
        {order.products.length}
        <span className="order-card__count-label">
          {getPlural(order.products.length, dictOrderCard.product)}
        </span>
      </div>

      <div className="order-card__date">
        <span className="order-card__date-small">{formatDateShort(order.date, locale)}</span>
        <span>{formatDateLong(order.date, locale)}</span>
      </div>

      {!isCompact && (
        <div className="order-card__product-price">
          <div>{total.USD} USD</div>
          <div>{total.UAH} UAH</div>
        </div>
      )}

      <div className="order-card__arrow-zone">
        {isCompact ? (
          <button type="button" className="order-card__arrow-btn" onClick={handleArrowClick} />
        ) : (
          <button type="button" className="order-card__delete-btn" onClick={handleDelete}>
            <Image src={TrashIcon} alt="Delete order" width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  )
}
