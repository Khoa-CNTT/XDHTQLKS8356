const customerRouter = require("express").Router();
const {authentication} = require("../middleware/authentication");

const {createBooking, getBookingById, getAllBookingForCustomer} = require("../controller/booking");
const { getMessages, getAllMessages, putMessage } = require("../controller/message");
const {loginUser, logout, getUser, putUser} = require("../controller/user");
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
customerRouter.get("/user", authentication, getUser);
customerRouter.put("/user", authentication, putUser);
customerRouter.post("/logout", logout);


//search
customerRouter.get("/search", getAllBookingForCustomer);


//room
customerRouter.get("/room_empty", getRoomEmpty);

//chat
customerRouter.get("/chat/:id", getMessages);
customerRouter.get("/all_chat", getAllMessages);
customerRouter.put("/chat/:id", putMessage);


module.exports = customerRouter;