const customerRouter = require("express").Router();
const {authentication} = require("../middleware/authentication");

const {createBooking, getBookingById, getAllBookingForCustomer} = require("../controller/booking");
const { getMessages, getAllMessages, putMessage } = require("../controller/message");
const {loginUser, logout, getUser, putUser, registerUser, activeUser, getConversation} = require("../controller/user");
const { getRoomEmpty } = require("../controller/room");
const { bookingServices } = require("../controller/services");
const { createRatting, getRatting } = require("../controller/ratting");
const { bot, getchatbot } = require("../chat_ai/chatbot");



//booking
customerRouter.post("/booking", authentication, createBooking);
customerRouter.post("/booking-service", bookingServices);
customerRouter.get("/booking/:id", getBookingById);
customerRouter.get("/bookings", authentication, getAllBookingForCustomer);


//ratting
customerRouter.post("/ratting", createRatting);
customerRouter.get("/ratting/:id", getRatting);


//user
customerRouter.post("/signup", registerUser);
customerRouter.post("/active", activeUser);
customerRouter.post("/login", loginUser);
customerRouter.get("/user", authentication, getUser);
customerRouter.put("/user", authentication, putUser);
customerRouter.post("/logout", logout);


//search
customerRouter.get("/search", getAllBookingForCustomer);


//chatbot
customerRouter.post("/chatbot", authentication, bot);
customerRouter.get("/chatbot", authentication, getchatbot);


//room
customerRouter.get("/room_empty", getRoomEmpty);

//chat
customerRouter.get("/chat/:id", getMessages);
customerRouter.get("/all_chat", getAllMessages);
customerRouter.put("/chat/:id", putMessage);
customerRouter.get("/chat_room", authentication, getConversation);


module.exports = customerRouter;