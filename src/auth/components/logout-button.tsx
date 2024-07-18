'use client'

import React from 'react'
import { signOut } from '../auth'
import { logout } from '../actions/logout';
import { Power } from 'lucide-react';

const LogoutButton = () => {
  const handleLogout = () => {
    logout();
  };
  return (
    <button onClick={handleLogout} className='text-white'><Power className='w-6 h-6' /></button>
  )
}

export default LogoutButton