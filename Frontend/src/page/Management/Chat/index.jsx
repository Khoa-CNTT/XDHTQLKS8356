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
import { getToken, setConversationId, setUser } from "../../../utils/AuthCheck";
import { data } from "react-router-dom";
import { userServices } from "../../../service/userServices";

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
   const [infoUser, setInfoUser] = useState({
      user: null,
      token: null,
    });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await messageService.getAllMessages();
        if (users.status) setListUsers(users.mess);
        const token = getToken();
        const user = await userServices.getUser();
        if (user) {
          setInfoUser({
            user: user,
            token: token,
          });
          //cookie
          setUser(user);
          setConversationId(id.user);
        }
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
        const data = await messageService.getMessages(
          activeChatUser.conversation_id
        );
        if (data) setMessages(data);
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
        if (data.success) setUsers(data.user);
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
      console.log('1',infoUser.token, message, activeChatUser.conversation_id)
      socketConnect.sendNewMessage(infoUser.token, message, activeChatUser.conversation_id);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Lắng nghe tin nhắn mới từ Socket.io
  useEffect(() => {
    const handleNewMessage = ({
      conversationId,
      user_id,
      message_content,
      message_time,
    }) => {
      console.log(
        "messageReceive: ",
        conversationId,
        user_id,
        message_content,
        message_time
      );
      console.log("active: ", activeChatUserRef.current?.user_id);
      if (
        activeChatUserRef.current?.conversation_id === conversationId 
      ) {
      setMessages((prev) => [
        ...prev,
        {
          fullname: "",
          image: "https://www.elevenforum.com/attachments/images-jpeg-2-jpg.45643/",
          user_id: user_id,
          message_content: message_content,
          message_time: message_time,
        },
      ]);
      } else {
        setListUsers((prev) => {
          const newList = prev.map((user) =>
            user.conversation_id === conversationId
              ? {
                  ...user,
                  unreadCount: (user.count_unread || 0) + 1,
                  message_content: message_content,
                  message_time: message_time,
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
    return () => {
      socketConnect.stopListenNewMessages(handleNewMessage);
    };
  }, []);
  return (
    <div className='h-full box-border overflow-hidden [&>div]:shadow [&>div]:rounded-xl [&>div]:bg-white'>
      <MainContainer
        responsive
        style={{
        }}
      >
        <Sidebar position='left'>
          <div className='relative'>
            <Search
              value={search}
              onClearClick={() => setSearch("")}
              onChange={(e) => setSearch(e)}
              placeholder='Search...'
            />
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
                        onClick={() => {
                          const u = listUsers?.find(
                            (i) => i.user_id === user.id
                          );
                          setActiveChatUser(u);
                        }}
                        className='flex items-center gap-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer'
                      >
                        <img
                          className='shrink-0 size-10 rounded-full'
                          src={user.image}
                          alt={user.fullname}
                        />
                        <span className='text-sm text-gray-800'>
                          {user.fullname}
                        </span>
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
          </div>

          <ConversationList>
            {listUsers.map((user, i) => (
              <Conversation
                key={i}
                active={user.user_id === activeChatUser?.user_id}
                info={user.message_content}
                lastSenderName={user.fullname}
                lastActivityTime={formatRelativeTime(user.message_time)}
                name={user.fullname}
                unreadCnt={user.unreadCount||0}
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
          <ChatContainer style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar
                name={activeChatUser.fullname}
                src={activeChatUser.image}
              />
              <ConversationHeader.Content
              // info='Active 10 mins ago'
              userName={activeChatUser.fullname}
              />
            </ConversationHeader>

            <MessageList style={{ flex: 1, overflow: "auto" }} autoScrollToBottomOnMount={true}>
              {messages?.map((message, i) => (
                <Message
                  key={i}
                  model={{
                    direction: message.user_id === infoUser.user.id ? 1 : 0,
                    message: message.message_content,
                    position: "normal",
                    sender: message.user_id,
                    sentTime: message.message_time,
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
