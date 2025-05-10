const customerRouter = require("express").Router();
const {authentication} = require("../middleware/authentication");

const {createBooking} = require("../controller/booking");
const { sendMess, getMessages, getAllMessages } = require("../controller/message");
const {loginUser} = require("../controller/user");
const { getRoomEmpty } = require("../controller/room");


//booking
customerRouter.post("/booking", createBooking);


//user
customerRouter.post("/login", loginUser);


//room
customerRouter.get("/room_empty", getRoomEmpty);

//chat
customerRouter.post("/chat/:id", authentication, sendMess);
customerRouter.get("/chat/:id", authentication, getMessages);
customerRouter.get("/all_chat", getAllMessages);


module.exports = customerRouter;