import React from 'react'
import './banner.css'
import discussion from '../../../assets/discussion.png'

function Banner() {
  return (
    <div className='banner border-2 border-red-600 relative'>
      <div className='absolute h-full border-2 border-green-600 top-0 right-72'>
        <img src={discussion} alt="" />
      </div>
      <div>
        <h1 className='text-4xl w-96 border-4'>Unlocking Brilliance, Nurturing Minds: LuxeMinds</h1>
      </div>
      
      <div className='absolute left-64 bottom-40'>
        <div className='flex w-72 h-10'>
          <input type="text" className='border-2 border-slate-700 w-3/4 px-2 outline-none ' name="" id="" />
          <button className='main-button w-1/4'>Search</button>
        </div>
        <p className='text-sm'>Explore all courses</p>
      </div>
    </div>
  )
}

export default Banner
