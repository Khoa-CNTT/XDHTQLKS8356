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

export const ratingService = {
    getRating,
}