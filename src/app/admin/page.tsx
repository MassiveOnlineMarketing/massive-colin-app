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
import TabbedTable from './tabbed-table';
// import { OrdersTable } from './orders-table';


async function page() {



  return (
    <div>
      {/* <OrdersTable /> */}
      <TabbedTable />

      <Table />
      <AddKeysForm />
      {/* <AdminForms /> */}
    </div>
  )
}

export default page