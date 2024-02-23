import React from 'react'
import idea from '../../../assets/learngrow.png'

function LearnGrow() {
  return (
    <div className='w-full flex flex-col-reverse md:flex-row justify-evenly mt-[40px] lg:mt-[150px] md:p-5 '>
      <div>
            <div>
            <h1 className='font-bold'>Luxeminds Learning</h1>
                <section>
                    <h2 className='font-semibold mt-2'>Experience</h2>
                    <p>
                    Learn new knowledge and skills in a variety of ways, from engaging
                    video lectures and dynamic graphics to data visualizations and
                    interactive elements.
                    </p>
                </section>
                <section>
                    <h2 className='font-semibold mt-2'>Practice</h2>
                    <p>
                    Demonstrating your knowledge is a critical part of learning. Luxeminds
                    courses and programs provide a space to practice with quizzes, open
                    response assessments, virtual environments, and more.
                    </p>
                </section>
                <section>
                    <h2 className='font-semibold mt-2'>Apply</h2>
                    <p>
                    Learning on Luxeminds transforms how you think and what you can do and
                    translates directly into the real world—immediately apply your new
                    capabilities in the context of your job.
                    </p>
                </section>
            </div>
      </div>
      <div>
        <img src={idea} alt="" className='w-full'/>
      </div>
    </div>
  )
}

export default LearnGrow
