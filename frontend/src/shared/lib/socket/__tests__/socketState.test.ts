jest.mock('../socket', () => ({
  getSocket: jest.fn(),
}))

describe('socketState integration', () => {
  type SocketEvents = {
    connect: () => void
    disconnect: () => void
    activeSessions: (count: number) => void
  }

  let handlers: Partial<SocketEvents>

  let mockSocket: {
    on: jest.Mock
    off: jest.Mock
    emit: jest.Mock
    connect: jest.Mock
    connected: boolean
  }

  let connectSocket: () => void
  let socketState: {
    get: () => { activeSessions: number | null; connected: boolean }
  }

  let getSocket: jest.Mock

  beforeEach(() => {
    jest.resetModules()

    handlers = {}

    mockSocket = {
      on: jest.fn(<K extends keyof SocketEvents>(event: K, cb: SocketEvents[K]) => {
        handlers[event] = cb
      }),
      off: jest.fn(),
      emit: jest.fn(),
      connect: jest.fn(),
      connected: false,
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const socketModule = require('../socket')
    getSocket = socketModule.getSocket
    getSocket.mockReturnValue(mockSocket)

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const storeModule = require('../socketStore')
    connectSocket = storeModule.connectSocket
    socketState = storeModule.socketState
  })
  it('connect + activeSessions', () => {
    connectSocket()

    expect(handlers.connect).toBeDefined()

    handlers.connect!()

    let state = socketState.get()
    expect(state.connected).toBe(true)

    handlers.activeSessions!(5)

    state = socketState.get()
    expect(state.activeSessions).toBe(5)
  })

  it('disconnect', () => {
    connectSocket()

    handlers.connect!()
    handlers.activeSessions!(3)

    handlers.disconnect!()

    const state = socketState.get()

    expect(state.connected).toBe(false)
    expect(state.activeSessions).toBe(null)
  })
})
