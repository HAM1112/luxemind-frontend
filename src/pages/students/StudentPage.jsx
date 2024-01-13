import React from 'react'
import Navbar from '../partials/Navbar'
import { Outlet } from 'react-router-dom'
import './studentpage.css'

function StudentPage() {
  return (
    <div className=''>
      <Navbar />
      <div className='h-full h-screen '>
        <Outlet />
      </div>
    </div>
  )
}

export default StudentPage
