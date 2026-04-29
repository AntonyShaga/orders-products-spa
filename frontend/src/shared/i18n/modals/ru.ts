import { ModalDictionary } from '../types'

const modals: ModalDictionary = {
  deleteTitle: 'Вы уверены, что хотите удалить этот заказ?',
  cancelBtn: 'ОТМЕНИТЬ',
  confirmBtn: 'УДАЛИТЬ',
  createProductTitle: 'Создать продукт',
  createProductConfirm: 'Создать',

  confirmCloseTitle: 'У вас есть несохранённые изменения. Выйти?',
  confirmLeave: 'Выйти без сохранения',

  fields: {
    title: 'Название',
    serialNumber: 'Серийный номер (например, 123)',
    usd: 'USD',
    uah: 'UAH',
  },

  errors: {
    required: 'Обязательное поле',
    serialMin: 'Минимум 3 цифры',
    serialMax: 'Слишком большое значение',
  },

  productTypes: {
    phone: 'Телефон',
    laptop: 'Ноутбук',
    monitor: 'Монитор',
  },
}

export default modals
