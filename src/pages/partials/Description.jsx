import React from 'react'
import accPic from '../../assets/acco.png'


function Description(props) {
    const {course , provider} = props
    return (
        <div className='mt-10 '>
            <div className='px-8 pb-10 border-b-2 border-[#2E4374]'>
                <video controls src={course.course_preview} className='p-4 w-full'></video>
            </div>
            <div className='p-3'>
                <h1 className='py-3 text-[28px]'>Description</h1>
                <p className='text-[19px]'>{course.description}</p>

                <h1 className='py-3 text-[28px]'>About</h1>
                <p className='text-[19px]'>{course.about}</p>
                
                <h1 className='py-3 text-[28px]'>Prequisites</h1>
                <p className='text-[19px]'>{course.prerequisites}</p>
            </div>

            <div className='flex w-ful mt-10'>
                <div className='w-1/4'>
                    <img src={accPic} alt="provider" className='shadow-md'/>
                </div>
                <div className='w-3/4'>
                    <h1 className='py-3 text-[28px]'>{(provider.first_name && provider.last_name) ? <>{provider.first_name} { provider.last_name }  </> : 'Not added' }</h1>
                    <p>
                        This will be the profile display of provider to add
                    </p>
                </div>
            </div>

        </div>

    )
}

export default Description
