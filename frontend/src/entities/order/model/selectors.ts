import { RootState } from '@/providers/store-provider'

export const getPriceBySymbol = (
  prices: { value: number; symbol: string }[] | undefined,
  symbol: string,
) => {
  if (!prices) return 0

  return prices.find((p) => p.symbol === symbol)?.value || 0
}

export const selectOrderTotal = (state: RootState, orderId: string) => {
  const order = state.orders.orders.find((o) => o.id === orderId)
  if (!order) return { USD: 0, UAH: 0 }

  return (order.products ?? []).reduce(
    (acc, product) => ({
      USD: acc.USD + getPriceBySymbol(product.price, 'USD'),
      UAH: acc.UAH + getPriceBySymbol(product.price, 'UAH'),
    }),
    { USD: 0, UAH: 0 },
  )
}

export const selectOrdersWithTotals = (state: RootState) => {
  return state.orders.orders.map((order) => ({
    ...order,
    total: selectOrderTotal(state, order.id),
  }))
}
