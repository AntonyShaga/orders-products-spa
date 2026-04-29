'use client'

import './ModalActionButton.css'
import React from 'react'

type ModalActionButtonVariant = 'secondary' | 'primary' | 'accentGhost' | 'dangerPill'

interface ModalActionButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: ModalActionButtonVariant
  onClick?: () => void
  disabled?: boolean
  className?: string
  autoFocus?: boolean
}

export const ModalActionButton = ({
  children,
  type = 'button',
  variant = 'secondary',
  onClick,
  disabled = false,
  className = '',
  autoFocus = false,
}: ModalActionButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      autoFocus={autoFocus}
      className={`modal-action-btn modal-action-btn--${variant} ${className}`.trim()}
    >
      {children}
    </button>
  )
}
