import { Order } from '../types'

export const mockOrders: Order[] = [
  {
    id: '1',
    title: 'Order 1',
    date: '2025-01-01T00:00:00.000Z',
    description: 'desc 1',
    products: [
      {
        id: 'p1',
        serialNumber: 111,
        isNew: true,
        photo: 'photo1.jpg',
        title: 'Phone 1',
        type: 'phone',
        specification: 'spec 1',
        guarantee: {
          start: '2025-01-01T00:00:00.000Z',
          end: '2026-01-01T00:00:00.000Z',
        },
        price: [
          { value: 100, symbol: 'USD', isDefault: true },
          { value: 4000, symbol: 'UAH', isDefault: false },
        ],
        order: '1',
        date: '2025-01-01T00:00:00.000Z',
      },
      {
        id: 'p2',
        serialNumber: 222,
        isNew: false,
        photo: 'photo2.jpg',
        title: 'Laptop 1',
        type: 'laptop',
        specification: 'spec 2',
        guarantee: {
          start: '2025-01-01T00:00:00.000Z',
          end: '2026-01-01T00:00:00.000Z',
        },
        price: [
          { value: 200, symbol: 'USD', isDefault: true },
          { value: 8000, symbol: 'UAH', isDefault: false },
        ],
        order: '1',
        date: '2025-01-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: '2',
    title: 'Order 2',
    date: '2025-01-02T00:00:00.000Z',
    description: 'desc 2',
    products: [
      {
        id: 'p3',
        serialNumber: 333,
        isNew: true,
        photo: 'photo3.jpg',
        title: 'Phone 2',
        type: 'phone',
        specification: 'spec 3',
        guarantee: {
          start: '2025-01-02T00:00:00.000Z',
          end: '2026-01-02T00:00:00.000Z',
        },
        price: [
          { value: 150, symbol: 'USD', isDefault: true },
          { value: 6000, symbol: 'UAH', isDefault: false },
        ],
        order: '2',
        date: '2025-01-02T00:00:00.000Z',
      },
    ],
  },
]
