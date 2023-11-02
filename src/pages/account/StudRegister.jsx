import React, { useState } from 'react'
import api from '../../api/api';



function StudRegister() {

  const [Data, setData] = useState({first_name:"" ,last_name : "", age:null, email:"" , password : "" , username:""});
    
   
  const handlleSubmit = () => {
     if (Object.values(Data).some(value => value === "" || value === null)){
        alert("invalid input")
     } else {
       console.log(Data);
       api.post('/account/studRegister/', Data)
       .then(function (response) {
           console.log(response);
       })
       .catch(function (error) {
           console.log(error);
       });
      }
      // setData({first_name:"" ,last_name : "", age:"", email:"" , password : "" , username: ""})
  }
  const handleChange = (e) =>{
      setData({ ...Data, [e.target.name]: e.target.value})
  }




  return (
    <>
      <h1 className='pt-4 text-center'>Register as student</h1>
      <div className='grid gap-6 pt-5'>
            <input onChange={handleChange} value={Data.username} type="text" name='username' placeholder='username' className='border border-slate-500 px-4 py-2 w-96'/>
            <input onChange={handleChange} value={Data.first_name} type="text" name='first_name' placeholder='first_name' className='border border-slate-500 px-4 py-2 w-96'/>
            <input onChange={handleChange} value={Data.last_name} type="text" name='last_name' placeholder='last_name' className='border border-slate-500 px-4 py-2 w-96'/>
            <input onChange={handleChange} value={Data.age} type="number" name='age' placeholder='Age' className='border border-slate-500 px-4 py-2 w-96'/>
            <input onChange={handleChange} value={Data.email} type="email" name='email' placeholder='Email address' className='border border-slate-500 px-4 py-2 w-96'/>
            <input onChange={handleChange} value={Data.password} type="password" name='password' placeholder='Password'  className='border border-slate-500 px-4 py-2 w-96'/>
        </div>
        
        <div className='flex gap-6 pt-5'>
            <button className='login-btn px-5 py-3' onClick={handlleSubmit}>Register</button>
            {/* <p className='py-3'>Forgot Password ? </p> */}
        </div>
    </>
  )
}

export default StudRegister
