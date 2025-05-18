import apiConfig from "./axiosConfig"

export const getSchedule  = async(start, end, status) => {
   if(!start || !end ||!status) return
   const fomatStatus = `(${status.map(key => `'${key}'`).join(",")})`;
   try {
      const response = await apiConfig.get(`/admin/bookings?start='${start}'&end='${end}'`+ `${status.length>0 ? `&status=${fomatStatus}` : ''}`)
      return response.data.room
   } catch (error) {
      console.log("Error getSchedule: " + error)
      return []
   }
}
// export const getBookingDetail  = async(id) => {
//    // if(!id) return
//    try {
//       const response = await apiConfig.get(`/receptionist/bookings/${id}`)
//       return response.data.room[0] || {}
//    } catch (error) {
//       console.log("Error getSchedule: " + error)
//       return {}
//    }
// }

export const creatBooking = async(data) => {
   if(!data) return
   try {
      const response = await apiConfig.post(`/customer/booking`, data)
      return response.data
   } catch (error) {
      console.log("Error booking: " + error)
      return {}
   }
}
export const getBookingAdmin = async (startDate, endDate) => {
   if(!startDate || !endDate) return
   try {
       const response = await apiConfig.get(`/admin/bookings?start='${startDate}'&end='${endDate}'`,{withCredentials: true});
       console.log("2",response)
       return response.data.booking || [] 
   } catch (error) {
       console.error(error);
       return []
   } 
};
export const getBookingDetail  = async(id) => {
   // if(!id) return
   try {
      const response = await apiConfig.get(`/customer/booking/${id}`)
      return response.data.booking[0] || {}
   } catch (error) {
      console.log("Error getSchedule: " + error)
      return {}
   }
}
export const bookingService = {
   getSchedule,
   getBookingDetail,
   creatBooking,
   getBookingAdmin
}