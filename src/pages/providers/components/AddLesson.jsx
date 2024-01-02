import React, { useEffect, useState } from 'react'
import { Player } from 'video-react';
import { convertToUnderscore } from '../../../utilities/convertToUnderscore';
import { firebasestore } from '../../../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import 'video-react/dist/video-react.css';
import api from '../../../api/api';
import useUrlHeader from '../../../utilities/urlHeader';
import { SpinnerCircular } from 'spinners-react';

function AddLesson(props) {

    const {getModal , module_id} = props
    const [file , setFile] = useState(null)
    const auth = useUrlHeader()
    const [loading, setLoading] = useState(false);
    const [lesson, setLesson] = useState({
        name : '',
        lesson_url : '',
        module : module_id,
    });

    const handleFileInput = (e) => {
        console.log("This is from the handlefile input!!!")
        if (lesson.name == '') {
            alert('Add name first')
            e.target.value = '',
            setFile(null)
            return
        }
        console.log(e.target.files[0]);
        setLoading(true)
        console.log(file);
        const lesson_name = convertToUnderscore(lesson.name)
        const fileRef = ref(firebasestore , `courses/lessons/${module_id}_${lesson_name}`)
        uploadBytes(fileRef , e.target.files[0])
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then(url => {
                console.log("get url worked");
                setLesson(prev => ({...prev, lesson_url : url}))
                setLoading(false)
                console.log('video uploaded successfully');
            }).catch(error => {
                console.log('error in getdownload url');
            })
        }).catch(error => {
            console.log('error in uploadbytes');
        })
        setLoading(false)
    }

    const handleChange = (e) => {
        setLesson({...lesson, [e.target.name] : e.target.value})
    }

    const handleSubmit = () => {
        console.log('save clicked');
        if (lesson.name === '' || lesson.lesson_url === '') {
            alert('name or video is not added')
            return
        }
        setLoading(true)
        api.post(
            '/provider/addLesson/',
            lesson,
            auth
        ).then((response)=>{
            if (response.status === 201) {
                console.log('Lesson added Successfully');
                console.log(response.data);
            }
            getModal(false)
            setLoading(false)
        }).catch((erro)=>{
            console.log(erro)
            setLoading(false)
        })
        console.log('save completed');
    }

    useEffect(() => {
        
    }, [loading]);

  return (
    <div className='w-[800px] p-14 bg-white rounded'>
        <div>
            <div className='grid gap-1 mt-2'>
            <h3 className='font-semibold'>Name</h3>
            <input onChange={handleChange} name='name' type="text" className='border-2 border-slate-900 p-1 rounded'/>
            </div>
        </div>

        <div className='grid gap-1 border-b-2 pb-2'>   
          <h3 className='font-semibold my-2'>Add preview video</h3>
          {loading ? <h1>hello world!!!</h1> : null }
          <div className='flex items-center gap-1 w-ful'>
            <div className='w-7/12'>
              <input name='lesson_video' onChange={handleFileInput} accept='video/*' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
            </div>
            <div className='file-display w-5/12 flex items-center text-center'>
                { lesson.lesson_url ? <Player>
                    <source src={ lesson.lesson_url } />
                  </Player> : <p className='w-full h-full'>No preview</p>}
            </div>     
          </div>
        </div>

      <div className='flex justify-end gap-5 my-6'>
        {/* {loading ?  } */}
        <button className='flex justify-center items-center w-[80px] rounded text-white bg-violet-500' onClick={handleSubmit}>
            { loading ? <SpinnerCircular size={20} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 1)" /> : <>Save</> }
        </button>
        <button className='px-3 py-2 text-white bg-red-700 rounded' onClick={()=>getModal(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default AddLesson
