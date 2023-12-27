import React, { useEffect, useState } from 'react'
import './addcourse.css'
import { TiTick } from "react-icons/ti";
import Details from './addcoure/Detalis';
import Files from './addcoure/Files';
import Additional from './addcoure/Additional';
import api from '../../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUrlHeader from '../../../utilities/urlHeader';
import { useSelector } from 'react-redux';

function AddCourse(props) {

  const steps = ["Details", "Files", "Extra"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const auth = useUrlHeader()
  const [course, setCourse] = useState({
    name : '',
    description : '' ,
    about : '',
    short_description : '',

    course_thumbnail : '',
    course_preview : '',
    certificate_url : '',

    subject : '',
    course_price : 0,
    no_of_days : 0,
    level : '',
    prerequisites : '',
  });

  useEffect(() => {
    setCourse(props.course)
    if(props.edit == 'true'){
      setCourse(props.course)
    }  
  }, []);
  
  useEffect(() => {
    console.log(course);
  }, [course]);
  
  
  const getData = (data) => {
    setCourse(data)
  }
  let components= [<Details course={course} onChange={getData}/> , <Files course={course} onChange={getData}/> , <Additional course={course} onChange={getData}/> ]
  
  
  const handleNext = () => {

    if (currentStep === 1 ){
        if (course.name == '') {
          toast.error('Course name not added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          return      
        }
        if(course.short_description == ""){
          toast.error('Short description not added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          return      
        }
        if (course.description == '') {
          toast.error('Description not added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          return      
        }
        if (course.about == '') {
          toast.error('About not added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          return      
        }
      }
      //now here
      if (currentStep === 2) {
        if(course.course_thumbnail == ""){
          toast.error('Thumnail not added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          return      
      }
        if(course.course_preview == ""){
          toast.error('Preview not added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          return      
      }
        if(course.certificate_url == ""){
          
          toast.error('Certificate not added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          return      
      }
    }


    currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
  }
  
  const handlePrev = () => {
    setComplete(false)
    if (currentStep !== 1) {
      setCurrentStep((prev)  => prev - 1 );
    }
  }

  const handleSave = () => {
    console.log(props.edit)
    if (props.edit === "true") {
      console.log(course);
      api.put(
        `provider/updateCourse/${course.id}`,
        course,
        auth
      ).then((response)=>{
        console.log(response);
        toast.success('nice' , {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          props.getModal(false)
      }).catch((error)=>{
        console.log('this is the first error in course upload btn clicked');
      })
      
    } else {
      api.post(
        'provider/addCourse/',
        course,
        auth
        ).then((response)=>{
          console.log(response);
          toast.success('nice' , {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          props.getModal(false)
        }).catch((response)=>{
          console.log('this is the secound error in course upload btn clicked');
          const message = response.response.data.short_description['0']
          console.log(Object.keys(response.response.data)[0]);
          toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        })
      }
    }
    
    
    return (
      <div className='add-course px-4 bg-white rounded overflow-x-scroll relative border-2 border-red-700 '>
      <ToastContainer />
      <div className='mb-4'>
          <div className="sticky py-8 top-0 flex justify-between w-full bg-white">
            {steps?.map((step, i) => (
              <div
                key={i}
                className={`step-item ${currentStep === i + 1 && "active"} ${
                  (i + 1 < currentStep || complete) && "complete"
                } `}
              >
                <div className="step">
                  {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
                </div>
                <p className="text-gray-500">{step}</p>
              </div>
            ))}
          </div>
          <div className='pt-4'>
            {components[currentStep - 1 ]}
          </div>
      </div>
      <div className='sticky pt-4 left-0 bottom-0 flex justify-end gap-5 bg-white w-full overflow-y-hidden p-2'>
          {currentStep === 1 ?
            <button className='px-3 rounded bg-slate-400' disabled>Prev</button>
            : <button className='px-3 rounded bg-violet-400' onClick={handlePrev}>Prev</button>
          }
          {!complete && (
            currentStep === steps.length ? <button className='px-3 rounded bg-violet-700' onClick={handleSave}>Save</button> 
            :  <button className='px-3 rounded bg-violet-400' onClick={handleNext}>Next</button>
          )}
        <button className='px-2 py-3 bg-red-700 rounded' onClick={()=>{props.getModal(false);console.log('clicked')}}>Cancel</button>
      </div>
    </div>
  )
}

export default AddCourse
