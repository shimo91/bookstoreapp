import { Navigate } from "react-router-dom"

export const AdLogout =()=>{
    sessionStorage.removeItem('userToken')
    return <Navigate to='/admin'/>
}