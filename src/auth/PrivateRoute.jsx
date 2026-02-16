import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'



const PrivateRoute = ({ children, roles }) => {

const user = JSON.parse(localStorage.getItem("auth"))
if (!user) {
return <Navigate to="/login" replace />
}


return children ? children : <Outlet />;
}

export default PrivateRoute