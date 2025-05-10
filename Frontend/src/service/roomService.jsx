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

export const getEmptyRoombyUser = async (checkin, checkout, num, hotelId) =>{
   if(!(checkin||checkout||num)) return
   const hotel = hotelId ? hotelId : 1
   try {
      const response = await apiConfig.get(`/customer/room/${hotel}?start='${checkin}'&end='${checkout}'&num=${num}`)
      // console.log("empty",response.data.room[0].room_empty)
      return response.data.room[0].room_empty.map(i=> ({...i, available: i.count, count: 0}))
   } catch (error) {
      console.log("Error getSchedule: " + error)
      return {}
   }

}
export const getRoomType  = async() => {
   try {
      const response = await apiConfig.get(`/receptionist/room`)
      console.log("res: ", response.data.room.map((item, index)=> ({
         id:index,
         name: item.room_number,
      })))
      return response.data.room
      
   } catch (error) {
      console.log("Error getRoomType: " + error)
   }
}
export const roomService =  {
   getSuggestRoom,
   getEmptyRoombyUser,
   getRoomType
}
   