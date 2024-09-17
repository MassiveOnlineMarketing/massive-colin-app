import { AppleLogo, WindowsLogo } from '@/assests'
import Link from 'next/link'
import React from 'react'

const Downloads = () => {
  return (
    <div className='grid md:grid-cols-2 gap-10 py-[150px]'>
      <div className='flex flex-col items-center  w-full'>
        <WindowsLogo className='h-[68px] text-white' />
        <p className='mt-5'>Windows / VST3</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/037yuaazri22wk2qbj035/All-CARP-Audio-Plugins-Win.zip?rlkey=u8j6z7g7ce5lfos4nbjg4wlt8&st=wnqx0wz5&dl=1'>Download Plugins</Link>
        <p className='mt-4'>Prefer an Installer for Windows? <span><Link className='text-[#2A6C41]' href='https://dl.dropboxusercontent.com/scl/fi/5ys1ral5b5s2d5mrx34tg/CARP-Audio-Plugin-Installer-Win.zip?rlkey=y0sdbpdgmx1m0gsqugxpktgqb&st=ufet3vlr&dl=1'>Download here</Link></span></p>
      </div>
      <div className='flex flex-col items-center  w-full'>
        <AppleLogo className='h-[65px] text-white'/>
        <p className='mt-5'>Mac OS 10.15 or Higher / VST3 / AU</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/39gpp98ykmz2dkvn6x5ff/All-CARP-Audio-Plugins-MacOS.zip?rlkey=n84qa8o7on5ajxie1dsh45c2e&st=5c0rh6rv&dl=1'>Download Plugins</Link>
      </div>
    </div>
  )
}

export default Downloads