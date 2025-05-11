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
      console.log(response.data)
      // if(response.data.role === "admin") {
      //    const hotel = await apiConfig.get('/receptionist/hotel')
      //    if(hotel.data.hotel?.length>0) setHotel(hotel.data.hotel[0].id)
      // }
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
export const authService = {
   login,
   logout
}

//CÁCH SỬ DỤNG


// const handleClick = async() => {
//    const dataLogin = await authService.login({
//        email: "lequangminh07072003@gmail.com",
//        password: "12345"
//    })
//    console.log(dataLogin)
// }