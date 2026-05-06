import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ProductsPage } from '../ProductsPage'
import { orderReducer } from '@/entities/order/model/orderSlice'
import productTypesReducer from '@/entities/product-types/model/productTypesSlice'
import type { ProductsDictionary } from '@/shared'
import type { Order } from '@/entities/order/model/types'
import { filterProducts, mapOrdersToProducts } from '@/widgets/products/model/utils'

jest.mock('@/widgets/products/model/workerUrl', () => ({
  createProductsWorker: () => {
    const worker = {
      onmessage: null as ((event: MessageEvent) => void) | null,

      postMessage(message: { orders: Order[]; selectedType: string | null }) {
        const products = mapOrdersToProducts(message.orders)
        const filtered = filterProducts(products, message.selectedType)

        setTimeout(() => {
          worker.onmessage?.({ data: filtered } as MessageEvent)
        }, 0)
      },

      terminate() {},
    }

    return worker
  },
}))

jest.mock('@/widgets/charts/ProductsBarChart', () => ({
  ProductsBarChart: () => <div data-testid="chart" />,
}))

const now = new Date().toISOString()

const mockOrders: Order[] = [
  {
    id: '1',
    title: 'Order 1',
    date: now,
    description: 'test order',
    items: [
      {
        id: 'p1',
        title: 'iPhone',
        type: 'phone',
        serialNumber: 123,
        isNew: true,
        photo: '',
        specification: 'test',
        orderId: '1',
        date: now,
        guarantee: { start: now, end: now },
        prices: [{ value: 1000, symbol: 'USD', isDefault: true }],
      },
      {
        id: 'p2',
        title: 'MacBook',
        type: 'laptop',
        serialNumber: 456,
        isNew: false,
        photo: '',
        specification: 'test',
        orderId: '1',
        date: now,
        guarantee: { start: now, end: now },
        prices: [{ value: 2000, symbol: 'USD', isDefault: true }],
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
      orders: { orders: mockOrders, selectedOrderId: null },
      productTypes: [
        { key: 'phone' as const, icon: '' },
        { key: 'laptop' as const, icon: '' },
      ],
    },
  })

const dict: ProductsDictionary = {
  page: { title: 'Products' },
  toolbar: {
    filterAll: 'All',
    chartTitle: 'Chart',
    productTypes: { phone: 'Phone', laptop: 'Laptop', monitor: 'Monitor' },
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
    productTypes: { phone: 'Phone', laptop: 'Laptop', monitor: 'Monitor' },
  },
}

describe('ProductsPage integration', () => {
  it('filters products by type', async () => {
    const store = createStore()

    render(
      <Provider store={store}>
        <ProductsPage locale="en" dict={dict} />
      </Provider>,
    )

    expect(await screen.findByText('iPhone')).toBeInTheDocument()
    expect(screen.getByText('MacBook')).toBeInTheDocument()

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'phone' },
    })

    await waitFor(() => {
      expect(screen.queryByText('MacBook')).not.toBeInTheDocument()
    })

    expect(screen.getByText('iPhone')).toBeInTheDocument()
  })
})
