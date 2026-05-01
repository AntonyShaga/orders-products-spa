import { ModalDictionary } from '../types'

const modals: ModalDictionary = {
  deleteTitle: 'Ви впевнені, що хочете видалити це замовлення?',
  cancelBtn: 'СКАСУВАТИ',
  confirmBtn: 'ВИДАЛИТИ',
  createProductTitle: 'Створити продукт',
  createProductConfirm: 'Створити',

  confirmCloseTitle: 'У вас є незбережені зміни. Вийти?',
  confirmLeave: 'Вийти без збереження',

  fields: {
    title: 'Назва',
    serialNumber: 'Серійний номер (наприклад, 123)',
    usd: 'USD',
    uah: 'UAH',
  },

  errors: {
    required: "Обов'язкове поле",
    serialMin: 'Мінімум 3 цифри',
    serialMax: 'Занадто велике значення',
  },

  productTypes: {
    phone: 'Телефон',
    laptop: 'Ноутбук',
    monitor: 'Монітор',
  },
  toast: {
    product: {
      created: 'Продукт "{{title}}" створено',
      deleted: 'Продукт "{{title}}" видалено',
      errorCreate: 'Помилка при створенні продукту',
      errorDelete: 'Помилка при видаленні продукту',
    },
    order: {
      created: 'Замовлення "{{title}}" створено',
      deleted: 'Замовлення "{{title}}" видалено',
      errorCreate: 'Помилка при створенні замовлення',
      errorDelete: 'Помилка при видаленні замовлення',
    },
  },
}

export default modals
