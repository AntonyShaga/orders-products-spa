export interface Price {
  value: number
  symbol: string
  isDefault: number
}

export interface Guarantee {
  start: string
  end: string
}

export interface Product {
  id: string
  serialNumber: number
  isNew: boolean
  photo: string
  title: string
  type: string
  specification: string
  guarantee: Guarantee
  price: Price[]
  order: string
  date: string
}

export interface Order {
  id: string
  title: string
  date: string
  description: string
  products: Product[]
}
