import axios from "axios";

const api=axios.create({
  baseURL:`${import.meta.env.VITE_BACK_URL}`,
  headers:{
    "Content-Type":"application/json",
    Accept:"application/json"
  },
  withCredentials:true
});

api.interceptors.request.use(
  async(config)=>{
    const token=localStorage.getItem("JWT");
    if(token){
      config.headers.Authorization= `Bearer ${token}`;
    }
    return config;
  },
  (error)=>{
    return Promise.reject(error);
  }
)
export default api;