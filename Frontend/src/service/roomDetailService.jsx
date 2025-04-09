import apiConfig from "./axiosConfig"

export const getRoom  = async() => {
   try {
      const response = await apiConfig.get(`/receptionist/room_detail`)
      console.log("res: ", response.data.room.map((item, index)=> ({
         id:index,
         name: item.room_number,
      })))
      return response.data.room
      
   } catch (error) {
      console.log("Error getRoom: " + error)
   }
}

export const roomDetailService = {
   getRoom,
}