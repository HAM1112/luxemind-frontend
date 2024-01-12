import React, { useEffect, useState } from 'react'
import time from '../../assets/time.png'
import play from '../../assets/play.png'
import api from '../../api/api'
import CustomModal from '../customs/CustomModal'
import AddLesson from '../providers/components/AddLesson'
import deletePic from '../../assets/delete.png'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faPlus, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import AddQuiz from '../providers/components/AddQuiz'

function Curriculum(props) {
    const [module, setModule] = useState('');
    const { course , is_provider } = props
    const [curriculum, setCurriculum] = useState([]);
    const [lessonModal, setLessonModal] = useState(false);
    const [moduleId, setModuleId] = useState(null);
    const [QuizModal, setQuizModal] = useState(false);
    const [quiz, setQuiz] = useState({});
    const navigate = useNavigate()
    
    const getModal = (bool) => {
        setLessonModal(bool)
        setQuizModal(bool)
    }
    useEffect(() => {
        console.log(curriculum);
    }, [curriculum]);

    useEffect(() => {
        api.get(
            `/provider/getCurriculumDetails/${course.id}`,
        ).then(response => {
            console.log(response.data);
            setCurriculum(response.data)
        }).catch(error => {
            console.log(error);
        })
        api.get(`/provider/quiz/?course_id=${course.id}`).then(response => {
            setQuiz(response.data)
            console.log(response.data);
        }).catch((error)=>console.log(error))
    }, [lessonModal]);
    
    const handleAddModule = ()=>{
        console.log(course.id);
        api.post(
            '/provider/addModule/',
            {name : module , course : course.id},
            
            ).then((response)=>{
                if (response.status === 201) {
                    console.log(response.data);
                    console.log('Course added Successfully');
                    setCurriculum([...curriculum , response.data])
                }else{
                    console.log(response.data);
                }
            }).catch((erro)=>{
                console.log(erro)
            })
            setModule('')
        }
        
        const handleDelete = (e) => {
            const id = e.target.name       
            api.delete(
            `/provider/delete_module/${id}`,
            
            ).then(response => {
                console.log('Module Deleted successfully');
                console.log(curriculum);
                const newCurriculum = curriculum.filter(item => item.module.id != `${id}`)
                console.log(newCurriculum);
                setCurriculum(newCurriculum)
            }).catch(error => {
                console.log(error);
            })
        }
        
        const handleLessonDelete = (e) => {
            const id = e.target.name
            api.delete(
                `/provider/delete_lesson/${id}`,
                
                ).then(response => {
                    console.log('Module Deleted successfully');
                    console.log(curriculum);        
                    const newCurriculum = curriculum.filter(item => item.lessons.id !== `${id}`)
                    console.log(newCurriculum);
                    setCurriculum(newCurriculum)
                }).catch(error => {
                    console.log(error);
                })
            }
            

  return (
    <>

    <div className='lg:my-10 lg:px-8 grid '>
        <div className=' sm:flex w-full gap-5 h-[40px] items-center'>
            {
                is_provider ?
                <>
                    <div className='w-full sm:w-2/3 h-full flex'> 
                        <input type="text" className='w-3/4 h-full' name="module" value={module} onChange={(e)=>setModule(e.target.value)}/>
                        <button onClick={handleAddModule} className='bg-[#4B527E] w-1/4 h-full text-white px-3 py-2 rounded-e hover:bg-[#7C81AD] hover:shadow-lg'>Add Module</button>
                    </div>
                    <button onClick={()=>{setQuizModal(true);console.log(QuizModal)}} className='w-full mt-3 sm:mt-0 sm:w-1/4 h-full bg-gradient-to-t from-[#00D775] to-[#00BD68] rounded shadow-[rgba(0, 0, 0, 0.1) 0 2px 4px] text-white cursor-pointer flex justify-center items-center gap-3  outline-none overflow-hidden px-[12px] hover:bg-[#00bd68]'>
                        <FontAwesomeIcon icon={faPlusCircle}  className='text-white '/>
                        <p>Qiuz</p>
                    </button>
                    {QuizModal && <CustomModal component={<AddQuiz getModal={getModal} is_update={false} course_id={course.id} /> } /> }
                </>
                :
            
            null
            }
        </div>
        
        <div className='lg:mt-5'>
        {
            Object.keys(quiz).length > 0 && is_provider ? 
                <div onClick={()=>navigate('quiz')} className=' mt-16 sm:mt-6 w-full bg-[#7C81AD] py-3 px-5 rounded flex justify-between items-center cursor-pointer hover:bg-[#898db5]'>
                    {console.log(quiz)}
                    <div className='flex items-center gap-4 text-white'>
                        <FontAwesomeIcon icon={faClipboard} />
                        <p>Quiz</p>
                    </div>
                    <FontAwesomeIcon icon={faTrash} className='text-red-500 hover:text-red-700'/>
                </div>
            : null
        }

            {curriculum.map((module , index) => {
                return (
                    <div key={index}>
                        <div className='flex items-center bg-[#D8DBE1] px-5 mt-3 rounded'>
                            <h1 className='text-[19px] lg:text-[24px] my-4 font-semibold'>{module.module.name}</h1>
                            { is_provider ? <button name={module.module.id} onClick={handleDelete} className='ml-0 ml-auto bg-red-500 text-white px-3 rounded py-2'>Delete</button> : null }  
                        </div>
                        {module.lessons.map((lesson , index) => {
                            return (
                                <div key={lesson.id} >
                                    <div className='flex gap-2 lg:gap-5 items-center w-full p-4 mt-1 bg-[#f0f4fa]'>
                                        <p className='text-slate-400 font-bold'>{index + 1}</p>
                                        <img src={play} alt="play" className='w-5 h-5'/>
                                        <h2 className='capitazlie truncate'>
                                            { 
                                                is_provider ?
                                                <Link to={`/provider/course/${course.id}/lesson/${lesson.id}`}>{lesson.name}</Link>
                                                : <>{lesson.name}</>
                                             }
                                        </h2>
                                        <div className='flex gap-4 px-2 ml-0 ml-auto'>
                                            <img src={time} alt="time" className='w-5 h-5'/>
                                            <span> {lesson.lesson_duration}</span>
                                            { is_provider ? <img src={deletePic} onClick={handleLessonDelete} name={lesson.id} className='cursor-pointer w-6 h-6 hover:shadow-xl' /> : null }
                                        </div>
                                    </div>
                                </div>

                            )
                        })}

                        {
                            is_provider ? 
                            <div className='mt-4'>
                                <button onClick={()=>{setLessonModal(true);setModuleId(module.module.id)}} className='bg-[#B79C84] text-white font-semibold px-2 py-1 rounded '>Add Lesson</button>
                            </div>
                                : 
                            null
                        }
                    </div>
                )
            })}

            {lessonModal && <CustomModal component={<AddLesson getModal={getModal} is_update={false} module_id={moduleId}/>} /> }
        </div>
    </div>
    </>
  )
}

export default Curriculum
