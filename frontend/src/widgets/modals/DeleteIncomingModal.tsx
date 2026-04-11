'use client'

import { BaseModal } from '@/shared/ui/modals/BaseModal'
import { ModalDictionary } from '@/shared/i18n/types'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import { removeOrder, setOrders } from '@/entities/order/model/orderSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'

import './DeleteIncomingModal.css'
import { deleteOrder } from '@/shared/api/client'

interface DeleteModalProps {
  onClose: () => void
  title: string
  subtitle?: number
  dict: ModalDictionary
  id: string
}

const DeleteIncomingModal = ({ onClose, dict, id, title, subtitle }: DeleteModalProps) => {
  const dispatch = useAppDispatch()
  const orders = useSelector((state: RootState) => state.orders.orders)

  const handleDelete = async () => {
    const prevOrders = [...orders]

    dispatch(removeOrder(id))

    try {
      await deleteOrder(id)
      onClose()
    } catch {
      dispatch(setOrders(prevOrders))
    }
  }

  return (
    <BaseModal onClose={onClose}>
      <div className="delete-modal">
        <button
          type="button"
          className="delete-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="delete-modal__header">
          <h2 className="delete-modal__title">{dict.deleteTitle}</h2>
        </div>

        <div className="delete-modal__body">
          <div className="delete-modal__product">
            <span className="delete-modal__status-dot" />

            <div className="delete-modal__image-wrapper">
              <img src="/monitor.png" alt="Product" className="delete-modal__image" />
            </div>

            <div className="delete-modal__info">
              <div className="delete-modal__product-title">{title}</div>

              {subtitle != null && <div className="delete-modal__serial">{subtitle}</div>}
            </div>
          </div>
        </div>

        <div className="delete-modal__footer">
          <button type="button" className="delete-modal__cancel" onClick={onClose}>
            {dict.cancelBtn}
          </button>

          <button type="button" className="delete-modal__delete" onClick={handleDelete}>
            {dict.confirmBtn}
          </button>
        </div>
      </div>
    </BaseModal>
  )
}

export default DeleteIncomingModal
