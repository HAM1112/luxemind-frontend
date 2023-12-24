import React, { useState } from 'react'

function CustomModal(props) {
  


  return (
    <div className='fixed flex justify-center items-center w-full h-full left-0 top-0 backdrop-blur-sm z-30'>
      <div className='border-2 border-slate-900 shadow-md bg-white'>
        {props.component}
      </div>
    </div>
  )
}

export default CustomModal
