import { Navigate } from "react-router-dom"

export const AdLogout =()=>{
    sessionStorage.removeItem('adminToken')
    return <Navigate to='/admin'/>
}