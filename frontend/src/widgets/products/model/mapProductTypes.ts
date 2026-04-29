import { ProductType } from '@/entities/product-types/model/productTypeSlice'

export const mapProductTypes = (types: ProductType[], dict: Record<string, string>) => {
  return types.map((t) => ({
    value: t.key,
    label: dict[t.key] ?? t.key,
  }))
}

export const mapProductTypeLabel = (type: string, dict: Record<string, string>) => {
  return dict[type] ?? type
}
