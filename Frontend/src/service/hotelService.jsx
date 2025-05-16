import apiConfig from "./axiosConfig";

// export const getHotelDetail = async (hotelId) => {
//    try {
//      const response = await apiConfig.get(`/receptionist/hotel/${hotelId}`);
//      return response.data;
//    } catch (error) {
//      console.error("Error fetching room details:", error);
//      throw error;
//    }
//  };
export const getHotel  = async() => {
  try {
     const response = await apiConfig.get(`/admin/hotel`)
     return response.data.hotel
  } catch (error) {
     console.log("Error getPrices: " + error)
     return {}
  }
}
export const updateHotel = async (data) => {
  try {
    const response = await apiConfig.put(`/admin/hotel`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};
export const searchHotel = async (data) => {
  try {
    const response = await apiConfig.get(`/customer/search-hotel?search=${data.search}&start='${data.start}'&end='${data.end}'`);
    return response.data.hotel;
  } catch (error) {
    console.error("Error fetching room details:", error);
    return {}
  }
}
export const hotelService = {
  getHotel,
  updateHotel
}