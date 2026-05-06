import React from 'react'
import { eventBus } from '@/shared/lib/eventBus'
import { createProduct } from '@/shared/api/client'
import { submitCreateProduct } from '@/widgets/modals/create-product/model/createProduct.submit'
import { createProductSchema } from '@/shared/schema/createProductSchema'
import { ModalDictionary } from '@/shared'
import type { ProductType } from '@/entities/product-types/model/productTypeSlice'

type ProductTypeKey = ProductType['key']
type Currency = 'USD' | 'UAH'

jest.mock('@/shared/api/client', () => ({
  createProduct: jest.fn(),
}))

jest.mock('@/shared/lib/eventBus', () => ({
  eventBus: {
    emit: jest.fn(),
  },
}))

describe('submitCreateProduct (real schema)', () => {
  const baseState = {
    title: 'Test',
    serialNumber: 123,
    type: 'phone' as ProductTypeKey,
    usd: 100,
    uah: 4000,
    defaultCurrency: 'USD' as Currency,
    setErrors: jest.fn(),
    setIsSubmitting: jest.fn(),
  }

  const dispatch = jest.fn()
  const onClose = jest.fn()

  const mockEvent = {
    preventDefault: jest.fn(),
  } as unknown as React.FormEvent<HTMLFormElement>

  const dict: ModalDictionary = {
    toast: {
      product: {
        created: 'Created {{title}}',
        errorCreate: 'Error',
      },
    },
    errors: {
      required: 'Required',
      serialMin: 'Too small',
      serialMax: 'Too big',
    },
  } as ModalDictionary

  const baseParams = {
    e: mockEvent,
    state: baseState,
    schema: createProductSchema(dict),
    orderId: '1',
    dispatch,
    onClose,
    productImages: {
      phone: 'img.png',
      laptop: 'img.png',
      monitor: 'img.png',
    },
    dict,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('handles validation error (invalid data)', async () => {
    const invalidState = {
      ...baseState,
      title: '',
    }

    await submitCreateProduct({
      ...baseParams,
      state: invalidState,
    })

    expect(baseState.setErrors).toHaveBeenCalled()
    expect(createProduct).not.toHaveBeenCalled()
  })

  it('handles success flow', async () => {
    ;(createProduct as jest.Mock).mockResolvedValue({
      data: { id: '1', title: 'Test' },
    })

    await submitCreateProduct(baseParams)

    expect(dispatch).toHaveBeenCalled()
    expect(eventBus.emit).toHaveBeenCalledWith(
      'TOAST_SHOW',
      expect.objectContaining({
        type: 'success',
      }),
    )
    expect(onClose).toHaveBeenCalled()
  })

  it('handles API error', async () => {
    ;(createProduct as jest.Mock).mockRejectedValue(new Error())

    await submitCreateProduct(baseParams)

    expect(eventBus.emit).toHaveBeenCalledWith(
      'TOAST_SHOW',
      expect.objectContaining({
        type: 'error',
      }),
    )
  })
})
