import React, { useEffect, useState } from 'react'
import picExample from './../../assets/idea.png'
import gradpic from './../../assets/graduation.png'
import './providerhome.css'
import CustomModal from '../customs/CustomModal';
import AddCourse from './components/AddCourse';
import api from '../../api/api';
import useUrlHeader from '../../utilities/urlHeader';
import { useNavigate } from 'react-router-dom';

function ProviderDashboard() {

    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({});
    const auth = useUrlHeader()
    const navigate = useNavigate()
    useEffect(() => {
        api.get(
            '/provider/profile',
            auth
        ).then((response) => {
            setUser(response.data)
            
        })
    }, []);


    useEffect(() => {
        if (
          user.dob === null ||
          user.education === '' ||
          user.first_name === '' ||
          user.last_name === '' ||
          user.about === ''
        ){
          console.log('not ddd' || user.education == '' || user.first_name == "" || user.last_name == '')
          navigate('/provider/profile')
        }
      }, [user]);


    const getModal = (bool) => {
        setModal(bool)
    }


  return (
    <div className='px-32 py-28 w-full'>
      <div className='flex  w-full '>
        <div className=' w-3/5 '>
            <h3 className='font-bold'>Add New Course</h3>
            <div className='flex items-center justify-center mt-10'>
                <img className='add-course-image w-56' src={picExample} alt="" />
            </div>
            <div className='text-center'>
                <button 
                className='mt-12 bg-red-500 px-3 py-1 text-white'
                onClick={() => {
                    console.log('add course clicked')
                    setModal(true)
                }}
                >
                    Add Course
                </button>
            </div>
        </div>
        

        {modal && <CustomModal component={<AddCourse getModal={getModal}  />} />}

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
