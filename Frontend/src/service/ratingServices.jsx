import apiConfig from "./axiosConfig"

export const getRating  = async(id) => {
   // if(!id) return
   try {
      const response = await apiConfig.get(`/customer/ratting/${id}`)
      return response.data
   } catch (error) {
      console.log("Error getSchedule: " + error)
      return {}
   }
}

export const createRating = async (data) => {
   try {
     const response = await apiConfig.post(`/customer/ratting`, data);
     console.log(response)
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 }; 

export const ratingService = {
    getRating,
    createRating
}