import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function CheckAuth(props){
    const user = useSelector(state => state.user.value)
    let currentDate = new Date();
    
    if (user !== null) {
        if (user.exp * 1000 < currentDate.getTime()) {
            
            return
        }
        console.log('not expired');
        if (user.is_superuser) {
            if(props.from === "admin"){
                return props.children
            }
            return <Navigate to={'/admin'} />
        }
        if(user.is_provider){
            if(props.from === "provider"){
                return props.children
            }
            return <Navigate to={"/provider"} />
        }
        if(!user.is_provider){
            if(props.from === "student"){
                return props.children
            }
            return <Navigate to={"/student"} />
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