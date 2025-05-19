import apiConfig from "./axiosConfig"

export const getUser = async() => {
   try {
      const response = await apiConfig.get(`/customer/user`)
      return response.data.user
   } catch (error) {
      console.log("Error getUser: " + error)
      return {}
   }
}
 export const updateUser = async (data) => {
   try {
     const response = await apiConfig.put(`/customer/user`, data);
     console.log("2",response.data)
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };

export const userServices = {
   getUser,
   updateUser,
}