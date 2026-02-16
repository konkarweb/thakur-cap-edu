import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'



const RoleRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem("auth"))

  if (!roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}


export default RoleRoute