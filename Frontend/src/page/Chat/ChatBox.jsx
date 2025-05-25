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
import {
  getToken,
  isAuthenticated,
  setConversationId,
  setUser,
} from "../../utils/AuthCheck";
import { userServices } from "../../service/userServices";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await messageService.getChatBox();
        console.log('chatbox', messages)
        if (messages) setMessages(messages);
      } catch (error) {
        console.error(error);
      }      
    }

     if (isAuthenticated()){
        console.log(true)
        fetchMessages();
      } 
  }, []);

  // Scroll tự động tới tin nhắn mới nhất
  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      const res = await messageService.sendChatBox({ question: input });
      if(res) setMessages(prev=> [...prev, ...res])
      setInput("");
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className='z-[100]'>
      <Icon
        className='fixed top-[calc(100vh-160px)] right-8 text-blue-500 bg-blue-200/50 p-2 rounded-full'
        icon='hugeicons:bot'
        width='60'
        height='60'
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div
        ref={boxRef}
        className={`z-[101] h-[500px] w-[360px] rounded-xl overflow-hidden shadow-2xl ${
          isOpen ? `fixed bottom-22 right-8` : `hidden`
        }`}
      >
        <ChatContainer>
          <ConversationHeader className='!bg-blue-500/80 [&>div>div]:!bg-transparent'>
            <ConversationHeader.Content>
              <div className='text-white font-bold'>Chatbot</div>
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
            {messages?.map((message, i) => (
              <Message
                key={i}
                model={{
                  direction: message.sender === 'user' ? 1 : 0,
                  message: message.message,
                  position: "normal",
                  sender: message.sender,
                  sentTime: message.created_at,
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

export default ChatBox;
