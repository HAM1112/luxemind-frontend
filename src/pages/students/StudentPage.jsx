import React from 'react'
import Navbar from '../partials/Navbar'
import { Outlet } from 'react-router-dom'
import './studentpage.css'

function StudentPage() {
  return (
    <div className='border-2 border-red-900'>
      <Navbar />
      <div className='px-36 py-12 h-full h-screen'>
        <Outlet />
      </div>
    </div>
  )
}

export default StudentPage
