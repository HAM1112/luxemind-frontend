import React, { useEffect, useState } from 'react'
import Banner from './components/Banner'
import { useSelector } from 'react-redux'
import api from '../../api/api';
import useUrlHeader from '../../utilities/urlHeader';
import { useNavigate } from 'react-router-dom';

function StudHome() {
  const user_id = useSelector(state => state.user)
  const auth = useUrlHeader()
  const navigate = useNavigate()
  const [user, setUser] = useState({});
  useEffect(() => {
    api.get(`/student/profile/`,auth)
    .then(response => {
      setUser(response.data)
      console.log(response.data);
    })
  }, []);
  useEffect(() => {
    if (
      user.dob === null ||
      user.education === '' ||
      user.first_name === '' ||
      user.last_name === ''
    ){
      console.log('not ddd' || user.education == '' || user.first_name == "" || user.last_name == '')
      navigate('/student/profile')
    }
  }, [user]);
  
  
  return (

    <div className='px-36'>
      <Banner />
    </div>
  )
}

export default StudHome
