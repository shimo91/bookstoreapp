import { Navigate, useLocation } from "react-router-dom";

export const RequireAdminAuth = ({children})=>{
    const getToken=sessionStorage.getItem('adminToken');
    const location=useLocation();
    if(!getToken)
    {
        return <Navigate to='/admin' state={{from:location}}/>
    }
    return children;
}