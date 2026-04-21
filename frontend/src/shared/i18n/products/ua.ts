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
    order: 'Замовлення',
    status: 'Статус',
    empty: 'Немає товарів',
    statusFree: 'Вільний',
    statusRepair: 'В ремонті',
    productTypes: {
      phone: 'Телефон',
      laptop: 'Ноутбук',
      monitor: 'Монітор',
    },
  },
}

export default products
