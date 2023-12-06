
import api from '../../api/api';
import { useState } from 'react';

import './login.css'
import { addUserDetails } from '../../redux/slices/userSlice';
import { addTokens } from '../../redux/slices/tokenSlice';
import {  useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
// import { Navigate } from 'react-router-dom';



const Login = () =>{

    const [Data, setData] = useState({email:"" , password : ""});
    const dispatch = useDispatch()

    const handlleSubmit = () => {
        console.log(Data);
        api.post('/account/token/', Data)
        .then(function (response) {
            if(response.status == 200){
                console.log(response.data)
                dispatch(addTokens(response.data))
                dispatch(addUserDetails(jwtDecode(response.data.access)))
            }
        })
        .catch(function (error) {
            alert("Invalid Credential")
            console.log(error);
        });
        setData({email:"" , password : ""})
    }
    const handleChange = (e) =>{
        setData({ ...Data, [e.target.name]: e.target.value})
    }
    
    return (
        <>
        {console.log()}
            <div className='grid gap-6 pt-5'>
                {/* {console.log(testState)} */}
                <input onChange={handleChange} 
                    id='email' 
                    value={Data.email} 
                    type="text" 
                    name='email' 
                    placeholder='Email address' 
                    className='border border-slate-500 px-4 py-3 w-96' 
                    onKeyDown={(e)=> {if(e.key === "Enter"){document.getElementById('password').focus()}}}/>
                <input onChange={handleChange} 
                    id='password' 
                    value={Data.password} 
                    type="password" 
                    name='password' 
                    placeholder='Password'  
                    className='border border-slate-500 px-4 py-3 w-96'
                    onKeyDown={(e)=>{if(e.key === "Enter" && Data.password!==""){handlleSubmit()}}}    
                    />
            </div>
            <div className='flex gap-6 pt-5'>
                <button className='login-btn px-5 py-3' onClick={handlleSubmit}>Login</button>
                <p className='py-3'>Forgot Password ? </p>
            </div>
            {/* <p className='py-3'>Or sign in with :</p> */}
        </>
    )
}

export default Login