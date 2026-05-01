type ToastType = 'success' | 'error' | 'info'

export type EventMap = {
  TOAST_SHOW: { message: string; type: ToastType }
}

type EventKey = keyof EventMap

type Handler<K extends EventKey> = (payload: EventMap[K]) => void

class EventBus {
  private listeners: Record<EventKey, Set<(payload: unknown) => void>> = {
    TOAST_SHOW: new Set(),
  }

  on<K extends EventKey>(event: K, cb: Handler<K>) {
    this.listeners[event].add(cb as (payload: unknown) => void)
  }

  off<K extends EventKey>(event: K, cb: Handler<K>) {
    this.listeners[event].delete(cb as (payload: unknown) => void)
  }

  emit<K extends EventKey>(event: K, payload: EventMap[K]) {
    this.listeners[event].forEach((cb) => {
      ;(cb as Handler<K>)(payload)
    })
  }
}

export const eventBus = new EventBus()
