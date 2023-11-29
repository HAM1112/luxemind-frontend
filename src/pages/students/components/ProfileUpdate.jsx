import React, { useEffect, useState } from 'react'
import './profileupdate.css'
import accoPic from '../../../assets/acco.png'
import uploadPic from '../../../assets/fileupload.png'

function ProfileUpdate(props) {
    console.log(props.userDetails);
    const [user, setUser] = useState(props.userDetails);
    
    const handleChange = (e) =>{
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    const uploadFiles = ( file ) => {
        //
        if (!file) return;
    }

  return (
    <div className='update-card'>
    {console.log(user)}
    {console.log(accoPic)}
        <div className='grid gap-3 mb-3 justify-center'>
            <div className='border-2 border-blue-600'>
                <div className='group relative border-2 border-green-700 w-fit'>
                    <img src={user.avatar ? user.avatar : accoPic} alt={user.username} className='rounded-full' />
                    <div className='image-upload rounded-full hidden group-hover:flex absolute top-0 h-full justify-center items-center'>
                        <img src={uploadPic} alt="upload pic" className='w-2/4 h-2/4'/>
                    </div>
                </div>
                <div>
                    <input type="file" className='input'/><br />

                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Upload</button>
                </div>
            </div>
        </div>

        <div className='grid gap-3 mb-3'>
            <label className='font-semibold'>Username</label>
            <input onChange={handleChange} type="text" name='username' value={user.username} className="rounded-[7px] border-2 px-2 py-1 outline-none focus:ease-in duration-150 focus:ring-2 focus:ring-slate-900"/>
        </div>
        <div className='flex justify-evenly gap-4'>
            <div className='grid gap-3 mb-3 w-full'>
                <label className='font-semibold'>First name</label>
                <input onChange={handleChange} type="text" name='first_name' value={user.first_name} className="rounded-[7px] border-2 px-2 py-1 outline-none focus:ease-in duration-150 focus:ring-2 focus:ring-slate-900"/>
            </div>
            <div className='grid gap-3 mb-3 w-full'>
                <label className='font-semibold'>Second name</label>
                <input onChange={handleChange} type="text" name='last_name' value={user.last_name} className="rounded-[7px] border-2 px-2 py-1 outline-none focus:ease-in duration-150 focus:ring-2 focus:ring-slate-900"/>
            </div>
        </div>
        <div className='grid gap-3 mb-3'>
            <label className='font-semibold'>Username</label>
            <input onChange={handleChange} type="text" className="rounded-[7px] border-2 px-2 py-1 outline-none focus:ease-in duration-150 focus:ring-2 focus:ring-slate-900"/>
        </div>

        <button className='bg-red-600 px-3 py-1 rounded' 
            onClick={()=>{props.getModal()}}
            >
            cancel
        </button>
    </div>
  )
}

export default ProfileUpdate
