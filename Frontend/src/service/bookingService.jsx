import apiConfig from "./axiosConfig"

export const getSchedule  = async(start, end, status) => {
   // if(!start || !end ||!status) return
      if(!start || !end) return
   const fomatStatus = `(${status.map(key => `'${key}'`).join(",")})`;
   try {
      // const response = await apiConfig.get(`/admin/bookings?start='${start}'&end='${end}'`+ `${status.length>0 ? `&status=${fomatStatus}` : ''}`)
      const response = await apiConfig.get(`/admin/status_room?start='${start}'&end='${end}'`)
      return response.data
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
export const creatBookingRoom = async(data) => {
   if(!data) return
   try {
      const response = await apiConfig.post(`/customer/booking`, data)
      return response.data
   } catch (error) {
      console.log("Error booking: " + error)
      return {}
   }
}
export const creatBookingService = async(data) => {
   if(!data) return
   try {
      const response = await apiConfig.post(`/customer/booking-service`, data)
      return response.data
   } catch (error) {
      console.log("Error getSchedule: " + error)
      return {}
   }
}
export const getBookingAdmin = async (startDate, endDate) => {
   if(!startDate || !endDate) return
   try {
       const response = await apiConfig.get(`/admin/bookings?start='${startDate}'&end='${endDate}'`,{withCredentials: true});
       return response.data.booking || [] 
   } catch (error) {
       console.error(error);
       return []
   } 
};
export const getBookingCustomer = async () => { 
   try {
       const response = await apiConfig.get(`/customer/bookings`,{withCredentials: true});
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

 export const updateStatusBooking = async (id,data) => {
   console.log(id, data)
   try {
     const response = await apiConfig.put(`/admin/booking/${id}`, data);
     return response.data;
   } catch (error) {
     if (error.response) {
       return error.response.data;
     } else {
       throw error;
     }
   }
 };
export const bookingService = {
   
   getSchedule,
   getBookingDetail,
   creatBookingRoom,
   getBookingAdmin,
   creatBookingService,
   getBookingCustomer,
   updateStatusBooking
}