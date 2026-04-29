import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalType, ModalPayloadMap } from '../config/modalTypes'

type ActiveModal = {
  [K in ModalType]: {
    type: K
    props: ModalPayloadMap[K]
  }
}[ModalType]

export type ModalState = ActiveModal[]

const initialState: ModalState = []

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState as ModalState,
  reducers: {
    openModal: (state, action: PayloadAction<ActiveModal>) => {
      state.push(action.payload)
    },

    closeModal: (state) => {
      state.pop()
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export const modalReducer = modalSlice.reducer
