import { AppleLogo, WindowsLogo } from '@/assests'
import Link from 'next/link'
import React from 'react'

const Downloads = () => {
  return (
    <div className='grid md:grid-cols-2 gap-10 py-[150px]'>
      <div className='flex flex-col items-center  w-full'>
        <WindowsLogo className='h-[68px] text-white' />
        <p className='mt-5'>Windows / VST3</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/bnihztucowlauspnkpmd2/All-CARP-Audio-Plugins-Win.zip?rlkey=oj5d4xzekohgiubp8khtid4e4&st=xc7x8pxr&dl=1'>Download Plugins</Link>
        <p className='mt-4'>Prefer an Installer for Windows? <span><Link className='text-[#2A6C41]' href='https://dl.dropboxusercontent.com/scl/fi/587ce5r42ltj8nsnrpu7e/CARP-Audio-Plugin-Installer-Win.zip?rlkey=azmrrqe0es1izvdym8ml4hfjn&st=8jvhse1l&dl=1'>Download here</Link></span></p>
      </div>
      <div className='flex flex-col items-center  w-full'>
        <AppleLogo className='h-[65px] text-white'/>
        <p className='mt-5'>Mac OS 10.15 or Higher / VST3 / AU</p>
        <Link className='w-full mt-8 max-w-[450px] border border-white rounded-full py-4 text-center' target='_blank' href='https://dl.dropboxusercontent.com/scl/fi/o6pu61tpevmmmtfz4rzsn/All-CARP-Audio-Plugins-MacOS.zip?rlkey=n5jlfq0mzte8h78uzs0xis854&st=t4ygcfnh&dl=1'>Download Plugins</Link>
      </div>
    </div>
  )
}

export default Downloads