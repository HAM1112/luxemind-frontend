import { faArrowLeft, faArrowRight, faChevronCircleDown, faChevronDown, faCircleCheck, faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link, Outlet, useParams } from 'react-router-dom'
import api from '../../api/api'
import useUrlHeader from '../../utilities/urlHeader'
import { useSelector } from 'react-redux'



function FullCourse() {
  const {course_id} = useParams()
  const user = useSelector(state => state.user.value)
  const [courseDetails, setCourseDetails] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const [p_lessons, setP_lessons] = useState([]);
  const auth = useUrlHeader()
  const [loading, setLoading] = useState(false);
  const toggleModule = (index) => {
    const updatedAll = [...curriculum];
    updatedAll[index].is_open = !updatedAll[index].is_open;
    setCurriculum(updatedAll);
  };

  useEffect(() => {
    setLoading(true)
    api.get(`/provider/getCurriculumDetails/${course_id}` , auth)
    .then(response => {
      const updatedData = response.data.map((module) => ({...module , is_open : false}))
      setCurriculum(updatedData)
    }).catch(error => console.log("error from FullCourse curriculum get"))
    api.get(
      `/provider/getCourseDetails/${course_id}`,
      auth
    ).then(response => {
      setCourseDetails(response.data)
    }).catch(error => console.log('error from FullCourse courseDetails get'))
    if (!user.is_provider && !user.is_superuser) {
      api.get(
        `/student/getCourseDetails/${course_id}`,
        auth
      ).then(response=>{
        setP_lessons(response.data)
      })  
    } 
    setLoading(false)
  }, []);

  const getCompletePercentage = ()=>{
    let total = "00:00"
    curriculum.map(module => {[
      module.lessons.map(lesson => {
        const [lessonMinutes, lessonSeconds] = lesson.lesson_duration.split(":");
        total = addTimeToTotal(total, parseInt(lessonMinutes), parseInt(lessonSeconds));
      })
    ]})
    
    let completed = "00:00"
    curriculum.map(module => {[
      module.lessons.map(lesson => {
        const p_lesson = findLessonById(lesson.id)
        if (p_lesson && p_lesson.is_compelete) {
          const [lessonMinutesp, lessonSecondsp] = lesson.lesson_duration.split(":");
          completed = addTimeToTotal(completed, parseInt(lessonMinutesp), parseInt(lessonSecondsp));
        }
      })
    ]})
    
    
    
    return parseInt((convertTimeToSeconds(completed)/convertTimeToSeconds(total))*100)

  }
  const addTimeToTotal = (total, minutes, seconds) => {
    const [totalMinutes, totalSeconds] = total.split(":");
    const newTotalSeconds = parseInt(totalMinutes) * 60 + parseInt(totalSeconds) + minutes * 60 + seconds;
    // Convert total seconds back to "mm:ss" format
    return `${String(Math.floor(newTotalSeconds / 60)).padStart(2, '0')}:${String(newTotalSeconds % 60).padStart(2, '0')}`;
  };

  function convertTimeToSeconds(timeString) {
    // Split the time string into minutes and seconds
    const [minutes, seconds] = timeString.split(':').map(Number);

    // Calculate the total seconds
    const totalSeconds = minutes * 60 + seconds;

    return totalSeconds;
}

  useEffect(() => {
    
  }, [loading]);

  const findLessonById = (id) => p_lessons.find(lesson => lesson.lesson === id);

  return (
    <>
    {!loading ?
    
    <div className='flex h-screen'>
      
      {/* video side */}
      <div className={`${user.is_provider ? 'w-2/3' : 'w-3/4' }  py-3 px-24`}> 
        <Outlet />
      </div>



      {/* Curriculum full details */}
      <div className={`${user.is_provider ? 'w-1/3' : 'w-1/4' } py-8 py-3 bg-[#eaeaea] overflow-y-scroll border-x border-gray-400`}>
        <div className='p-5'>
          <h2 className='text-[24px] font-semibold'>{courseDetails ? courseDetails.course.name : null}</h2>
          <div className='flex items-center gap-2'>
            <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700 my-5">
              <div className="bg-[#ceaf95] h-2.5 rounded-full" style={{width : `${getCompletePercentage()}%`}}></div>
            </div>
            <p className='pb-1'>{getCompletePercentage()}%</p>
          </div>
        </div>
         {/* contents start here */}
        {curriculum.map((module , index) => {
          return (
            <div key={index}>
                  <div className='flex bg-[#DBDBDB] justify-between py-3  px-5'>
                    <p>{module.module.name}</p>
                    <div className='flex gap-5 items-start'>
                      {/* <span>0/{module.lessons.length}</span> */}
                      <span onClick={()=>{toggleModule(index)}} className='bg-[#eaeaea] rounded-full px-1'><FontAwesomeIcon icon={faChevronDown} /></span>
                    </div>
                  </div>
                  {module.is_open
                  &&
                  <div className='w-full border-b border-gray-500 px-8 '>
                    <ul>
                      {module.lessons.map((lesson,index) => {
                        const lessontrack = findLessonById(lesson.id)
                        return (
                          <li key={index} className='px-3 py-1 flex justify-between border-b border-gray-400'>
                            <div>
                              <h1 className='text-[14px] capitalize'><Link to={`lesson/${lesson.id}`}>{lesson.name}</Link></h1>
                              <div><FontAwesomeIcon className='text-red-400 text-[14px]' icon={faCirclePlay} /> <span className='ps-1 text-gray-600 text-[14px]'>{lesson.lesson_duration}</span></div>
                            </div>
                            { 
                              lessontrack.is_compelete ?
                              <span><FontAwesomeIcon className='text-[#b79c84]' icon={faCircleCheck} /></span>
                              : 
                              <span><FontAwesomeIcon className='text-[#B7B7B7]' icon={faCircleCheck} /></span>
                             }
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  }
            </div>
          )
        })}
        {/* content ends here */}
      </div>
    </div>
    :null
    }
    </>
  )
}

export default FullCourse
