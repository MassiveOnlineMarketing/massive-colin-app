import React from 'react'
import Table, { UserTypeWithKeys } from './tabel'
import { getAllUsersOrders } from '@/data/user';
import AddKeysForm from './add-new-keys-form';


async function page() {

  return (
    <div>
      <Table />
      <AddKeysForm />
    </div>
  )
}

export default page