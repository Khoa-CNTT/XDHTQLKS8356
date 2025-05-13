const customerRouter = require("express").Router();
const {authentication} = require("../middleware/authentication");

const {createBooking, getBookingById, getAllBookingForCustomer} = require("../controller/booking");
const { sendMess, getMessages, getAllMessages } = require("../controller/message");
const {loginUser, logout} = require("../controller/user");
const { getRoomEmpty } = require("../controller/room");
const { bookingServices } = require("../controller/services");
const { createRatting, getRatting } = require("../controller/ratting");



//booking
customerRouter.post("/booking", authentication, createBooking);
customerRouter.post("/booking-service", bookingServices);
customerRouter.get("/booking/:id", getBookingById);
customerRouter.get("/bookings", authentication, getAllBookingForCustomer);


//ratting
customerRouter.post("/ratting", createRatting);
customerRouter.get("/ratting/:id", getRatting);


//user
customerRouter.post("/login", loginUser);
customerRouter.post("/logout", logout);


//search
customerRouter.get("/search", getAllBookingForCustomer);


//room
customerRouter.get("/room_empty", getRoomEmpty);

//chat
customerRouter.post("/chat/:id", authentication, sendMess);
customerRouter.get("/chat/:id", authentication, getMessages);
customerRouter.get("/all_chat", getAllMessages);


module.exports = customerRouter;