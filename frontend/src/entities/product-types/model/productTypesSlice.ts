import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from '@/entities/product-types/model/productTypeSlice'

const initialState: ProductType[] = []

const slice = createSlice({
  name: 'productTypes',
  initialState,
  reducers: {
    setProductTypes: (_, action: PayloadAction<ProductType[]>) => action.payload,
  },
})

export const { setProductTypes } = slice.actions
export default slice.reducer
