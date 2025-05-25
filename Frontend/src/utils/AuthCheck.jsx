import Cookies from "js-cookie";

export const isAuthenticated = () => !!Cookies.get("token");

export const hasRole = (role) => {
  const userRole = Cookies.get("role"); 
  return userRole === role;
};

export const setRole = (role) => {
  Cookies.set('role', role, {
    expires: 1, 
    path: '/',  
    // secure: true,
    // sameSite: 'Strict' 
  })
}

// export const setHotel = (id) => {
//   Cookies.set('hotel_id', id, {
//     expires: 1, 
//     path: '/',  
//     // secure: true,
//     // sameSite: 'Strict' 
//   })
// }

export const setToken = (token) => {
  Cookies.set('token', token, {
    expires: 1, 
    path: '/',  
    secure: true,
    // sameSite: 'Strict' 
  })
}

export const getToken = () => {
  return Cookies.get('token')
}

export const setConversationId = (id) => {
  Cookies.set('conversationId', id, {
    expires: 1, 
    path: '/',  
    secure: true,
    // sameSite: 'Strict' 
  })
}

export const getConversation = () => {
  return Cookies.get('conversationId')
}

export const setUser = (user) => {
  Cookies.set('user', user, {
    expires: 1, 
    path: '/',  
    secure: true,
    // sameSite: 'Strict' 
  })
}

export const getUser = () => {
  return Cookies.get('user')
}
