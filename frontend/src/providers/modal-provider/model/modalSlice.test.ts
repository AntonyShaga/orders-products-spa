import { modalReducer, openModal, closeModal, ModalState } from './modalSlice'
import { ModalType } from '@/providers/modal-provider/config/modalTypes'

describe('modalSlice', () => {
  const initialState: ModalState = {
    type: null,
    props: null,
  }

  test('openModal sets modal type and props', () => {
    const action = openModal({
      type: ModalType.DELETE,
      props: { id: '123', title: 'some' },
    })

    const state = modalReducer(initialState, action)

    expect(state.type).toBe(ModalType.DELETE)
    expect(state.props).toEqual({ id: '123', title: 'some' })
  })

  test('closeModal resets state', () => {
    const openedState: ModalState = {
      type: ModalType.DELETE,
      props: { id: '123', title: 'some' },
    }

    const state = modalReducer(openedState, closeModal())

    expect(state).toEqual(initialState)
  })
})
