import React, { useEffect, useState } from 'react'
import './coursecard.css'
import CustomModal from '../customs/CustomModal';
import AddCourse from '../providers/components/AddCourse';
import CourseDetails from './CourseDetails';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import useUrlHeader from '../../utilities/urlHeader';

function CourseCard({details , subject , is_admin , provider}) {
    const [course, setCourse] = useState(details);
    const [modal, setModal] = useState(false);
    const sub = subject
    const auth = useUrlHeader()
    const navigate = useNavigate()

    const getModal = (bool) => {
        setModal(bool)
    }
    useEffect(() => {
        
    }, [course]);
    const handlePublish = (e)=>{
        const id = course.id
        api.put(
            `/provider/publish_course/${id}`,
            {course_id : id},
            auth
        ).then(response => {
            setCourse(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }
    const handleApprove = ()=>{
        const id = course.id
        api.put(
            `/adminpanel/approve_course/${id}`,
            {course : id},
            auth
        )
    }


  return (
    <>

        <div className='course-card relative rounded-2xl select-none '>
            <div onClick={() => { 
                console.log('course open')
                navigate(`${course.id}`)
            }}>

            
                <div className=' w-full h-[150px] rounded-[20px]'>
                    <img className='h-full w-full rounded-[20px]' src={course.course_thumbnail} alt="" />
                </div>
                <div className='content absolute w-full h-[195px]  bottom-0 '>
                    <div className='bg-white p-6 h-full rounded-b-2xl'>
                        <h1 className='text-[18px] font-semibold capitalize truncate' title={course.name}>{course.name}</h1>
                        {
                            is_admin ? <>

                            {/* <p className='text-gray-500 font-semibold mt-3 capitalize'>{provider}</p> */}
                            {null}
                            </>
                            :
                            <p className='text-gray-500 font-semibold mt-3 capitalize'>{subject}</p>

                        }
                    </div>
                </div>
            </div>
            {/* published of not just above are same */}

            <div className='absolute b-[10px] w-full flex justify-center gap-4 bottom-[20px] '>
                        {
                            is_admin ? 
                            <button className='w-[120px] py-1 text-center bg-[#4B527E] rounded text-white'
                            onClick={handleApprove}
                            >
                            Approve
                            </button>
                            :


                        (
                            course.is_published ? 
                            <button className='w-[120px] py-1 text-center bg-[#4B527E] rounded text-white'
                            
                            >
                            Unpublish
                            </button>
                            :
                            (course.is_pending ? 
                                <button className='w-[120px] py-1 text-center bg-gray-300 rounded text-white' disabled
                                
                                >
                                Pending
                                </button>
                                :
                                <button className='w-[120px] py-1 text-center bg-[#4B527E] rounded text-white' 
                                onClick={handlePublish}
                                >
                                Publish
                                </button>

                            )

                        )
                        }
                <button className='w-[120px] py-1 text-center bg-[#E5C3A6] rounded'
                onClick={()=>{
                    console.log('edit coures clicked')
                    setModal(true)
                }}
                >Edit</button>
            </div>
            {modal && <CustomModal component={<AddCourse course={course} edit="true" getModal={getModal} />} />}
        </div>
    </>
  )
}

export default CourseCard
