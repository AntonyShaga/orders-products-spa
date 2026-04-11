export enum ModalType {
  DELETE = 'DELETE',
}

export type ModalPayloadMap = {
  [ModalType.DELETE]: {
    id: string
    title: string
    subtitle?: number
  }
}
