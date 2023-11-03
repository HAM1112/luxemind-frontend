import React from 'react'
import Navbar from '../partials/Navbar'
import Menubar from '../partials/Menubar'
import { Outlet } from 'react-router-dom'



function AdminHome() {
  return (
    <div className='relative'>
      <Navbar />
      <div className='flex'>
        <Menubar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminHome
