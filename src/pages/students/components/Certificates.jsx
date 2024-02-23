import React, { useEffect, useState } from 'react'
import api from '../../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import PDFCertificate from './PDFCertificate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { SpinnerCircular } from 'spinners-react';

function Certificates() {
  const [courses, setCourses] = useState([]);
  const [StudentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    api.get('/student/all-certificate').then(response=>{
      setCourses(response.data.courses)
      setStudentName(response.data.student_name)
    }).catch(error => console.log(error)).finally(()=>{setLoading(false)})
  }, []);

  return (
        <div className='w-full'>
          <h1 className='font-bold py-5 text-3xl w-full '>Certificates</h1>
          <div className='flex gap-4'>
            <div className='border-2 border-[#E5C3A6] w-1/4 sm:w-1/6 md:w-1/12'></div>
            <div className='border-2 border-gray-200 w-3/4 sm:w-5/6 md:w-11/12'></div>
          </div>
          <div className='mt-4 p-4 sm:p-0'>
            {
              loading ?
              <div className='w-full flex items-center justify-center h-[100px] md:h-[400px]'>
                <SpinnerCircular size={62} thickness={103} speed={68} color="rgba(229, 195, 166, 1)" secondaryColor="rgba(0, 0, 0, 0.1)" />
              </div>:
              <>
                {
                  courses == [] ?
                      courses.map(course => {
                        return(<>
                            <div className='w-full mt-6 p-4 sm:p-0 sm:border-none border border-2 border-gray-500 sm:flex grid gap-5 justify-between items-center'>
                                <img className='w-full sm:w-56 sm:h-32' src={course.course_thumbnail} alt="" /> 
                                <div>
                                  <h1 className='text-[18px] font-semibold'>{course.name}</h1>
                                  <p className='text-[14px] text-gray-500 mt-2'>{course.short_description}</p>
                                </div>
                                <div>
                                  <PDFDownloadLink document={<PDFCertificate course_name={course.name} student_name={StudentName}/>} fileName='justTesting'>
                                  {({loading })=> (loading ? <button className='w-full flex justify-center gap-2 sm:w-40 bg-[#2E4374] hover:bg-[#4B527E] text-[10px] text-white font-bold py-2 px-4 rounded'>
                                              <FontAwesomeIcon icon={faDownload} className='border border-1 border-white p-[2px] rounded-full' />
                                              <span>Loading </span>
                                            </button> : <button className='w-full flex justify-center gap-2 sm:w-40 bg-[#2E4374] hover:bg-[#4B527E] text-[10px] text-white font-bold py-2 px-4 rounded'>
                                              <FontAwesomeIcon icon={faDownload} className='border border-1 border-white p-[2px] rounded-full' />
                                              <span>Download Certificate</span>
                                            </button>)}
                                  </PDFDownloadLink>
                                </div>
                            </div>
                        </>
                        )
                      }):
                    <p>No Certificates Yet</p>
                }
              </>
            }
          </div>
        </div>
  )
}

export default Certificates
