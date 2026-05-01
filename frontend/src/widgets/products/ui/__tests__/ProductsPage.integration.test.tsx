import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { ProductsPage } from '../ProductsPage'

import { orderReducer } from '@/entities/order/model/orderSlice'
import productTypesReducer from '@/entities/product-types/model/productTypesSlice'
import type { ProductsDictionary } from '@/shared'

jest.mock('@/widgets/charts/ProductsBarChart', () => ({
  ProductsBarChart: () => <div data-testid="chart" />,
}))

const mockOrders = [
  {
    id: '1',
    title: 'Order 1',
    date: new Date().toISOString(),
    description: 'test order',
    products: [
      {
        id: 'p1',
        title: 'iPhone',
        type: 'phone',
        serialNumber: 123,
        isNew: true,
        photo: '',
        specification: 'test',
        order: '1',
        date: new Date().toISOString(),

        guarantee: {
          start: new Date().toISOString(),
          end: new Date().toISOString(),
        },
        price: [{ value: 1000, symbol: 'USD', isDefault: true }],
      },
      {
        id: 'p2',
        title: 'MacBook',
        type: 'laptop',
        serialNumber: 456,
        photo: '',
        specification: 'test',
        order: '1', //
        date: new Date().toISOString(),
        isNew: false,
        guarantee: {
          start: new Date().toISOString(),
          end: new Date().toISOString(),
        },
        price: [{ value: 2000, symbol: 'USD', isDefault: true }],
      },
    ],
  },
]
const createStore = () =>
  configureStore({
    reducer: {
      orders: orderReducer,
      productTypes: productTypesReducer,
    },
    preloadedState: {
      orders: {
        orders: mockOrders,
        selectedOrderId: null,
      },
      productTypes: [
        { key: 'phone' as const, icon: '' },
        { key: 'laptop' as const, icon: '' },
      ],
    },
  })

const dict = {
  page: { title: 'Products' },
  toolbar: {
    filterAll: 'All',
    chartTitle: 'Chart',
    productTypes: {
      phone: 'Phone',
      laptop: 'Laptop',
    },
  },
  table: {
    name: 'Name',
    type: 'Type',
    guarantee: 'Guarantee',
    price: 'Price',
    status: 'Status',
    orderLabel: 'Order',
    empty: 'Empty',
    statusRepair: 'Repair',
    statusFree: 'Free',
    productTypes: {
      phone: 'Phone',
      laptop: 'Laptop',
    },
  },
}

describe('ProductsPage integration', () => {
  it('filters products by type', async () => {
    const store = createStore()

    render(
      <Provider store={store}>
        <ProductsPage locale="en" dict={dict as ProductsDictionary} />
      </Provider>,
    )

    expect(await screen.findByText('iPhone')).toBeInTheDocument()
    expect(screen.getByText('MacBook')).toBeInTheDocument()

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'phone' } })

    expect(await screen.findByText('iPhone')).toBeInTheDocument()
    expect(screen.queryByText('MacBook')).not.toBeInTheDocument()
  })
})
