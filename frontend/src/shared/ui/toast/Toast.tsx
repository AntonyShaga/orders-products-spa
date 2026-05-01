'use client'

import { createPortal } from 'react-dom'
import { useToastController } from './useToastController'
import styles from './Toast.module.css'

export const Toast = () => {
  const { toasts, pause, resume, close } = useToastController()

  if (!toasts.length) return null

  return createPortal(
    <div className={styles.container}>
      {toasts.map((t, i) => (
        <div
          key={t.id}
          className={`${styles.toast} ${styles[`toast--${t.type}`]} ${
            t.visible ? styles.enter : styles.leave
          }`}
          style={{
            transform: `translateY(${i * 10}px) scale(${1 - i * 0.04})`,
            zIndex: 1000 - i,
          }}
          onMouseEnter={i === 0 ? pause : undefined}
          onMouseLeave={i === 0 ? resume : undefined}
        >
          <span className={styles.message}>{t.message}</span>

          {i === 0 && (
            <button className={styles.close} onClick={() => close(t.id)} aria-label="Close">
              ×
            </button>
          )}
        </div>
      ))}
    </div>,
    document.body,
  )
}
