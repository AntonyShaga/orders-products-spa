'use client'

import { useAppDispatch, useAppSelector } from '@/providers/modal-provider/config/hooks'
import { ModalDictionary } from '@/shared/i18n'
import { MODAL_COMPONENTS } from '@/providers/modal-provider/config/ModalRegistry'
import React, { Suspense } from 'react'
import { closeModal } from '@/providers/modal-provider'
import { RootState } from '@/providers/store-provider'
import { Loader } from '@/shared/ui/loader/Loader'

export const ModalProvider = ({ dict }: { dict: ModalDictionary }) => {
  const dispatch = useAppDispatch()
  const modals = useAppSelector((state: RootState) => state.modal)

  if (!modals.length) return null

  return (
    <>
      {modals.map((modal, index) => {
        const ModalComponent = MODAL_COMPONENTS[modal.type] as React.ComponentType<
          typeof modal.props & { dict: ModalDictionary; onClose: () => void }
        >

        if (!ModalComponent) return null

        return (
          <Suspense key={index} fallback={<Loader className="loader--modal" />}>
            <ModalComponent {...modal.props} dict={dict} onClose={() => dispatch(closeModal())} />
          </Suspense>
        )
      })}
    </>
  )
}
