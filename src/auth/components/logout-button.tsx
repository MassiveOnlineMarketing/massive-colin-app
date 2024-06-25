'use client'

import React from 'react'
import { signOut } from '../auth'
import { logout } from '../actions/logout';

const LogoutButton = () => {
  const handleLogout = () => {
    logout();
  };
  return (
    <button onClick={handleLogout} className='text-white'>LogoutButton</button>
  )
}

export default LogoutButton