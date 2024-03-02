
import api from '../../api/api';
import { useEffect, useState } from 'react';
import './login.css'
import { addUserDetails } from '../../redux/slices/userSlice';
import { addTokens } from '../../redux/slices/tokenSlice';
import {  useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
// import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () =>{

    const [Data, setData] = useState({email:"" , password : ""});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // useEffect(() => {
    //     // localStorage.removeItem("user")
    //     // localStorage.removeItem("tokens")
    // }, []);



    const handlleSubmit = () => {
        api.post('/account/token/', Data)
        .then(function (response) {
            if(response.status == 200){
                dispatch(addTokens(response.data))
                dispatch(addUserDetails(jwtDecode(response.data.access)))
                localStorage.setItem('user' , response.data.access)
                localStorage.setItem('tokens' , response.data.refresh)
                // console.log(response.data);
                navigate('/student/home')
            }
        })
        .catch(function (error) {
            toast.error('Invalid Credentials!!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            console.log(error);
        });
        setData({email:"" , password : ""})
    }
    const handleChange = (e) =>{
        setData({ ...Data, [e.target.name]: e.target.value})
    }
    
    return (
        <>
            <div className='grid gap-6 pt-5'>
                {/* {console.log(testState)} */}
                <ToastContainer />
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