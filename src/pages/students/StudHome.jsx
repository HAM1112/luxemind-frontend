import React, { useEffect, useState } from 'react'
import Banner from './components/Banner'
import { useSelector } from 'react-redux'
import api from '../../api/api';
import useUrlHeader from '../../utilities/urlHeader';
import { useNavigate } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import LearnGrow from './components/LearnGrow';
import BottomBanner from './components/BottomBanner';

function StudHome() {
  const user_id = useSelector(state => state.user)
  const auth = useUrlHeader()
  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/student/profile/`,auth)
    .then(response => {
      setUser(response.data)
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
    setLoading(false)
  }, [user]);
  
  
  return (
    
      loading ?
      <div className='w-full flex items-center justify-center h-[100px] md:h-[400px]'>
          <SpinnerCircular size={62} thickness={103} speed={68} color="rgba(229, 195, 166, 1)" secondaryColor="rgba(0, 0, 0, 0.1)" />
      </div>:
      <>
        <div className='px-5 md:px-36 mb-12'>
          <Banner />
          <LearnGrow />
          <BottomBanner />
        </div>
      </>
    
  )
}

export default StudHome
