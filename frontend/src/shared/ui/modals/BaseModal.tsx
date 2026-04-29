'use client'

import { ReactNode, useCallback, useEffect } from 'react'
import './BaseModal.css'

interface BaseModalProps {
  children: ReactNode
  onClose: () => void
  onRequestClose?: () => void
  shouldConfirmClose?: boolean
  title?: string
}

export const BaseModal = ({
  children,
  onClose,
  onRequestClose,
  shouldConfirmClose = false,
  title,
}: BaseModalProps) => {
  const handleClose = useCallback(() => {
    if (shouldConfirmClose && onRequestClose) {
      onRequestClose()
    } else {
      onClose()
    }
  }, [shouldConfirmClose, onRequestClose, onClose])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        handleClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [handleClose])

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className="modal__content">
        {title && <h2 className="modal__title">{title}</h2>}

        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}
