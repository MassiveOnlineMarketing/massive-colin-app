'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '../../../routes';
import { Button } from '@/components/ui/button';


// export const ReauthenticateButton = () => {
//   return (
//     <div>
//       <p>Additional permissions are required.</p>
//       <button onClick={() => signIn('google',{ prompt: "consent", authorization: { params: { scope: 'https://www.googleapis.com/auth/webmasters.readonly' } } })}>
//         Grant Permissions
//       </button>
//     </div>
//   )
// }


export const ReauthenticateButton = () => {
  const reauthenticate = async () => {
    const res = await signIn('google', { callbackUrl: DEFAULT_LOGIN_REDIRECT },
      {
        prompt: "consent", scope: "openid email profile https://www.googleapis.com/auth/webmasters.readonly", access_type: "offline" 
      }
    );
  }

  return (
    <Button onClick={reauthenticate}>
      Grant Permissions
    </Button>
  )
}