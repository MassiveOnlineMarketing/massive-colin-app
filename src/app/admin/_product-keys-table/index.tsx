'use client'

import { Key } from '@prisma/client'
import React from 'react'
import { columns } from './columns'
import DataTable from './table'

const ProductKeyTable = ({ orders }: { orders: Key[] }) => {

  // const columnsArray = columns()

  return (
    <div className='max-w-[1400px] mx-auto px-12 pt-12'>
      <h2 className='text-3xl font-bold'>Krossbow Keys</h2>
      <DataTable columns={columns()} data={orders} />
    </div>
  )
}

export default ProductKeyTable