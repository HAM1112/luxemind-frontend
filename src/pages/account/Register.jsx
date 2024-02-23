import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Register() {
  const [isStud, setIsStud] = useState(true);
  useEffect(() => {
    localStorage.removeItem("user")
    localStorage.removeItem("tokens")
  }, [isStud]);
  return (
    <div className='w-96'>
        <div className='w-full flex justify-around pt-6'>

        <NavLink to={'student'}><button 
            onClick={()=>setIsStud(true)} 
            className={isStud ? 'choose-btn px-8 py-4 border-2 border-gray-600 rounded-md bg-gray-400' : 'choose-btn px-8 py-4 border-2 border-gray-600 rounded-md hover:bg-gray-400'}
            >
            Student
            </button></NavLink>
        <NavLink to={'provider'}><button 
            onClick={()=>setIsStud(false)} 
            className={isStud ? 'choose-btn px-8 py-4 border-2 border-gray-600 rounded-md hover:bg-gray-400' : 'choose-btn px-8 py-4 border-2 border-gray-600 rounded-md bg-gray-400' }
            >Provider
            </button></NavLink>
        </div>
        <Outlet />
    </div>
  )
}

export default Register
