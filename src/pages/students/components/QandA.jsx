import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import api from '../../../api/api';
import { Link } from 'react-router-dom';

function QandA() {

  const [quizs, setQuizs] = useState([]);
  useEffect(() => {
    api.get('/student/quiz-enroll').then(response => {
      console.log(response.data);
      setQuizs(response.data)
    }).catch(error => console.log(error))
  }, []);

  return (
    <div className='w-full'>
          <h1 className='font-bold py-5 text-3xl w-full '>Enrolled Quiz</h1>
          <div className='flex gap-4'>
            <div className='border-2 border-[#E5C3A6] w-1/4 sm:w-1/6 md:w-1/12'></div>
            <div className='border-2 border-gray-200 w-3/4 sm:w-5/6 md:w-11/12'></div>
          </div>

          <div className='mt-4'>
            <div className='bg-[#eef1f7] px-4 py-5 flex w-full gap-5 font-semibold text-center'>
              <div className='w-6/12'>
                <h3>Course</h3>
              </div>
              <div className='w-1/12'>
                <h3>Score</h3>
              </div>
              <div className='w-2/12'>
                <h3>Stars</h3>
              </div>
              <div className='1/12'>
                <h3>Status</h3>
              </div>
              <div className='2/12'>
                <h3>Certificate</h3>
              </div>
            </div>
            {
              quizs.map(quiz => {
                const percentage = (quiz.enroll_quiz.score_achieved / quiz.enroll_quiz.total_score) * 100 
                const check = percentage > 95 ? 3 : percentage > 85 ? 2 : percentage > 70 ? 1 : 0;
                
                return(
                  <div className='px-4 py-5 flex w-full gap-5 text-[14px] border border-gray-300 mt-2 items-center'>
                    <div className='w-6/12'>
                      <h3>{quiz.course}</h3>
                    </div>
                    <div className='w-1/12'>
                      <h3>{quiz.enroll_quiz.score_achieved} / {quiz.enroll_quiz.total_score}</h3>
                    </div>
                    <div className='w-2/12'>
                      <div className='h-[40px] flex items-end'>
                      <FontAwesomeIcon icon={faStar} className={`h-[28px] ${check > 0 ? 'text-yellow-300' : 'text-gray-300'}`}/>
                      <FontAwesomeIcon icon={faStar} className={`h-[28px] self-start ${check > 1 ? 'text-yellow-300' : 'text-gray-300'}`}/>
                      <FontAwesomeIcon icon={faStar} className={`h-[28px] ${check > 2 ? 'text-yellow-300' : 'text-gray-300'}`}/>
                      </div>
                    </div>
                    <div className='1/12'>
                      {quiz.enroll_quiz.passed ? <h3 className='text-green-500'>Passed</h3> : <h3 className='text-red-500'>Falied</h3> }
                    </div>
                    <div className='2/12'>
                      {quiz.enroll_quiz.passed ? <Link to={'/student/profile/certificates'}>Certificate</Link> : <Link to={`/student/quiz/${quiz.course_id}`}>Retake</Link> }
                    </div>
                  </div>
                )
              })
            }

          </div>

    </div>
  )
}

export default QandA
