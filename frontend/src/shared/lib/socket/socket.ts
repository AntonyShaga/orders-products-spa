import { io, Socket } from 'socket.io-client'

declare global {
  var __SOCKET__: Socket | undefined
}

export const getSocket = (): Socket => {
  if (!globalThis.__SOCKET__) {
    globalThis.__SOCKET__ = io({
      path: '/socket.io',
      withCredentials: true,
    })
  }

  return globalThis.__SOCKET__
}
