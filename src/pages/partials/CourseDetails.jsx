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



function CourseDetails(props) {
    const { course_id } = useParams()
    const { is_provider } = props
    const [isDescription, setIsDescription] = useState(true);
    const [course, setCourse] = useState({});
    const [provider, setProvider] = useState({});
    const [subject, setSubject] = useState('');
    const [lesson, setLesson] = useState({});
    const [is_purchased, setIs_purchased] = useState(false);
    const auth = useUrlHeader()

    useEffect(() => {
      api.get(
        `/student/check_purchase/${course_id}`,
        auth
      ).then((response) => {
        setIs_purchased(response.data.is_purchased)
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
      })
    }, []);
    
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
    return (
    <div className={ is_provider ? 'p-10 flex border-4 border-red-500 flex h-screen' : 'px-36 py-1 pb-10 border-4 border-green-500 flex h-screen' }>
      <div className='w-3/4 overflow-scroll p-3'>
      {console.log(course)}
          <h1 className='font-bold text-[40px]'>{course.name} </h1>
          <p className='text-[24px] mt-2 p-3'>{course.short_description}</p>
          <div className='mt-3 flex gap-4 items-center'>
            <img src={accPic} alt="avatar" className='w-10 h-10 rounded-full' />
            <div className=''>
              <p className='text-gray-500 font-semibold'>Provider</p>
              <p>{provider.username}</p>
            </div>
          </div>
          <div className='mt-5 flex gap-4 items-center'>
            <img src={saved} alt="" className='w-8 h-8 ' />
              <div>
                <p className='text-gray-500 font-semibold'>Subject</p>
                <p className='capitalize'>{subject}</p>
              </div>
          </div>
          <div className='bg-[#f0f4fa] flex justify-evenly mt-6 '>
              <div onClick={()=>setIsDescription(true)} className={isDescription ? 'bg-white border-t-4 border-[#2E4374] p-4 w-full text-center font-semibold hover:bg-[#EEEEEE]' : 'p-4 w-full text-center font-semibold hover:bg-[#EEEEEE]' }>
                <p>Description</p>
              </div>
              <div onClick={()=>{setIsDescription(false)}} className={isDescription ? 'p-4 w-full text-center font-semibold hover:bg-[#EEEEEE]' : 'bg-white border-t-4 border-[#2E4374] p-4 w-full text-center font-semibold hover:bg-[#EEEEEE]' }>
                <p>Curriculum</p>
              </div>
          </div>
          { isDescription ? <Description course={course} provider={provider}/> : <Curriculum course={course} is_provider={is_provider}/> }
      </div>
      <div className='w-1/4 '>
        { 
          is_provider ? 
          null : 
          (
            is_purchased ?
            
            <div className='p-5'>
              <Link to={`/student/course/${course.id}/lesson/${lesson.id}`}>
                <button className='px-3 py-2 bg-blue-400 rounded'>Open Course</button>
              </Link>
            </div>
            :
            <div className='p-5'>
              <button className='px-3 py-2 bg-blue-400 rounded' onClick={handleEnroll}>Enroll Course</button>
            </div>
          )
        }
        <div className='px-5'>
          <div className='flex items-center py-1 px-2 border-b-2 border-[#ececee] bg-[#efdbc9]'>
              <img src={conis} className='h-[55px]' />
              <p className='text-[15px]'>Upgrade {is_purchased ? <>course</> : <>available</>} for ${course.course_price}</p>
          </div>
          <div className='flex justify-between items-center py-5 px-2 border-b-2 border-[#ececee]'>
            <p>Enrolled : <span className='font-bold'> 100 students </span> </p>
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
