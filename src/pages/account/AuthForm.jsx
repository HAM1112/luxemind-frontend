import React , { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

import logo from '../../assets/luxeminds.png'
import './login.css'
import Login from './Login';
import StudRegister from './StudRegister';



function AuthForm() {

  return (
    <div className='login flex justify-evenly h-screen border'>
      <div className='left w-3/4'>
            <div>
                <img src={logo} className='w-70 h-40'  alt="logo"/>
            </div>
            <div className='text-6xl font-extrabold mt-40 w-42 ms-40'>
                <h1>Start learning with <span className='luxemind text-stone-500'> LuxeMinds </span></h1>
            </div>
      </div>
      <div className='right w-full'>
            <div className='grid justify-center content-start h-full pt-20' >
                <div className='flex w-50'>
                    <div className='border-b-2 border-slate-400 px-2 py-1 w-full hover:border-slate-700' ><NavLink to={'login'}>Sign In</NavLink></div>
                    <div className='border-b-2 border-slate-400 px-2 py-1 w-full hover:border-slate-700' ><NavLink to={'register'}>Register</NavLink></div>
                </div> 
                <Outlet />
            </div>
      </div>
    </div>
  )
}

export default AuthForm
