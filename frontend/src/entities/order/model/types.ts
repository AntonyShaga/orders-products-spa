export interface Price {
  value: number
  symbol: string
  isDefault: boolean
}

export interface Guarantee {
  start: string
  end: string
}

export interface OrderItem {
  id: string
  serialNumber: number
  isNew: boolean
  photo: string
  title: string
  type: string
  specification: string
  guarantee: Guarantee
  prices: Price[]
  orderId: string
  date: string
}

export interface Order {
  id: string
  title: string
  date: string
  description: string
  items: OrderItem[]
}

export type CreateOrderItemPayload = {
  orderId: string
  title: string
  serialNumber: number
  type: string
  isNew: boolean
  photo: string
  specification: string
  guarantee: Guarantee
  prices: Price[]
}
