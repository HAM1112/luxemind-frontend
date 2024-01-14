import React, { useEffect, useState } from 'react'
import api from '../../../api/api';
import useUrlHeader from '../../../utilities/urlHeader';
import CourseCard from '../../partials/CourseCard';

function FavoriteCourses() {
  const [courses, setCourses] = useState([]);
  const auth = useUrlHeader()

  useEffect(() => {
    api.get(
      'student/wishlist/',
      auth
    ).then(response => {
      console.log(response.data);
      setCourses(response.data)
    })
  }, []);

  useEffect(() => {
   
  }, [courses]);

  return (
    <>
        <div className='w-full'>
          <h1 className='font-bold py-5 text-3xl w-full '>Favorite Courses</h1>
          <div className='flex gap-4'>
            <div className='border-2 border-[#E5C3A6] w-1/4 sm:w-1/6 md:w-1/12'></div>
            <div className='border-2 border-gray-200 w-3/4 sm:w-5/6 md:w-11/12'></div>
          </div>
        </div>
        {
          courses.length !== 0 ? 
              <div className='mt-5 grid grid-cols-1  justify-items-stretch sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {
                      courses.map((course) => {        
                        
                        return (
                          <div key={course.id} className='course-card h-[320px] relative select-none '>
                            <CourseCard details={course} subject={'enrolled'} />
                          </div>
                        )
                      })
                    }
              </div>
              :
              <div className='pt-4'>
                Favorite is empty.
              </div>
        }
    </>
  )
}

export default FavoriteCourses
