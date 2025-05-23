import apiConfig from "./axiosConfig"

export const getExtension = async(type, roomId) => {
   try {
      const response = await apiConfig.get(`/admin/amenitie?type=${type}${roomId ? `&room_id=${roomId}` : ''}`)
      return response.data.amenitie
   } catch (error) {
      console.log("Error getExtension: " + error)
      return {}
   }
}
export const addExtension = async (data) => {
   try {
       const response = await apiConfig.post(`/admin/amenitie`, data);
       return response.data;
   } catch (error) {
       if (error.response) {
           return error.response.data;
       } else {
           return { status: false, message: "Lỗi không xác định" };
       }
   }
};

 export const updateExtension = async (id,data) => {
   try {
     const response = await apiConfig.put(`/admin/amenitie/${id}`, data);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
 export const deleteExtension = async (id) => {
   try {
     const response = await apiConfig.delete(`/admin/amenitie/${id}`);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
export const extensionServices = {
   getExtension,
   updateExtension,
   addExtension,
   deleteExtension
}