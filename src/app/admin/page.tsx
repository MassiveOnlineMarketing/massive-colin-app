import React from 'react'
import Table from './tabel'
import { auth } from '@/auth/auth';
import OrdersTable from './_orders-table';
import { getAllOrders } from '@/data/order';
import { getKeysPerProduct } from '@/data/admin';
import TabbedTable from './tabbed-table';
import { PRODUCT_ID_CONSTANTS } from '@/config/product.config';


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
    </div>
  )
}

export default page