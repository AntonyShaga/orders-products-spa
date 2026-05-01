import { OrdersDictionary } from '../types'

const orders: OrdersDictionary = {
  page: {
    title: 'Orders',
    addOrder: 'Add order',
    empty: 'No orders',
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
  toast: {
    created: 'Order "{{title}}" created',
    errorCreate: 'Error while creating order',
  },
}

export default orders
