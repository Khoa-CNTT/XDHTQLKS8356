import React, { useEffect, useState } from "react";
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

const Chat = () => {
  const fallbackUsers = [
    {
      id: 1,
      name: "Kim Ya Sung",
      status: "Online",
      avatar:
        "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
    },
    {
      id: 2,
      name: "Chris Peti",
      status: "Offline",
      avatar:
        "https://images.unsplash.com/photo-1610186593977-82a3e3696e7f?auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
    },
  ];
  const messages = [
    {
      type: "bot",
      avatar:
        "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
      text: "How can we help?",
    },
    {
      type: "bot",
      avatar:
        "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
      text: "You can ask questions like:\n- What's Preline UI?\n- How many examples?\n- Is there a PRO version?",
    },
    {
      type: "user",
      text: "What's Preline UI?",
    },
    {
      type: "bot",
      avatar:
        "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
      text: "Preline UI is a set of prebuilt UI components for Tailwind CSS.",
    },
  ];

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.example.com/users?query=${search.trim()}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setUsers(data);
        } else {
          setUsers(fallbackUsers);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setUsers(fallbackUsers);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("chat: ", e);
  };
  return (
    <div className='flex gap-4 bg-neutral-50 h-full p-4 [&>div]:shadow [&>div]:rounded-xl [&>div]:bg-white'>
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
        }}
      >
        <Sidebar position='left'>
          <Search placeholder='Search...' />
          <ConversationList>
            <Conversation
              info='Yes i can do it for you'
              lastSenderName='Lilly'
              name='Lilly'
            >
              <Avatar
                name='Lilly'
                src='https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg'
                // status='available'
              />
            </Conversation>

            <Conversation
              info='Yes i can do it for you'
              lastSenderName='Emily'
              name='Emily'
              unreadCnt={3}
            >
              <Avatar
                name='Emily'
                src='https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg'
                // status='available'
              />
            </Conversation>
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
              name='Zoe'
              src='https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg'
            />
            <ConversationHeader.Content
              // info='Active 10 mins ago'
              userName='Zoe'
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
            >
              <Avatar
                name='Zoe'
                src='https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg'
              />
            </Message>
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
              avatarSpacer
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
            >
              <Avatar
                name='Zoe'
                src='https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg'
              />
            </Message>
            <Message
              model={{
                direction: "outgoing",
                message: "Hello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\nHello my friend\n",
                position: "first",
                sender: "Patrik",
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
          </MessageList>
          <MessageInput placeholder='Type message here' />
        </ChatContainer>
      </MainContainer>
      {/* </div> */}
    </div>
  );
};

export default Chat;
// {/* Message */}
// <ul className='space-y-5 px-4'>
// {messages.map((msg, index) => {
//   const isUser = msg.type === "user";

//   return (
//     <li
//       key={index}
//       className={`flex items-start gap-3 ${
//         isUser ? "justify-end" : "justify-start"
//       }`}
//     >
//       {/* Bot Avatar */}
//       {!isUser && (
//         <img
//           className='w-9 h-9 rounded-full'
//           src={msg.avatar}
//           alt='Bot Avatar'
//         />
//       )}

//       {/* Message Bubble */}
//       <div
//         className={`max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-line
//       ${
//         isUser
//           ? "bg-blue-600 text-white rounded-br-none"
//           : "bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-white rounded-bl-none"
//       }
//     `}
//       >
//         {msg.text}
//       </div>

//       {/* User Avatar */}
//       {isUser && (
//         <Icon icon="mdi:user" width={36} height={36} className="bg-neutral-200 text-black p-1.5 rounded-full"/>
//       )}
//     </li>
//   );
// })}
// </ul>

// {/* Chat */}
// <form onSubmit={sendMessage}>
// <label htmlFor="chat" className="sr-only">Your message</label>
// <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
// <button
//   type="button"
//   className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
// >
//   <svg
//     className="w-6 h-6"
//     fill="currentColor"
//     viewBox="0 0 20 20"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fillRule="evenodd"
//       d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
//       clipRule="evenodd"
//     ></path>
//   </svg>
// </button>

// <button
//   type="button"
//   className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
// >
//   <svg
//     className="w-6 h-6"
//     fill="currentColor"
//     viewBox="0 0 20 20"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fillRule="evenodd"
//       d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
//       clipRule="evenodd"
//     ></path>
//   </svg>
// </button>

// <textarea
//   id="chat"
//   rows="1"
//   className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//   placeholder="Your message..."
// ></textarea>

// <button
//   type="submit"
//   className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
// >
//   <svg
//     className="w-6 h-6 rotate-90"
//     fill="currentColor"
//     viewBox="0 0 20 20"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
//   </svg>
// </button>
// </div>
// </form>
