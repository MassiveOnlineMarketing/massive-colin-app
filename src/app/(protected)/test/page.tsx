import React from 'react'
import ClientPage from './_components/client-page'
import { auth } from '@/auth/auth'

const page = async () => {
  const session = await auth()

  if (session?.user.role !== 'ADMIN') {
    return <div>Access Denied</div>
  }
  return (
    <div>
      page
      <ClientPage />
    </div>
  )
}

export default page