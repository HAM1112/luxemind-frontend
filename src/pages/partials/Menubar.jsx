import React from 'react'
import { NavLink } from 'react-router-dom';

import accoPic from '../../assets/acco.png'
import './menubar.css'

function Menubar() {
  return (
    <div className='menubar py-5 h-screen'>
      <div className='grid'>
        <div className='grid gap-2 justify-items-center content-center border-b-2 py-5 mx-5'>
            <img src={accoPic} alt="accpic" className='border-2 border-slate-600 rounded-full w-32'/>
            <h1 className='font-bold'>User Name</h1>
        </div>
        <div className='grid p-5 gap-2 font-semibold'>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
            <NavLink to="/admin/courses">Courses</NavLink>
            <NavLink to="/admin/users">Users</NavLink>
            <NavLink to="/admin/providers">Providers</NavLink>
            <NavLink to="/admin/plans">Plans</NavLink>
            <NavLink to="/admin/profile">Profile</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Menubar
