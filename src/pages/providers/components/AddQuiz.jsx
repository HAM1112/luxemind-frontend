
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { providerService } from '../../../api/apiService';
import { data } from 'autoprefixer';


function AddQuiz(props) {
    const {getModal , is_update , course_id} = props
    const [AllQuestions, setAllQuestions] = useState([]);
    const [Question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState('');
    const addOption = () => {
        if (options.length >= 4 || option == '') {
            console.log("you're Done");
            return
        }
        setOptions(prev => [...prev , {option : option , answer:false}])
        setOption('')
    }
    const handleCheckboxChange = (index) => {
        let newOptions = options.map(option => ({
            ...option,
            answer: false
        }));
        newOptions[index].answer = !newOptions[index].answer
        setOptions(newOptions)
    };
    const handleOptionDelete = (index) => {
        let newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions) 
    }
    const handleNextQuestion = () =>{
        const hasTrueAnswer = options.some(option => option.answer);
        if(Question == '' || options.length < 4 || !hasTrueAnswer ){
            console.log(Question);
            console.log(options.length == 4);
            console.log('Double check your question and answer');
            return
        }
        setAllQuestions(prev => [...prev , {question : Question , choices : options }])
        setQuestion('')
        setOption('')
        setOptions([])
    }

    const handleSubmit = ()=>{
        // if (AllQuestions.length < 5 ) {
        //     console.log('Atleast Five Questions');
        //     return
        // }
        const data = {
            course : course_id,
            quizquestions_set : []
        }
        AllQuestions.map(question => {
            const answer = question.choices.filter(choices => choices.answer === true)
            const optionss = question.choices.filter(choices => choices.answer === false)
            const quest ={
                question : question.question,
                answer : answer[0].option,
                option1: optionss[0].option,
                option2: optionss[1].option,
                option3: optionss[2].option,
            }
            data.quizquestions_set.push(quest)
        })
        console.log(data);
        const response = providerService.addQuiz(data)
        getModal(false)
    }

    useEffect(() => {
        
    }, [options]);


  return (
    <div className='w-screen md:w-[900px] h-screen md:h-[600px] p-8'>
      <div className='flex h-full'>
        <div className='w-3/5'>
            <h1 className='text-2xl font-bold'>Question No. {AllQuestions.length + 1}</h1>
            <div className='border-b-2 border-gray-300 pb-4 mt-3 flex'>
                <label className='w-1/4'>Question : </label>
                <textarea value={Question} onChange={(e)=>{setQuestion(e.target.value)}} className='w-full text-[15px] w-3/4 p-1' rows="2"></textarea>
            </div>
            <div className='mt-4 flex gap-2 items-center'>
                <label className='w-1/6'>Option  : </label>
                <textarea value={option} className='w-4/6 p-1'  rows="2" onChange={(e)=>setOption(e.target.value)}></textarea>
                <button className='px-2 py-1 w-3/12 bg-gradient-to-t from-[#00D775] to-[#00BD68] rounded shadow-[rgba(0, 0, 0, 0.1) 0 2px 4px] text-white text-sm cursor-pointer outline-none overflow-hidden hover:bg-[#00bd68]' onClick={addOption}>Add Option</button>
            </div>
            
            <div className='grid'>
                {options.map((option , index) => {
                    return ( 
                        <div className='flex gap-3 items-center' key={index}>
                            <input  type="checkbox" name={index} checked={option.answer} onChange={()=>handleCheckboxChange(index)} className='text-[#00262b] border-2 border-black focus:ring-black'/>
                            <p>{option.option}</p>
                            <FontAwesomeIcon icon={faTrash} className='text-red-600 hover:cursor-pointer' onClick={()=>handleOptionDelete(index)}/>
                        </div>
                    )
                })}
            </div>
            <div className='mt-10'>
                <button onClick={handleNextQuestion} className='text-sm px-3 py-2 bg-gray-600 rounded text-white'>Add Next Question</button>
            </div>
        </div>
        <div className='w-2/5 px-4 overflow-y-scroll'>
            <h1 className='text-[24px] '>Questions</h1>
            <ul className='mt-8 ' >
                {AllQuestions.map((question , index)=>{
                    return (
                        <li key={index}>{index + 1}) {question.question} <FontAwesomeIcon icon={faTrash} className='ms-3 text-red-600' onClick={()=>handleQuestionDelete(index)}/></li>
                    )
                })}
            </ul>

            <button onClick={handleSubmit} className='mt-4 px-3 py-2 bg-violet-600 text-white rounded'>Save Quiz</button>
        </div>
        
      </div>
      
    </div>
  )
}

export default AddQuiz
