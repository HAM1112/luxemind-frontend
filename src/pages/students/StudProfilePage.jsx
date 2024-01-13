import { faBookOpen, faBookmark, faCircleQuestion, faGear, faGraduationCap, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function StudProfilePage() {
  return (
    <div className='mx-1 lg:mx-36 xl:mx-56 select-none'>
      <div className='bg-[#CEAF95] mt-2 flex gap-2 justify-evenly text-xs font-bold text-white text-center pt-1'>
        <div className='px-4 py-3 hover:bg-white transition duration-300 ease-in-out hover:text-[#ceaf95] w-full'>
            <Link to={''}>
              <div className='w-full h-full flex justify-center items-center gap-3' title='Settings'>
                <i><FontAwesomeIcon icon={faGear} /></i>
                <span className='hidden xl:inline'>SETTINGS</span>
              </div>
            </Link>
        </div>
        <div className='px-4 py-3 hover:bg-white transition duration-300 ease-in-out hover:text-[#ceaf95] w-full'>
            <Link to={'my_course'}>
              <div className='w-full h-full flex justify-center items-center gap-3' title='Enrolled'>
                <i><FontAwesomeIcon icon={faBookOpen} /></i>
                <span  className='hidden xl:inline'>ENROLLED COURSES</span>
              </div>
            </Link>
        </div>
        <div className='px-4 py-3 hover:bg-white transition duration-300 ease-in-out hover:text-[#ceaf95] w-full'>
            <Link to={'favorite_courses'}>
              <div className='w-full h-full flex justify-center items-center gap-3' title='Favorites'>
                <i><FontAwesomeIcon icon={faStar} /></i>
                <span  className='hidden xl:inline'>FAVORITE COURSES</span>
              </div>
            </Link>
        </div>
        <div className='px-4 py-3 hover:bg-white transition duration-300 ease-in-out hover:text-[#ceaf95] w-full'>
            <Link to={'saved_lessons'}>
              <div className='w-full h-full flex justify-center items-center gap-3' title='Saved lessons'>
                <i><FontAwesomeIcon icon={faBookmark} /></i>
                <span  className='hidden xl:inline'>SAVED LESSONS</span>
              </div>
            </Link>
        </div>
        <div className='px-4 py-3 hover:bg-white transition duration-300 ease-in-out hover:text-[#ceaf95] w-full'>
            <Link to={"QAAs"}>
              <div className='w-full h-full flex justify-center items-center gap-3' title='Qs And As'>
                <i><FontAwesomeIcon icon={faCircleQuestion} /></i>
                <span className='hidden xl:inline'>Q's AND A'S</span>
              </div>
            </Link>
        </div>
        <div className='px-4 py-3 hover:bg-white transition duration-300 ease-in-out hover:text-[#ceaf95] w-full'>
            <Link to={"certificates"}>
              <div className='w-full h-full flex justify-center items-center gap-3' title='Certificates'>
                <i><FontAwesomeIcon icon={faGraduationCap} /></i>
                <span className='hidden xl:inline'>CERTIFICATES</span>
              </div>
            </Link>
        </div>

        


      </div>
      <div className='p-2 '>
        <Outlet />
      </div>
    </div>
  )
}

export default StudProfilePage
