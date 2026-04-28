export enum ModalType {
  DELETE = 'DELETE',
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  CONFIRM_CLOSE = 'CONFIRM_CLOSE',
}

export type ModalPayloadMap = {
  [ModalType.DELETE]:
    | {
        mode: 'order'
        orderId: string
        productId?: never
        title: string
        subtitle?: number
        imageUrl?: string
      }
    | {
        mode: 'product'
        orderId: string
        productId: string
        title: string
        subtitle?: number
        imageUrl?: string
      }

  [ModalType.CREATE_PRODUCT]: {
    orderId: string
  }

  [ModalType.CONFIRM_CLOSE]: {
    onConfirm: () => void
    onCancel?: () => void
  }
}
