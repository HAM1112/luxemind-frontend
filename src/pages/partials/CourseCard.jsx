import React, { useEffect, useState } from 'react'
import './coursecard.css'
import CustomModal from '../customs/CustomModal';
import AddCourse from '../providers/components/AddCourse';
import CourseDetails from './CourseDetails';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import useUrlHeader from '../../utilities/urlHeader';
import { useSelector } from 'react-redux';
import time from '../../assets/time.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function CourseCard({details , subject , is_admin , provider , purchase}) {
    const [course, setCourse] = useState(details);
    const [modal, setModal] = useState(false);
    const [is_favorite, setIs_favorite] = useState(false);
    const auth = useUrlHeader()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.value)
    const [purchaseDetails, setPurchaseDetails] = useState(purchase)
    const getModal = (bool) => {
        setModal(bool)
    }
    useEffect(() => {
        api.get(
            `/student/checkwishlist/${course.id}`,
            auth
        ).then(response => {
            setIs_favorite(response.data.is_favorite)
        }).catch(error =>{
            console.log(error);
        })
    }, []);
    useEffect(() => {
    }, [course , is_favorite]);
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
        api.put(`/adminpanel/approve_course/${id}`,{course : id})
        const test = course 
        test.is_published = true
        setCourse(test)
    }
    const handleBlock = () => {
        const id = course.id
        api.put(`/adminpanel/block_course/${id}`,{course : id})
    }
    function daysLeftUntil(end_date) {
        const endDate = new Date(end_date);
        const currentDate = new Date();
        const differenceInMs = endDate - currentDate;
        const daysLeft = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));  
        return daysLeft;
    }
    const getDate = (date) => {
        const date_to_extrack = new Date(date);
        const formattedDate = date_to_extrack.toISOString().split('T')[0];
        return formattedDate
    }
    const toggleWishList = () =>{
        api.post(
            `/student/wishlist/` ,
            {course_id : course.id},
            auth
        ).then(response => {
            setIs_favorite(response.data.fav)
        }).catch(error => {
            console.log(error);
        })
    }
        return (
            <>
            <div onClick={() => { 
                if(subject === 'enrolled'){
                    return navigate(`/student/courses/${course.id}`)
                }
                navigate(`${course.id}`)
            }}>
                <div className=' w-full h-[150px] '>
                    <img className='h-full w-full z-[-1] overflow-hidden' src={course.course_thumbnail} alt="" />
                </div>
                <div className='content absolute w-full h-[195px]  bottom-0 '>
                    <div className='bg-white px-4 py-2 h-full '>
                        <h1 className='text-[18px] font-semibold capitalize truncate' title={course.name}>{course.name}</h1>
                        {
                            is_admin ? <>
                            {/* <p className='text-gray-500 font-semibold mt-3 capitalize'>{provider}</p> */}
                            {null}
                            </>
                            :
                            <p className='text-gray-500 font-semibold mt-3 capitalize'>{subject === 'enrolled' ? null : subject}</p>
                        }
                        {
                            purchaseDetails ? 
                            <div className=''>
                                {
                                    !purchaseDetails.is_paid &&
                                    <p>{(daysLeftUntil(purchaseDetails.end_date)) < 0 ? <>Course Expired</> : <>{daysLeftUntil(purchaseDetails.end_date)} Days Left</>}</p>
                                }
                                <div className='flex justify-between items-center mt-2'>
                                    <div className='flex items-center gap-2'>
                                        <img src={time} alt="" className='w-4 h-4'/>
                                        <p className='text-xs'>{purchaseDetails.total_length}</p>
                                    </div>
                                    <p className='text-xs'>{purchaseDetails.complete_percentage}%</p>
                                </div>
                                <div className="w-full bg-[#e0e0e0] h-2 dark:bg-gray-700 my-5">
                                    <div className="bg-[#ceaf95] h-full" style={{width : `${purchaseDetails.complete_percentage}%`}}></div>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
                    {
                        !user.is_superuser && !user.is_provider ? 
                        <>
                            <div className='absolute w-full flex justify-between px-5 bottom-[35px] '>
                                <p className='bg-gray-300 px-2 py-1 uppercase text-xs'>
                                    {course.level}
                                </p>
                                <FontAwesomeIcon icon={faStar} className={`${ is_favorite ? 'text-yellow-500 hover:text-yellow-300' : 'text-gray-300 hover:text-gray-600' } hover:cursor-pointer`} title='Favorite' onClick={toggleWishList}/>
                            </div>
                            {purchaseDetails ? <div className='text-xs text-[#c4c4c4] font-semibold w-full text-center absolute bottom-[10px]'>Started {getDate(purchaseDetails.purchase_date)}</div>: null }
                        </> 
                        : 
                            <div className='absolute b-[10px] w-full flex justify-center gap-4 bottom-[20px] '>
                                        {
                                            is_admin ? 
                                            (
                                                course.is_published ?
                                                <button className='w-[120px] py-1 text-center bg-[#4B527E] rounded text-white' onClick={handleBlock}>Block</button>
                                                :
                                                <button className='w-[120px] py-1 text-center bg-[#4B527E] rounded text-white' onClick={handleApprove}>Approve </button>
                                            )
                                            :
                                        (
                                            course.is_published ? 
                                            <button className='w-[120px] py-1 text-center bg-[#4B527E] rounded text-white'   >Unpublish</button>
                                            :
                                            (course.is_pending ? 
                                                <button className='w-[120px] py-1 text-center bg-gray-300 rounded text-white' disabled> Pending</button>
                                                :
                                                <button className='w-[120px] py-1 text-center bg-[#4B527E] rounded text-white' onClick={handlePublish}> Publish </button>

                                            )

                                        )
                                        }
                                <button className='w-[120px] py-1 text-center bg-[#E5C3A6] rounded' onClick={()=>{setModal(true)}}>Edit</button>
                            </div>
                    }
            {modal && <CustomModal component={<AddCourse course={course} edit="true" getModal={getModal} />} />}  
    </>
  )
}

export default CourseCard
