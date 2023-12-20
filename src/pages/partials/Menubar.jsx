import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

import accoPic from '../../assets/acco.png'
import './menubar.css'

function Menubar(props) {
  const [items, setItems] = useState(props.items);
  {console.log(items)}
  return (
    <div className='menubar sticky h-screen py-5  hidden md:block'>
      <div className='grid'>
        <div className='grid gap-2 justify-items-center content-center border-b-2 py-5 mx-5'>
            <img src={accoPic} alt="accpic" className='border-2 border-slate-600 rounded-full w-32'/>
            <h1 className='font-bold'>User Name</h1>
        </div>
        <div className='grid p-5 gap-2 font-semibold capitalize'>
            {items.map((item , index)=> {
              return <NavLink to={item} key={index}>{item}</NavLink>
            })}
        </div>
      </div>
    </div>
  )
}

export default Menubar
