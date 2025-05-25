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

const ChatCustomer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [conversation, setConversation] = useState();
  const [infoUser, setInfoUser] = useState({
    conversation: null,
    user: null,
    token: null,
  });

  // Lấy tin nhắn khi component được mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const id = await messageService.getConversationId();
        if (id.success) {
          const token = getToken();
          const user = await userServices.getUser();
          if (user) {
            setInfoUser({
              conversation: id.user,
              user: user,
              token: token,
            });
            //cookie
            setUser(user);
            setConversationId(id.user);
          }
          const messages = await messageService.getMessages(id.user);
          console.log("messages", messages);
          if (messages) setMessages(messages);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (isAuthenticated()) fetchMessages();
  }, []);

  // Lắng nghe tin nhắn mới từ Socket.io
  useEffect(() => {
    const handleNewMessage = ({
      conversationId,
      user_id,
      message_content,
      message_time,
    }) => {
      console.log(conversationId, user_id, message_content, message_time);
      setMessages((prev) => [
        ...prev,
        {
          fullname: "A",
          image:
            "https://www.elevenforum.com/attachments/images-jpeg-2-jpg.45643/",
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
      console.log(infoUser.token, input, infoUser.conversation);
      socketConnect.sendNewMessage(
        infoUser.token,
        input,
        infoUser.conversation
      );
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
        className={`z-[101] h-[500px] w-[360px] rounded-xl overflow-hidden shadow-2xl ${
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
            {Array.isArray(messages) && messages?.map((message, i) => (
              <Message
                key={i}
                model={{
                  direction: message.user_id === infoUser.user.id ? 1 : 0 ,
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
