import io from "socket.io-client";
import {getToken} from '../utils/AuthCheck'

let socket = null

export const initSocket = () => {
  if (!socket) {
    socket = io("http://localhost:8080", {
      autoConnect: false,
      query: {
        userId: getToken(), // truyền userId qua query
      },
    });
  }
  return socket;
};

export const connectSocket = () => {
  if (!socket) initSocket();

  socket.io.opts.query = {
    userId: getToken(),
  };

  if (getToken()&&!socket.connected) {
    socket.connect();
  }
};


// Lắng nghe các tin nhắn mới
export const listenNewMessages = (callback) => {
  socket.on("receive_message", callback);
};

//Ngừng việc lắng nghe
export const stopListenNewMessages = (callback) => {
  socket.off("receive_message", callback);
};

// Gửi tin nhắn mới đến người nhận
export const sendNewMessage = (token, message_content, image, conversationId) => {
  if(!token||!message_content) return
  socket.emit("send_message", {token, message_content, image: '', conversationId: 1}); 
};


// Ngắt kết nối socket khi không cần nữa
export const disconnectSocket = () => {
  socket.disconnect();
};

export const socketConnect = {
  initSocket,
  connectSocket,
  sendNewMessage,
  disconnectSocket,
  stopListenNewMessages,
  listenNewMessages
}