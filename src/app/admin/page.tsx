import React from 'react'
import Table, { UserTypeWithKeys } from './tabel'
import { getAllUsersOrders } from '@/data/user';
import AddKeysForm from './add-new-keys-form';
import { AdminForms } from './add-new-product';
import { auth } from '@/auth/auth';
import OrdersTable from './_orders-table';
import { getAllOrders } from '@/data/order';
import { getKeysPerProduct } from '@/data/admin';
import ProductKeyTable from './_product-keys-table';
// import { OrdersTable } from './orders-table';


async function page() {

  const session = await auth()

  if (session?.user.role !== 'ADMIN') {
    return <div>Access Denied</div>
  }
  const orders = await getAllOrders()
  const keys = await getKeysPerProduct('clxurzyj50000ihe42jmujpmk')

  return (
    <div>
      {/* <OrdersTable /> */}
      <OrdersTable orders={orders} />
      <ProductKeyTable orders={keys}/>
      <Table />
      <AddKeysForm />
      {/* <AdminForms /> */}
    </div>
  )
}

export default page