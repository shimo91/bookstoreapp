import { Navigate } from "react-router-dom"

export const Logout =()=>{
    sessionStorage.removeItem('userToken')
    return <Navigate to='/'/>
}