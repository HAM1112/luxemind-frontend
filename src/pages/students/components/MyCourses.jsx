import React, { useEffect, useState } from 'react'
import useUrlHeader from '../../../utilities/urlHeader';
import api from '../../../api/api';
import CourseCard from '../../partials/CourseCard';

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const auth = useUrlHeader()

  useEffect(() => {
    api.get('/student/enrolled/').then(res => {
      setCourses(res.data)
      console.log(res.data);
    })
  }, []);
  return (
    <>
        <div className='w-full'>
          <h1 className='font-bold py-5 text-3xl w-full '>Enrolled Courses</h1>
          <div className='flex gap-4'>
            <div className='border-2 border-[#E5C3A6] w-1/4 sm:w-1/6 md:w-1/12'></div>
            <div className='border-2 border-gray-200 w-3/4 sm:w-5/6 md:w-11/12'></div>
          </div>
        </div>
        {
          courses != []? 
              <div className='mt-5 grid grid-cols-1  justify-items-stretch sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                    {
                      courses.map((course) => {        
                        const course_details = course.course_details
                        const purchase_details = course.purchase_details 
                        purchase_details['total_length'] = course.total_length
                        purchase_details['complete_percentage'] = course.complete_percentage
                        
                        return (
                          <div key={course.course_details.id} className='course-card h-[320px] relative select-none '>
                            <CourseCard details={course_details} subject={'enrolled'} purchase={purchase_details}/>
                          </div>
                        )
                      })
                    }
              </div>
              :
              <div className='pt-4'>
                Enrolled Courses in empty. Explore new Courses
              </div>
        }
    </>
  )
}

export default MyCourses
