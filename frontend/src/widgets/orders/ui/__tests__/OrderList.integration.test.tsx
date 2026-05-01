import { ImgHTMLAttributes } from 'react'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />
  },
}))
jest.mock('@/shared/assets/icons/trash.svg', () => 'svg-mock')
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { orderReducer } from '@/entities/order/model/orderSlice'
import productTypesReducer from '@/entities/product-types/model/productTypesSlice'

jest.mock('@/shared/api/client/orders', () => ({
  createOrder: jest.fn(),
}))

import { createOrder } from '@/shared/api/client/orders'
import { OrdersDictionary } from '@/shared'
import { OrderList } from '@/widgets/orders/ui/OrderList/OrderList'

const dict: OrdersDictionary = {
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
    created: 'Order created',
    errorCreate: 'Error creating order',
  },
}

const mockOrder = {
  id: 'new-order',
  title: 'New Order',
  date: new Date().toISOString(),
  description: 'test',
  products: [],
}

const createStore = () =>
  configureStore({
    reducer: {
      orders: orderReducer,
      productTypes: productTypesReducer,
    },
    preloadedState: {
      orders: {
        orders: [],
        selectedOrderId: null,
      },
      productTypes: [],
    },
  })

describe('OrderList integration', () => {
  it('creates order and shows it in UI', async () => {
    const store = createStore()

    ;(createOrder as jest.Mock).mockResolvedValue({
      data: mockOrder,
    })

    render(
      <Provider store={store}>
        <OrderList locale="en" dict={dict as OrdersDictionary} />
      </Provider>,
    )

    expect(screen.getByText('No orders')).toBeInTheDocument()

    const addBtn = screen.getByRole('button', { name: 'Add new item' })
    fireEvent.click(addBtn)

    await waitFor(() => {
      expect(screen.getByText(/New Order/)).toBeInTheDocument()
    })

    expect(createOrder).toHaveBeenCalled()
  })
})
