import apiConfig from "./axiosConfig"

export const getServices  = async() => {
   try {
      const response = await apiConfig.get(`/receptionist/services`)
      return response.data.services
   } catch (error) {
      console.log("Error getServices: " + error)
      return {}
   }
}
export const putServices  = async(data) => {
   try {
      const response = await apiConfig.post(`/receptionist/services/booking`, data)
      return response.data
   } catch (error) {
      console.log("Error putServices: " + error)
   }
}

export const serviceService = {
   getServices,
   putServices
}