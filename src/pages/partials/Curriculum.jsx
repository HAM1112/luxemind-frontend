import React, { useEffect, useState } from 'react'
import time from '../../assets/time.png'
import play from '../../assets/play.png'
import api from '../../api/api'
import useUrlHeader from '../../utilities/urlHeader'
import CustomModal from '../customs/CustomModal'
import AddLesson from '../providers/components/AddLesson'
import deletePic from '../../assets/delete.png'

function Curriculum(props) {
    const [module, setModule] = useState('');
    const { course , is_provider } = props
    const auth = useUrlHeader()
    const [curriculum, setCurriculum] = useState([]);
    const [lessonModal, setLessonModal] = useState(false);
    const [moduleId, setModuleId] = useState(null);

    const getModal = (bool) => {
        setLessonModal(bool)
    }

    useEffect(() => {
        api.get(
            `/provider/getCurriculumDetails/${course.id}`,
            auth
        ).then(response => {
            console.log(response.data);
            setCurriculum(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, [lessonModal]);

    useEffect(() => {
        console.log(curriculum);
    }, [curriculum]);

    const handleAddModule = ()=>{
        console.log(course.id);
        api.post(
            '/provider/addModule/',
            {name : module , course : course.id},
            auth
        ).then((response)=>{
            if (response.status === 201) {
                console.log('Course added Successfully');
                setCurriculum(curriculum)
            }else{
                console.log(response.data);
            }
        }).catch((erro)=>{
            console.log(erro)
        })
    }

    const handleDelete = (e) => {
        const id = e.target.name       
        api.delete(
            `/provider/delete_module/${id}`,
            auth
            ).then(response => {
                console.log('Module Deleted successfully');
                console.log(response.data.message);
                const newCurriculum = curriculum.filter(item => item.module.id !== id)
                setCurriculum(newCurriculum)
            }).catch(error => {
                console.log(error);
            })
        }
        
        const handleLessonDelete = (e) => {
            const id = e.target.name
            api.delete(
                `/provider/delete_lesson/${id}`,
                auth
                ).then(response => {
                    console.log('Module Deleted successfully');
                    console.log(response.data.message);             
                    const newCurriculum = curriculum.filter(item => item.lessons.id !== id)
                    setCurriculum(newCurriculum)
                }).catch(error => {
                    console.log(error);
                })
            }
            

  return (
    <>

    <div className='mt-10 px-8 grid'>
        <div className='flex w-full'>
            {
                is_provider ?
            <div className='ml-0 ml-auto w-2/3'> 
                <input type="text" className='w-3/4' name="module" value={module} onChange={(e)=>setModule(e.target.value)}/>
                <button onClick={handleAddModule} className='bg-[#4B527E] w-1/4 text-white px-3 py-2 rounded-e hover:bg-[#7C81AD] hover:shadow-lg'>Add Module</button>
            </div>
                :
            
            null
            }
        </div>
        <div className='mt-5'>

            {curriculum.map((module , index) => {
                return (
                    <div key={index}>
                        <div className='flex items-center pr-4'>
                            <h1 className='text-[24px] my-4'>{module.module.name}</h1>
                            { is_provider ? <button name={module.module.id} onClick={handleDelete} className='ml-0 ml-auto bg-red-500 text-white px-3 rounded py-2'>Delete</button> : null }  
                        </div>
                        {module.lessons.map((lesson , index) => {
                            return (
                                <div key={lesson.id}>
                                    <div className='flex gap-5 items-center w-full p-4 mt-1 bg-[#f0f4fa]'>
                                        <p className='text-slate-400 font-bold'>{index + 1}</p>
                                        <img src={play} alt="play" className='w-5 h-5'/>
                                        <h2>{lesson.name}</h2>
                                        <div className='flex gap-4 px-2 ml-0 ml-auto'>
                                            <img src={time} alt="time" className='w-5 h-5'/>
                                            <span> {lesson.lesson_duration}</span>
                                            { is_provider ? <img src={deletePic} onClick={handleLessonDelete} name={lesson.id} className='w-6 h-6 hover:shadow-xl' /> : null }
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

            {/* <div>
                <h1 className='text-[24px] my-4'>Module 1</h1>
                <div>
                    <div className='flex gap-5 items-center w-full p-4 mt-1 bg-[#f0f4fa]'>
                        <p className='text-slate-400 font-bold'>1</p>
                        <img src={play} alt="play" className='w-5 h-5'/>
                        <h2>Introduction</h2>
                        <div className='flex gap-4 px-2 ml-0 ml-auto'>
                            <img src={time} alt="time" className='w-5 h-5'/>
                            <span> 10:20</span>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center w-full p-4 mt-1 bg-[#f0f4fa]'>
                        <p className='text-slate-400 font-bold'>1</p>
                        <img src={play} alt="play" className='w-5 h-5'/>
                        <h2>Introduction</h2>
                        <div className='flex gap-4 px-2 ml-0 ml-auto'>
                            <img src={time} alt="time" className='w-5 h-5'/>
                            <span> 10:20</span>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center w-full p-4 mt-1 bg-[#f0f4fa]'>
                        <p className='text-slate-400 font-bold'>1</p>
                        <img src={play} alt="play" className='w-5 h-5'/>
                        <h2>Introduction</h2>
                        <div className='flex gap-4 px-2 ml-0 ml-auto'>
                            <img src={time} alt="time" className='w-5 h-5'/>
                            <span> 10:20</span>
                        </div>
                    </div>
                </div>
            </div> */}
                
           
        </div>


    </div>
    </>
  )
}

export default Curriculum
