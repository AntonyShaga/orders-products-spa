import { modalReducer, openModal, closeModal, ModalState } from './modalSlice'
import { ModalType } from '@/providers/modal-provider/config/modalTypes'

describe('modalSlice (stack)', () => {
  const initialState: ModalState = []

  test('openModal pushes modal to stack', () => {
    const action = openModal({
      type: ModalType.DELETE,
      props: {
        mode: 'order',
        orderId: '123',
        title: 'some',
      },
    })

    const state = modalReducer(initialState, action)

    expect(state).toHaveLength(1)
    expect(state[0]).toEqual({
      type: ModalType.DELETE,
      props: {
        mode: 'order',
        orderId: '123',
        title: 'some',
      },
    })
  })

  test('openModal pushes multiple modals (stack behavior)', () => {
    const state1 = modalReducer(
      initialState,
      openModal({
        type: ModalType.DELETE,
        props: {
          mode: 'order',
          orderId: '1',
          title: 'one',
        },
      }),
    )

    const state2 = modalReducer(
      state1,
      openModal({
        type: ModalType.CONFIRM_CLOSE,
        props: {
          onConfirm: jest.fn(), // 👈 ВАЖНО: правильный payload
        },
      }),
    )

    expect(state2).toHaveLength(2)
    expect(state2[0].type).toBe(ModalType.DELETE)
    expect(state2[1].type).toBe(ModalType.CONFIRM_CLOSE)
  })

  test('closeModal pops last modal', () => {
    const openedState: ModalState = [
      {
        type: ModalType.DELETE,
        props: {
          mode: 'order',
          orderId: '1',
          title: 'one',
        },
      },
      {
        type: ModalType.CONFIRM_CLOSE,
        props: {
          onConfirm: jest.fn(),
        },
      },
    ]

    const state = modalReducer(openedState, closeModal())

    expect(state).toHaveLength(1)
    expect(state[0].type).toBe(ModalType.DELETE)
  })

  test('closeModal on single modal returns empty array', () => {
    const openedState: ModalState = [
      {
        type: ModalType.DELETE,
        props: {
          mode: 'order',
          orderId: '123',
          title: 'some',
        },
      },
    ]

    const state = modalReducer(openedState, closeModal())

    expect(state).toEqual([])
  })
})
