'use client'

import { Key } from '@prisma/client'
import React from 'react'
import { columns } from './columns'
import DataTable from './table'

const ProductKeyTable = ({ orders }: { orders: Key[] }) => {

  // const columnsArray = columns()

  return (
    <div className='mx-auto'>
      <DataTable columns={columns()} data={orders} />
    </div>
  )
}

export default ProductKeyTable