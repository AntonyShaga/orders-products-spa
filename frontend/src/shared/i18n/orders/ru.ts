import { OrdersDictionary } from '../types'

const orders: OrdersDictionary = {
  page: {
    title: 'Заказы',
    addOrder: 'Добавить заказ',
  },
  orderCard: {
    orderLabel: 'Заказ',
    product: {
      one: 'продукт',
      few: 'продукта',
      many: 'продуктов',
    },
  },
  orderDetails: {
    empty: 'Нет товаров',
    orderLabel: 'Заказ',
    addProduct: 'Добавить продукт',
    status: {
      orderLabel: 'Заказ',
      free: 'Свободен',
      repair: 'В ремонте',
    },
  },
}

export default orders
