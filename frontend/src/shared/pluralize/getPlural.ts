import { OrderCardDictionary } from '@/shared'

type ProductPlural = OrderCardDictionary['product']

export const getPlural = (count: number, dict: ProductPlural) => {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) return dict.one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return dict.few

  return dict.many
}
