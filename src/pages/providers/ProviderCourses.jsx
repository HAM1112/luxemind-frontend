import React, { useEffect, useState } from 'react'
import CourseCard from '../partials/CourseCard'
import api from '../../api/api';
import useUrlHeader from '../../utilities/urlHeader';
import { useSelector } from 'react-redux';
import { convertToUnderscore } from '../../utilities/convertToUnderscore';


function ProviderCourses() {

  const [modal, setModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  
  const auth = useUrlHeader()
  useEffect(() => {
    api.get(
      '/provider/list-subjects/',
      auth
    ).then(response => {
      setSubjects(response.data)
    }).catch(error => {
      console.log(error.code);
    })
  }, []);
  useEffect(() => {
    api.get(
      '/provider/list-courses/',
      auth
    ).then((response) => {
      setCourses(response.data)
      console.log(response.data);
    }).catch((error)=>{
      console.log('newtwork issue');
    })

  }, []);

  const getModal = (bool) => {
      setModal(bool)
  }

  return (
    <div className='border-2 border-yellow-300 w-full p-10 bg-[linear-gradient(225deg, #f0f0f0, #cacaca);]'>
      <div>
        <h1 className='font-bold'>Unpublished Courses</h1>
        <div className='mt-5 grid grid-cols-1 justify-items-stretch sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {
            courses.filter(course => !course.is_published && !course.is_pending ).map((course) => {
               
              let selectedSubject = subjects.find(item => item.id === course.subject);
              
              return (
                <div><CourseCard details={course} subject={selectedSubject.name}/></div>
              )
            })
          }
        </div>
      </div>

      <div className='mt-10'>
        <h1 className='font-bold'>Pending Approval</h1>
        <div className='mt-5 grid grid-cols-1 justify-items-stretch sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {
            courses.filter(course => !course.is_published && course.is_pending ).map((course) => {
               
              let selectedSubject = subjects.find(item => item.id === course.subject);
              
              return (
                <div><CourseCard details={course} subject={selectedSubject.name}/></div>
              )
            })
          }
        </div>
      </div>

      <div className='mt-10'>
        <h1 className='font-bold'>Published Courses</h1>
        <div className='mt-5 grid grid-cols-1 justify-items-stretch sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {
            courses.filter(course => course.is_published && !course.is_pending ).map((course) => {
               
              let selectedSubject = subjects.find(item => item.id === course.subject);
              
              return (
                <div><CourseCard details={course} subject={selectedSubject.name}/></div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ProviderCourses
