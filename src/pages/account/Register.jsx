import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Register() {
  return (
    <div className='w-96'>
        <div className='w-full flex justify-around pt-6'>

        <NavLink to={'student'}><button className='choose-btn px-8 py-4 border-2 border-gray-600 rounded-md hover:bg-gray-400'>Student</button></NavLink>
        <NavLink to={'provider'}><button className='choose-btn px-8 py-4 border-2 border-gray-600 rounded-md hover:bg-gray-400'>Provider</button></NavLink>
        </div>
        <Outlet />
    </div>
  )
}

export default Register
