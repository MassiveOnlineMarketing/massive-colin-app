import React from 'react'
import Table, { UserTypeWithKeys } from './tabel'
import { getAllUsersOrders } from '@/data/user';
import AddKeysForm from './_components/add-new-keys-form';
import { AdminForms } from './add-new-product';
import { auth } from '@/auth/auth';
import OrdersTable from './_orders-table';
import { getAllOrders } from '@/data/order';
import { getKeysPerProduct } from '@/data/admin';
import ProductKeyTable from './_product-keys-table';
import TabbedTable from './tabbed-table';
import { PRODUCT_ID_CONSTANTS } from '@/lib/product-constants';
// import { OrdersTable } from './orders-table';


async function page() {

  const session = await auth()

  if (session?.user.role !== 'ADMIN') {
    return <div>Access Denied</div>
  }
  const orders = await getAllOrders()

  const productIds = Object.values(PRODUCT_ID_CONSTANTS);
  const keysPromises = productIds.map(id => getKeysPerProduct(id));
  const keysResults = await Promise.all(keysPromises);

  return (
    <div>
      <OrdersTable orders={orders} />
      <TabbedTable
        krossbowKeys={keysResults[0]}
        ampKeys={keysResults[1]}
        octapusKeys={keysResults[2]}
        resonoteKeys={keysResults[3]}
        reeferbKeys={keysResults[4]}
        stereoKeys={keysResults[5]}
        monoKeys={keysResults[6]}
      />


      <Table />
      {/* <AdminForms /> */}
    </div>
  )
}

export default page