import './CustomChartTooltip.css'
type CustomChartTooltipProps = {
  active?: boolean
  payload?: Array<{
    value: number
    payload: {
      type: string
      count: number
    }
  }>
}

export function CustomChartTooltip({ active, payload }: CustomChartTooltipProps) {
  if (!active || !payload?.length) return null

  const item = payload[0]?.payload

  return (
    <div className="products-chart-tooltip">
      <div className="products-chart-tooltip__title">{item.type}</div>
      <div className="products-chart-tooltip__value">Count: {item.count}</div>
    </div>
  )
}
