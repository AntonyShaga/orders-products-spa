import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalType, ModalPayloadMap } from '../config/modalTypes'

export type ModalState =
  | { type: null; props: null }
  | {
      [K in ModalType]: {
        type: K
        props: ModalPayloadMap[K]
      }
    }[ModalType]

const initialState = {
  type: null,
  props: null,
} as ModalState

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state: ModalState,
      action: PayloadAction<
        {
          [K in ModalType]: {
            type: K
            props: ModalPayloadMap[K]
          }
        }[ModalType]
      >,
    ) => {
      state.type = action.payload.type
      state.props = action.payload.props
    },

    closeModal: () => initialState,
  },
})

export const { openModal, closeModal } = modalSlice.actions
export const modalReducer = modalSlice.reducer
