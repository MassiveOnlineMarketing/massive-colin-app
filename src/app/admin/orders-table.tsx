import { getAllOrders } from '@/data/order'
import React from 'react'

export const OrdersTable = async () => {

  const orders = await getAllOrders()
  console.log('orders', orders)

  return (
    <div>
      OrdersTable
      <div>
        <div className='grid grid-cols-5'>
          <div className='mx-auto'><p>Order ID</p></div>
          <div className='mx-auto'><p>Order Number</p></div>
          <div className='mx-auto'><p>Customer ID</p></div>
          <div className='mx-auto'><p>Customer Name</p></div>
          <div className='mx-auto'><p>Customer Email</p></div>
        </div>
        {orders.map((order) => (
          <div key={order.id} className='grid grid-cols-5'>
            <div className='mx-auto'><p>{order.id}</p></div>
            <div className='mx-auto'><p>{order.orderNumber}</p></div>
            <div className='mx-auto'><p>{order.customerId}</p></div>
            <div className='mx-auto'><p>{order.customer.name}</p></div>
            <div className='mx-auto'><p>{order.customer.email}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}
