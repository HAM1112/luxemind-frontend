import React from 'react'
import picExample from './../../assets/idea.png'
import gradpic from './../../assets/graduation.png'
import './providerhome.css'

function ProviderDashboard() {
  return (
    <div className='px-32 py-28 w-full'>
      <div className='flex  w-full '>
        <div className=' w-3/5 '>
            <h3 className='font-bold'>Add New Course</h3>
            <div className='flex items-center justify-center mt-10'>
                <img className='add-course-image w-56' src={picExample} alt="" />
            </div>
            <div className='text-center'>
                <button className='mt-12 bg-red-500 px-3 py-1 text-white'>
                    Add Course
                </button>
            </div>
        </div>


        <div className='flex-2 w-2/5 bg-gray-200 p-6 rounded'>
            <h2 className='font-bold'>Unpublished</h2>
            
            {/* coures card */}
            <div className='flex bg-white p-3 mt-2 rounded '>
                <div className='course-img-shadow flex w-2/6 py-2 mx-2 justify-center w-full '>
                    <img className='w-14' src={gradpic} alt="gradpic"  />
                </div>
                <div className='w-4/6'>
                    <h3 className='ps-2'>Course : Course Name</h3>
                    <div className='text-white flex justify-evenly items-center gap-2 m-2'>
                        <button className='bg-gray-500 w-full'>Edit</button>
                        <button className='bg-red-600 w-full'>Publish</button>
                    </div>
                </div>
            </div>
            <div className='flex bg-white p-3 mt-2 rounded '>
                <div className='course-img-shadow flex w-2/6 py-2 mx-2 justify-center w-full '>
                    <img className='w-14' src={gradpic} alt="gradpic"  />
                </div>
                <div className='w-4/6'>
                    <h3 className='ps-2'>Course : Course Name</h3>
                    <div className='text-white flex justify-evenly items-center gap-2 m-2'>
                        <button className='bg-gray-500 w-full'>Edit</button>
                        <button className='bg-red-600 w-full'>Publish</button>
                    </div>
                </div>
            </div>
            <div className='flex bg-white p-3 mt-2 rounded '>
                <div className='course-img-shadow flex w-2/6 py-2 mx-2 justify-center w-full '>
                    <img className='w-14' src={gradpic} alt="gradpic"  />
                </div>
                <div className='w-4/6'>
                    <h3 className='ps-2'>Course : Course Name</h3>
                    <div className='text-white flex justify-evenly items-center gap-2 m-2'>
                        <button className='bg-gray-500 w-full'>Edit</button>
                        <button className='bg-red-600 w-full'>Publish</button>
                    </div>
                </div>
            </div>
            <div className='flex bg-white p-3 mt-2 rounded '>
                <div className='course-img-shadow flex w-2/6 py-2 mx-2 justify-center w-full '>
                    <img className='w-14' src={gradpic} alt="gradpic"  />
                </div>
                <div className='w-4/6'>
                    <h3 className='ps-2'>Course : Course Name</h3>
                    <div className='text-white flex justify-evenly items-center gap-2 m-2'>
                        <button className='bg-gray-500 w-full'>Edit</button>
                        <button className='bg-red-600 w-full'>Publish</button>
                    </div>
                </div>
            </div>


        </div>


      </div>
    </div>
  )
}

export default ProviderDashboard
