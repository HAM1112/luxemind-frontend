import React, { useEffect, useState } from 'react'
import CourseCard from '../partials/CourseCard'
import api from '../../api/api';
import useUrlHeader from '../../utilities/urlHeader';
import { useSelector } from 'react-redux';
import { convertToUnderscore } from '../../utilities/convertToUnderscore';
import { SpinnerCircular } from 'spinners-react';


function ProviderCourses() {
  const [modal, setModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const auth = useUrlHeader()
  useEffect(() => {
    setLoading(true)
    api.get(
      '/provider/list-subjects/',
      auth
      ).then(response => {
        setSubjects(response.data)
      }).catch(error => {
        console.log(error.code);
      })
      api.get(
        '/provider/list-courses/',
        auth
        ).then((response) => {
          setCourses(response.data)
          console.log(response.data);
        }).catch((error)=>{
          console.log('newtwork issue');
        }).finally(()=>setLoading(false))
      
    }, []);
  useEffect(() => {
      
      }, [loading]);


  const getModal = (bool) => {
      setModal(bool)
  }

  return (
    <div className=' w-full py-3 px-1 md:p-10 bg-[linear-gradient(225deg, #f0f0f0, #cacaca);]'>
    {/* {
      loading ?
      <SpinnerCircular size={70} thickness={134} speed={100} color="rgba(57, 160, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
      : */}
          <>
      <div>
      {console.log(loading)}
        <h1 className='font-bold'>Unpublished Courses</h1>
        <div className='mt-5 grid grid-cols-1 justify-items-center sm:justify-items-stretch sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {
            courses.filter(course => !course.is_published && !course.is_pending ).map((course) => {
               
              let selectedSubject = subjects.find(item => item.id === course.subject);
              
              return (
                <div className='course-card w-[270px] sm:w-auto h-[320px] relative select-none'>
                  <CourseCard details={course} subject={selectedSubject.name}/>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='mt-10'>
        <h1 className='font-bold'>Pending Approval</h1>
        <div className='mt-5 grid grid-cols-1 justify-items-center sm:justify-items-stretch sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {
            courses.filter(course => !course.is_published && course.is_pending ).map((course) => {
               
              let selectedSubject = subjects.find(item => item.id === course.subject);
              
              return (
                <div className='course-card w-[270px] sm:w-auto h-[320px] relative select-none'>
                  <CourseCard details={course} subject={selectedSubject.name}/>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='mt-10'>
        <h1 className='font-bold'>Published Courses</h1>
        <div className='mt-5 grid grid-cols-1 justify-items-center sm:justify-items-stretch sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {
            courses.filter(course => course.is_published && !course.is_pending ).map((course) => {
               
              let selectedSubject = subjects.find(item => item.id === course.subject);
              
              return (
                <div className='course-card w-[270px] sm:w-auto h-[320px] relative select-none'>
                  <CourseCard details={course} subject={selectedSubject.name}/>
                </div>
              )
            })
          }
        </div>
      </div>

          </>
    {/* } */}
    </div>
  )
}

export default ProviderCourses
