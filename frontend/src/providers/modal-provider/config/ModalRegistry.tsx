import { lazy, ComponentType, LazyExoticComponent } from 'react'
import { ModalType, ModalPayloadMap } from './modalTypes'
import { ModalDictionary } from '@/shared/i18n/types'

type BaseModalProps = {
  onClose: () => void
  dict: ModalDictionary
}

type ModalComponent<T extends ModalType> =
  | ComponentType<ModalPayloadMap[T] & BaseModalProps>
  | LazyExoticComponent<ComponentType<ModalPayloadMap[T] & BaseModalProps>>

export const MODAL_COMPONENTS: {
  [K in ModalType]: ModalComponent<K>
} = {
  [ModalType.DELETE]: lazy(() => import('@/widgets/modals/DeleteIncomingModal')),
  [ModalType.CREATE_PRODUCT]: lazy(
    () => import('@/widgets/modals/create-product/CreateProductModal'),
  ),
  [ModalType.CONFIRM_CLOSE]: lazy(() => import('@/widgets/modals/ConfirmCloseModal')),
}
