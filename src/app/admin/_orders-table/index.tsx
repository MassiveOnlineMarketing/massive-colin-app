'use client'

import React from 'react'
import DataTable from './table'
import { columns } from './columns'
import { OrderDTO } from '@/data/order'

const OrdersTable = ({ orders }: { orders: OrderDTO[] }) => {

  return (
    <div className='mx-auto'>
      <h2 className='text-3xl font-bold'>Orders</h2>
      <DataTable columns={columns()} data={orders} />
    </div>
  )
}

export default OrdersTable