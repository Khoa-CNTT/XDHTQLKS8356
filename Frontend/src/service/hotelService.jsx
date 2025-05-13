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

export const searchHotel = async (data) => {
  try {
    const response = await apiConfig.get(`/customer/search-hotel?search=${data.search}&start='${data.start}'&end='${data.end}'`);
    return response.data.hotel;
  } catch (error) {
    console.error("Error fetching room details:", error);
    return {}
  }
}