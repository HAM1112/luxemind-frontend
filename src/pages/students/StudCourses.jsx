import React, { useEffect, useState } from 'react'
import api from '../../api/api';
import useUrlHeader from '../../utilities/urlHeader';
import CourseCard from '../partials/CourseCard';


function StudCourses() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setfilteredCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [checkedSubject, setCheckedSubject] = useState([]);
    const [checkedLevel, setCheckedLevel] = useState([]);
    const [checkedPrice, setCheckedPrice] = useState([]);
    const auth = useUrlHeader()
    const levels = ['introductory' , 'beginner' , 'intermediate', 'advanced' , 'expert']
    const prices= ['Below $100' , '$101 - $200' , '201 - $300', '$301 - $400' , '$401 - $500' , 'Above $500']
    useEffect(() => {
        api.get(
            '/provider/list-subjects/',
            auth
        ).then(response => {
              setSubjects(response.data)
              console.log(response.data);
        }).catch(error => {
            console.log(error.code);
        })
    }, []);
    useEffect(() => {
        api.get(
            '/student/get_all_published_courses/',
            auth
        ).then((response) => {
        setCourses(response.data)
        setfilteredCourses(response.data)
        console.log(response.data);
        }).catch((error)=>{
        console.log('newtwork issue');
        })
    }, []);

    useEffect(() => {
      console.log(checkedSubject);
      let allCourses = courses
      if (checkedSubject && checkedSubject.length > 0 ) {
          allCourses = allCourses.filter(course => checkedSubject.includes(`${course.subject}`))
      }
      if (checkedLevel && checkedLevel.length > 0) {
        allCourses = allCourses.filter(course => checkedLevel.includes(course.level))
      }
      setfilteredCourses(allCourses)
    }, [checkedPrice, checkedLevel , checkedSubject]);

    const handleSubjectCheck = (e) => {
      const subject = e.target.name
      if (checkedSubject.includes(subject)) {
        const updatedSubjects = checkedSubject.filter((item) => item !== subject);
        setCheckedSubject(updatedSubjects);
      }else{setCheckedSubject([...checkedSubject , subject])}
    } 

    const handleLevelCheck = (e) => {
      const level = e.target.name
      if (checkedLevel.includes(level)) {
        const updatedLevel = checkedLevel.filter((item)=>item !== level)
        setCheckedLevel(updatedLevel)
      }else{setCheckedLevel([...checkedLevel , level])}  
    }

    const handlePriceCheck = (e) => {
      console.log(e.target.name);
    }

  return (
    <div className=' md:flex  w-full p-10 bg-[linear-gradient(225deg, #f0f0f0, #cacaca);] h-screen'>
      <div className=' md:w-1/4 px-3 md:px-10 lg:px-24 overflow-y-scroll'>
        <h1 className='text-stone-500'>Refine your search</h1>
        <div>
          <h3 className='text-[21px] font-bold pt-8 pb-3'>Subject</h3> 
          
          {subjects.map(subject => {
            return (
            <div className='flex items-center gap-3'>
              <input type="checkbox" name={`${subject.id}`} className='text-[#00262b] border-2 border-black focus:ring-black' onClick={handleSubjectCheck}/>
              <p className='text-[20px] capitalize'>{subject.name}</p>
            </div>
            )
          })}

        </div>
        <div>
          <h3 className='text-[21px] font-bold pt-8 pb-3'>Level</h3>
          
          {
            levels.map(level => {
              return (
              <div className='flex items-center gap-3'>
                <input type="checkbox" name={`${level}`} onClick={handleLevelCheck} className='text-[#00262b] border-2 border-black focus:ring-black' />
                <p className='text-[20px] capitalize'>{level}</p>
              </div>
              )
            })
          }

        </div>
        <div>
          <h3 className='text-[21px] font-bold pt-8 pb-3'>Price</h3>
          {
            prices.map((price , index ) => {
              return (
                <div className='flex items-center gap-3'>
                  <input type="checkbox" name={index} onClick={handlePriceCheck} className='text-[#00262b] border-2 border-black focus:ring-black'/>
                  <p className='text-[20px]'>{price}</p>
                </div>
              )
            })
          }
        </div>


      </div>
      <div className='md:w-3/4 px-5 h-screen'>
        <h1 className='font-bold text-[30px]'>Courses</h1>
        <div className='mt-5 grid grid-cols-1  justify-items-stretch sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {
            filteredCourses.map((course) => {
               
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

export default StudCourses
