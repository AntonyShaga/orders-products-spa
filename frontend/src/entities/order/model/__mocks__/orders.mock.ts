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
        isNew: 1,
        photo: 'photo1.jpg',
        title: 'Phone 1',
        type: 'phone',
        specification: 'spec 1',
        guarantee: {
          start: '2025-01-01T00:00:00.000Z',
          end: '2026-01-01T00:00:00.000Z',
        },
        price: [
          { value: 100, symbol: 'USD', isDefault: 1 },
          { value: 4000, symbol: 'UAH', isDefault: 0 },
        ],
        order: '1',
        date: '2025-01-01T00:00:00.000Z',
      },
      {
        id: 'p2',
        serialNumber: 222,
        isNew: 0,
        photo: 'photo2.jpg',
        title: 'Laptop 1',
        type: 'laptop',
        specification: 'spec 2',
        guarantee: {
          start: '2025-01-01T00:00:00.000Z',
          end: '2026-01-01T00:00:00.000Z',
        },
        price: [
          { value: 200, symbol: 'USD', isDefault: 1 },
          { value: 8000, symbol: 'UAH', isDefault: 0 },
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
        isNew: 1,
        photo: 'photo3.jpg',
        title: 'Phone 2',
        type: 'phone',
        specification: 'spec 3',
        guarantee: {
          start: '2025-01-02T00:00:00.000Z',
          end: '2026-01-02T00:00:00.000Z',
        },
        price: [
          { value: 150, symbol: 'USD', isDefault: 1 },
          { value: 6000, symbol: 'UAH', isDefault: 0 },
        ],
        order: '2',
        date: '2025-01-02T00:00:00.000Z',
      },
    ],
  },
]
