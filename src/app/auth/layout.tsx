import React from 'react'

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='w-full grid items-center h-screen bg-gradient-to-b from-[#181C1A] to-[#0D0D0D]'> 
      {children}
    </div>
  )
}

export default AuthLayout