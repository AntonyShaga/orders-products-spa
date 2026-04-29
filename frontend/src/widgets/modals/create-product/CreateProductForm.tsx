'use client'

import { ModalActionButton } from '@/shared/ui/modal-action-button/ModalActionButton'
import { ActionIconButton } from '@/shared/ui/close-button/ActionIconButton'
import { ModalDictionary } from '@/shared/i18n/types'
import React from 'react'
import './CreateProductForm.css'

type Props = {
  dict: ModalDictionary

  title: string
  serialNumber: number | ''
  type: string
  usd: number | ''
  uah: number | ''
  defaultCurrency: 'USD' | 'UAH'

  errors: {
    title?: string
    serialNumber?: string
  }

  isSubmitting: boolean

  options: { value: string; label: string }[]

  onChangeTitle: (v: string) => void
  onChangeSerial: (v: string) => void
  onChangeType: (v: string) => void
  onChangeUsd: (v: string) => void
  onChangeUah: (v: string) => void
  onChangeCurrency: (v: 'USD' | 'UAH') => void

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onClose: () => void
}

export const CreateProductForm = ({
  dict,
  title,
  serialNumber,
  type,
  usd,
  uah,
  defaultCurrency,
  errors,
  isSubmitting,
  options,
  onChangeTitle,
  onChangeSerial,
  onChangeType,
  onChangeUsd,
  onChangeUah,
  onChangeCurrency,
  onSubmit,
  onClose,
}: Props) => {
  return (
    <form className="create-modal" onSubmit={onSubmit}>
      <ActionIconButton variant="close" position="modal" onClick={onClose} />

      <div className="create-modal__header">{dict.createProductTitle}</div>

      <div className="create-modal__body">
        <div>
          <input
            placeholder={dict.fields.title}
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
          />
          <span className={`error ${errors.title ? 'error--visible' : ''}`}>
            {errors.title || ''}
          </span>
        </div>

        <div>
          <input
            placeholder={dict.fields.serialNumber}
            value={serialNumber}
            onChange={(e) => onChangeSerial(e.target.value)}
          />
          <span className={`error ${errors.serialNumber ? 'error--visible' : ''}`}>
            {errors.serialNumber || ''}
          </span>
        </div>

        <select
          className="create-modal__select"
          value={type}
          onChange={(e) => onChangeType(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="create-modal__price">
          <div className="create-modal__price-row">
            <span>{dict.fields.usd}</span>

            <input value={usd} onChange={(e) => onChangeUsd(e.target.value)} />

            <input
              type="radio"
              name="currency"
              className="radio"
              checked={defaultCurrency === 'USD'}
              onChange={() => onChangeCurrency('USD')}
            />
          </div>

          <div className="create-modal__price-row">
            <span>{dict.fields.uah}</span>

            <input value={uah} onChange={(e) => onChangeUah(e.target.value)} />

            <input
              type="radio"
              name="currency"
              className="radio"
              checked={defaultCurrency === 'UAH'}
              onChange={() => onChangeCurrency('UAH')}
            />
          </div>
        </div>
      </div>

      <div className="create-modal__footer">
        <ModalActionButton variant="secondary" onClick={onClose}>
          {dict.cancelBtn}
        </ModalActionButton>

        <ModalActionButton type="submit" variant="primary" disabled={isSubmitting}>
          {dict.createProductConfirm}
        </ModalActionButton>
      </div>
    </form>
  )
}
