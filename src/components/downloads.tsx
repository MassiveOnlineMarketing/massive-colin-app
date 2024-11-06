import { AppleLogo, WindowsLogo } from '@/assests'
import Link from 'next/link'
import React from 'react'

const Downloads = () => {
  return (
    <div className='grid md:grid-cols-2 gap-10 py-[150px]'>
      <div className='flex flex-col items-center  w-full'>
        <WindowsLogo className='h-[68px] text-white' />
        <p className='mt-5'>Windows / VST3</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/2096vcpmfiytt76p4q0p1/All-CARP-Audio-Plugins-Win.zip?rlkey=72ntrb94ho59jwe4c7wef8mjc&st=os4hxqu5&dl=1'>Download Plugins</Link>
        <p className='mt-4'>Prefer an Installer for Windows? <span><Link className='text-[#2A6C41]' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/7rc5n8wpm5kabho8x1v5q/CARP-Audio-Plugin-Installer-Win.zip?rlkey=900uqtdofov9a2pgfvt65ye4k&st=5efhi1fz&dl=1'>Download here</Link></span></p>
      </div>
      <div className='flex flex-col items-center  w-full'>
        <AppleLogo className='h-[65px] text-white'/>
        <p className='mt-5'>Mac OS 10.15 or Higher / VST3 / AU</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/sw4gn4ll44pb0qcjijozr/All-CARP-Audio-Plugins-MacOS.zip?rlkey=p8fmd5x3pjafowylsy9ieaqgg&st=hiu75l5j&dl=1'>Download Plugins</Link>
      </div>
    </div>
  )
}

export default Downloads