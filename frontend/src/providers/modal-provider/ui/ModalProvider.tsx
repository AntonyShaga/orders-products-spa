'use client'

import { useAppDispatch, useAppSelector } from '@/providers/modal-provider/config/hooks'
import { ModalDictionary } from '@/shared/i18n'
import { MODAL_COMPONENTS } from '@/providers/modal-provider/config/ModalRegistry'
import { Suspense } from 'react'
import { closeModal } from '@/providers/modal-provider'
import { RootState } from '@/providers/store-provider'

export const ModalProvider = ({ dict }: { dict: ModalDictionary }) => {
  const dispatch = useAppDispatch()
  const modal = useAppSelector((state: RootState) => state.modal)

  if (modal.type === null || modal.props === null) return null

  const ModalComponent = MODAL_COMPONENTS[modal.type as keyof typeof MODAL_COMPONENTS]

  if (!ModalComponent) return null

  return (
    <Suspense fallback={null}>
      <ModalComponent {...modal.props} dict={dict} onClose={() => dispatch(closeModal())} />
    </Suspense>
  )
}
