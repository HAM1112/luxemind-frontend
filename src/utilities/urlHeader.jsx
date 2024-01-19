import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { addTokens } from "../redux/slices/tokenSlice";
import { addUserDetails } from "../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

  const useUrlHeader = () => {
    const user = jwtDecode(localStorage.getItem('user'))
    
    // const dispatch = useDispatch()
    let currentDate = new Date();
    const [access, setAccess] = useState(localStorage.getItem('user'));
    const [refresh, setRefresh] = useState(localStorage.getItem('user'));
    if (user.exp * 1000 < currentDate.getTime()) {       
      // console.log(refresh);
      api.post(
        '/account/token/refresh/',
        {refresh : refresh}
      ).then((response)=>{
        if (response.status == 200) {
          console.log('token retrived');
          // dispatch(addTokens(response.data))
          // dispatch(addUserDetails(jwtDecode(response.data.access)))
          setAccess(response.data.access)
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
  const headers = {
    headers: {
      Authorization: `Bearer ${access}`
    }
  };
  return headers;
};

export default useUrlHeader;
