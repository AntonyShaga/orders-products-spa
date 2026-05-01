import { OrdersDictionary } from '../types'

const orders: OrdersDictionary = {
  page: {
    title: 'Заказы',
    addOrder: 'Добавить заказ',
    empty: 'Нет заказов',
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
  toast: {
    created: 'Заказ "{{title}}" создан',
    errorCreate: 'Ошибка при создании заказа',
  },
}

export default orders
