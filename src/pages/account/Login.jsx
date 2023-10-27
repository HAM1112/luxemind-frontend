import React , { useState } from 'react'
import './login.css'
import logo from '../../assets/luxeminds.png'
import { data } from 'autoprefixer';
import api from '../../api/api';



function Login() {
    const [Data, setData] = useState({email:"" , password : ""});
    
    const handleChange = (e) =>{
        setData({ ...Data, [e.target.name]: e.target.value})
    }
    
    const handlleSubmit = () => {
        console.log(Data);
        api.post('/accounts/login/', Data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
  return (
    <div className='login flex justify-evenly h-screen border'>
      <div className='left w-3/4'>
            <div>
                <img src={logo} className='w-70 h-40'  alt="logo"/>
            </div>
            <div className='text-6xl font-extrabold mt-40 w-42 ms-40'>
                <h1>Start learning with <span className='luxemind text-stone-500'> LuxeMinds </span></h1>
            </div>
      </div>
      <div className='right w-full'>
            <div className='grid justify-center content-center h-full border  border-stone-800'>
                <div className='flex w-50'>
                    <div className='border-b-2 border-slate-400 px-2 py-1 w-full hover:border-slate-700'>Sign In</div>
                    <div className='border-b-2 border-slate-400 px-2 py-1 w-full hover:border-slate-700'>Register</div>
                </div>
                <div className='grid gap-6 pt-5'>
                    <input onChange={handleChange} value={Data.email} type="text" name='email' placeholder='Email address' className='border border-slate-500 px-4 py-3 w-96'/>
                    <input onChange={handleChange} value={Data.password} type="password" name='password' placeholder='Password'  className='border border-slate-500 px-4 py-3 w-96'/>
                </div>
                <div className='flex gap-6 pt-5'>
                    <button className='login-btn px-5 py-3' onClick={handlleSubmit}>Login</button>
                    <p className='py-3'>Forgot Password ? </p>
                </div>
                <p className='py-3'>Or sign in with :</p>
            </div>
      </div>
    </div>
  )
}

export default Login
