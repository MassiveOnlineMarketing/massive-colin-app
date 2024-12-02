import { AppleLogo, WindowsLogo } from '@/assests'
import Link from 'next/link'
import React from 'react'

const Downloads = () => {
  return (
    <div className='grid md:grid-cols-2 gap-10 py-[150px]'>
      <div className='flex flex-col items-center  w-full'>
        <WindowsLogo className='h-[68px] text-white' />
        <p className='mt-5'>Windows / VST3</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/nj52dfu2g8s735tp57b2n/All-CARP-Audio-Plugins-Win.zip?rlkey=at2vc73rtt4fso5b6fxrs92ou&st=q6w4qppz&dl=1'>Download Plugins</Link>
        <p className='mt-4'>Prefer an Installer for Windows? <span><Link className='text-[#2A6C41]' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/yz70gyvmv4jc8hbrwsvi9/CARP-Audio-Plugin-Installer-Win.zip?rlkey=qsnkntpo69sf8re7tj91pvuzo&st=0vzi0t6m&dl=1'>Download here</Link></span></p>
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