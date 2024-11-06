'use client';

import { TabContainer, TabContent, TabIndicatorLineAnimated, TabTitle } from '@/components/ui/tabs'
import React, { useState } from 'react'
import ProductKeyTable from './_product-keys-table'
import { KeysWithCustomer } from '@/data/admin'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import AddKeysForm from './_components/add-new-keys-form';
import { PRODUCT_ID_CONSTANTS } from '@/config/product.config';

interface TabbedTableProps {
  krossbowKeys: KeysWithCustomer[];
  ampKeys: KeysWithCustomer[];
  octapusKeys: KeysWithCustomer[];
  resonoteKeys: KeysWithCustomer[];
  reeferbKeys: KeysWithCustomer[];
  stereoKeys: KeysWithCustomer[];
  monoKeys: KeysWithCustomer[];
}

const TabbedTable = ({ krossbowKeys, ampKeys, octapusKeys, resonoteKeys, reeferbKeys, stereoKeys, monoKeys }: TabbedTableProps) => {

  const [open, setOpen] = useState(false)
  const [pluginId, setPluginId] = useState('')

  const handleClick = (productId: string) => {
    setOpen(true)
    setPluginId(productId)
  }

  return (
    <div className='max-w-[1400px] mx-auto px-12 pt-12'>
      
      <TabContainer>

        <h2 className='mt-12 mb-2 text-3xl font-semibold'>Keys</h2>
        <div className="mb-6 flex relative gap-4 font-normal text-lg pb-3 border-b-[2px] border-gray-200 w-fit">
          <TabTitle id={1}>Krossbow</TabTitle>
          <TabTitle id={2}>Amp</TabTitle>
          <TabTitle id={3}>Octapus</TabTitle>
          <TabTitle id={4}>Resonote</TabTitle>
          <TabTitle id={5}>Reeferb</TabTitle>
          <TabTitle id={6}>Stereo</TabTitle>
          <TabTitle id={7}>Mono</TabTitle>
          <TabIndicatorLineAnimated gapSize={16} />
        </div>

        <TabContent id={1}>
          <button onClick={() => handleClick(PRODUCT_ID_CONSTANTS.krossbow)}>Add key</button>
          <ProductKeyTable keys={krossbowKeys} />
        </TabContent>
        <TabContent id={2}>
          <button onClick={() => handleClick(PRODUCT_ID_CONSTANTS.amp)}>Add key</button>
          <ProductKeyTable keys={ampKeys} />
        </TabContent>
        <TabContent id={3}>
          <button onClick={() => handleClick(PRODUCT_ID_CONSTANTS.octapus)}>Add key</button>
          <ProductKeyTable keys={octapusKeys} />
        </TabContent>
        <TabContent id={4}>
          <button onClick={() => handleClick(PRODUCT_ID_CONSTANTS.resonote)}>Add key</button>
          <ProductKeyTable keys={resonoteKeys} />
        </TabContent>
        <TabContent id={5}>
          <button onClick={() => handleClick(PRODUCT_ID_CONSTANTS.reeferb)}>Add key</button>
          <ProductKeyTable keys={reeferbKeys} />
        </TabContent>
        <TabContent id={6}>
          <button onClick={() => handleClick(PRODUCT_ID_CONSTANTS.stereo)}>Add key</button>
          <ProductKeyTable keys={stereoKeys} />
        </TabContent>
        <TabContent id={7}>
          <button onClick={() => handleClick(PRODUCT_ID_CONSTANTS.mono)}>Add key</button>
          <ProductKeyTable keys={monoKeys} />
        </TabContent>
      </TabContainer>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          header
        </DialogHeader>
        <DialogContent>
          <AddKeysForm pluginId={pluginId} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TabbedTable