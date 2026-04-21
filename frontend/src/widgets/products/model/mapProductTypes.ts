import { ProductsTableDictionary, ProductsToolbarDictionary } from '@/shared'

type ProductToolbarTypeKey = keyof ProductsToolbarDictionary['productTypes']
type ProductTypesDict = ProductsTableDictionary['productTypes']
type ProductTableTypeKey = keyof ProductTypesDict

export const mapProductTypes = (types: string[], dict: ProductsToolbarDictionary) => {
  return types.map((type) => {
    const key = type.toLowerCase().replace(/s$/, '') as ProductToolbarTypeKey

    return {
      value: type,
      label: dict.productTypes[key] ?? type,
    }
  })
}

export const mapProductTypeLabel = (type: string, productTypes: ProductTypesDict) => {
  const key = type.toLowerCase().replace(/s$/, '') as ProductTableTypeKey
  return productTypes[key] ?? type
}
