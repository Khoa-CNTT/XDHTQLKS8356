import apiConfig from "./axiosConfig";

export const addPersonnel = async (data) => {
    try {
        const response = await apiConfig.post(`/admin/add_user`, data);
        return response.data;
    } catch (error) {
    
        if (error.response) {
            return error.response.data;
        } else {
            return { status: false, message: "Lỗi không xác định" };
        }
    }
 };