import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import useUrlHeader from '../../utilities/urlHeader';
import { useSelector } from 'react-redux';
import { SpinnerCircular } from 'spinners-react';

function Lesson() {
    const [lesson, setLesson] = useState(null);
    const [lessonsArray, setLessonsArray] = useState([]);
    const {course_id ,lesson_id} = useParams()
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.value)
    const auth = useUrlHeader()
    const navigate = useNavigate()
    useEffect(() => {
        // get lesson details
        setLoading(true)
        api.get(`/provider/get_lesson_details/${lesson_id}`,auth)
        .then(response => {setLesson(response.data)})
        .catch(error =>{console.log('error in Lesson get lesson detalis api');})
        
        // get course details
        api.get(`/provider/getCurriculumDetails/${course_id}`,auth)
        .then(response => {
            const items = response.data.map(module => module.lessons).flat()
            setLessonsArray(items)
        })
        .catch(error => {console.log('error in Lesson getcurricculum api')})
       
        const timeoutId = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [lesson_id]);

    useEffect(() => {
      
    }, [lesson , lessonsArray ]);


    const handlePrev = () => {
        const index = lessonsArray.findIndex(lesson => lesson.id == lesson_id)
        if(index >= 1){
            // console.log(lessonsArray[index-1].id)
            navigate(`/provider/course/${course_id}/lesson/${lessonsArray[ index - 1 ].id}`)
        }
    }
    const handleNext = () => {
        const index = lessonsArray.findIndex(lesson => lesson.id == lesson_id)
        if (index < lessonsArray.length-1){
            navigate(`/provider/course/${course_id}/lesson/${lessonsArray[ index + 1 ].id}`)
        }
    }

  return (
    <>  
      { lesson ? <>
        <h2 className='text-[20px] text-gray-600 py-3'>{lesson.module.name}</h2>
        <h1 className='text-[30px] text-center font-bold py-3'>{lesson.lesson.name}</h1>

        <div className='flex justify-center my-8 border-4 border-red-700'>
          <ReactPlayer 
            url={lesson.lesson.lesson_url}
            controls={true}
            volume={1}
            muted={false}
            onEnded={()=>console.log('this is it')}
            />
        </div>

        <div className='border-2 border-violet-600 select-none flex justify-evenly w-full py-3'>
          <div onClick={handlePrev} className='flex gap-3 border-2 border-gray-300 py-4 px-6 rounded-xl hover:bg-gray-100'>   
            <span className='rounded-full px-1 border-2 border-black'><FontAwesomeIcon icon={faArrowLeft} /></span>
            <p>Previous Lesson</p>
          </div>
          {user.is_provider ? null :
            <div className='flex gap-3 text-white select-none border-2 justify-center py-4 px-6 rounded-xl w-[300px] bg-[#2E4374]'>
                Mark Complete
            </div>
          }
          <div onClick={handleNext} className='flex gap-3 border-2 border-gray-300 select-none py-4 px-6 rounded-xl w-[180px] hover:bg-gray-100'>   
            <p>Next Lesson</p>
            <span className='rounded-full px-1 border-2 border-black'><FontAwesomeIcon icon={faArrowRight} /></span>
          </div>
        </div>
        </>
        :
        <div>
          <SpinnerCircular size={90} thickness={31} speed={102} color="rgba(57, 141, 172, 1)" secondaryColor="rgba(0, 0, 0, 1)" />
        </div>
        
         }
    </>
  )
}

export default Lesson
