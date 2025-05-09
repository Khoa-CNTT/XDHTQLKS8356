import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  Search,
  ConversationHeader,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const ChatCustomer = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='z-[100]'>
      <Icon
        className='fixed top-[calc(100vh-80px)] right-8 text-blue-500 bg-blue-200/50 p-2 rounded-full'
        icon='jam:messages-alt-f'
        width='60'
        height='60'
        onClick={()=>setIsOpen(prev=>!prev)}
      />
      <div className={`h-[500px] w-[360px] rounded-xl overflow-hidden shadow-2xl ${isOpen?`fixed bottom-22 right-8`:`hidden`}`}>
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Content
            userName='Name Hotel'
          />
        </ConversationHeader>

        <MessageList>
          <MessageSeparator content='Saturday, 30 November 2019' />
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
              payload:"<span style='color:red'>Hello</span>"
            }}
            
          >
          
            
          </Message>
        </MessageList>
        <MessageInput placeholder='Type message here' />
      </ChatContainer>
      </div>
      
    </div>
  );
};

export default ChatCustomer;
