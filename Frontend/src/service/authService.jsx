import axios from "axios"
import {setRole, setToken } from "../utils/AuthCheck"
import apiConfig from "./axiosConfig";
import Cookies from "js-cookie";

//api login
export const login = async (email, password) => {
   try {
      const response = await apiConfig.post('/customer/login',{email, password})
      // console.log("response", response);
      setRole(response.data.role)
      setToken(response.data.token)
      return response.data
   } catch (error) {
      if (error.status === 404) {
         return error.response.data
      } else console.error("Error: ", error)      
   }
}

//api register

//api authenticate

//api logout
export const logout = () => {
   Cookies.remove("token")
   Cookies.remove("role")
   Cookies.remove("hotel_id")
}

// Tìm kiếm người dùng
export const findUser = async (name) => {
  try {
    const response = await apiConfig.get(`/admin/search_user?search=${name}`);
    return response.data; 
  } catch (error) {
    console.error("Error finding messages:", error);
    throw error; 
  }
};

export const authService = {
   login,
   logout,
   findUser
}

