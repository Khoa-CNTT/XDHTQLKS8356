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
import { connectSocket, listenNewMessages, stopListenNewMessages } from "../../service/socket";
import { isAuthenticated } from "../../utils/AuthCheck";

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
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
      console.log(message);
    };

    // if (isAuthenticated()) {
      connectSocket()
      listenNewMessages(handleNewMessage);
      console.log("check: ", isAuthenticated());
    // }

    return () => {
      stopListenNewMessages(handleNewMessage);
    };
  }, []);

  // Scroll tự động tới tin nhắn mới nhất
  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    try {
      await sendMessage(1, input);
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
          <ConversationHeader>
            <ConversationHeader.Content userName='Name Hotel' />
          </ConversationHeader>

          <MessageList>
            {/* <MessageSeparator content='Saturday, 30 November 2019' /> */}
            <Message
              model={{
                direction: "incoming",
                message:
                  "Hello my friend Hello my friend Hello my \nfriend Hello my friend Hello my friend Hello my friend Hello my friend Hello my friend ",
                position: "single",
                sender: "Zoe",
                sentTime: "15 mins ago",
              }}
            />
            <Message
              model={{
                direction: "outgoing",
                message: "Hello my friend",
                position: "last",
                sender: "Patrik",
                sentTime: "15 mins ago",
              }}
            />

            <Message
              model={{
                direction: "incoming",
                message: "Hello my friend",
                position: "normal",
                sender: "Zoe",
                sentTime: "15 mins ago",
              }}
            />
            <Message
              model={{
                direction: "incoming",
                message: "Hello my friend",
                position: "last",
                sender: "Zoe",
                sentTime: "15 mins ago",
              }}
            />
            <Message
              model={{
                direction: "outgoing",
                message:
                  "Hello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\n",
                position: "first",
                sender: "Patrik",
                sentTime: "15 mins ago",
              }}
            />
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
                  direction: "outgoing",
                  message: message.messageContent,
                  position: "first",
                  sender: "Patrik",
                  sentTime: "15 mins ago",
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
