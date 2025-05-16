import apiConfig from "./axiosConfig"

export const getRoom  = async() => {
   try {
      const response = await apiConfig.get(`/admin/room_details`)
      console.log("res: ", response.data.room.map((item, index)=> ({
         id:index,
         name: item.room_number,
      })))
      return response.data.room
      
   } catch (error) {
      console.log("Error getRoom: " + error)
      return {}
   }
}
export const addRoom = async (data) => {
   try {
     const response = await apiConfig.post(`/admin/room_detail`, data);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
 export const updateRoom = async (id,data) => {
   try {
     const response = await apiConfig.put(`/admin/room_detail/${id}`, data);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
 export const deleteRoom = async (id) => {
   try {
     const response = await apiConfig.delete(`/admin/room_detail/${id}`);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
export const roomDetailService = {
   getRoom,
   updateRoom,
   deleteRoom,
   addRoom
}