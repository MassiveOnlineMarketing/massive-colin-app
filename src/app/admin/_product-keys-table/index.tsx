'use client'

import { Key } from '@prisma/client'
import React from 'react'
import { columns } from './columns'
import DataTable from './table'
import { KeysWithCustomer } from '@/data/admin'

const ProductKeyTable = ({ keys }: { keys: KeysWithCustomer[] }) => {

  return (
    <div className='mx-auto'>
      <DataTable columns={columns()} data={keys} />
    </div>
  )
}

export default ProductKeyTable