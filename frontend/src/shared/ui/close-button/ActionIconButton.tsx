'use client'

import './ActionIconButton.css'

type Variant = 'close' | 'add'
type Size = 'sm' | 'md' | 'lg'
type Position = 'modal' | 'details' | 'inline'

type Props = {
  onClick: () => void
  variant: Variant
  size?: Size
  position?: Position
  className?: string
  ariaLabel?: string
}

const ARIA_LABELS: Record<Variant, string> = {
  close: 'Close modal',
  add: 'Add new item',
}

export const ActionIconButton = ({
  onClick,
  variant,
  size = 'lg',
  position = 'inline',
  className = '',
  ariaLabel,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? ARIA_LABELS[variant]}
      className={`action-icon action-icon--${variant} action-icon--${size} action-icon--${position} ${className}`}
    >
      <svg viewBox="0 0 24 24">
        {variant === 'close' ? (
          <>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </>
        ) : (
          <>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </>
        )}
      </svg>
    </button>
  )
}
