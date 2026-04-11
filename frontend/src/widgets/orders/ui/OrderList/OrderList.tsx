'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'
import { setSelectedOrder, setOrders } from '@/entities/order/model/orderSlice'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import { selectOrderTotal } from '@/entities/order/model/selectors'
import { OrderCard } from '@/widgets/orders/ui/OrderCard/OrderCard'
import { OrderDetails } from '@/widgets/orders/ui/OrderDetails/OrderDetails'
import { Order } from '@/entities/order/model/types'

import './OrderList.css'

interface OrderListProps {
  initialOrders: Order[]
}

export const OrderList = ({ initialOrders }: OrderListProps) => {
  const dispatch = useAppDispatch()

  const { orders, selectedOrderId } = useSelector((state: RootState) => state.orders)

  const selectedOrder = orders.find((o) => o.id === selectedOrderId)

  const [closingOrder, setClosingOrder] = useState<Order | null>(null)
  const visibleOrder = selectedOrder ?? closingOrder
  const isDetailsShown = Boolean(selectedOrder || closingOrder)

  useEffect(() => {
    if (orders.length === 0 && initialOrders?.length) {
      dispatch(setOrders(initialOrders))
    }
  }, [initialOrders, orders.length, dispatch])

  const handleCloseDetails = () => {
    if (!selectedOrder) return
    setClosingOrder(selectedOrder)
    dispatch(setSelectedOrder(null))
  }

  const handleDetailsExited = () => {
    setClosingOrder(null)
  }

  return (
    <section className={`order-list ${isDetailsShown ? 'order-list--open' : ''}`}>
      <div className="order-list__items">
        {orders.map((order) => {
          const total = selectOrderTotal({ orders: { orders } } as RootState, order.id)

          return (
            <OrderCard
              key={order.id}
              order={order}
              isSelected={selectedOrderId === order.id}
              isCompact={isDetailsShown}
              total={total}
              onSelect={() => dispatch(setSelectedOrder(order.id))}
            />
          )
        })}
      </div>

      {visibleOrder && (
        <OrderDetails
          order={visibleOrder}
          isOpen={Boolean(selectedOrder)}
          onClose={handleCloseDetails}
          onExited={handleDetailsExited}
        />
      )}
    </section>
  )
}
