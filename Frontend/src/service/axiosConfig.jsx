import axios from "axios";
import { Navigate } from "react-router-dom";
import { APP_ROUTER } from "../utils/Constants";

const apiConfig = axios.create({
   baseURL: 'http://localhost:8080/api',
   timeout: 5000,
   withCredentials: true,
   headers: { 'Content-Type': 'application/json' }
});

// Thêm token vào header từ cookie
apiConfig.interceptors.request.use(
   (config) => {
      return config;
   },
   (error) => Promise.reject(error));

apiConfig.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         return <Navigate to={APP_ROUTER.LOGIN} />
      }
      return Promise.reject(error);
   }
)


export default apiConfig;
