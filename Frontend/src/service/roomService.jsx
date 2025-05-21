import { useNavigate } from "react-router-dom"
import apiConfig from "./axiosConfig"
export const getSuggestRoom = async (checkin, checkout, num, hotelId) =>{
   if(!(checkin||checkout||num)) return
   const hotel = hotelId ? hotelId : 1
   try {
      const response = await apiConfig.get(`/customer/room/${hotel}/suggest?start='${checkin}'&end='${checkout}'&num=${num}`)
      // console.log("suggest",response.data.room)
      return response.data.room
   } catch (error) {
      console.log("Error getSchedule: " + error)
      return {}
   }
}

export const getEmptyRoombyUser = async (checkin, checkout) =>{
   if(!(checkin||checkout)) return
   try {
      const response = await apiConfig.get(`/customer/room_empty?start='${checkin}'&end='${checkout}'`)
      // console.log("empty",response.data.room[0].room_empty)
      return response.data.room[0].room_empty.map(i=> ({...i, available: i.count, count: 0}))
   } catch (error) {
      console.log("Error getSchedule: " + error)
      return {}
   }

}
export const getRoomType  = async() => {
   try {
      const response = await apiConfig.get(`/admin/room`)
      console.log("res: ", response.data.room.map((item, index)=> ({
         id:index,
         name: item.room_number,
      })))
      return response.data.room
      
   } catch (error) {
      console.log("Error getRoomType: " + error)
      return {}
   }
}

export const getRoomTypeById  = async(id) => {
   try {
      const response = await apiConfig.get(`/admin/room/${id}`)
      return response.data
      
   } catch (error) {
      console.log("Error getRoomType: " + error)
      return {}
   }
}
export const addRoomType = async (data) => {
   try {
     const response = await apiConfig.post(`/admin/room`, data);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
 export const updateRoomType = async (id,data) => {
   try {
     const response = await apiConfig.put(`/admin/room/${id}`, data);
     return response.data?.room;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
 export const deleteRoomType = async (id) => {
   try {
     const response = await apiConfig.delete(`/admin/room/${id}`);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
export const roomService =  {
   getSuggestRoom,
   getEmptyRoombyUser,
   getRoomType,
   addRoomType,
   updateRoomType,
   deleteRoomType,
   getRoomTypeById
}
   