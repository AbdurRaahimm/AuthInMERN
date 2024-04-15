import React from 'react'
import { Navigate, Route } from 'react-router-dom';
import { getCookie } from '../lib/cookies';

export default function ProtectRoutes({ children}) {
    const token = getCookie('token');
    
  return (
    token ? children : <Navigate to='/signin' />
  )
}
