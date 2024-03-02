import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import accPic from '../../assets/acco.png'
import saved from '../../assets/saved.png'
import students from '../../assets/students.png'
import lessons from '../../assets/lessons.png'
import duration from '../../assets/duration.png'
import Description from './Description'
import Curriculum from './Curriculum'
import api from '../../api/api'
import useUrlHeader from '../../utilities/urlHeader'
import conis from '../../assets/coins.png'
import CustomModal from '../customs/CustomModal'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CourseCheckout from '../students/components/CourseCheckout'
import { Rating, Typography } from '@mui/material'
import AddReview from '../students/components/AddReview'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'


const stripePromise = loadStripe('pk_test_51OUSTKSD35HDNE0LxLa3ZdB7RR5jlH2rxFwoyw8neo08LQV9DhA0DsAE6NOwTjcjbKKY3NocOK22hhuo1BL3OQ5A00i5cf2Mc1');

function CourseDetails(props) {
    const { course_id } = useParams()
    const user = localStorage.getItem('user')
    const { is_provider } = props
    const [isDescription, setIsDescription] = useState(true);
    const [course, setCourse] = useState({});
    const [provider, setProvider] = useState({});
    const [subject, setSubject] = useState('');
    const [lesson, setLesson] = useState({});
    const [is_purchased, setIs_purchased] = useState(null);
    const [noEnrolls, setNoEnrolls] = useState(0);
    const auth = useUrlHeader()
    const [modal, setModal] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const currentDateTime = new Date();

    const [allReviews, setAllReviews] = useState([]);
    useEffect(() => {
      api.get(
        `/student/check_purchase/${course_id}`,
        auth
      ).then((response) => {
        setIs_purchased(response.data)
      }).catch((error) => {
        console.log(error);
      })
      api.get(
          `/provider/getCourseDetails/${course_id}`,
          auth
      ).then(response => {
        setProvider(response.data.provider)
        setSubject(response.data.subject)
        setCourse(response.data.course)
        setLesson(response.data.lesson)
        setNoEnrolls(response.data.no_enrolls)
        setAllReviews(response.data.reviews)
      })
      if (!is_provider) {
        api.post(
          `/payments/save-stripe-info/`,
          {course : course_id},
          auth
        ).then(response => setClientSecret(response.data.clientSecret))
      }
    }, []);
    
    const appearance = {theme: 'stripe',};
    const options = {clientSecret,appearance,};
    useEffect(() => {
      
    }, [course]);

    const handleEnroll = ()=>{
      console.log('enroll clicked');
      console.log(course.id);
      api.post(
        `/student/course_purchase`,
        course,
        auth
      ).then(response => {
        console.log(response.data);
        setIs_purchased(true)
      }).catch((error)=>{
        console.log(error);
      })
    }
    const getModal = (bool) => {
      setModal(bool)
      setReviewModal(bool)
     }
    const handleReviewDelete = (review_id) =>{
      console.log('something happened');
      api.delete(
        `/student/review-rating/${review_id}`,
        
        auth
      ).then((response) => {
        console.log(response.data);
        const updatedReviews = allReviews.filter(review => review.id !== 2);
        setAllReviews(updatedReviews)
      }).catch(error => {
        console.log(error);
      })
    }
    

    return (
    <div className={ is_provider || user.is_superuser ? 'p-3 sm:p-10 h-screen sm:p-5 lg:flex' : 'p-1 sm:p-5 lg:px-36 py-1 pb-10 lg:flex h-screen' }>
      <div className='w-full lg:w-3/4 overflow-scroll p-3'>
        
          <h1 className='font-bold text-[24px] sm:text-[28px] lg:text-[40px]'>{course.name} </h1>
          <p className='text-[15px] sm:text-[18px] lg:text-[24px] p-2 sm:mt-2 sm:p-3'>{course.short_description}</p>
          <div className='flex justify-evenly mt-3 lg:block lg:mt-0'>
            <div className='mt-1 lg:mt-3 flex gap-4 items-center'>
              <img src={accPic} alt="avatar" className='w-10 h-10 rounded-full' />
              <div className=''>
                <p className='text-gray-500 font-semibold'>Provider</p>
                <p>{provider.username}</p>
              </div>
            </div>
            <div className='mt-1 lg:mt-5 flex gap-4 items-center'>
              <img src={saved} alt="" className='w-8 h-8 ' />
                <div>
                  <p className='text-gray-500 font-semibold'>Subject</p>
                  <p className='capitalize'>{subject}</p>
                </div>
            </div>
          </div>
          <div className='bg-[#f0f4fa] flex justify-evenly mt-6 '>
              <div onClick={()=>setIsDescription(true)} className={isDescription ? 'bg-white border-t-4 border-[#2E4374] p-2 lg:p-4 w-full text-center font-semibold hover:bg-[#EEEEEE]' : 'p-2 lg:p-4 w-full text-center font-semibold hover:bg-[#EEEEEE]' }>
                <p>Description</p>
              </div>
              <div onClick={()=>{setIsDescription(false)}} className={isDescription ? 'p-2 lg:p-4 w-full text-center font-semibold hover:bg-[#EEEEEE]' : 'bg-white border-t-4 border-[#2E4374] p-2 lg:p-4 w-full text-center font-semibold hover:bg-[#EEEEEE]' }>
                <p>Curriculum</p>
              </div>
          </div>
          { isDescription ? <Description course={course} provider={provider}/> : <Curriculum course={course} is_provider={is_provider}/> }

          
          <div className='mt-20 m-2'>
            <h1 className='my-10 flex justify-between items-center'><span className='text-[24px]'>Review and rating</span><span onClick={()=>setReviewModal(true)} className='me-5 px-3 py-1 bg-yellow-300 text-white rounded hover:bg-yellow-200 hover:cursor-pointer'>Add review</span></h1>
              
                {
                  reviewModal && <CustomModal component={ <AddReview course_id={course.id} getModal={getModal} /> } />
                }
                {allReviews.length === 0 && <p>No reviews yet</p>}
            {allReviews.map(review => {
              return (
                <div key={review.id} className='mt-4'>
                  <div className='flex justify-between gap-3'>
                    <div className='flex gap-3'>
                      <img src={review.student.avatar ? review.student.avatar : accPic} alt="avatar" className='w-10 h-10 rounded-full' />
                      <p>{review.student.username}</p>    
                    </div>
                    {
                      review.student.id == user.user_id && <>
                        <div className='me-4 flex gap-5'>
                          <FontAwesomeIcon icon={faPenToSquare} className='text-blue-600 hover:text-blue-400'/>
                          <FontAwesomeIcon icon={faTrash} onClick={()=>{handleReviewDelete(review.id)}} className='text-red-600 hover:text-red-400' />
                        </div>
                      </> 
                    }
                  </div>
                  <div className='mx-[40px] '>
                    <div className='flex items-center gap-4'>
                      <Rating className='my-2' name="read-only" value={review.rate} readOnly /> 
                      <span className='text-gray-400'> {new Date(review.added_date).toLocaleDateString()}</span>
                    </div>
                    <p className='pb-6 border-b-2'>{review.review}</p>

                  </div>
                </div>

              )
            })}



          </div>
      </div>


      <div className='w-full lg:w-1/4 overflow-y-scroll'>
        { 
          is_provider ? 
          null : 
          (
            is_purchased ?
            <>
              
              
              
              
              
              <div className='px-5 py-2  w-full'>
              {console.log((currentDateTime.toISOString() > is_purchased.end_date) || !is_purchased.is_paid )}
              
              {
                ((currentDateTime.toISOString() < is_purchased.end_date) || is_purchased.is_paid ) ?
                    <Link to={`/student/course/${course.id}/lesson/${lesson.id}`}>
                      <button className='p-3 bg-[#2E4374] text-white font-bold border-4 border-double w-full transition  hover:bg-[#54668d] '>Open Course</button>
                    </Link>
                  :
                    <button className='p-3 bg-[#2E4374] text-white font-bold border-4 border-double w-full transition  hover:bg-[#54668d] cursor-not-allowed'>Course Expired</button>
              }
              </div>
              {
                is_purchased.is_paid ?
                null :
              <div onClick={()=>{setModal(true)}} className='flex items-center cursor-pointer px-2 mx-5 border-4 bg-[#efdbc9] hover:bg-[#F3E5D9] border-[#F3E5D9] hover:border-double hover:border-[#efdbc9]'>
                  {console.log(is_purchased.is_paid)}
                  <img src={conis} className='h-[55px]' />
                  <p className='text-[15px]'>Upgrade course for ${course.course_price}</p>
              </div>

              }
             {modal && clientSecret &&<CustomModal component={<Elements stripe={stripePromise} options={options}><CourseCheckout getModal={getModal} course={course}/></Elements>} />} 
            
            
            
            
            
            
            </>
            :
            <>
            <div className='p-5'>
              <button className='p-3 bg-[#24355c] text-white font-bold border-4 border-double w-full transition hover:bg-[#39496c]' onClick={handleEnroll}>Enroll Course</button>
            </div>
            <div className='flex items-center py-1 px-2 mx-5 border-b-2 border-[#ececee] bg-[#efdbc9]'>
                <img src={conis} className='h-[55px]' />
                <p className='text-[15px]'>Upgrade Available for ${course.course_price}</p>
            </div>
            </>
          )
        }
        <div className='px-5'>
          <div className='flex justify-between items-center py-5 px-2 border-b-2 border-[#ececee]'>
            <p>Enrolled : <span className='font-bold'> {noEnrolls} students </span> </p>
            <img src={students} alt="studs" className='w-8 h-8'/>
          </div>
          <div className='flex justify-between items-center py-5 px-2 border-b-2 border-[#ececee]'>
            <p>Duration : <span className='font-bold'> 5 hours </span> </p>
            <img src={duration} alt="studs" className='w-8 h-8'/>
          </div>
          <div className='flex justify-between items-center py-5 px-2 border-b-2 border-[#ececee]'>
            <p>Lessons : <span className='font-bold'> 47 students </span> </p>
            <img src={lessons} alt="studs" className='w-8 h-8'/>
          </div>
        </div>
        <div className='px-2 border-2 border-[#ececee]'>
          <div className='flex gap-3 p-3'>
            <img src="https://picsum.photos/seed/picsum/200/300" className='w-1/3 h-20' />
            <div className='w-2/3'>
              <p className='line-clamp-2 font-semibold'>I am a mad super crazy scientists</p>
              <p className='text-slate-400 text-[15px]'>By Albert Einstein</p>
            </div>
          </div>
          <div className='flex gap-3 p-3'>
            <img src="https://picsum.photos/seed/picsum/200/300" className='w-1/3 h-20' />
            <div className='w-2/3'>
              <p className='line-clamp-2 font-semibold'>I am a mad super crazy scientists</p>
              <p className='text-slate-400 text-[15px]'>By Albert Einstein</p>
            </div>
          </div>
          <div className='flex gap-3 p-3'>
            <img src="https://picsum.photos/seed/picsum/200/300" className='w-1/3 h-20' />
            <div className='w-2/3'>
              <p className='line-clamp-2 font-semibold'>I am a mad super crazy scientists</p>
              <p className='text-slate-400 text-[15px]'>By Albert Einstein</p>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default CourseDetails
