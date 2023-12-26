import React, { useEffect, useState } from 'react'
import './files.css'
import { firebasestore } from '../../../../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import { convertToUnderscore } from '../../../../utilities/convertToUnderscore';


function Files({course , onChange}) {

  const [courseFile, setCourseFile] = useState(course);
  const [file , setFile] = useState(null)
  const [fileDir , setFileDir] = useState(null)

  const handleChange = (e) => {
    setFile(e.target.files[0])
    setFileDir(e.target.name)
  }
 
  useEffect(() => {
    if(file == null){
      console.log('file is null');
      return
    }
    console.log(file);
    const urlName = convertToUnderscore(courseFile.name)

    const fileRef = ref(firebasestore , `courses/${fileDir}/${urlName}`)
    uploadBytes(fileRef , file)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        console.log(fileDir);
        setCourseFile((prev) => ({...prev , [fileDir] : url }))
        console.log('image uploaded successfully');
      }).catch((error) => {
        console.log(error);
        console.log('error in getdownload url');
      })
    }).catch((error) => {
      console.log(error);
      console.log('error in uploadbytes');
    })  

    setFile(null)
    setFileDir(null)
  }, [file , fileDir]);
  
  useEffect(() => {
    onChange(courseFile)
  }, [courseFile]);

  return (
    <div>
    {console.log(courseFile)}
      <div className='overflow-x-scroll'> 

        <div className=' border-b-2 pb-2'>
          <h3 className='font-semibold my-2'>Add thumnail</h3>
          <div className='flex items-center gap-1 w-ful'>
            <div className='w-7/12'>
              <input name='course_thumbnail' onChange={handleChange} accept="image/png, image/gif, image/jpeg" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" /> 
            </div>
            <div className='file-display w-5/12 flex items-center text-center'>
              {courseFile.course_thumbnail ? <img src={courseFile.course_thumbnail} className='w-full h-full rounded-lg' alt="thumbnail" /> : <p className='w-full'>No preview</p> }
            </div>
          </div>
        </div>

        <div className='grid gap-1 border-b-2 pb-2'>   
          <h3 className='font-semibold my-2'>Add preview video</h3>
          <div className='flex items-center gap-1 w-ful'>
            <div className='w-7/12'>
              <input name='course_preview' onChange={handleChange} accept='video/*' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
            </div>
            <div className='file-display w-5/12 flex items-center text-center'>
                {courseFile.course_preview ? <Player>
                    <source src={courseFile.course_preview} />
                  </Player> : <p className='w-full'>No preview</p>}
            </div>     
          </div>
        </div>


        <div className='grid gap-1 border-b-2 pb-2'>   
          <h3 className='font-semibold my-2'>Add Certificate</h3>
          <div className='flex items-center gap-1 w-ful'>
            <div className='w-7/12'>
              <input name='certificate_url' onChange={handleChange} accept='image/*' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
            </div>
            <div className='file-display w-5/12 flex items-center text-center'>
                {courseFile.certificate_url ? <img src={courseFile.certificate_url} className='w-full h-full rounded-lg' alt="thumbnail" /> : <p className='w-full'>No preview</p> }
            </div> 
          </div>
        </div>

      </div>
    </div>
  )
}

export default Files
