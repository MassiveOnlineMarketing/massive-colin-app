import { TabContainer, TabContent, TabIndicatorLineAnimated, TabTitle } from '@/components/ui/tabs'
import React from 'react'
import OrdersTable from './_orders-table'
import ProductKeyTable from './_product-keys-table'
import { getKeysPerProduct } from '@/data/admin'
import { getAllOrders } from '@/data/order'
import { auth } from '@/auth/auth'

const TabbedTable = async () => {
  const session = await auth()

  if (session?.user.role !== 'ADMIN') {
    return <div>Access Denied</div>
  }
  const orders = await getAllOrders()
  const keys = await getKeysPerProduct('clxurzyj50000ihe42jmujpmk')

  return (
    <div className='max-w-[1400px] mx-auto px-12 pt-12'>
      <OrdersTable orders={orders} />
      <TabContainer>
        <div className="mb-6 flex relative gap-4 font-normal text-lg pb-3 border-b-[2px] border-gray-200 w-fit">
          <TabTitle id={1}>Krossbow</TabTitle>
          <TabTitle id={2}>Tab 2</TabTitle>
          <TabTitle id={3}>Tab 3</TabTitle>
          <TabIndicatorLineAnimated gapSize={16} />
        </div>

        <TabContent id={1}>
          <ProductKeyTable orders={keys} />
        </TabContent>
        <TabContent id={2}>
          s
        </TabContent>
        <TabContent id={3}>
          p
        </TabContent>

      </TabContainer>
    </div>
  )
}

export default TabbedTable