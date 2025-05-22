const adminRouter = require("express").Router();


const {getAmenitie, createAmenitie, deleteAmenitie, updateAmenitie, createAmenitieRoom} = require("../controller/amenitie");
const { getAllBookingForAdmin, updateBooking } = require("../controller/booking");
const { updateHotel, getHotel } = require("../controller/hotel");
const { createPayment } = require("../controller/payment");
const { createPricing, deletePricing, updatePricing, getPricing } = require("../controller/pricing");
const { createRoom, deleteRoom, updateRoom, getRoom, getRoomById, getStatusRoom } = require("../controller/room");
const { createRoomDetail, deleteRoomDetail, updateRoomDetail, getRoomDetail, getAllRoomDetail } = require("../controller/room_detail");
const { createServices, deleteServices, updateServices, getAllServices } = require("../controller/services");
const { findUser, addEmployee, getAllUser, getAllUserGroup } = require("../controller/user");





//amenitie
adminRouter.post("/amenitie", createAmenitie);
adminRouter.post("/amenitie_room", createAmenitieRoom);
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
adminRouter.get("/status_room", getStatusRoom);


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
//adminRouter.post("/user", findUser);
adminRouter.get("/all_user", getAllUser);
adminRouter.post("/add_user", addEmployee);
adminRouter.get("/group_user", getAllUserGroup);



//booking
adminRouter.get("/bookings", getAllBookingForAdmin);
adminRouter.put("/booking/:id", updateBooking);
adminRouter.post("/booking/payment", createPayment);

module.exports = adminRouter;