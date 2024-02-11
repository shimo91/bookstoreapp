import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:4000/'
});

//Request Interptor
axiosInstance.interceptors.request.use((config)=>{
    const accessToken = sessionStorage.getItem("userToken");
    if(accessToken){
        if(config) config.headers.token=accessToken;
    }
    return config;},
    (error)=>{
        return Promise.reject(error);
    }
)

export const axiosAdmin = axios.create({
    baseURL:'http://127.0.0.1:4000/'
});

//Request Interptor
axiosAdmin.interceptors.request.use((config)=>{
    const accessToken = sessionStorage.getItem("adminToken");
    if(accessToken){
        if(config) config.headers.token=accessToken;
    }
    return config;},
    (error)=>{
        return Promise.reject(error);
    }
)


//export default axiosInstance