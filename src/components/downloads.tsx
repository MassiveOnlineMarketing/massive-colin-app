import { AppleLogo, WindowsLogo } from '@/assests'
import Link from 'next/link'
import React from 'react'

const Downloads = () => {
  return (
    <div className='grid md:grid-cols-2 gap-10 py-[150px]'>
      <div className='flex flex-col items-center  w-full'>
        <WindowsLogo className='h-[68px] text-white' />
        <p className='mt-5'>Windows / VST3</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/oygbzxyv24nqfsbsvk72d/All-CARP-Audio-Plugins-Win.zip?rlkey=933ua6p36r3afi2vtachtcpac&st=a5qxn3nz&dl=1'>Download Plugins</Link>
        <p className='mt-4'>Prefer an Installer for Windows? <span><Link className='text-[#2A6C41]' href='https://dl.dropboxusercontent.com/scl/fi/ad64v35nrijrilv7glmz5/CARP-Audio-Plugin-Installer-Win.zip?rlkey=l61dl0q8c6tvgr8742a2scse8&st=p67sop2p&dl=1'>Download here</Link></span></p>
      </div>
      <div className='flex flex-col items-center  w-full'>
        <AppleLogo className='h-[65px] text-white'/>
        <p className='mt-5'>Mac OS 10.15 or Higher / VST3 / AU</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/1yulbi5hi373yfiedshpk/All-CARP-Audio-Plugins-MacOS.zip?rlkey=mcydyfw42dsw8fqco6de0bzvq&st=ny1c8mhd&dl=1'>Download Plugins</Link>
      </div>
    </div>
  )
}

export default Downloads