'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'
import { setSelectedOrder } from '@/entities/order/model/orderSlice'

import { selectOrdersWithTotals } from '@/entities/order/model/selectors'
import { OrderCard } from '@/widgets/orders/ui/OrderCard/OrderCard'
import { OrderDetails } from '@/widgets/orders/ui/OrderDetails/OrderDetails'
import { Order } from '@/entities/order/model/types'
import './OrderList.css'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'

export const OrderList = () => {
  const dispatch = useAppDispatch()

  const ordersWithTotals = useSelector(selectOrdersWithTotals)
  const selectedOrderId = useSelector((state: RootState) => state.orders.selectedOrderId)

  const selectedOrder = ordersWithTotals.find((o) => o.id === selectedOrderId)

  const [closingOrder, setClosingOrder] = useState<Order | null>(null)
  const visibleOrder = selectedOrder ?? closingOrder
  const isDetailsShown = Boolean(selectedOrder || closingOrder)

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
        {ordersWithTotals.map((order) => {
          return (
            <OrderCard
              key={order.id}
              order={order}
              isSelected={selectedOrderId === order.id}
              isCompact={isDetailsShown}
              total={order.total}
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
