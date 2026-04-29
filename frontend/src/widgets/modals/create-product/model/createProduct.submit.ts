import { createProduct } from '@/shared/api/client'
import { addProductToOrder } from '@/entities/order/model/orderSlice'
import { AppDispatch } from '@/providers/store-provider'
import { ZodSchema } from 'zod'
import type { ProductType } from '@/entities/product-types/model/productTypeSlice'

type ProductTypeKey = ProductType['key']
type Currency = 'USD' | 'UAH'

type CreateProductFormData = {
  title: string
  serialNumber: number
  usd: number
  uah: number
}

type SubmitCreateProductState = {
  title: string
  serialNumber: number | ''
  type: ProductTypeKey
  usd: number | ''
  uah: number | ''
  defaultCurrency: Currency
  setErrors: (errors: { title?: string; serialNumber?: string }) => void
  setIsSubmitting: (value: boolean) => void
}

type SubmitCreateProductParams = {
  e: React.FormEvent<HTMLFormElement>
  state: SubmitCreateProductState
  schema: ZodSchema<CreateProductFormData>
  orderId: string
  dispatch: AppDispatch
  onClose: () => void
  productImages: Record<ProductTypeKey, string>
}

export const submitCreateProduct = async ({
  e,
  state,
  schema,
  orderId,
  dispatch,
  onClose,
  productImages,
}: SubmitCreateProductParams) => {
  e.preventDefault()

  const result = schema.safeParse({
    title: state.title,
    serialNumber: Number(state.serialNumber) || 0,
    usd: Number(state.usd) || 0,
    uah: Number(state.uah) || 0,
  })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    state.setErrors({
      title: errors.title?.[0],
      serialNumber: errors.serialNumber?.[0],
    })

    return
  }

  state.setErrors({})
  state.setIsSubmitting(true)

  const now = new Date()
  const end = new Date(now)
  end.setDate(end.getDate() + 5)

  const payload = {
    orderId,
    title: state.title,
    serialNumber: result.data.serialNumber,
    type: state.type,
    isNew: true,
    photo: productImages[state.type],
    specification: `${state.type} device`,
    guarantee: {
      start: now.toISOString(),
      end: end.toISOString(),
    },
    price: [
      {
        value: result.data.usd,
        symbol: 'USD',
        isDefault: state.defaultCurrency === 'USD',
      },
      {
        value: result.data.uah,
        symbol: 'UAH',
        isDefault: state.defaultCurrency === 'UAH',
      },
    ],
  }

  try {
    const res = await createProduct(payload)

    if (res.data) {
      dispatch(addProductToOrder(res.data))
      onClose()
    }
  } finally {
    state.setIsSubmitting(false)
  }
}
