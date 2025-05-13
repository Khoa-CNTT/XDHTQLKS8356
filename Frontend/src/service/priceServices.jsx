import apiConfig from "./axiosConfig"

export const getPrices  = async() => {
   try {
      const response = await apiConfig.get(`/admin/pricing`)
      return response.data.pricing
   } catch (error) {
      console.log("Error getPrices: " + error)
      return {}
   }
}
export const addPrices = async (data) => {
   try {
       const response = await apiConfig.post(`/admin/pricing`, data);
       return response.data;
   } catch (error) {
       if (error.response) {
           return error.response.data;
       } else {
           return { status: false, message: "Lỗi không xác định" }; // <-- đừng throw
       }
   }
};

 export const updatePrices = async (id,data) => {
   try {
     const response = await apiConfig.put(`/admin/pricing/${id}`, data);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
 export const deletePrices = async (id) => {
   try {
     const response = await apiConfig.delete(`/admin/pricing/${id}`);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
export const priceServices = {
   getPrices,
   updatePrices,
   addPrices,
   deletePrices
}