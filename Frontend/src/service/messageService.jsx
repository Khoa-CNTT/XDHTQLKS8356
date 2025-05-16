import apiConfig from "./axiosConfig";

// Gửi tin nhắn
export const sendMessage = async (receiverId, messageData) => {
  try {
    const response = await apiConfig.post(`/customer/chat/${receiverId}`, messageData);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; 
  }
};

// Lấy tất cả tin nhắn giữa hai người
export const getMessages = async (userId) => {
  try {
    if(!userId) return {}
    const response = await apiConfig.get(`/customer/chat/${userId}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error; 
  }
};

// Lấy tất cả hộp thư
export const getAllMessages = async () => {
  try {
    const response = await apiConfig.get("/customer/all_chat");
    return response.data; 
  } catch (error) {
    console.error("Error fetching all messages:", error);
    throw error; 
  }
};

export const messageService = {
  getMessages,
  sendMessage, 
  getAllMessages
}
