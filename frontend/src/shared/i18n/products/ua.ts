import { ProductsDictionary } from '../types'

const products: ProductsDictionary = {
  page: {
    title: 'Товари',
  },
  toolbar: {
    chartTitle: 'Розподіл товарів',
    filterAll: 'Усі',
    productTypes: {
      phone: 'Телефон',
      laptop: 'Ноутбук',
      monitor: 'Монітор',
    },
  },
  table: {
    name: 'Назва',
    type: 'Тип',
    guarantee: 'Гарантія',
    price: 'Ціна',
    status: 'Статус',
    orderLabel: 'Замовлення',
    empty: 'Немає товарів',
    statusFree: 'Вільний',
    statusRepair: 'В ремонті',
    loading: 'Завантаження',
    productTypes: {
      phone: 'Телефон',
      laptop: 'Ноутбук',
      monitor: 'Монітор',
    },
  },
}

export default products
