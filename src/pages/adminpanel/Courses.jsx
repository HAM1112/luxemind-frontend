import React, { useEffect, useState } from 'react'
import useUrlHeader from '../../utilities/urlHeader';
import api from '../../api/api';
import CourseCard from '../partials/CourseCard';
import { SpinnerCircular } from 'spinners-react';
function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useUrlHeader()

  useEffect(() => {
    setLoading(true)
    api.get(
      '/adminpanel/get_all_courses/' ,
      auth
      ).then(response=>{
        console.log(response.data);
        setCourses(response.data)
      })
      .catch(error=>{
        console.log(error);
      }).finally(()=>setLoading(false))
    
  }, []);
  
useEffect(() => {
  
}, [loading]);
  return (
    
    <div className='border-2 border-yellow-300 w-full p-10 bg-[linear-gradient(225deg, #f0f0f0, #cacaca);]'>
      {
        loading ? 
        <SpinnerCircular size={70} thickness={134} speed={100} color="rgba(57, 160, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
        :
          <>

            <div>
            {console.log(loading)}
              <h1 className='font-bold'>Pushlish Requests</h1>
              <div className='mt-5 grid grid-cols-1 justify-items-stretch sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {
                  courses.filter(course => !course.is_published && course.is_pending ).map((course) => {
                    
                    {/* let selectedProvider = providers.find(item => item.id === course.provider); */}
                    
                    return (
                      <div className='course-card h-[320px] relative select-none'><CourseCard is_admin={true} provider={'testing'} details={course} /></div>
                    )
                  })
                }
              </div>
            </div>


            <div className='mt-10'>
              <h1 className='font-bold'>Pushlished Courses</h1>
              <div className='mt-5 grid grid-cols-1 justify-items-stretch sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {
                  courses.filter(course => course.is_published && !course.is_pending ).map((course) => {
                    
                    {/* let selectedProvider = providers.find(item => item.id === course.provider); */}
                    
                    return (
                      <div className='course-card h-[320px] relative select-none'><CourseCard is_admin={true} provider={'testing'} details={course} /></div>
                    )
                  })
                }
              </div>
            </div>
          </>
      }

    </div>
  )
}

export default Courses
