import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const RequireAuth = ({children})=>{
    const getToken=sessionStorage.getItem('userToken');
    const location=useLocation();
    if(!getToken)
    {
        return <Navigate to='/' state={{from:location}}/>
    }
    else 
    {
        const decodeToken =jwtDecode(getToken);
        const topicSelected=decodeToken.topicstatus
        console.log("topicselected :"+topicSelected)
        if(topicSelected===false || topicSelected===undefined)
        {
           // return <Navigate to='/' state={{from:location}}/>
        }
        
    }
    return children;
}