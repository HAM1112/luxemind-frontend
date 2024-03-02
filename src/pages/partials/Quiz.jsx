import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import { shuffleArray } from '../../utilities/utils';
import { studentService } from '../../api/apiService';

function Quiz() {
    const user = localStorage.getItem('user')
    const navigate = useNavigate()
    const {course_id } = useParams()
    const [allQuestions, setAllQuestions] = useState([]);
    const [quiz, setQuiz] = useState('');
    const [answers, setAnswers] = useState([]);
    const [shuffledOnce, setShuffledOnce] = useState(false);
    useEffect(() => {
        if (!shuffledOnce) {
            api.get(`/provider/quiz/?course_id=${course_id}` ).then(response => {

                const newquest = []
                response.data.questions.map(question => {
                    const options = shuffleArray([
                        {option:question.option1 , answer:false},
                        {option:question.option2 , answer:false},
                        {option:question.option3 , answer:false},
                        {option:question.answer , answer:true},
                    ])
                    // setAllQuestions([...allQuestions , {options : options , question_id : question.id , question : question.question}])
                    newquest.push({options : options , question_id : question.id , question : question.question})
                })
                setAllQuestions(newquest)
                setQuiz(response.data.quiz)
            })
        }

    }, []);
    useEffect(() => {
        console.log(quiz);
    }, [allQuestions , quiz]);
    
    const handleCheckAnswer = (question_id , option) =>{
        const ans = answers.filter(answer => answer.question_id !== question_id)
        const data = {
            question_id : question_id ,
            selected : option.option,
            answer : option.answer
        }
        setAnswers([...ans , data])
    }
    const handleSubmit = () => {
        if (user.is_superuser || user.is_provider) {
            console.log('You are either provider or admin');
           return  
        }
        const totalScore = allQuestions.length
        const userScore = answers.filter(answer => answer.answer === true ).length
        const percentage = (userScore/totalScore) * 100 
        const data = {
            quiz : quiz.quiz_id,
            student : user.user_id,
            score_achieved : userScore,
            total_score : totalScore,
            passed : percentage > 70
        }
        console.log(data);
        studentService.submitQuiz(data)
        navigate('/student/profile/QAAs')
    }

  return (
    <div className={!user.is_superuser && !user.is_provider ? 'w-full px-80 py-6 h-full' : 'w-full px-10 py-10 h-full' }>
        {
            allQuestions ?
                <>
                <h4 className='text-center'>Quiz for</h4>
                <h1 className='text-[28px] font-bold text-center'>{quiz ? <>{quiz.course}</> : null}</h1>
                <div className='my-8 '>
                    {
                        allQuestions.map((question , index) => {
                            
                            return (
                                <div className='mt-10'>
                                    <h2 className='text-md font-semibold'>{index + 1}.{question.question}</h2>
                                    <ul className='px-10 '>
                                        {
                                            question.options.map(option => {
                                                const checkIfSelected = answers.some(answer =>
                                                    answer.selected === option.option && answer.question_id === question.question_id
                                                )
                                                console.log(checkIfSelected)
                                                return(
                                                    <li className='flex items-center gap-3 mt-4'>
                                                        <input onChange={()=>{handleCheckAnswer(question.question_id , option)}} checked={checkIfSelected} type="radio" className='text-black focus:outline-black border-black'/>
                                                        <p>{option.option}</p>
                                                    </li>
                                                )
                                                
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='text-center bg-white  p-5'>
                    <button onClick={handleSubmit} className='w-full px-3 py-2 bg-[#ceaf95] text-white font-bold rounded hover:bg-[#B99D86]'>Submit</button>
                </div>
                </>
            : <>nothing</>
        }
    </div>
  )
}

export default Quiz
