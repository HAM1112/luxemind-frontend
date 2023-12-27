import React, { useEffect, useState } from 'react'
import './details.css'




function Details({course , onChange}) {

    const [addDetails, setAddDetails] = useState(course);
    const handleChange = (e) => {
        const {name , value } = e.target
        setAddDetails({...addDetails, [name] : value})    
    }
    
    useEffect(() => {
        onChange(addDetails)
    }, [addDetails]);
    
  return (
      <div className='overflow-x-scroll'>
        <div className='grid gap-1 mt-2'>
          <h3 className='font-semibold'>Name</h3>
          <input name='name' value={addDetails.name} onChange={handleChange} type="text" className='border-2 border-slate-900 p-1 rounded'/>
        </div>
        <div className='grid gap-1 mt-4'>
          <h3 className='font-semibold'>Short Description</h3>
          <textarea name="short_description" value={addDetails.short_description} onChange={handleChange} id="" rows="3" className='border-2 border-slate-900 outline-none p-1 rounded'></textarea>
        </div>
        <div className='grid gap-1 mt-4'>
          <h3 className='font-semibold'>Description</h3>
          <textarea name="description" value={addDetails.description} onChange={handleChange} id="" rows="5" className='border-2 border-slate-900 outline-none p-1 rounded'></textarea>
        </div>
        <div className='grid gap-1 mt-4'>
          <h3 className='font-semibold'>About</h3>
          <textarea name="about" value={addDetails.about} onChange={handleChange} id="" rows="5" className='border-2 border-slate-900 outline-none p-1 rounded'></textarea>
        </div>
      </div>
  )
}

export default Details
