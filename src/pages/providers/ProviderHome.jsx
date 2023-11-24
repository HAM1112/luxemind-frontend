import React from 'react'
import Navbar from '../partials/Navbar'
import Menubar from '../partials/Menubar'
import { Outlet } from 'react-router-dom'

function ProviderHome(props) {
  return (
    <div className='relative'>
      <Navbar />
      <div className='flex'>
        <Menubar items={props.menus} />
        <Outlet />        
      </div>
    </div>
  )
}

export default ProviderHome
