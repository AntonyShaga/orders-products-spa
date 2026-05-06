'use client'

import './Loader.css'

type Props = {
  className?: string
}

export function Loader({ className = '' }: Props) {
  return (
    <div className={`loader ${className}`}>
      <div className="loader__spinner" />
    </div>
  )
}
