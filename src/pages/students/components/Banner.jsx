import React, { useEffect, useState } from 'react'
import './banner.css'
import discussion from '../../../assets/discussion.png'
import { SpinnerDiamond } from 'spinners-react';

function Banner() {
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBannerImage(discussion)
    setLoading(false)
  }, []);

  return (

    <>
        {loading ? 
          <SpinnerDiamond size={70} thickness={84} speed={101} color="rgba(57, 145, 172, 1)" secondaryColor="rgba(0, 0, 0, 1)" />
          :


    <div className='relative'>
      <div className='lg:absolute h-full top-0 sm:right-10 md:right-28 lg:right-36 xl:right-72 z-'>
        <img src={discussion} alt="" className='z-10'/>
      </div>

      <div className='z-20 mt-[-200px] lg:mt-2'>
        <h1 className='text-2xl md:text-4xl w-min-56 sm:w-72 md:w-96 border-4 z-20'>Unlocking Brilliance, Nurturing Minds: LuxeMinds</h1>
      </div>
      
      <div className='mt-2 sm:mt-10 md:mt-36  left-64 bottom-40'>
        <div className='flex w-54 h-6 md:w-72 md:h-10'>
          <input type="text" className='border-2 border-slate-700 w-3/4 px-2 outline-none ' name="" id="" />
          <button className='main-button w-1/4'>Search</button>
        </div>
        <p className='text-sm'>Explore all courses</p>
      </div>
    </div>
        }
    </>
  )
}

export default Banner
