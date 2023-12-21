import React, { useEffect, useRef, useState } from 'react'
import './profileupdate.css'
import accoPic from '../../../assets/acco.png'
import uploadPic from '../../../assets/fileupload.png'
import { firebasestore } from '../../../firebase/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import api from '../../../api/api'
import useUrlHeader from '../../../utilities/urlHeader'
import {convertToUnderscore} from '../../../utilities/convertToUnderscore'

'use client';


function ProfileUpdate(props) {
    const [user, setUser] = useState(props.userDetails);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const header = useUrlHeader()

    useEffect(() => {
        const input = document.getElementById('dob');
        const today = new Date();
        today.setFullYear(today.getFullYear() - 5);
        const formattedDate = today.toISOString().split('T')[0];
        input.setAttribute('max', formattedDate);

    }, []);
    
    const handleChange = (e) =>{
        setUser({ ...user, [e.target.name]: e.target.value})
    }
    const handlePicRemove = ()=> {
        setUser(prev => ({...prev,avatar:''}))
    }
    
    const handleFileUpload = () => {
        console.log('clicked');
        // fileInputRef.current.click()
        if(image == null){
            console.log("upload btn");
            return
        }
        const newname = convertToUnderscore(user.username)

        console.log(newname);
        const imgRef = ref(firebasestore,`files/${newname}`)
        uploadBytes(imgRef , image)
        .then((snapshot) => {
                getDownloadURL(snapshot.ref).then(url => {
                    setUser((prev) => ({...prev, avatar : url}))
                    console.log('image uploaded successfully');
                })
            }).catch(error => {
                console.log("snapshot error");
            })
            
        setImage(null)
    } 

    const handleSave = () => {
        api.put(
            '/student/update-profile/',
            user,
            header
        ).then(response => {

            props.getModal(false)
        })

    }



  return (

    <div className='update-card'>
    {/* {console.log(getTodayMinus5Years())} */}
        <div className='grid gap-3 mb-3 justify-center'>
            <div className=''>
                <div className='group relative w-56 h-56'>
                    <img src={user.avatar ? user.avatar : accoPic} alt={user.username} className='rounded-full w-full h-full' />
                    <div className='image-upload p-10 rounded-full hidden group-hover:flex absolute top-0 h-full justify-center items-center' 
                        onClick={()=>fileInputRef.current.click()}>
                        <img src={uploadPic} alt="upload pic" className='w-full h-full'/>
                    </div>
                </div>
                <div className='flex justify-center mt-3 w-full'>
                    <input 
                    type="file" 
                    className='input hidden' 
                    id='image_input'
                    ref={fileInputRef}
                    onChange={(e)=>{
                        setImage(e.target.files[0])
                        console.log('changed')
                        handleFileUpload()
                    }}/><br />
                    {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>fileInputRef.current.click()}>Upload</button> */}
                    <button className='button-54 bg-red-500' onClick={handlePicRemove}>Remove</button>
                    
                </div>
            </div>
        </div>

        <div className='grid gap-3 mb-3'>
            <label className='font-semibold'>Username</label>
            <input onChange={handleChange} type="text" name='username' value={user.username} className="border-2 px-2 py-1 outline-none focus:ease-in duration-150 focus:ring-2 focus:ring-slate-900"/>
        </div>
        <div className='flex justify-evenly gap-4'>
            <div className='grid gap-3 mb-3 w-full'>
                <label className='font-semibold'>First name</label>
                <input onChange={handleChange} type="text" name='first_name' value={user.first_name} className="border-2 px-2 py-1 outline-none focus:ease-in duration-150 focus:ring-2 focus:ring-slate-900"/>
            </div>
            <div className='grid gap-3 mb-3 w-full'>
                <label className='font-semibold'>Second name</label>
                <input onChange={handleChange} type="text" name='last_name' value={user.last_name} className="border-2 px-2 py-1 outline-none focus:ease-in duration-150 focus:ring-2 focus:ring-slate-900"/>
            </div>
        </div>
        <div className='flex justify-evenly gap-4'>
            <div className='grid gap-3 mb-3 w-7/12 '>
                <label className='font-semibold'>Education</label>
                <input onChange={handleChange} type="text" name='education' value={user.education} className="border-2 px-2 py-1 outline-none focus:ease-in duration-150 focus:ring-2 focus:ring-slate-900"/>
            </div>
            <div className='grid gap-3 mb-3 w-5/12'>
                {/* <DatePicker label="Basic date picker" /> */}
                {/* <Datepicker /> */}
                
                <label className='font-semibold'>Date of Birth</label>
                <input type="date" id='dob' name='dob' onChange={handleChange} value={user.dob} className='border-2 px-2 py-1 outline-none focus:ease-in duration-150 focus:ring-2 focus:ring-slate-900' />
                
            </div>
        </div>
        
        <div className='w-full mt-3 flex justify-end gap-5'>
            <button className='button-54 bg-red-600' 
                onClick={()=>{props.getModal()}}
                >
                cancel
            </button>
            <button className='button-54 bg-violet-400' onClick={handleSave}>
                Save
            </button>
        </div>
    </div>
  )
}

export default ProfileUpdate
