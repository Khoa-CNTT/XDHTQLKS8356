import apiConfig from "./axiosConfig";

export const getConversationId = async () => {
  try {
    const response = await apiConfig.get(`/customer/chat_room`);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; 
  }
};

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
export const getMessages = async (conversationId) => {
  try {
    if(!conversationId) return {}
    const response = await apiConfig.get(`/customer/chat/${conversationId}`);
    return response.data?.mess?.reverse(); 
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

export const getChatBox = async () => {
  try {
    const response = await apiConfig.get("/customer/chatbot");
    return response.data.chat; 
  } catch (error) {
    console.error("Error fetching all chatbox:", error);
    throw error; 
  }
};
export const sendChatBox = async (question) => {
  try {
    const response = await apiConfig.post("/customer/chatbot", question);
    return response.data?.ans; 
  } catch (error) {
    console.error("Error post all chatbox:", error);
    throw error; 
  }
};


export const messageService = {
  getMessages,
  sendMessage, 
  getAllMessages,
  getConversationId,
  getChatBox,
  sendChatBox
}
