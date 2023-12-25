import React, { useEffect, useState } from 'react'
import api from '../../../../api/api';
import { useSelector } from 'react-redux';


function Additional({course , onChange}) {
  const [addCourse, setAddCourse] = useState(course);
  const [subjects, setSubjects] = useState([]);
  const token = useSelector((state) => state.token.value.access)
  const handleChange = (e) => {
    const {name , value} = e.target
    setAddCourse((prev) => ({...prev , [name] : value}))
  }
  
  useEffect(() => {
    api.get(
      '/provider/list-subjects',
      {
        headers : {
            Authorization: `Bearer ${token}`
        }
      }
    ).then(response => {
      console.log(response);
      setSubjects(response.data)
    })
  }, []);

  useEffect(() => {
    console.log(addCourse);
    onChange(addCourse)
  }, [addCourse]);


  return (
    <div>
      <div className='w-full'>
          <h3 className='font-semibold'>Subject</h3>
          <div className='flex mt-2 items-center border-2 border-slate-900 bg-gray-200 rounded-lg'>
            <label htmlFor="countries" className="mt-2 ps-3 w-3/12 block mb-2 font-medium text-gray-900 dark:text-white">
              Select an option
            </label>
            <select
              id="countries"
              name='subject'
              className="bg-gray-50 border border-gray-300 outline-none rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={addCourse.subject}
              onChange={handleChange}
              required
            >
              <option value="">Choose a subject</option>

              {subjects.map((subject)=>{
                return <option value={subject.id}>{subject.name}</option>
              })}
              
            </select>
          </div>
      </div>

      <div className='grid gap-1 mt-6'>
          <h3 className='font-semibold'>Add Price</h3>
          <input name='course_price' value={addCourse.course_price} onChange={handleChange} type="number" className='outline-none border-2 border-slate-900 p-1 rounded' required/>
      </div>

      <div className='flex items-center w-full gap-4 mt-6'>
        <div className='w-1/2'>
          <h3 className='font-semibold'>Course Free Trials (No. Days)</h3>
          <input name='no_of_days' value={addCourse.no_of_days} onChange={handleChange} type="number" className='w-full outline-none border-2 border-slate-900 p-1 rounded' required/>
        </div>
        <div className='w-1/2'>
          <h3 className='font-semibold'>Level</h3>
          <div className='flex mt-2 items-center border-2 border-slate-900 bg-gray-200 rounded-lg'>
              <label htmlFor="countries" className="mt-2 ps-3 w-3/12 block mb-2 font-medium text-gray-900 dark:text-white">
                Level
              </label>
              <select
                id="countries"
                name='level'
                className="bg-gray-50 border border-gray-300 outline-none rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={addCourse.level}
                onChange={handleChange}
                required
              >
                <option value="">Choose a subject</option>
                <option value="introductory">Introductory</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
                
              </select>
            </div>
        </div>
      </div>

      <div className='grid gap-1 mt-6'>
          <h3 className='font-semibold'>Prerequisites</h3>
          <textarea name="prerequisites" value={addCourse.prerequisites} onChange={handleChange} id="" rows="6" className='border-2 border-slate-900 outline-none p-1 rounded' required></textarea>
        </div>

    </div>
  )
}

export default Additional
