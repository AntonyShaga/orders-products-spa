'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'
import { setSelectedOrder } from '@/entities/order/model/orderSlice'

import { selectOrdersWithTotals } from '@/entities/order/model/selectors'
import { OrderCard } from '@/widgets/orders/ui/OrderCard/OrderCard'
import './OrderList.css'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import OrderDetails from '@/widgets/orders/ui/OrderDetails/OrderDetails'

export const OrderList = () => {
  const dispatch = useAppDispatch()

  const ordersWithTotals = useSelector(selectOrdersWithTotals)
  const selectedOrderId = useSelector((state: RootState) => state.orders.selectedOrderId)

  const selectedOrder = ordersWithTotals.find((o) => o.id === selectedOrderId)

  const [isClosing, setIsClosing] = useState(false)

  const isOpen = Boolean(selectedOrder) && !isClosing

  const handleClose = () => {
    setIsClosing(true)
  }

  const handleTransitionEnd = () => {
    if (isClosing) {
      dispatch(setSelectedOrder(null))
      setIsClosing(false)
    }
  }

  return (
    <section className={`order-list ${isOpen ? 'order-list--open' : ''}`}>
      <div className="order-list__items">
        {ordersWithTotals.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isSelected={selectedOrderId === order.id}
            isCompact={isOpen}
            total={order.total}
            onBack={handleClose}
            onSelect={() => dispatch(setSelectedOrder(order.id))}
          />
        ))}
      </div>

      <div
        className={`order-list__details ${isOpen ? 'open' : ''}`}
        onTransitionEnd={handleTransitionEnd}
      >
        {selectedOrder && (
          <OrderDetails order={selectedOrder} isOpen={isOpen} onClose={handleClose} />
        )}
      </div>
    </section>
  )
}
