import { OrderItem } from '@/entities/order/model/types'

type ChartItem = {
  type: string
  count: number
}
/**
 * Aggregates products by type and returns data for charts.
 *
 * - Groups products by `type`
 * - Counts how many products belong to each type
 * - Fallback to "Unknown" if type is missing
 *
 * Used for building chart datasets (e.g. Recharts).
 */
export const getProductsByType = (products: OrderItem[]): ChartItem[] => {
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
