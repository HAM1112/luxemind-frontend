import React, { useEffect, useState } from 'react'
import banner from '../../assets/profilebanner.jpg'
import accoPic from '../../assets/acco.png'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api/api';
import { removeTokens } from '../../redux/slices/tokenSlice';
import { removeUserDetails } from '../../redux/slices/userSlice';
import ProfileUpdate from './components/ProfileUpdate';
import './studentprofile.css'
import { SpinnerDiamond } from 'spinners-react';



function StudProfile() {
    const token = useSelector((state) => state.token.value.access)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [modal , setModal] = useState(false)
    const [user, setUser] = useState({
        first_name : '',
        last_name : '',
        email : '',
        age : 0,
        date_joined : '',
        username : '',
    });

    useEffect(() => {
        api.get(
            '/student/profile',
            {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((response) => {
            setUser(response.data)
        })
        .catch((error) => {
            alert('some error has occured')
        })
        setLoading(false)
    }, [modal]);

    useEffect(() => {
        if (
            user.dob === null ||
            user.education === '' ||
            user.first_name === '' ||
            user.last_name === ''
        ){
            // lo
            const button = document.getElementById('student-profile-edit')
            if(button){
                button.click()
            }
        }

    }, [user]);

    const covertToDate = (val) => {
        const dateObject = new Date(val);
        const formattedDate = dateObject.toLocaleString();
        return formattedDate
    }

    const getModal = () => setModal(false)

    const getData = (userdetails) => setUser(userdetails)

    const handleLogout = () =>{
        dispatch(removeUserDetails())
        dispatch(removeTokens())
    }
    
    return (
        <>
        {
            loading ? 
            <div className='flex w-full h-full justify-center items-center border-2'>
                <SpinnerDiamond size={70} thickness={84} speed={101} color="rgba(57, 145, 172, 1)" secondaryColor="rgba(0, 0, 0, 1)" />
            </div>

            :
                <div className='relative' style={{ filter: modal ? 'blur(5px)' : 'none' }}>
                    <div className='relative'>
                        <div className='h-36 w-full overflow-hidden'>
                            <img src={banner} alt="" />
                            <img src={user.avatar ? user.avatar : accoPic} alt="" className='absolute w-48 h-48 top-10 left-5 rounded-full w-48 shadow-xl'/>
                        </div>
                    </div>
                    <div className='mt-28'>
                        <h1 className='text-2xl font-bold'>{user.username}</h1>
                        <p>Full Name : <span className='font-bold capitalize'>{user.first_name} {user.last_name}</span></p>
                        <p>Email : {user.email}</p>
                        <p>Age : {user.age}</p>
                        <p>Member since {covertToDate(user.date_joined)}</p>
                    </div>
                    <div className='mt-10 w-full flex justify-end gap-6'>
                        <button 
                            className='button-54 edit'
                            onClick={()=>{setModal(true)}}
                            id="student-profile-edit"
                            >
                            Edit
                        </button>
                        <button 
                            className='button-54 bg-red-500'
                            >
                            Delete
                        </button>
                        <button 
                            className='button-54 logout'
                            onClick={handleLogout}
                            >
                            Logout
                        </button>
                    </div>
                </div>


        }

                    
        {loading ? null : (modal &&  <div className='profile-update rounded border-4 border-black'><ProfileUpdate userDetails={user} getData={getData} getModal={getModal} /></div>) }

                
        </>

  )
}

export default StudProfile
