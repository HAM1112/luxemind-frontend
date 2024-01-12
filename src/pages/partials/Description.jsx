import React, { useEffect } from 'react'
import accPic from '../../assets/acco.png'


function Description(props) {
    const {course , provider} = props
    useEffect(() => {
        
    }, [course]);
    return (
        <div className='mt-10 '>
            <div className='lg:px-8 pb-10 border-b-2 border-[#2E4374] flex justify-center'>
                <video controls src={course.course_preview} className='lg:p-4 w-[600px]'></video>
            </div>
            <div className='p-3'>
                <h1 className='py-1 font-semibold lg:py-3 text-[24px] lg:text-[28px]'>Description</h1>
                <p className='text-[16px] lg:text-[19px]'>{course.description ?<> {course.description.split('\n').map((paragraph, index) => <React.Fragment key={index}>{paragraph}<br /></React.Fragment>)}</> : course.description}</p>

                <h1 className='mt-3 py-1 font-semibold lg:py-3 text-[24px] lg:text-[28px]'>About</h1>
                <p className='text-[16px] lg:text-[19px]'>{ course.about ? <>{course.about.split('\n').map((paragraph, index) => <React.Fragment key={index}>{paragraph}<br /></React.Fragment>)}</> : course.about }</p>
                
                <h1 className='mt-3 py-1 font-semibold lg:py-3 text-[24px] lg:text-[28px]'>Prequisites</h1>
                <p className='text-[16px] lg:text-[19px]'>{ course.prerequisites ? <>{course.prerequisites.split('\n').map((paragraph, index) => <React.Fragment key={index}>{paragraph}<br /></React.Fragment>)}</> : course.prerequisites }</p>
            </div>

            <div className='flex items-center gap-4 w-ful mt-10 px-6'>
                <div className='w-1/4 h-[160px] lg:h-[200px] border border-2'>
                    <img src={provider.avatar ? `${provider.avatar}` : accPic} alt="provider" className='shadow-md'/>
                </div>
                <div className='w-3/4 h-[160px] lg:h-[200px] overflow-y-scroll'>
                    <h1 className='py-3 text-[16px] md:text-[20px] lg:text-[28px] capitalize'>{(provider.first_name && provider.last_name) ? <>{provider.first_name} { provider.last_name }  </> : 'Not added' }</h1>
                    <p className='text-[13px] md:text-[16px]'>
                        {provider.about_me}
                    </p>
                </div>
            </div>

        </div>

    )
}

export default Description
