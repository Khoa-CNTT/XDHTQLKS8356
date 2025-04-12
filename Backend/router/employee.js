const employeeRouter = require("express").Router();


const {createHotel} = require("../controller/hotel");



//booking
receptionistRouter.get("/booking", getAllBookingForAdmin);


module.exports = receptionistRouter;