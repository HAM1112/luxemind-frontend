import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function CheckAuth(props){
    const user = useSelector(state => state.user)

    console.log(user)
    return props.children
}

export default CheckAuth 