import { ProductsDictionary } from '../types'

const products: ProductsDictionary = {
  page: {
    title: 'Товары',
  },
  toolbar: {
    chartTitle: 'Распределение товаров',
    filterAll: 'Все',
    productTypes: {
      phone: 'Телефон',
      laptop: 'Ноутбук',
      monitor: 'Монитор',
    },
  },
  table: {
    name: 'Название',
    type: 'Тип',
    guarantee: 'Гарантия',
    price: 'Цена',
    order: 'Приход',
    status: 'Статус',
    empty: 'Нет товаров',
    statusFree: 'Свободен',
    statusRepair: 'В ремонте',
    productTypes: {
      phone: 'Телефон',
      laptop: 'Ноутбук',
      monitor: 'Монитор',
    },
  },
}

export default products
