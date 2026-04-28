import { OrdersDictionary } from '../types'

const orders: OrdersDictionary = {
  page: {
    title: 'Orders',
    addOrder: 'Add order',
  },
  orderCard: {
    orderLabel: 'Order',
    product: {
      one: 'product',
      few: 'products',
      many: 'products',
    },
  },
  orderDetails: {
    orderLabel: 'Order',
    empty: 'No products',
    addProduct: 'Add product',
    status: {
      orderLabel: 'Order',
      free: 'Free',
      repair: 'In repair',
    },
  },
}

export default orders
