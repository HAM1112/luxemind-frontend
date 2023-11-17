import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function CheckAuth(props){
    const user = useSelector(state => state.user.value)
    

    if (user !== null) {
        if (user.is_superuser) {
            return <Navigate to={'/admin'} />
        }
    } else{
        console.log(user)
        if (props.role === "login") {
            return props.children
        }
        else{
            return <Navigate to={'/account/login'} />
        }
    }

}

export default CheckAuth 