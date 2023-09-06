import React from 'react'
import Cookies from 'js-cookie';
import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function({ children }){
  const auth = useSelector((state)=> state.auth);
  // console.log("auth Guest -> ", auth.isAuthenticated);
  return !auth.isAuthenticated ? children : <Navigate to={'/'} replace={true}/>
}
