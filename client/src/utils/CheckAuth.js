import React, { useState, useEffect } from 'react';
import { Navigate, redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export default function CheckAuth({ children }) {
    const auth = useSelector((state)=> state.auth);
    // console.log("auth CheckAuth -> ", auth.isAuthenticated);
    return auth.isAuthenticated ? children : <Navigate to={'/login'}/>
}
