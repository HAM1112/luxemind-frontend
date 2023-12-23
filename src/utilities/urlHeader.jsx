import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { addTokens } from "../redux/slices/tokenSlice";
import { addUserDetails } from "../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const useUrlHeader = () => {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()
  let currentDate = new Date();
  const [tokens, setTokens] = useState(useSelector((state) => state.token.value));
  

  if (user.exp * 1000 < currentDate.getTime()) {       
    console.log('token expired');
    const refresh = tokens.refresh
    console.log(refresh);
    api.post(
      '/account/token/refresh/',
      {refresh : refresh}
    ).then((response)=>{
      if (response.status == 200) {
        console.log('token retrived');
        dispatch(addTokens(response.data))
        dispatch(addUserDetails(jwtDecode(response.data.access)))
        setTokens(response.data)
      }

    }).catch((error)=>{
      console.log(error);
    })

  }
  


  const headers = {
    headers: {
      Authorization: `Bearer ${tokens.access}`
    }
  };
  return headers;
};

export default useUrlHeader;
