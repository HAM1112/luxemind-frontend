import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import api from '../../api/api';
import { removeUserDetails} from '../../redux/slices/userSlice'
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function ProviderProfile() {

    const token = useSelector((state) => state.token.value.access)
    const [user, setUser] = useState({
        first_name : '',
        last_name : '',
        age : 0,
        email : '',
        username : '',
        education : '',
    }); 
    const dispatch = useDispatch()
    useEffect(() => {
        api.get(
            '/provider/profile',
            {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }
            ).then((response) => {
                console.log(response.data);
                setUser(response.data)
            })
        }, []);
        
    const handleChange = (e) =>{
        setUser({ ...user, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = () =>{
        console.log(user)
        api.put(
            '/provider/profile-update',
            user,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response)=>{
            console.log(response.data);
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
        .catch((error)=>{
            toast.error(error.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })  
    }   

    const handleLogout = () =>{
        dispatch(removeUserDetails())
        dispatch(removeTokens())
    }


  return (
    <div className='p-6 w-full'>
        <ToastContainer />
      <div className='bg-gray-400 rounded w-full'>
        <div className='grid grid-cols-2 gap-6 py-14 px-20'>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>First Name</label>
                <input onChange={handleChange} value={user.first_name} name='first_name' type="text" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>Last Name</label>
                <input onChange={handleChange} value={user.last_name} name='last_name' type="text" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>Email</label>
                <input value={user.email} name='email' type="text" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' disabled/>
            </div>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>Username</label>
                <input onChange={handleChange} value={user.username} name='username' type="text" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>Education</label>
                <input onChange={handleChange} value={user.education} name='education' type="text" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
            <div className='flex justify-center items-center w-full '>
                <label className='w-2/6'>Age</label>
                <input onChange={handleChange} value={user.age} name='age' type="number" className='w-4/6 border-2 border-slate-700 p-2 focus:outline-none' />
            </div>
        </div>
        <div className='flex justify-end w-full px-20 pb-12'>
            <button onClick={handleSubmit} className='bg-blue-500 text-white py-2 px-4 rounded'>Save</button>
        </div>
      </div>
      <div className='flex justify-start gap-8 mt-10 px-1'>
            <button 
                className='bg-zinc-900 text-white py-2 px-5 rounded border-4 hover:border-double' 
                onClick={() => dispatch(removeUserDetails())}>
                Logout</button>
            <button className='bg-red-700 text-white py-2 px-5 rounded border-4 hover:border-double'>Delete Account</button>
        </div>
    </div>
  )
}

export default ProviderProfile
