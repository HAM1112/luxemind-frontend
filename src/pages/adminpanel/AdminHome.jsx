import React, { useState } from 'react'
import Navbar from '../partials/Navbar'
import Menubar from '../partials/Menubar'
import { Outlet } from 'react-router-dom'



function AdminHome(props) {
  const [items, setItems] = useState(props.menus);
  return (
    <div className='relative h-screen  w-full'>
      <Navbar />
      <div className='flex h-screen w-full'>
          <div className='w-1/6 h-full '>
            <Menubar items={items}/>
          </div>
          <div className='w-5/6 overflow-scroll'>
            <Outlet />
          </div>
      </div>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      
    </div>
  )
}

export default AdminHome
