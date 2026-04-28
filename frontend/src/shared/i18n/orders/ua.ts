import { OrdersDictionary } from '../types'

const orders: OrdersDictionary = {
  page: {
    title: 'Замовлення',
    addOrder: 'Додати замовлення',
  },
  orderCard: {
    orderLabel: 'Замовлення',
    product: {
      one: 'продукт',
      few: 'продукти',
      many: 'продуктів',
    },
  },
  orderDetails: {
    empty: 'Немає товарів',
    orderLabel: 'Замовлення',
    addProduct: 'Додати продукт',
    status: {
      orderLabel: 'Замовлення',
      free: 'Вільний',
      repair: 'В ремонті',
    },
  },
}

export default orders
