import { AppleLogo, WindowsLogo } from '@/assests'
import Link from 'next/link'
import React from 'react'

const Downloads = () => {
  return (
    <div className='grid grid-cols-2 py-[150px]'>
      <div className='flex flex-col items-center  w-full'>
        <WindowsLogo className='h-[68px] text-white' />
        <p className='mt-5'>Windows / VST3</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/xw7rmwcrbdbcoyqy7uet8/All-CARP-Audio-Plugins-Win.zip?rlkey=zl540fi97llr652bcs2cpr0s0&st=dtch0q9e&dl=1'>Download Plugins</Link>
        <p className='mt-4'>Prefer an Installer for Windows? <span><Link className='text-[#2A6C41]' href='https://dl.dropboxusercontent.com/scl/fi/sn6shviwno1k9uhvu9id3/CARP-Audio-Plugin-Installer-Win.zip?rlkey=pcy2erc7b09bg6jo01606i11e&st=08yih41w&dl=1'>Download here</Link></span></p>
      </div>
      <div className='flex flex-col items-center  w-full'>
        <AppleLogo className='h-[65px] text-white'/>
        <p className='mt-5'>Mac OS 10.15 or Higher / VST3 / AU</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/hf9z8rwvyzetr2qlbosox/All-CARP-Audio-Plugins-MacOS.zip?rlkey=kduktci5ampq4k6ah830tamzj&st=3khyiv1d&dl=1'>Download Plugins</Link>
      </div>
    </div>
  )
}

export default Downloads