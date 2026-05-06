'use client'

import { ProductRow } from '@/widgets/orders/ui/ProductRow/ProductRow'
import { Order } from '@/entities/order/model/types'

import './OrderDetails.css'
import { OrderDetailsDictionary } from '@/shared'
import { openModal } from '@/providers/modal-provider'
import { ModalType } from '@/providers/modal-provider/config/modalTypes'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import { EllipsisTooltip } from '@/shared/ui/tooltip/EllipsisTooltip'
import { ActionIconButton } from '@/shared/ui/close-button/ActionIconButton'

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
  const { title, items, id } = order
  const dispatch = useAppDispatch()
  const handleOpenCreateProduct = () => {
    dispatch(
      openModal({
        type: ModalType.CREATE_PRODUCT,
        props: { orderId: id },
      }),
    )
  }

  return (
    <div className={`order-details ${isOpen ? 'order-details--open' : ''}`}>
      <div className="order-details__content">
        {onClose && (
          <ActionIconButton variant="close" size={'md'} position="details" onClick={onClose} />
        )}

        <div className="order-details__header">
          <h2 className="order-details__title">
            <EllipsisTooltip
              parts={[dictOrderDetails.orderLabel, title]}
              className="ellipsis-wrapper--w-250"
            />
          </h2>

          <div className="order-details__add-btn">
            <ActionIconButton
              variant="add"
              position="inline"
              size="sm"
              onClick={handleOpenCreateProduct}
            />
            {dictOrderDetails.addProduct}
          </div>
        </div>

        <div className="order-details__table" role="table">
          {items.length === 0 ? (
            <div className="order-details__empty">{dictOrderDetails.empty}</div>
          ) : (
            items.map((item) => (
              <ProductRow
                key={item.id}
                orderId={id}
                product={item}
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
