const customerRouter = require("express").Router();



const {createBooking} = require("../controller/booking");



//booking
customerRouter.post("/booking", createBooking);


module.exports = customerRouter;