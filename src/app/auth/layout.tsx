import { CarpAudioLogoWhiteSvg } from '@/assests'
import Link from 'next/link'
import React from 'react'

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='relative h-dvh overflow-hidden w-full  grid items-center  bg-gradient-to-b from-[#181C1A] to-[#0D0D0D]'>
      <Link className='w-20 h-20 mx-auto absolute top-8 left-1/2 -translate-x-1/2' href='https://carpaudio.com/'>
        <CarpAudioLogoWhiteSvg />
      </Link>
      {children}
    </div>
  )
}

export default AuthLayout