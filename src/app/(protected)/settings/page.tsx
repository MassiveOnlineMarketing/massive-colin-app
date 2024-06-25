import { auth, signOut } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { ReauthenticateButton } from '@/auth/components/reauthenticate-button'
import React from 'react'

const page = async () => {
  const session = await auth()

  return (
    <div>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
      <form action={async () => {
        'use server'

        await signOut()
      }}
      >
        <Button type='submit'>Logout</Button>
      </form>



      <ReauthenticateButton />

    </div>
  )
}

export default page