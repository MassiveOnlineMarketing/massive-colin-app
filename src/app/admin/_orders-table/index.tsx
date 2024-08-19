'use client'

import React from 'react'
import DataTable from './table'
import { columns } from './columns'
import { OrderDTO } from '@/data/order'

const OrdersTable = ({ orders }: { orders: OrderDTO[] }) => {
  return (
    <div className='max-w-[1400px] mx-auto px-12 pt-12'>
      <h2 className='mb-2 text-3xl font-bold'>Orders</h2>
      <DataTable columns={columns()} data={orders} />
    </div>
  )
}

export default OrdersTable