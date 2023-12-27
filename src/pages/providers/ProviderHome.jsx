import React from 'react'
import Navbar from '../partials/Navbar'
import Menubar from '../partials/Menubar'
import { Outlet } from 'react-router-dom'

function ProviderHome(props) {
  return (
    <div className='relative h-screen w-full'>
      <Navbar />
      <div className='flex h-screen w-full'>
        <div className='w-1/6 h-full '>
          <Menubar items={props.menus} />
        </div>
        <div className='w-5/6 overflow-scroll'>
          <Outlet />        
        </div>
      </div>
    </div>
  )
}

export default ProviderHome
