'use client'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/providers/store-provider'
import { addOrder, setSelectedOrder } from '@/entities/order/model/orderSlice'

import { selectOrdersWithTotals } from '@/entities/order/model/selectors'
import { OrderCard } from '@/widgets/orders/ui/OrderCard/OrderCard'
import './OrderList.css'
import { useAppDispatch } from '@/providers/modal-provider/config/hooks'
import OrderDetails from '@/widgets/orders/ui/OrderDetails/OrderDetails'
import { OrdersDictionary } from '@/shared'
import { Pagination } from '@/shared/ui/pagination/Pagination'
import { usePagination } from '@/shared/lib/hooks/usePagination'
import { createOrder } from '@/shared/api/client/orders'
import { ActionIconButton } from '@/shared/ui/close-button/ActionIconButton'

interface OrdersPageState {
  dict: OrdersDictionary
  locale: string
}

export const OrderList = ({ locale, dict }: OrdersPageState) => {
  const dispatch = useAppDispatch()

  const ordersWithTotals = useSelector(selectOrdersWithTotals)
  const selectedOrderId = useSelector((state: RootState) => state.orders.selectedOrderId)

  const selectedOrder = ordersWithTotals.find((o) => o.id === selectedOrderId)

  const [isClosing, setIsClosing] = useState(false)
  const [pendingPage, setPendingPage] = useState<number | null>(null)
  const isOpen = Boolean(selectedOrder)

  const handleClose = () => {
    setIsClosing(true)
  }

  const handleInnerTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'transform') return

    if (isClosing) {
      dispatch(setSelectedOrder(null))
      setIsClosing(false)

      if (pendingPage !== null) {
        setPage(pendingPage)
        setPendingPage(null)
      }
    }
  }

  const { page, setPage, total, pageSize, paginatedData } = usePagination(ordersWithTotals, 5)

  const handlePageChange = (nextPage: number) => {
    if (isOpen) {
      setPendingPage(nextPage)
      handleClose()
      return
    }

    setPage(nextPage)
  }
  const handleCreate = async () => {
    const res = await createOrder()

    if (res.data) {
      dispatch(addOrder(res.data))
    }
  }
  return (
    <section className="order-list__section">
      <div className="order-list__header">
        <h2 className="order-list__title">{dict.page.title}</h2>

        <div className="order-list__add">
          <ActionIconButton variant="add" position="inline" size="sm" onClick={handleCreate} />
          {dict.page.addOrder}
        </div>
      </div>

      <div className={`order-list ${isOpen ? 'order-list--open' : ''}`}>
        <div className="order-list__items">
          {paginatedData.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              dictOrderCard={dict.orderCard}
              locale={locale}
              isSelected={selectedOrderId === order.id}
              isCompact={isOpen}
              total={order.total}
              onBack={handleClose}
              onSelect={() => dispatch(setSelectedOrder(order.id))}
            />
          ))}
        </div>

        <div
          className={`order-list__details ${isOpen && !isClosing ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
        >
          <div
            className={`order-list__details-inner ${isClosing ? 'closing' : ''}`}
            onTransitionEnd={handleInnerTransitionEnd}
          >
            {selectedOrder && (
              <OrderDetails
                order={selectedOrder}
                isOpen={!isClosing}
                onClose={handleClose}
                dictOrderDetails={dict.orderDetails}
                locale={locale}
              />
            )}
          </div>
        </div>
      </div>
      <Pagination page={page} total={total} pageSize={pageSize} onPageChange={handlePageChange} />
    </section>
  )
}
