import React , {useState} from 'react'
import api from '../../api/api';


function ProvRegister() {

const [Data, setData] = useState({username : '' , email : '' , age : null , education : '' , password : ''});
   
  const handlleSubmit = () => {
     if (Object.values(Data).some(value => value === "" || value === null)){
        alert("invalid input")
     } else {
        
       console.log(Data);
       api.post('/account/provRegister/', Data)
       .then(function (response) {
           console.log(response);
       })
       .catch(function (error) {
           console.log(error);
       });
      }
      // setData({username : '' , email : '' , age : null , education : '' , password : ''})
  }
  const handleChange = (e) =>{
      setData({ ...Data, [e.target.name]: e.target.value})
  }

  return (
    <>
        <h1 className='pt-4 text-center'>Register as Provider</h1>
        <div className='grid gap-6 pt-5'>
            <input onChange={handleChange} value={Data.username} type="text" name='username' placeholder='Username' className='border border-slate-500 px-4 py-2 w-96'/>
            <input onChange={handleChange} value={Data.email} type="email" name='email' placeholder='Email address' className='border border-slate-500 px-4 py-2 w-96'/>
            
            <input onChange={handleChange} value={Data.education} type="text" name='education' placeholder='Education' className='border border-slate-500 px-4 py-2 w-96'/>
            <input onChange={handleChange} value={Data.age} type="number" name='age' placeholder='Age' className='border border-slate-500 px-4 py-2 w-96'/>
            <input onChange={handleChange} value={Data.password} type="password" name='password' placeholder='Password'  className='border border-slate-500 px-4 py-2 w-96'/>
        </div>
        
        <div className='flex gap-6 pt-5'>
            <button className='login-btn px-5 py-3' onClick={handlleSubmit}>Register</button>
        </div>
    </>
  )
}

export default ProvRegister
