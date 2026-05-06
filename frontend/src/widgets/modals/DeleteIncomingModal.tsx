'use client'

import { BaseModal } from '@/shared/ui/modals/BaseModal'
import { ModalDictionary } from '@/shared/i18n/types'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import { removeOrder, removeProductFromOrder, setOrders } from '@/entities/order/model/orderSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'

import './DeleteIncomingModal.css'
import { deleteOrder, deleteProduct } from '@/shared/api/client'
import { ActionIconButton } from '@/shared/ui/close-button/ActionIconButton'
import { ModalActionButton } from '@/shared/ui/modal-action-button/ModalActionButton'
import Image from 'next/image'
import { eventBus } from '@/shared/lib/eventBus'

type DeleteModalProps = (
  | {
      mode: 'order'
      orderId: string
      productId?: never
    }
  | {
      mode: 'product'
      orderId: string
      productId: string
    }
) & {
  onClose: () => void
  dict: ModalDictionary
  title: string
  subtitle?: number
  imageUrl?: string
}
/**
 * Modal for deleting an order or product.
 *
 * Supports two modes:
 * - order deletion
 * - product deletion within an order
 *
 * Uses optimistic update with rollback on failure.
 */
const DeleteIncomingModal = ({
  onClose,
  dict,
  productId,
  orderId,
  title,
  subtitle,
  imageUrl,
  mode,
}: DeleteModalProps) => {
  const dispatch = useAppDispatch()
  const orders = useSelector((state: RootState) => state.orders.orders)

  // Performs optimistic deletion with rollback on API failure
  const handleDelete = async () => {
    // Save previous state for rollback in case API request fails
    const prevOrders = [...orders]
    const isOrder = mode === 'order'

    if (isOrder) {
      dispatch(removeOrder(orderId))
    } else {
      dispatch(removeProductFromOrder({ orderId, productId }))
    }

    try {
      if (isOrder) {
        await deleteOrder(orderId)

        eventBus.emit('TOAST_SHOW', {
          message: dict.toast.order.deleted.replace('{{title}}', title),
          type: 'info',
        })
      } else {
        await deleteProduct(productId)

        eventBus.emit('TOAST_SHOW', {
          message: dict.toast.product.deleted.replace('{{title}}', title),
          type: 'info',
        })
      }

      onClose()
    } catch {
      // Optimistically update UI before server response
      dispatch(setOrders(prevOrders))

      eventBus.emit('TOAST_SHOW', {
        message: isOrder ? dict.toast.order.errorDelete : dict.toast.product.errorDelete,
        type: 'error',
      })
    }
  }

  return (
    <BaseModal onClose={onClose}>
      <div
        className="delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        <ActionIconButton variant="close" position="modal" onClick={onClose} />

        <div className="confirm-modal__inner">
          <div className="delete-modal__header">
            <h2 id="delete-modal-title" className="delete-modal__title">
              {dict.deleteTitle}
            </h2>
          </div>

          <div className="delete-modal__body">
            <div className="delete-modal__product">
              {imageUrl && (
                <div className="delete-modal__image-wrapper">
                  <Image src={imageUrl} alt={title} className="delete-modal__image" />
                </div>
              )}

              <div className="delete-modal__info">
                <div className="delete-modal__product-title">{title}</div>

                {subtitle != null && <div className="delete-modal__serial">{subtitle}</div>}
              </div>
            </div>
          </div>

          <div className="delete-modal__footer">
            <ModalActionButton variant="accentGhost" onClick={onClose} type="button">
              {dict.cancelBtn}
            </ModalActionButton>

            <ModalActionButton variant="dangerPill" onClick={handleDelete} type="button" autoFocus>
              {dict.confirmBtn}
            </ModalActionButton>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}

export default DeleteIncomingModal
