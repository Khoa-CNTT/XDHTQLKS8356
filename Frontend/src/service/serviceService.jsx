import apiConfig from "./axiosConfig"

export const getServices  = async() => {
   try {
      const response = await apiConfig.get(`/admin/services`)
      return response.data.services
   } catch (error) {
      console.log("Error getServices: " + error)
      return {}
   }
}
export const addServices = async (data) => {
   try {
       const response = await apiConfig.post(`/admin/services`, data);
       return response.data;
   } catch (error) {
       if (error.response) {
           return error.response.data;
       } else {
           return { status: false, message: "Lỗi không xác định" }; // <-- đừng throw
       }
   }
};

 export const updateServices = async (id,data) => {
   try {
     const response = await apiConfig.put(`/admin/services/${id}`, data);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
 export const deleteServices = async (id) => {
   try {
     const response = await apiConfig.delete(`/admin/services/${id}`);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
export const serviceService = {
   getServices,
   updateServices,
   addServices,
   deleteServices
}