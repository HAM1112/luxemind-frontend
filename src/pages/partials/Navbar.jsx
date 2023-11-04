import React from 'react'
import { NavLink } from 'react-router-dom';

import logo from '../../assets/luxeminds.png'
import accPic from '../../assets/acco.png'
import './navabar.css'

function Navbar() {
  return (
    <div className='navbar flex gap-16 shadow-lg h-14'>
      <div>
        <img src={logo} alt="logo" className='h-14 ms-10 py-1'/>
      </div>
      <div className='flex gap-10 w-full ps-4'>
        <div className='flex justify-center items-center'>
            <NavLink to="#">Courses</NavLink>
        </div>
        <div className='flex justify-center items-center'>
            <NavLink to="#">Providers</NavLink>
        </div>
        <div className='flex justify-center items-center'>
            <NavLink to="#">Discover New</NavLink>
        </div>
        <div className='flex-grow'></div>
        <div className='flex justify-center items-center'>
            <NavLink to="#">Help</NavLink>
        </div>
        <div className='flex justify-center items-center gap-3 bg-gray-300 px-7'>
            <img src={accPic} alt="" className='h-8 w-8 rounded-full'/>
            <NavLink to="#">Profile</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
