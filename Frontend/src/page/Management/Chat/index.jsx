import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
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
import { authService } from "../../../service/authService";
import { messageService } from "../../../service/messageService";
import { formatRelativeTime } from "../../../utils/FormatDate";
import { socketConnect } from "../../../service/socket";

const Chat = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const inputMessageRef = useRef(null);
  const activeChatUserRef = useRef();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await messageService.getAllMessages();
        if (users.status) setListUsers(users.mess);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    activeChatUserRef.current = activeChatUser;
    const fetchMessages = async () => {
      try {
        if (!activeChatUser || !activeChatUser.user_id) return;
        const data = await messageService.getMessages(activeChatUser.user_id);
        setMessages(data.mess.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [activeChatUser]);

  useEffect(() => {
    if (!search.trim()) {
      setUsers([]);
      return;
    }

    const fetchSearchUser = async () => {
      try {
        const data = await authService.findUser(search);
        if (data.success) setMessages(data.user);
        console.log("data search: ", data.user);
      } catch (error) {
        console.error(error);
      }
    };

    const timeoutId = setTimeout(fetchSearchUser, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const sendMessage = async () => {
    console.log("content chat: ", message);
    if (!message.trim()) return;

    try {
      const data = {
        messageContent: message.trim(),
        image: "test",
      };
      await messageService.sendMessage(activeChatUser.user_id, data);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Lắng nghe tin nhắn mới từ Socket.io
  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log("messageReceive: ", message)
       console.log("active: ", activeChatUserRef.current?.user_id)
      if (activeChatUserRef.current?.user_id === message.receiver_id || activeChatUserRef.current?.user_id === message.sender_id) {
        setMessages((prev) => [...prev, message])
       console.log("true")
      } else {
        setListUsers((prev) => {
          const newList = prev.map((user) =>
            user.user_id === message.sender_id
              ? {
                  ...user,
                  unreadCount: (user.unreadCount || 0) + 1,
                  message_content: message.messageContent,
                  message_time: message.messageTime,
                }
              : user
          );
          newList.sort(
            (a, b) => new Date(b.message_time) - new Date(a.message_time)
          );
          return newList;
        });
      }
    };

    socketConnect.connectSocket();
    socketConnect.listenNewMessages(handleNewMessage);
console.log("active: ",activeChatUser)
    return () => {
      socketConnect.stopListenNewMessages(handleNewMessage);
    };
  }, []);
console.log("activeChat: ", activeChatUser)
  console.log("listChat: ", listUsers)
  return (
    <div className='h-full [&>div]:shadow [&>div]:rounded-xl [&>div]:bg-white'>
      {/* <div className='basis-1/3'> */}
      {/* Search user */}
      {/* <div className='relative'>
          <div className='flex justify gap-2 w-[90%] mx-auto my-4 p-1 border border-gray-200 rounded-lg has-focus:ring-2 has-focus:ring-blue-400'>
            <Icon
              icon='iconamoon:search-light'
              width={20}
              height={20}
              className='basis-1/12 text-neutral-400'
            />
            <input
              className='basis-11/12 sm:text-sm focus:border-no'
              type='text'
              role='combobox'
              placeholder='Tìm kiếm khách hàng...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {search && (
            <div className='absolute z-10 w-full bg-white rounded-xl shadow-xl mt-1'>
              <div className='max-h-60 overflow-y-auto p-2 space-y-2'>
                {loading ? (
                  <div className='text-center text-gray-400 text-sm'>
                    Loading...
                  </div>
                ) : users.length > 0 ? (
                  users.map((user, index) => (
                    <div
                      key={user.id}
                      className='flex items-center gap-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer'
                    >
                      <img
                        className='shrink-0 size-5 rounded-full'
                        src={user.avatar}
                        alt={user.name}
                      />
                      <span className='text-sm text-gray-800'>{user.name}</span>
                    </div>
                  ))
                ) : (
                  <div className='text-center text-gray-400 text-sm'>
                    Không tìm thấy.
                  </div>
                )}
              </div>
            </div>
          )}
        </div> */}
      {/* </div> */}

      {/* <div className='basis-2/3'> */}
      <MainContainer
        responsive
        style={{
          height: "100%",
          width: "100%",
          boxSizing: "content-box",
        }}
      >
        <Sidebar position='left'>
          <Search placeholder='Search...' />
          <ConversationList>
            {listUsers.map((user, i) => (
              <Conversation
                key={i}
                active={user.user_id === activeChatUser?.user_id}
                info={user.message_content}
                lastSenderName={user.fullname}
                lastActivityTime={formatRelativeTime(user.message_time)}
                name={user.fullname}
                unreadCnt={user.unreadCount}
                onClick={() => setActiveChatUser(user)}
              >
                <Avatar
                  name={user.fullname}
                  src={user.image}
                  // status='available'
                />
              </Conversation>
            ))}
          </ConversationList>
        </Sidebar>
        {activeChatUser && (
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar
                name={activeChatUser.fullname}
                src={activeChatUser.image}
              />
              <ConversationHeader.Content
              // info='Active 10 mins ago'
              // userName='Zoe'
              />
            </ConversationHeader>

            <MessageList>
              {messages?.map((message, i) => (
                <Message
                  key={i}
                  model={{
                    direction: message.sender_id === 1 ? 1 : 0,
                    message: message.messageContent,
                    position: "normal",
                    sender: message.sender_id,
                    sentTime: message.messageTime,
                  }}
                />
              ))}
            </MessageList>
            <MessageInput
              onSend={sendMessage}
              autoFocus
              onChange={setMessage}
              value={message}
              ref={inputMessageRef}
              placeholder='Type message here'
            />
          </ChatContainer>
        )}
      </MainContainer>
      {/* </div> */}
    </div>
  );
};

export default Chat;
