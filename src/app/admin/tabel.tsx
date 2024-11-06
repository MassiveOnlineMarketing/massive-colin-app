'use client';

import React, { useEffect } from 'react'

import { Key, User } from '@prisma/client';
import { getProductInfo } from '@/config/product.config';

import { assignKeysToNewUser } from '@/data/key';
import { getAllUsers, getAllUsersOrders } from '@/data/user';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useToast } from '@/components/toast/use-toast';

export type UserTypeWithKeys = User & {
  keys: Key[]
}

const Table = () => {
  const [customers, setCustomers] = React.useState<UserTypeWithKeys[]>([])
  useEffect(() => {
    
    fetchCustomers()
  }, [])
  const fetchCustomers = async () => {
    const customers = await getAllUsersOrders();
    setCustomers(customers)
  }
  
  const [open, setOpen] = React.useState(false)
  const [users, setUsers] = React.useState<User[]>([])
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedKey, setSelectedKey] = React.useState<Key | null>(null)

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { toast } = useToast()

  const handleClick = async (key: Key) => {
    setOpen(true)
    const users = await getAllUsers()

    setUsers(users)
    setSelectedKey(key)
  }

  const handleChangeKey = async (user: User) => {
    const res = await assignKeysToNewUser(user.id, selectedKey as Key)

    if (res.customerId === user.id) {
      fetchCustomers();
      toast({
        title: 'Key assigned to user' + user.email,
        variant: 'success',
        duration: 5000
      })
      setOpen(false)
    } else {
      toast({
        title: 'Failed to assign key',
        variant: 'destructive',
        duration: 5000
      })
    }
  }

  return (
    <div className='max-w-[1400px] mx-auto px-12 pt-12'>
      <h1 className='text-2xl'>Users with keys</h1>
      <div className='grid grid-cols-3 border-b'>
        <p>Name</p>
        <p>Email</p>
        <p>Keys</p>
      </div>
      {customers.map((customer, i) => (
        <div key={i} className='grid grid-cols-3 border-b '>
          <p>{customer.name || 'name placeholder'}</p>
          <p>{customer.email}</p>
          <div>
            {customer.keys.map((key) => (
              <div key={key.id} className='flex items-center gap-4'>
                <div>
                  <button onClick={() => handleClick(key)}>
                    re assign
                  </button>
                </div>
                <div>
                  <p>{getProductInfo(key.productId)?.name}</p>
                  <p>{key.key1}</p>
                  <p>{key.key2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <h2>Dialog</h2>
          </DialogHeader>
          <div>
            <input
              type="text"
              placeholder="Search by email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredUsers.map((user) => (
              <div key={user.id} className='flex justify-between'>
                <div>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
                <button onClick={() => handleChangeKey(user)}>migrate</button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Table