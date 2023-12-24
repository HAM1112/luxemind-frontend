import { faArrowLeft, faArrowRight, faChevronCircleDown, faChevronDown, faCircleCheck, faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link, Outlet, useParams } from 'react-router-dom'
import api from '../../api/api'
import useUrlHeader from '../../utilities/urlHeader'



function FullCourse() {
  const {course_id} = useParams()
  
  const [courseDetails, setCourseDetails] = useState({});
  const [curriculum, setCurriculum] = useState([]);
  const auth = useUrlHeader()

  const toggleModule = (index) => {
    const updatedAll = [...curriculum];
    updatedAll[index].is_open = !updatedAll[index].is_open;
    setCurriculum(updatedAll);
  };

  useEffect(() => {
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
      console.log(response.data);
    }).catch(error => console.log('error from FullCourse courseDetails get'))
  }, []);

  useEffect(() => {
    
  }, [courseDetails , curriculum]);

  return (
    <div className='flex h-screen'>

      {/* video side */}
      <div className='w-2/3  p-10'>
        <Outlet />
      </div>



      {/* Curriculum full details */}
      <div className='w-1/3 py-8 py-3 bg-[#eaeaea] overflow-y-scroll border-x border-gray-400'>

        <div className='p-5'>
          <h2 className='text-[24px] font-semibold'>{courseDetails.course.name}</h2>
          <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700 my-5">
            <div className="bg-[#ceaf95] h-2.5 rounded-full" style={{width : `${89}%`}}></div>
          </div>  
        </div>
         
         {/* contents start here */}


        {curriculum.map((module , index) => {
          
          return (
            <div key={index}>
                  <div className='flex bg-[#DBDBDB] justify-between py-3  px-5'>
                    <p>{module.module.name}</p>
                    <div className='flex gap-5'>
                      <span>0/{module.lessons.length}</span>
                      <span onClick={()=>{toggleModule(index)}} className='bg-[#eaeaea] rounded-full px-1'><FontAwesomeIcon icon={faChevronDown} /></span>
                    </div>
                  </div>
                  {module.is_open
                  &&
                  <div className='w-full border-b border-gray-500 px-8 '>
                    <ul>
                      {module.lessons.map((lesson,index) => {
                        return (
                          <li key={index} className='px-3 py-1 flex justify-between border-b border-gray-400'>
                            <div>
                              <h1 className='text-[14px] capitalize'><Link to={`lesson/${lesson.id}`}>{lesson.name}</Link></h1>
                              <div><FontAwesomeIcon className='text-red-400 text-[14px]' icon={faCirclePlay} /> <span className='ps-1 text-gray-600 text-[14px]'>10:00</span></div>
                            </div>
                            <span><FontAwesomeIcon className='text-[#b79c84]' icon={faCircleCheck} /></span>
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
  )
}

export default FullCourse
