import { RootState } from '@/providers/store-provider'
import { createSelector } from '@reduxjs/toolkit'

const selectOrders = (state: RootState) => state.orders.orders

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

  return (order.items ?? []).reduce(
    (acc, product) => ({
      USD: acc.USD + getPriceBySymbol(product.prices, 'USD'),
      UAH: acc.UAH + getPriceBySymbol(product.prices, 'UAH'),
    }),
    { USD: 0, UAH: 0 },
  )
}

export const selectOrdersWithTotals = createSelector([selectOrders], (orders) => {
  return orders.map((order) => ({
    ...order,
    total: order.items?.reduce(
      (acc, product) => ({
        USD: acc.USD + getPriceBySymbol(product.prices, 'USD'),
        UAH: acc.UAH + getPriceBySymbol(product.prices, 'UAH'),
      }),
      { USD: 0, UAH: 0 },
    ) ?? { USD: 0, UAH: 0 },
  }))
})
