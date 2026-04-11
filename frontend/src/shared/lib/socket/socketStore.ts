import { getSocket } from './socket'

let activeSessions: number | null = null
let connected = false
let initialized = false

const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())

export const socketState = {
  get: () => ({ activeSessions, connected }),

  subscribe: (cb: () => void) => {
    listeners.add(cb)
    return () => {
      listeners.delete(cb)
    }
  },
}

export const connectSocket = () => {
  if (typeof window === 'undefined' || initialized) return

  const socket = getSocket()
  initialized = true

  socket.off('connect')
  socket.off('disconnect')
  socket.off('activeSessions')

  socket.on('connect', () => {
    connected = true
    socket.emit('getSessions')
    notify()
  })

  socket.on('disconnect', () => {
    connected = false
    activeSessions = null
    notify()
  })

  socket.on('activeSessions', (count: number) => {
    activeSessions = count
    notify()
  })

  if (!socket.connected) {
    socket.connect()
  }

  if (socket.connected) {
    connected = true
    socket.emit('getSessions')
    notify()
  }
}
