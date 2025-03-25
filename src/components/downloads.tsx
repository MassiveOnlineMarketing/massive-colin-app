"use server";

import Link from 'next/link'
import React from 'react'

import { getDownloadLinksAction } from '@/data/download-links';

import { AppleLogo, WindowsLogo } from '@/assests'
import { DownloadLinks } from '@prisma/client';

const Downloads = async () => {

  const downloadLinks = await getDownloadLinksAction()

  return (
    <div className='grid md:grid-cols-2 gap-10 py-[150px]'>
      {downloadLinks.map((item, index) => {
        if (item.key === 'WINDOWS') {
          return <WindowsLink key={index} item={item} />
        } else {
          return <MacLink key={index} item={item} />
        }
      })}
    </div>
  )
}


const WindowsLink = ({ item }: { item: DownloadLinks }) => {
  return (
    <div className='flex flex-col items-center  w-full'>
      <WindowsLogo className='h-[68px] text-white' />
      <p className='mt-5'>Windows / VST3</p>
      <Link className='w-full mt-8 max-w-[450px] ring-1 hover:ring-2 ring-white transition-all duration-100 ease-out rounded-full py-4 text-center' target='_blank' href={item.link}>Download Plugins</Link>
      {/*<p className='mt-4'>Prefer an Installer for Windows? <span><Link className='text-[#22C55E]' target='_blank' href='https://carpaudio.com/download_installer_win'>Download here</Link></span></p>*/}
    </div>
  )
}

const MacLink = ({ item }: { item: DownloadLinks }) => {
  return (
    <div className='flex flex-col items-center  w-full'>
      <AppleLogo className='h-[65px] text-white' />
      <p className='mt-5'>macOS / VST3 / AU</p>
      <Link className='w-full mt-8 max-w-[450px] ring-1 hover:ring-2 ring-white transition-all duration-100 ease-out rounded-full py-4 text-center' target='_blank' href={item.link}>Download Plugins</Link>
    </div>
  )
}


export default Downloads