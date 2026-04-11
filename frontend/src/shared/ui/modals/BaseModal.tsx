'use client'

import { ReactNode, useEffect } from 'react'
import './BaseModal.css'

interface BaseModalProps {
  children: ReactNode
  onClose: () => void
  title?: string
}

export const BaseModal = ({ children, onClose, title }: BaseModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {title && <h2 className="modal__title">{title}</h2>}

        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}
