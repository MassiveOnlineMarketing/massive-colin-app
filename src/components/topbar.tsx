'use server'

import React from 'react'

import { CarpAudioLogoWhiteSvg } from '@/assests';
import { inter, oswald } from '@/styles/styles'

import LogoutButton from '@/auth/components/logout-button';

type TopbarProps = {
  userName: string;
  userEmail: string;
}

const Topbar = ({ userName, userEmail }: TopbarProps) => {
  return (
    <>
      <div className="relative flex">
        <CarpAudioLogoWhiteSvg className="mx-auto py-8 w-[120px]" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0">
          <LogoutButton />
        </div>
      </div>
      <div className="flex flex-col gap-8 pb-8">
        <p className={`text-2xl ${oswald.className}`}>Welcome {userName},</p>
        <div className="flex items-center justify-between">
          <div className="px-4 py-2 bg-white text-gray-900 rounded-full">
            <p className={`${inter.className}`}>{userEmail}</p>
          </div>
          <p className={`text-4xl font-bold ${oswald.className}`}>My Plugins</p>
        </div>
      </div>
    </>
  )
}

export default Topbar