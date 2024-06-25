import React from 'react'
import Table, { UserTypeWithKeys } from './tabel'
import { getAllUsersOrders } from '@/data/user';
import AddKeysForm from './add-new-keys-form';
import { AdminForms } from './add-new-product';
import { auth } from '@/auth/auth';


async function page() {

  const session = await auth()

  if (session?.user.role !== 'ADMIN') {
    return <div>Access Denied</div>
  }

  return (
    <div>
      <Table />
      <AddKeysForm />
      {/* <AdminForms /> */}
    </div>
  )
}

export default page