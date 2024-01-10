import React, { useEffect, useState } from 'react'
import { Link, useParams  } from 'react-router-dom'
import api from '../../api/api';
import useUrlHeader from '../../utilities/urlHeader';
import acco from '../../assets/acco.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function User() {

    const { user_id  } = useParams()
    const [user, setUser] = useState({});
    const [courses, setCourses] = useState([]);
    const [payments, setPayments] = useState([]);
    const [certificate,setCertificate ] = useState([])
    useEffect(() => {
        api.get(
            `/adminpanel/get_user_details/${user_id}`,
        ).then((res)=>{
            setUser(res.data.user)
            setCourses(res.data.courses)
            setPayments(res.data.payments)
            // const certified = res.data.payments.
            console.log(res.data);
        })
    }, []);
    useEffect(() => {
        
    }, [user]);


  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <div className='w-full'>

                <div className='flex border-b-4 border-slate-300 p-3'>
                    <div className='w-1/3 text-[15px]'>USERNAME :</div>
                    <div className='w-2/3'>{user.username}</div>
                </div>
                <div className='flex border-b-4 border-slate-300 p-3'>
                    <div className='w-1/3 text-[15px]'>FIRST NAME :</div>
                    <div className='w-2/3'>{user.first_name}</div>
                </div>
                <div className='flex border-b-4 border-slate-300 p-3'>
                    <div className='w-1/3 text-[15px]'>LAST NAME :</div>
                    <div className='w-2/3'>{user.last_name}</div>
                </div>
                <div className='flex border-b-4 border-slate-300 p-3'>
                    <div className='w-1/3 text-[15px]'>EMAIL :</div>
                    <div className='w-2/3'>{user.email}</div>
                </div>
                <div className='flex border-b-4 border-slate-300 p-3'>
                    <div className='w-1/3 text-[15px]'>DATE JOINED :</div>
                    <div className='w-2/3'>{user.date_joined}</div>
                </div>
                <div className='flex border-b-4 border-slate-300 p-3'>
                    <div className='w-1/3 text-[15px]'>DOB :</div>
                    <div className='w-2/3'>{user.dob}</div>
                </div>
                <div className='flex border-b-4 border-slate-300 p-3'>
                    <div className='w-1/3 text-[15px]'>Education :</div>
                    <div className='w-2/3'>{user.education}</div>
                </div>
                {user.is_provider ?
                <div className='flex border-b-4 border-slate-300 p-3'>
                    <div className='w-1/3 text-[15px]'>Profession :</div>
                    <div className='w-2/3'>{user.profession}</div>
                </div>
                :null}
              </div>

              {
                user.is_provider &&<>

              <h3 className="font-semibold text-center mt-3 -mb-2">Find me on</h3>
              <div className="flex justify-center items-center gap-6 my-6">
                {/* Update the href attribute with your social media profile links */}
                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit LinkedIn" href={user.linked_in_link} target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                    <path
                      fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                    ></path>
                  </svg>
                </a>
                {/* Update the href attribute with your social media profile links */}
                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit YouTube" href={user.youtube_link} target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6">
                    <path
                      fill="currentColor"
                      d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                    ></path>
                  </svg>
                </a>
                
                {/* Update the href attribute with your social media profile links */}
                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit Instagram" href={user.insta_link} target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                    <path
                      fill="currentColor"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    ></path>
                  </svg>
                </a>
                
              </div> 
                </>
              }


              {
                courses &&<>

              <h2 className="text-lg font-bold mt-6 mb-2">Courses Purchased</h2>
              <div className="mb-6">
                
                {
                  courses.map(course => {
                    return (
                    <Link to={`/admin/courses/${course.id}`}>
                      <div className='w-full h-[130px] mt-3 border border-2 flex gap-3 p-2'>

                        <img src={course.course_thumbnail} className='w-[180px] h-full' alt="" />
                        <div>
                          <h4 className='font-semibold text-[17px]'>{course.name}</h4>
                          <p className='capitalize text-[15px]'>Level : {course.level}</p>
                        </div>
                      </div>
                    </Link>
                    )
                  })
                }
              </div>
                </>
              }
              {/* {
                quizs && <>
                  <h2 className="text-lg font-bold mt-6 mb-2">Quizs Attended</h2>
                  <div className="mb-6">
                    
                  {
              quizs.map(quiz => {
                const percentage = (quiz.score_achieved / quiz.total_score) * 100 
                const check = percentage > 95 ? 3 : percentage > 85 ? 2 : percentage > 70 ? 1 : 0;
                
                return(
                  <div className='px-4 py-5 flex w-full gap-5 text-[14px] border border-gray-300 mt-2 items-center'>
                    <div className='w-6/12'>
                      <h3>{quiz.course}</h3>
                    </div>
                    <div className='w-1/12'>
                      <h3>{quiz.score_achieved} / {quiz.total_score}</h3>
                    </div>
                    <div className='w-2/12'>
                      <div className='h-[40px] flex items-end'>
                      <FontAwesomeIcon icon={faStar} className={`h-[28px] ${check > 0 ? 'text-yellow-300' : 'text-gray-300'}`}/>
                      <FontAwesomeIcon icon={faStar} className={`h-[28px] self-start ${check > 1 ? 'text-yellow-300' : 'text-gray-300'}`}/>
                      <FontAwesomeIcon icon={faStar} className={`h-[28px] ${check > 2 ? 'text-yellow-300' : 'text-gray-300'}`}/>
                      </div>
                    </div>
                    <div className='1/12'>
                      {quiz.passed ? <h3 className='text-green-500'>Passed</h3> : <h3 className='text-red-500'>Falied</h3> }
                    </div>
                    <div className='2/12'>
                      {quiz.passed ? <Link to={'/student/profile/certificates'}>Certificate</Link> : <Link to={`/student/quiz/${quiz.course_id}`}>Retake</Link> }
                    </div>
                  </div>
                )
              })
            }


                  </div>
                </>
              } */}

             {
              payments &&
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Course name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Provider
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Transaction Id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            payments.map(payment => {
                              return (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {payment.course.course_name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {payment.course.provider_name}
                                    </td>
                                    <td class="px-6 py-4">
                                        {payment.payement.transaction}
                                    </td>
                                    <td class="px-6 py-4">
                                    {payment.payement.status}
                                    </td>
                                </tr>
                              )
                            })
                          }
                            
                        </tbody>
                    </table>
                </div>

             }


            </div>
          </div>
          
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={user.avatar ? user.avatar : acco}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt=""
                />
                <h1 className="text-xl font-bold">{user.username}</h1>
                <p className="text-gray-700">{user.is_superuser ? <>Admin</>: (user.is_provider ? <>Provider</> : <>Student</>) }</p>
                
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Stats</span>
                <ul>
                  <li className="mb-2">Reputation : 2k</li>
                  <li className="mb-2">No. Courses : 4</li>
                  <li className="mb-2">Courses Completed : 4</li>
                  <li className="mb-2">No. Questions :10</li>
                  <li className="mb-2">Votes Cast : 3</li>
                  <li className="mb-2">Answers</li>
                  <li className="mb-2">Tailwind Css</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
