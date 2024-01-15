import React, { useState } from 'react'
import Navbar from './Navbar'
import Menubar from './Menubar'
import { Outlet } from 'react-router-dom'

function PageLayout(props) {
  const [items, setItems] = useState(props.menus);
  return (
    <div className='relative h-screen  w-full'>
      <Navbar />
      <div className='md:flex md:h-screen w-full '>
          <div className='w-full md:w-1/6 h-full '>
            <Menubar items={items}/>
          </div>
          <div className='w-full md:w-5/6 overflow-scroll'>
            <Outlet />
          </div>
      </div>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>

    </div>
  )
}

export default PageLayout
