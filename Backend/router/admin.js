const adminRouter = require("express").Router();


const {getAmenitie, createAmenitie, deleteAmenitie, updateAmenitie} = require("../controller/amenitie");
const { getAllBookingForAdmin, updateBooking } = require("../controller/booking");
const { updateHotel, getHotel } = require("../controller/hotel");
const { createPricing, deletePricing, updatePricing, getPricing } = require("../controller/pricing");
const { createRoom, deleteRoom, updateRoom, getRoom, getRoomById } = require("../controller/room");
const { createRoomDetail, deleteRoomDetail, updateRoomDetail, getRoomDetail, getAllRoomDetail } = require("../controller/room_detail");
const { createServices, deleteServices, updateServices, getAllServices } = require("../controller/services");
const { findUser, addEmployee } = require("../controller/user");



// //booking
// adminRouter.get("/booking", getAllBookingForAdmin);



//amenitie
adminRouter.post("/amenitie", createAmenitie);
adminRouter.delete("/amenitie/:id", deleteAmenitie);
adminRouter.put("/amenitie/:id", updateAmenitie);
adminRouter.get("/amenitie", getAmenitie);


//hotel
adminRouter.put("/hotel", updateHotel);
adminRouter.get("/hotel", getHotel);

//pricing
adminRouter.post("/pricing", createPricing);
adminRouter.delete("/pricing/:id", deletePricing);
adminRouter.put("/pricing/:id", updatePricing);
adminRouter.get("/pricing", getPricing);


//room
adminRouter.post("/room", createRoom);
adminRouter.delete("/room/:id", deleteRoom);
adminRouter.put("/room/:id", updateRoom);
adminRouter.get("/room", getRoom);
adminRouter.get("/room/:id", getRoomById);
adminRouter.get("/status_room", getRoom);

//room_detail
adminRouter.post("/room_detail", createRoomDetail);
adminRouter.delete("/room_detail/:id", deleteRoomDetail);
adminRouter.put("/room_detail/:id", updateRoomDetail);
adminRouter.get("/room_detail/:id", getRoomDetail);
adminRouter.get("/room_details", getAllRoomDetail);


//services
adminRouter.post("/services", createServices);
adminRouter.delete("/services/:id", deleteServices);
adminRouter.put("/services/:id", updateServices);
adminRouter.get("/services", getAllServices);


//user
adminRouter.get("/search_user", findUser);
adminRouter.post("/user", findUser);
adminRouter.post("/add_user", addEmployee);



//booking
adminRouter.get("/bookings", getAllBookingForAdmin);
adminRouter.put("/booking/:id", updateBooking);

module.exports = adminRouter;