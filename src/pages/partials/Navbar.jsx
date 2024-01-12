import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

import logo from '../../assets/luxeminds.png'
import accPic from '../../assets/acco.png'
import './navabar.css'

function Navbar() {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); 
    const [bigWindow, setbigWindow] = useState(window.innerWidth >= 768);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      console.log(isOpen);
    };

    useEffect(() => {
      const handleResize = () => {
        setIsOpen(window.innerWidth >= 768); // Update isOpen based on window width
        setbigWindow(window.innerWidth >= 768)
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  return (
    <>
      <nav className='navbar relative fixed top-0 w-full bg-white flex gap-16 shadow-lg h-12 sm:h-14'>
      
        <div>
          <NavLink to="home"><img src={logo} alt="logo" className='h-12 sm:h-14 ms-3 sm:ms-10 py-1'/></NavLink>
        </div>
        
        <button type="button" onClick={toggleDropdown} className="inline-flex absolute end-3 top-1  items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        {console.log((isOpen && !bigWindow))}
        <div className={` ${(isOpen && !bigWindow) ? 'absolute bg-white w-[250px] border-gray-300 border-2 grid top-14 right-1 bg-[#eeeeee] p-2' : 'hidden' } gap-3 md:gap-10 w-full ps-4  md:flex md:w-full`} id="navbar-default">
          <div className='flex justify-center items-center'>
              <NavLink to="courses">Courses</NavLink>
          </div>
          <div className='flex justify-center items-center'>
              <NavLink to="#">Leaderboard</NavLink>
          </div>
          <div className='flex justify-center items-center'>
              <NavLink to="#">Discover New</NavLink>
          </div>
          <div className={`${(isOpen && !bigWindow) ? 'hidden' : null}  md:flex-grow`}></div>
          <div className='flex justify-center items-center'>
              <NavLink to="#">Help</NavLink>
          </div>
          <div className='flex justify-center items-center gap-3 bg-gray-300 px-7'>
              <img src={accPic} alt="" className='h-8 w-8 rounded-full'/>
              <NavLink to="profile">Profile</NavLink>
          </div>
        </div>

      </nav>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
    </>
  )
}

export default Navbar
