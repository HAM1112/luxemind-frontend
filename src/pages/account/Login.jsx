
import api from '../../api/api';
import { useState } from 'react';

import './login.css'
import { useSelector } from 'react-redux';



const Login = () =>{

    const [Data, setData] = useState({email:"" , password : ""});
    
    const testState = useSelector(state => state.user)
   
    const handlleSubmit = () => {
        console.log(Data);
        api.post('/account/login/', Data)
        .then(function (response) {
            console.log(response.data.user);
            console.log("testing");
        })
        .catch(function (error) {
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
                <input onChange={handleChange} value={Data.email} type="text" name='email' placeholder='Email address' className='border border-slate-500 px-4 py-3 w-96'/>
                <input onChange={handleChange} value={Data.password} type="password" name='password' placeholder='Password'  className='border border-slate-500 px-4 py-3 w-96'/>
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