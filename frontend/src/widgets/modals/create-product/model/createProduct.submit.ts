import { createProduct } from '@/shared/api/client'
import { addProductToOrder } from '@/entities/order/model/orderSlice'
import { AppDispatch } from '@/providers/store-provider'
import { ZodSchema } from 'zod'
import type { ProductType } from '@/entities/product-types/model/productTypeSlice'
import { eventBus } from '@/shared/lib/eventBus'
import { ModalDictionary } from '@/shared'
import { CreateOrderItemPayload } from '@/entities/order/model/types'

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
  dict: ModalDictionary
}

/**
 * Handles product creation form submission.
 *
 * Flow:
 * 1. Prevent default form submit
 * 2. Validate form data using Zod schema
 * 3. If invalid → set form errors and exit
 * 4. If valid → build payload and send API request
 * 5. On success → update store + show success toast + close modal
 * 6. On error → show error toast
 * 7. Always → reset submitting state
 *
 * Notes:
 * - Uses optimistic UX (no blocking before API)
 * - Converts form values (string | number) to numbers
 * - Generates guarantee period (now → +5 days)
 */
export const submitCreateProduct = async ({
  e,
  state,
  schema,
  orderId,
  dispatch,
  onClose,
  productImages,
  dict,
}: SubmitCreateProductParams) => {
  e.preventDefault()

  // Validate form input
  const result = schema.safeParse({
    title: state.title,
    serialNumber: Number(state.serialNumber) || 0,
    usd: Number(state.usd) || 0,
    uah: Number(state.uah) || 0,
  })

  // Handle validation errors
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

  // Generate guarantee period (now → +5 days)
  const now = new Date()
  const end = new Date(now)
  end.setDate(end.getDate() + 5)

  // Build API payload
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
    prices: [
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
  } satisfies CreateOrderItemPayload

  try {
    const res = await createProduct(payload)

    if (res.data) {
      // Update store with new product
      dispatch(addProductToOrder(res.data))

      // Notify user
      eventBus.emit('TOAST_SHOW', {
        message: dict.toast.product.created.replace('{{title}}', res.data.title),
        type: 'success',
      })

      onClose()
    }
  } catch {
    // Handle API failure
    eventBus.emit('TOAST_SHOW', {
      message: dict.toast.product.errorCreate,
      type: 'error',
    })
  } finally {
    state.setIsSubmitting(false)
  }
}
