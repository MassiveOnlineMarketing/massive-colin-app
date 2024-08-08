'use server'

import React from 'react'

import { CarpAudioLogoWhiteSvg } from '@/assests';
import { inter, oswald } from '@/styles/styles'

import LogoutButton from '@/auth/components/logout-button';
import Link from 'next/link';

type TopbarProps = {
  userName: string;
  userEmail: string;
}

const Topbar = ({ userName, userEmail }: TopbarProps) => {
  return (
    <>
      <div className="relative flex">
        <Link className="mx-auto pt-8 w-20"  href='https://carpaudio.com/'>
          <CarpAudioLogoWhiteSvg />
        </Link>
        <div className="absolute bottom-0 right-0 flex items-center justify-center h-10 ">
          <LogoutButton />
        </div>
      </div>
      <div className="flex flex-col gap-4 pb-8">
        <p className={`text-4xl ${oswald.className}`}>Welcome {userName},</p>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="px-4 py-2 bg-white text-gray-900 rounded-full w-fit">
            <p className={`${inter.className}`}>{userEmail}</p>
          </div>
          <p className={`text-5xl ${oswald.className}`}>Your Licenses</p>
        </div>
      </div>
    </>
  )
}

export default Topbar