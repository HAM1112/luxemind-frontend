import React , {useState} from 'react'
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTokens } from '../../redux/slices/tokenSlice';
import { addUserDetails } from '../../redux/slices/userSlice';
import { jwtDecode } from 'jwt-decode';

function ProvRegister() {

const [Data, setData] = useState({username : '' , email : ''  , password : ''});
    const navigate = useNavigate()
    const dispatch = useDispatch()


  const handlleSubmit = () => {
     if (Object.values(Data).some(value => value === "" || value === null)){
        alert("invalid input")
     } else {
       console.log(Data);
       api.post('/account/provRegister/', Data)
       .then(function (response) {
           api.post('/account/token/' , {email : Data.email , password : Data.password})
           .then((response)=>{
                if (response.status == 200) {
                    console.log(response.data);
                    dispatch(addTokens(response.data))
                    dispatch(addUserDetails(jwtDecode(response.data.access)))
                }
           }).catch((error)=>{
            console.log(error);
           })
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
        <div className='grid gap-6 pt-5'>
            <input onChange={handleChange} value={Data.username} type="text" name='username' placeholder='Username' className='border border-slate-500 px-4 py-2 w-96'/>
            <input onChange={handleChange} value={Data.email} type="email" name='email' placeholder='Email address' className='border border-slate-500 px-4 py-2 w-96'/>
            <input onChange={handleChange} value={Data.password} type="password" name='password' placeholder='Password'  className='border border-slate-500 px-4 py-2 w-96'/>
        </div>
        
        <div className='flex gap-6 pt-5'>
            <button className='login-btn px-5 py-3' onClick={handlleSubmit}>Register</button>
        </div>
    </>
  )
}

export default ProvRegister
