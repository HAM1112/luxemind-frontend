import React, { useState } from 'react'
import accPic from '../../../assets/acco.png'
import api from '../../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { addTokens } from '../../redux/slices/tokenSlice';
// import { addUserDetails } from '../../redux/slices/userSlice';


function AdminProfieModal(props) {
    const [user , setUser ] = useState(props.user)
    const token = useSelector((state) => state.token.value.access)
    const dispatch = useDispatch()

    const covertDate = (date) => {
        const dateJoined = new Date(date);
        const formattedDate = dateJoined.toLocaleDateString();
        return formattedDate
    }

    const deleteUser = () => {
        api.delete(
            `/adminpanel/delete-user/${user.id}`,
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        )
        .then(respose => {
            // dispatch(addTokens(null))
            // dispatch(addUserDetails(null))
            props.getModal(true)
        })

    }
  

    const updateStatus = () => {
        api.put(
            '/adminpanel/update-status',
            {'id' : user.id},
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        ).then(response => {
            toast.success(response.data.messaege, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }).catch(error => {
            console.log(error);
        })
        
        // Doubt ?? should i put below code insider .then 
        // Doubt ?? should i put below code insider .then 
        // Doubt ?? should i put below code insider .then 
        // Doubt ?? should i put below code insider .then 
        // Doubt ?? should i put below code insider .then 
        props.getModal(true)
        
    }

    return (
    <div className='update-card p-2 border-4 border-fuchsia-700'>
    {console.log(props.user)}
        <div className='flex gap--3 my-3 items-center '>
            <div className='w-1/3 h-full shadow-md'>
                <img src={user.avatar ? user.avatar : accPic} alt="" />
            </div>
            <div className='w-2/3'>
                <div className='grid gap-3 mb-3 border-2 px-4 py-2'>
                    <p className='w-full text-center text-2xl font-semibold'>{user.username}</p>
                    <p>Fisrt name : <span className='font-bold'>{user.first_name ? user.first_name : <>---not added---</>}</span></p>
                    <p>Last name : <span className='font-bold'>{user.last_name ? user.last_name : <>---not added---</>}</span></p>
                    <p>Email : <span className='font-bold bg-slate-300 px-1'>{user.email ? user.email : <>---not added---</>}</span></p>
                    <p>Date of Birth : <span className='font-bold'>{user.dob ? user.dob : <>DD-MM-YYYY</>}</span></p>
                    <p>Date of Birth : <span className='font-bold'>{user.education ? user.education : <>---not added---</>}</span></p>
                </div>
            </div>
        </div>
        
        <div className='grid grid-cols-2 justify my-5 px-6'>
            <div className='w-full'>
                <p>Id : {user.id}</p>
            </div>
            <div className='w-full'>
                <p>Date Joined : {covertDate(user.date_joined)}</p>
            </div>
            <div className='w-full'>
                <p>Role : {user.is_superuser ? <>Admin</> : (user.is_provider ? <>Provider</> : <>Student</>)}</p>
            </div>
            <div className='w-full'>
                <p>Status : <span className={user.is_active ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{user.is_active ? <>Active</> : <>Inactive</>}</span></p>
            </div>
        </div>
        <div className='flex justify-end gap-2'>
            <button className='bg-red-600 px-3 py-1 rounded text-white'
            onClick={deleteUser}>
                Delete
            </button>
            <button className='bg-gray-500 px-3 py-1 rounded text-white' onClick={updateStatus}>
                {user.is_active ? <>Deactivate</> : <>Activate</>}
            </button>
            <button className='bg-blue-600 px-3 py-1 rounded text-white' 
                onClick={()=>{props.getModal(true)}}
                >
                Cancel
            </button>
        </div>
    </div>
  )
}

export default AdminProfieModal
