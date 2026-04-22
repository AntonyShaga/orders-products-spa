import { Product } from '@/entities/order/model/types'

type ChartItem = {
  type: string
  count: number
}

export const getProductsByType = (products: Product[]): ChartItem[] => {
  const map: Record<string, number> = {}

  for (const p of products) {
    const key = p.type || 'Unknown'
    map[key] = (map[key] ?? 0) + 1
  }

  return Object.entries(map).map(([type, count]) => ({
    type,
    count,
  }))
}
