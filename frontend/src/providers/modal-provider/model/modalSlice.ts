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

const initialState: ModalState = {
  type: null,
  props: null,
} as ModalState

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<
        {
          [K in ModalType]: {
            type: K
            props: ModalPayloadMap[K]
          }
        }[ModalType]
      >,
    ) => {
      return {
        type: action.payload.type,
        props: action.payload.props,
      }
    },

    closeModal: () => initialState,
  },
})

export const { openModal, closeModal } = modalSlice.actions
export const modalReducer = modalSlice.reducer
