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
    const [p_lessons, setP_lessons] = useState(null);
    const [lessonsArray, setLessonsArray] = useState([]);
    const [purchaseLesson, setPurchaseLesson] = useState({});
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
        if (!user.is_provider && !user.is_superuser) {
          api.get(
            `/student/getCourseDetails/${course_id}`,
            auth
          ).then(response=>{
            setP_lessons(response.data)
          })  
        } 
        const timeoutId = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [lesson_id]);

    useEffect(() => {
   
    }, [lesson , lessonsArray ]);
    
    useEffect(() => {
      // current index from lessonArray
      const current = lessonsArray.findIndex(lessonn => lessonn.id == lesson_id)
      if (current > 0 && p_lessons != null && lessonsArray && p_lessons) {
        
        const prev_id = lessonsArray[current - 1].id
        const prevFromPurchase = p_lessons.find(less => less.lesson === prev_id )
        console.log(prev_id);
        

        if ( current > 0 && prevFromPurchase.is_watched === false ) {
          navigate(`/student/course/${course_id}/lesson/${lessonsArray[ current - 1 ].id}`)
        }

        setPurchaseLesson(p_lessons.find(pl => pl.lesson == lesson_id))
      }
    }, [p_lessons]);


    const handlePrev = () => {
        const index = lessonsArray.findIndex(lesson => lesson.id == lesson_id)
        if(index >= 1 && lessonsArray ){
            if (user.is_provider) {
              navigate(`/provider/course/${course_id}/lesson/${lessonsArray[ index - 1 ].id}`)
            }else if (user.is_superuser) {
              console.log('Admin Side Working');
            }else{
              navigate(`/student/course/${course_id}/lesson/${lessonsArray[ index - 1 ].id}`)
            }
            console.log('prev working');
        }
    }
    const handleNext = () => {
        const index = lessonsArray.findIndex(lesson => lesson.id == lesson_id)
        if (index < lessonsArray.length-1 && lessonsArray ){
          if (user.is_provider) {
            navigate(`/provider/course/${course_id}/lesson/${lessonsArray[ index + 1 ].id}`)
          }else if (user.is_superuser) {
            console.log('Admin Side working');
          }else{
            const current = p_lessons.find(p_l => p_l.lesson == lesson_id)
            
            if (current.is_watched) {
              navigate(`/student/course/${course_id}/lesson/${lessonsArray[ index + 1 ].id}`)
            }
          }
          console.log('next working');
        }
    }

    const handleComplete = () =>{
      if (!user.is_provider && !user.is_superuser) {
        const completeLesson = p_lessons.find(plesson => plesson.lesson == lesson_id)
        api.patch(
          `/student/update_complete/${completeLesson.id}`,
          null,
          auth
        ).then(response => {
          console.log(response.data);
          completeLesson.is_compelete = !completeLesson.is_compelete
          setP_lessons([completeLesson,...p_lessons])
        }).catch(error=>{
          console.log('erro in complete toggle');
        })
      }
    }

    const handleWatch = () => {
      if (!user.is_provider && !user.is_superuser) {   
        const watchedLesson = p_lessons.find(plesson => plesson.lesson == lesson_id)
        api.patch(
          `/student/update_watched/${watchedLesson.id}`,
          null,
          auth
        ).then(response =>{
          console.log(response.data);
          watchedLesson.is_watched = true
          setP_lessons([watchedLesson , ...p_lessons])
        }).catch(error => {
          console.log('errro in watched updated');
        })
      }

    }

  return (
    <>  
      { lesson ? <>
        
        <h2 className='text-[20px] text-gray-600 py-3'>{lesson.module.name}</h2>
        <h1 className='text-[30px] text-center font-bold py-3'>{lesson.lesson.name}</h1>

        <div className='flex justify-center my-8 '>
          <ReactPlayer 
            url={lesson.lesson.lesson_url}
            controls={true}
            volume={1}
            muted={false}
            onEnded={handleWatch}
            />
        </div>

        <div className='select-none flex justify-evenly w-full py-3'>
          <div onClick={handlePrev} className='flex gap-3 border-2 border-gray-300 py-4 px-6 rounded-xl hover:bg-gray-100'>   
            <span className='rounded-full px-1 border-2 border-black'><FontAwesomeIcon icon={faArrowLeft} /></span>
            <p>Previous Lesson</p>
          </div>
          {user.is_provider || user.is_superuser ? null :
            
              
              <div onClick={handleComplete}  className='flex gap-3 text-white select-none border-2 justify-center py-4 px-6 rounded-xl w-[300px] bg-[#2E4374]'>
                  {
                    purchaseLesson.is_compelete ? 
                    <>Remove Complete</> : <>Mark Complete</>
                  }
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
