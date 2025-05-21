import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useRef } from "react";
import { useEffect } from "react";
import { messageService, sendMessage } from "../../service/messageService";
import {
  connectSocket,
  listenNewMessages,
  socketConnect,
  stopListenNewMessages,
} from "../../service/socket";
import { getToken, isAuthenticated } from "../../utils/AuthCheck";

const ChatCustomer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Lấy tin nhắn khi component được mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await messageService.getMessages(1);
        setMessages(data.mess.reverse());
        console.log("data: ", data.mess);
      } catch (error) {
        console.error(error);
      }
    };
    if (isAuthenticated()) fetchMessages();
  }, []);

  // Lắng nghe tin nhắn mới từ Socket.io
  useEffect(() => {
    const handleNewMessage = ({conversationId, user_id, message_content, message_time}) => {
      console.log(conversationId, user_id, message_content, message_time)
      setMessages((prev) => [
        ...prev,
        {
          fullname: "",
          image: "",
          user_id: user_id,
          message_content: message_content,
          message_time: message_time,
        },
      ]);
    };

    // if (isAuthenticated()) {
    socketConnect.connectSocket();
    socketConnect.listenNewMessages(handleNewMessage);
    // }

    return () => {
      socketConnect.stopListenNewMessages(handleNewMessage);
    };
  }, []);

  // Scroll tự động tới tin nhắn mới nhất
  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    try {
      // const data = {
      //   messageContent: input,
      //   image: "test",
      // };
      // await messageService.sendMessage(1, data);
      const token = getToken();
      if (!token) return;
      else socketConnect.sendNewMessage(token, input, "", "");
      setInput(""); // Xóa input sau khi gửi
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className='z-[100]'>
      <Icon
        className='fixed top-[calc(100vh-80px)] right-8 text-blue-500 bg-blue-200/50 p-2 rounded-full'
        icon='jam:messages-alt-f'
        width='60'
        height='60'
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div
        className={`h-[500px] w-[360px] rounded-xl overflow-hidden shadow-2xl ${
          isOpen ? `fixed bottom-22 right-8` : `hidden`
        }`}
      >
        <ChatContainer>
          <ConversationHeader className='!bg-blue-500/80 [&>div>div]:!bg-transparent'>
            <ConversationHeader.Content>
              <div className='text-white font-bold'>Name Hotel</div>
            </ConversationHeader.Content>
            <ConversationHeader.Actions>
              <Icon
                icon='material-symbols:close'
                className='text-gray-300 cursor-pointer'
                onClick={() => setIsOpen(false)}
                width='24'
                height='24'
              />
            </ConversationHeader.Actions>
          </ConversationHeader>

          <MessageList>
            <Message
              model={{
                direction: "outgoing",
                position: "last",
                sender: "Patrik",
                type: "html",
                payload: "<span style='color:red'>Hello</span>",
              }}
            ></Message>
            {messages?.map((message, i) => (
              <Message
                key={i}
                model={{
                  direction: message.user_id === 1 ? 0 : 1,
                  message: message.message_content,
                  position: "normal",
                  sender: message.user_id,
                  sentTime: message.message_time,
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            onSend={handleSendMessage}
            autoFocus
            onChange={setInput}
            value={input}
            ref={inputRef}
            placeholder='Type message here'
          />
        </ChatContainer>
      </div>
    </div>
  );
};

export default ChatCustomer;
