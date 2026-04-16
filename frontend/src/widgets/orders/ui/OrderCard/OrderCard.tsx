'use client'

import { formatDateLong, formatDateShort } from '@/widgets/orders/ui/helpers'
import { Order } from '@/entities/order/model/types'
import { openModal } from '@/providers/modal-provider'
import { ModalType } from '@/providers/modal-provider/config/modalTypes'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import TrashIcon from '@/shared/assets/icons/trash.svg'
import './OrderCard.css'
import Image from 'next/image'

interface OrderCardProps {
  order: Order
  isSelected: boolean
  isCompact: boolean
  total: { USD: number; UAH: number }
  onSelect: () => void
  onBack?: () => void
}

export const OrderCard = ({
  order,
  isSelected,
  isCompact,
  total,
  onSelect,
  onBack,
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
      {!isCompact && <div className="order-card__title">{order.title}</div>}

      <div className="order-card__icon-box">
        <div className="order-card__icon-circle">≡</div>
      </div>

      <div className="order-card__count">
        {order.products.length}
        <span className="order-card__count-label">Продукта</span>
      </div>

      <div className="order-card__date">
        <span className="order-card__date-small">{formatDateShort(order.date)}</span>
        <span>{formatDateLong(order.date)}</span>
      </div>

      {!isCompact && (
        <div className="order-card__product-price">
          <div>{total.USD} $</div>
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
