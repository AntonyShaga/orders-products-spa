'use client'

import { useEffect, useId, useRef, useState } from 'react'
import './EllipsisTooltip.css'

type Props =
  | { text: string; parts?: never; separator?: string; className?: string }
  | {
      text?: never
      parts: (string | number | null | undefined)[]
      separator?: string
      className?: string
    }

export const EllipsisTooltip = (props: Props) => {
  const { className } = props
  const separator = props.separator ?? ' '

  const text = 'text' in props ? props.text : props.parts.filter(Boolean).join(separator)

  const ref = useRef<HTMLDivElement>(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const [visible, setVisible] = useState(false)
  const id = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const check = () => setIsOverflow(el.scrollWidth > el.clientWidth)

    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [text])

  return (
    <div
      className={`ellipsis-wrapper ${className ?? ''}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <div
        ref={ref}
        className="ellipsis-text"
        tabIndex={0}
        aria-describedby={isOverflow ? id : undefined}
      >
        {text}
      </div>

      {isOverflow && visible && (
        <div role="tooltip" id={id} className="ellipsis-tooltip">
          {text}
        </div>
      )}
    </div>
  )
}
