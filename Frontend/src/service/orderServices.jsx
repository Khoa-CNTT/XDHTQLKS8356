import apiConfig from "./axiosConfig";
export const getOrders = async (startDate, endDate) => {
    if(!startDate || !endDate) return
    try {
        const response = await apiConfig.get(`http://localhost:8080/api/receptionist/booking?start='${startDate}'&end='${endDate}'`,{withCredentials: true});
        return response.data.room || [] 
    } catch (error) {
        console.error(error);
        return []
    } 
};
export const orderServices = {
    getOrders
}