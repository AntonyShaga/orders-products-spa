import { io, Socket } from 'socket.io-client'

const WS_URL = process.env.NEXT_PUBLIC_WS_URL!

declare global {
  var __SOCKET__: Socket | undefined
}

export const getSocket = (): Socket => {
  if (!globalThis.__SOCKET__) {
    globalThis.__SOCKET__ = io(WS_URL, {
      withCredentials: true,
    })
  }

  return globalThis.__SOCKET__
}
