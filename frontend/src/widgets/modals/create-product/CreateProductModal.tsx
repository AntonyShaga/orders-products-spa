'use client'

import { BaseModal } from '@/shared/ui/modals/BaseModal'
import { ModalDictionary } from '@/shared/i18n/types'
import { useAppDispatch, useAppSelector } from '@/providers/modal-provider/config/hooks'

import { useState } from 'react'

import { createProductSchema } from '@/shared/schema/createProductSchema'
import { closeModal, openModal } from '@/providers/modal-provider'
import { ModalType } from '@/providers/modal-provider/config/modalTypes'
import { RootState } from '@/providers/store-provider'
import { CreateProductForm } from '@/widgets/modals/create-product/CreateProductForm'
import { submitCreateProduct } from '@/widgets/modals/create-product/model/createProduct.submit'
import { mapProductTypes } from '@/widgets/products/model/mapProductTypes'
import { ProductType } from '@/entities/product-types/model/productTypeSlice'
type ProductTypeKey = ProductType['key']
interface CreateProductModalProps {
  onClose: () => void
  dict: ModalDictionary
  orderId: string
}

const CreateProductModal = ({ onClose, dict, orderId }: CreateProductModalProps) => {
  const dispatch = useAppDispatch()
  const schema = createProductSchema(dict)

  const productTypes = useAppSelector((state: RootState) => state.productTypes)

  const [title, setTitle] = useState('')
  const [serialNumber, setSerialNumber] = useState<number | ''>('')

  const [type, setType] = useState<ProductTypeKey>('monitor')

  const [usd, setUsd] = useState<number | ''>('')
  const [uah, setUah] = useState<number | ''>('')

  const [defaultCurrency, setDefaultCurrency] = useState<'USD' | 'UAH'>('USD')

  const [errors, setErrors] = useState<{
    title?: string
    serialNumber?: string
  }>({})

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNumber = (value: string, setter: (v: number | '') => void) => {
    if (value === '') return setter('')
    if (/^\d+$/.test(value)) setter(Number(value))
  }

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const options = mapProductTypes(productTypes, dict.productTypes)

  const productImages = Object.fromEntries(productTypes.map((t) => [t.key, t.icon])) as Record<
    ProductType['key'],
    string
  >

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    submitCreateProduct({
      e,
      schema,
      orderId,
      dispatch,
      onClose,
      productImages,
      dict,
      state: {
        title,
        serialNumber,
        type,
        usd,
        uah,
        defaultCurrency,
        setErrors,
        setIsSubmitting,
      },
    })

  const isDirty =
    title !== '' ||
    serialNumber !== '' ||
    usd !== '' ||
    uah !== '' ||
    type !== 'monitor' ||
    defaultCurrency !== 'USD'

  const modalStack = useAppSelector((state: RootState) => state.modal)

  const handleSafeClose = () => {
    if (isSubmitting) return

    const isConfirmAlreadyOpen = modalStack.some((modal) => modal.type === ModalType.CONFIRM_CLOSE)

    if (isConfirmAlreadyOpen) return

    if (!isDirty) {
      onClose()
      return
    }

    dispatch(
      openModal({
        type: ModalType.CONFIRM_CLOSE,
        props: {
          onConfirm: () => {
            dispatch(closeModal())
            onClose()
          },
        },
      }),
    )
  }

  return (
    <BaseModal onClose={onClose} shouldConfirmClose={true} onRequestClose={handleSafeClose}>
      <CreateProductForm
        dict={dict}
        title={title}
        serialNumber={serialNumber}
        type={type}
        usd={usd}
        uah={uah}
        defaultCurrency={defaultCurrency}
        errors={errors}
        isSubmitting={isSubmitting}
        options={options}
        onChangeTitle={(v) => {
          setTitle(v)
          clearError('title')
        }}
        onChangeSerial={(v) => {
          handleNumber(v, setSerialNumber)
          clearError('serialNumber')
        }}
        onChangeType={(v) => setType(v as ProductTypeKey)}
        onChangeUsd={(v) => handleNumber(v, setUsd)}
        onChangeUah={(v) => handleNumber(v, setUah)}
        onChangeCurrency={setDefaultCurrency}
        onSubmit={handleSubmit}
        onClose={handleSafeClose}
      />
    </BaseModal>
  )
}

export default CreateProductModal
