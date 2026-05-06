'use client'

import { BaseModal } from '@/shared/ui/modals/BaseModal'
import { ModalDictionary } from '@/shared/i18n/types'
import './ConfirmCloseModal.css'
import { ActionIconButton } from '@/shared/ui/close-button/ActionIconButton'
import { ModalActionButton } from '@/shared/ui/modal-action-button/ModalActionButton'

interface Props {
  onClose: () => void
  dict: ModalDictionary
  onConfirm: () => void
  onCancel?: () => void
}

/**
 * Confirmation modal shown before closing with potential unsaved changes.
 *
 * - onConfirm → proceeds with the action (e.g. leave / discard)
 * - onCancel → optional side effect, then closes modal
 */
const ConfirmCloseModal = ({ onClose, dict, onConfirm, onCancel }: Props) => {
  const handleConfirm = () => {
    onConfirm()
  }

  const handleCancel = () => {
    onCancel?.()
    onClose()
  }

  return (
    <BaseModal onClose={handleCancel}>
      <div className="confirm-modal" aria-labelledby="confirm-modal-title">
        <ActionIconButton variant="close" position="modal" onClick={handleCancel} />

        <div className="confirm-modal__inner">
          <div className="confirm-modal__header">
            <h2 id="confirm-modal-title" className="confirm-modal__title">
              {dict.confirmCloseTitle}
            </h2>
          </div>

          <div className="confirm-modal__footer">
            <ModalActionButton variant="accentGhost" onClick={handleCancel}>
              {dict.cancelBtn}
            </ModalActionButton>

            <ModalActionButton variant="dangerPill" onClick={handleConfirm}>
              {dict.confirmLeave}
            </ModalActionButton>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}

export default ConfirmCloseModal
